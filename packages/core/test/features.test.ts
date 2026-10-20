import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiWalletKey } from "../src/signer.js";
import { StrikeHttp } from "../src/http.js";
import { NETWORKS } from "../src/config.js";
import { MarketData } from "../src/market.js";
import { AccountApi, attachRealizedPnl, parsePortfolio } from "../src/account.js";
import { Trading, roundStopPrice, stopOrderProblem } from "../src/trading.js";
import { StrikeEverywhere } from "../src/client.js";
import { LocalBook, OrderBookFeed, estimateMarketFill, makeView, parseDepthDiff, parseDepthSnapshot, parseJsonKeepingIds, type BookLevel } from "../src/book.js";
import type { ClosedPositionRow, FillRow, MarketSpec } from "../src/types.js";

const res = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status });

function fakeFetch(routes: Record<string, (body: any, url: URL, headers: Record<string, string>) => unknown>) {
  const calls: Array<{ method: string; path: string; url: URL; body: any; headers: Record<string, string> }> = [];
  const f = (async (u: string, init: any = {}) => {
    const url = new URL(u);
    const method = init.method ?? "GET";
    const body = init.body ? JSON.parse(init.body) : undefined;
    const headers = init.headers ?? {};
    calls.push({ method, path: url.pathname, url, body, headers });
    const h = routes[`${method} ${url.pathname}`] ?? routes[url.pathname];
    if (!h) return res({ error: "not found" }, 404);
    const out = h(body, url, headers);
    return out instanceof Response ? out : res(out);
  }) as unknown as typeof fetch;
  return { f, calls };
}

const ADA: MarketSpec = {
  symbol: "ADA-USD",
  name: "Cardano",
  baseAsset: "ADA",
  status: "trading",
  tickSize: 0.00001,
  stepSize: 1,
  marketStepSize: 1,
  minQty: 1,
  minNotional: 10,
  defaultLeverage: 3,
  maxLeverage: 40,
  marginTiers: [{ max_notional: "10000", max_leverage: 40, maintenance_margin_rate: "0.005", maintenance_amount: "0" }],
};

async function signedHttp(f: typeof fetch) {
  const http = new StrikeHttp(NETWORKS.mainnet, f);
  http.key = await ApiWalletKey.generate();
  return http;
}


describe("order book", () => {
  it("keeps uint64 sequence ids exact", () => {
    const j = parseJsonKeepingIds('{"lastUpdateId":18446744073709551615,"bids":[["1","2"]],"asks":[["3","4"]]}');
    const snap = parseDepthSnapshot(j)!;
    expect(snap.lastUpdateId).toBe(18446744073709551615n);
    const d = parseDepthDiff(parseJsonKeepingIds('{"e":"depthUpdate","s":"ADA-USD","U":9007199254740993,"u":9007199254740993,"b":[],"a":[]}'))!;
    expect(d.u).toBe(9007199254740993n);
  });

  it("parses snapshots defensively and drops malformed levels", () => {
    const snap = parseDepthSnapshot({ lastUpdateId: "5", bids: [["0.217", "100"], ["x", "1"], ["0.216", "-1"], "junk", ["0.215", "0"]], asks: [["0.218", "50"]] })!;
    expect(snap.bids).toEqual([[0.217, 100]]);
    expect(snap.asks).toEqual([[0.218, 50]]);
    expect(parseDepthSnapshot({ bids: [], asks: [] })).toBeNull();
  });

  it("applies diffs (size 0 removes), drops stale ones, and doesn't require contiguous ids", () => {
    const b = new LocalBook();
    b.reset({ lastUpdateId: 100n, bids: [[10, 1], [9, 2]], asks: [[11, 1], [12, 3]] });
    expect(b.apply({ symbol: "X", u: 100n, bids: [[10, 99]], asks: [] })).toBe(false);
    expect(b.apply({ symbol: "X", u: 250n, bids: [[10, 0], [9.5, 4]], asks: [[11, 2]] })).toBe(true);
    const v = b.view()!;
    expect(v.bids).toEqual([[9.5, 4], [9, 2]]);
    expect(v.asks).toEqual([[11, 2], [12, 3]]);
    expect(v.mid).toBeCloseTo(10.25);
    expect(b.lastUpdateId).toBe(250n);
  });

  it("never exposes a crossed book", () => {
    expect(makeView([[11, 1]], [[11, 1]])).toBeNull();
    const b = new LocalBook();
    b.reset({ lastUpdateId: 1n, bids: [[10, 1]], asks: [[11, 1]] });
    b.apply({ symbol: "X", u: 2n, bids: [[11.5, 1]], asks: [] });
    expect(b.view()).toBeNull();
  });

  it("REST depth rejects crossed or malformed books", async () => {
    const book = { lastUpdateId: 7, bids: [["0.22", "5"]], asks: [["0.21", "5"]] };
    const { f } = fakeFetch({ "/price/v2/depth": () => book });
    const m = new MarketData(new StrikeHttp(NETWORKS.mainnet, f));
    await expect(m.depth("ADA-USD", 10)).rejects.toThrow(/Crossed/);
    book.asks = [["0.23", "5"]];
    await expect(m.depth("ADA-USD", 10)).resolves.toMatchObject({ lastUpdateId: 7n });
    const { f: f2 } = fakeFetch({ "/price/v2/depth": () => ({ msg: "oops" }) });
    await expect(new MarketData(new StrikeHttp(NETWORKS.mainnet, f2)).depth("ADA-USD")).rejects.toThrow(/Malformed/);
  });

  describe("OrderBookFeed", () => {
    function setup(snapshots: Array<{ lastUpdateId: bigint; bids: BookLevel[]; asks: BookLevel[] }>) {
      const listeners = new Set<(m: any) => void>();
      const stateListeners = new Set<(s: "open" | "closed") => void>();
      const stream = {
        subs: [] as string[],
        subscribe: (c: string, s?: string) => stream.subs.push(`+${c}:${s}`),
        unsubscribe: (c: string, s?: string) => stream.subs.push(`-${c}:${s}`),
        onMessage: (fn: (m: any) => void) => (listeners.add(fn), () => listeners.delete(fn)),
        onState: (fn: (s: "open" | "closed") => void) => (stateListeners.add(fn), () => stateListeners.delete(fn)),
      };
      let release: () => void = () => {};
      let n = 0;
      const market = {
        depth: vi.fn(async () => {
          const snap = snapshots[Math.min(n++, snapshots.length - 1)];
          await new Promise<void>((r) => (release = r));
          return snap;
        }),
      };
      const send = (u: number, b: BookLevel[], a: BookLevel[], s = "ADA-USD") =>
        listeners.forEach((fn) => fn({ e: "depthUpdate", s, U: String(u), u: String(u), b: b.map(([p, q]) => [String(p), String(q)]), a: a.map(([p, q]) => [String(p), String(q)]) }));
      return { stream, market, send, release: () => release(), state: (s: "open" | "closed") => stateListeners.forEach((f) => f(s)), listeners };
    }

    afterEach(() => vi.useRealTimers());

    it("buffers diffs until the snapshot lands, replays only newer ones, then goes live", async () => {
      vi.useFakeTimers();
      const t = setup([{ lastUpdateId: 10n, bids: [[1.0, 5]], asks: [[1.2, 5]] }]);
      const feed = new OrderBookFeed(t.market, t.stream, "ADA-USD").start();
      const seen: any[] = [];
      feed.onUpdate((v) => seen.push(v));
      t.send(9, [[1.0, 1]], []);
      t.send(12, [[1.1, 2]], []);
      t.send(13, [], [[1.3, 1]], "BTC-USD");
      expect(feed.view()).toBeNull();
      t.release();
      await vi.advanceTimersByTimeAsync(0);
      expect(feed.view()!.bids).toEqual([[1.1, 2], [1.0, 5]]);
      t.send(14, [], [[1.2, 0], [1.25, 3]]);
      expect(feed.view()!.asks).toEqual([[1.25, 3]]);
      expect(seen.length).toBeGreaterThan(0);
      feed.close();
      expect(t.stream.subs).toEqual(["+depth:ADA-USD", "-depth:ADA-USD"]);
      expect(t.listeners.size).toBe(0);
    });

    it("hides a book that a diff left crossed and rebuilds it from a fresh snapshot", async () => {
      vi.useFakeTimers();
      const t = setup([
        { lastUpdateId: 10n, bids: [[1.0, 5]], asks: [[1.2, 5]] },
        { lastUpdateId: 20n, bids: [[1.0, 5]], asks: [[1.3, 1]] },
      ]);
      const feed = new OrderBookFeed(t.market, t.stream, "ADA-USD").start();
      t.release();
      await vi.advanceTimersByTimeAsync(3500);
      t.send(20, [[1.25, 1]], []);
      expect(feed.view()).toBeNull();
      expect(t.market.depth).toHaveBeenCalledTimes(2);
      t.release();
      await vi.advanceTimersByTimeAsync(0);
      expect(feed.view()!.asks[0]).toEqual([1.3, 1]);
      feed.close();
    });

    it("resyncs after the socket reconnects", async () => {
      vi.useFakeTimers();
      const t = setup([{ lastUpdateId: 10n, bids: [[1.0, 5]], asks: [[1.2, 5]] }]);
      const feed = new OrderBookFeed(t.market, t.stream, "ADA-USD").start();
      t.release();
      await vi.advanceTimersByTimeAsync(0);
      t.state("open");
      expect(t.market.depth).toHaveBeenCalledTimes(2);
      feed.close();
    });
  });
});


describe("market-order fill estimate (VWAP)", () => {
  const book = makeView(
    [[99, 1], [98, 2]],
    [[101, 1], [102, 1], [104, 2]],
  )!;

  it("walks the asks for a buy", () => {
    const e = estimateMarketFill(book, "buy", 3)!;
    expect(e.avgPrice).toBeCloseTo((101 + 102 + 104) / 3);
    expect(e.worstPrice).toBe(104);
    expect(e.complete).toBe(true);
    expect(e.slippage).toBeCloseTo((e.avgPrice - 100) / 100);
  });

  it("walks the bids for a sell and reports when the book can't fill it", () => {
    const e = estimateMarketFill(book, "sell", 5)!;
    expect(e.filled).toBe(3);
    expect(e.complete).toBe(false);
    expect(e.avgPrice).toBeCloseTo((99 + 98 * 2) / 3);
    expect(e.slippage).toBeGreaterThan(0.01);
  });

  it("returns null for nothing to fill", () => {
    expect(estimateMarketFill(book, "buy", 0)).toBeNull();
  });
});


describe("stop orders", () => {
  it("validates trigger direction against the mark, and stop-limit prices", () => {
    const base = { mark: 0.5, priceBound: 0.05 };
    expect(stopOrderProblem({ ...base, side: "buy", type: "stop", stopPrice: 0.49 })).toMatch(/above the mark/);
    expect(stopOrderProblem({ ...base, side: "buy", type: "stop", stopPrice: 0.5 })).toMatch(/above the mark/);
    expect(stopOrderProblem({ ...base, side: "buy", type: "stop", stopPrice: 0.51 })).toBeNull();
    expect(stopOrderProblem({ ...base, side: "sell", type: "stop", stopPrice: 0.51 })).toMatch(/below the mark/);
    expect(stopOrderProblem({ ...base, side: "sell", type: "stop", stopPrice: 0.45 })).toBeNull();
    expect(stopOrderProblem({ ...base, side: "sell", type: "stop_limit", stopPrice: 0.45 })).toMatch(/limit price/);
    expect(stopOrderProblem({ ...base, side: "sell", type: "stop_limit", stopPrice: 0.45, price: 0.3 })).toMatch(/within 5%/);
    expect(stopOrderProblem({ ...base, side: "sell", type: "stop_limit", stopPrice: 0.45, price: 0.449 })).toBeNull();
    expect(stopOrderProblem({ ...base, side: "buy", type: "stop" })).toMatch(/trigger/);
    expect(stopOrderProblem({ ...base, side: "buy", type: "limit" })).toBeNull();
    expect(stopOrderProblem({ ...base, side: "buy", type: "stop", stopPrice: 0.500004, tickSize: 0.0001 })).toBeNull();
    expect(roundStopPrice("buy", 0.500004, 0.0001)).toBe(0.5001);
    expect(roundStopPrice("sell", 0.499996, 0.0001)).toBe(0.4999);
  });

  it("shows one-sided books (thin markets) instead of treating them as broken", () => {
    const v = makeView([], [[100, 2]])!;
    expect(v).not.toBeNull();
    expect(Number.isNaN(v.mid)).toBe(true);
    expect(v.bestAsk).toBe(100);
    expect(makeView([], [])).toBeNull();
    expect(makeView([[101, 1]], [[100, 1]])).toBeNull();
    expect(estimateMarketFill(v, "buy", 1, {})!.avgPrice).toBe(100);
  });

  it("measures market-order slippage from the mark and stops at Strike's price band", () => {
    const book = { bids: [[82.55, 10]], asks: [[82.67, 10], [100, 10], [104.5, 10], [120, 10]], mid: 82.61, spread: 0.12, bestBid: 82.55, bestAsk: 82.67 } as any;
    const sell = estimateMarketFill(book, "sell", 5, { mark: 104.44, bound: 0.05 })!;
    expect(sell.beyondBand).toBe(true);
    expect(sell.complete).toBe(false);
    const buy = estimateMarketFill(book, "buy", 35, { mark: 104.44, bound: 0.05 })!;
    expect(buy.beyondBand).toBe(true);
    expect(buy.filled).toBe(30);
    expect(buy.complete).toBe(false);
    expect(buy.slippage).toBe(0);
  });

  it("assigns each fill to exactly one closed position (flip: A's closing fill belongs to A, not B)", () => {
    const rows = [
      { id: 1, symbol: "ADA-USD", marginMode: "cross", openTime: 1000, closeTime: 5000, realizedPnl: null },
      { id: 2, symbol: "ADA-USD", marginMode: "cross", openTime: 5000, closeTime: 9000, realizedPnl: null },
    ] as any[];
    const fill = (time: number, pnl: number) => ({ id: time, orderId: 0, symbol: "ADA-USD", side: "sell", role: "taker", price: 1, size: 1, fee: 0, realizedPnl: pnl, autoClose: "", time }) as any;
    const out = attachRealizedPnl(rows, [fill(1000, 0), fill(5000, 7), fill(9000, -2)], true);
    expect(out.map((r: any) => r.realizedPnl)).toEqual([7, -2]);
  });

  it("sends Strike's stop / stop_limit bodies with tick rounding and the builder fee header", async () => {
    const { f, calls } = fakeFetch({ "POST /v2/order": () => ({}) });
    const t = new Trading(await signedHttp(f), {} as AccountApi);
    await t.placeOrder(ADA, { symbol: "ADA-USD", side: "sell", type: "stop", size: 120.7, stopPrice: 0.4512345 }, 7, { clientOrderId: "c1" });
    await t.placeOrder(ADA, { symbol: "ADA-USD", side: "buy", type: "stop_limit", size: 50, stopPrice: 0.55, price: 0.551, reduceOnly: true }, 7, { clientOrderId: "c2" });
    expect(calls[0].body).toEqual({ client_order_id: "c1", symbol: "ADA-USD", side: "sell", type: "stop", size: "120", stop_price: "0.45123", working_type: "mark_price" });
    expect(calls[1].body).toEqual({
      client_order_id: "c2",
      symbol: "ADA-USD",
      side: "buy",
      type: "stop_limit",
      size: "50",
      price: "0.55100",
      time_in_force: "GTC",
      stop_price: "0.55000",
      working_type: "mark_price",
      reduce_only: true,
    });
    expect(calls.every((c) => c.headers["X-Builder-Fee-Bps"] === "7")).toBe(true);
    await expect(t.placeOrder(ADA, { symbol: "ADA-USD", side: "buy", type: "stop_limit", size: 50, stopPrice: 0.55 }, 7)).rejects.toThrow(/price/);
    await expect(t.placeOrder(ADA, { symbol: "ADA-USD", side: "buy", type: "stop", size: 50, stopPrice: 0.55, takeProfit: 0.6 }, 7)).rejects.toThrow(/TP\/SL/);
  });

  describe("through the client", () => {
    const realFetch = globalThis.fetch;
    afterEach(() => (globalThis.fetch = realFetch));

    async function client(mark: number, status: string) {
      const order: string[] = [];
      let sent = "";
      const { f, calls } = fakeFetch({
        "/v2/markets": () => ({ markets: { "ADA-USD": { symbol: "ADA-USD", name: "Cardano", base_asset: "ADA", status: "trading", margin_tiers: ADA.marginTiers, order_tick_price: "0.00001", order_limit_step_size: "1", order_market_step_size: "1", order_limit_min_size: "1", order_min_notional: "10", order_limit_price_bound: "0.05", mark_price: "0.5", index_price: "0.5", last_price: "0.5", funding_rate: "0", next_funding_time: 0, default_leverage: 3 } } }),
        "/price/v2/premiumIndex": () => ({ symbol: "ADA-USD", markPrice: String(mark) }),
        "/v2/account": () => ({ symbol_settings: { "ADA-USD": { leverage: 3, margin_mode: "cross" } } }),
        "POST /v2/order": (b) => (order.push(`order:${b.client_order_id}`), (sent = b.client_order_id), {}),
        "/v2/history/order": () => ({ orders: [{ id: 9, client_order_id: sent, symbol: "ADA-USD", side: "sell", status, type: "stop", size: "100", filled: "0", price: "0", stop_price: "0.45", reduce_only: false, close_reason: null, create_timestamp: 1 }] }),
        "POST /v1/events": (b) => (order.push(`beacon:${b.status}:${b.clientOrderId}`), {}),
      });
      globalThis.fetch = f;
      const c = new StrikeEverywhere({ network: "mainnet", builderCode: "code", feeBps: 5, partnerApi: "https://partner.example" });
      c.http.key = await ApiWalletKey.generate();
      c.session = { accountId: "019d06a7-bcfb-79a9-857e-cd54172ba144", feeShareBps: 5 } as any;
      await c.loadMarkets();
      return { c, calls, order };
    }

    it("registers the intent beacon before sending, and treats an untriggered stop as placed", async () => {
      const { c, order, calls } = await client(0.5, "untriggered");
      const o = await c.placeOrder({ symbol: "ADA-USD", side: "sell", type: "stop", size: 100, stopPrice: 0.45, leverage: 3 });
      expect(o.status).toBe("untriggered");
      const id = order.find((x) => x.startsWith("order:"))!.slice(6);
      expect(order.indexOf(`beacon:intent:${id}`)).toBeLessThan(order.indexOf(`order:${id}`));
      expect(order).toContain(`beacon:untriggered:${id}`);
      expect(calls.find((x) => x.path === "/v2/order")!.headers["X-Builder-Fee-Bps"]).toBe("5");
    });

    it("refuses a trigger on the wrong side of a fresh mark without sending anything", async () => {
      const { c, calls } = await client(0.44, "untriggered");
      await expect(c.placeOrder({ symbol: "ADA-USD", side: "sell", type: "stop", size: 100, stopPrice: 0.45 })).rejects.toThrow(/below the mark.*not sent/);
      expect(calls.some((x) => x.path === "/v2/order" || x.path === "/v1/events")).toBe(false);
    });
  });
});


describe("TWAP", () => {
  it("sends an uppercase side, rounded size, and the builder fee header", async () => {
    const { f, calls } = fakeFetch({ "POST /v2/algo/twap": () => ({ strategy_id: "0190a0b0-0000-7000-8000-000000000001", status: "active" }) });
    const t = new Trading(await signedHttp(f), {} as AccountApi);
    const r = await t.createTwap(ADA, { symbol: "ADA-USD", side: "sell", size: 1234.9, durationSec: 3600, limitPrice: 0.4123456, reduceOnly: true, randomize: true }, 6);
    expect(r).toEqual({ strategyId: "0190a0b0-0000-7000-8000-000000000001", status: "active" });
    expect(calls[0].body).toEqual({ symbol: "ADA-USD", side: "SELL", total_size: "1234", duration_sec: 3600, limit_price: "0.41235", reduce_only: true, randomize: true });
    expect(calls[0].headers["X-Builder-Fee-Bps"]).toBe("6");
  });

  it("enforces Strike's 300–86400 s duration bounds before sending", async () => {
    const { f, calls } = fakeFetch({ "POST /v2/algo/twap": () => ({ strategy_id: "x" }) });
    const t = new Trading(await signedHttp(f), {} as AccountApi);
    await expect(t.createTwap(ADA, { symbol: "ADA-USD", side: "buy", size: 100, durationSec: 299 }, 5)).rejects.toThrow(/duration/);
    await expect(t.createTwap(ADA, { symbol: "ADA-USD", side: "buy", size: 100, durationSec: 86_401 }, 5)).rejects.toThrow(/duration/);
    await t.createTwap(ADA, { symbol: "ADA-USD", side: "buy", size: 100, durationSec: 300 }, 5);
    await t.createTwap(ADA, { symbol: "ADA-USD", side: "buy", size: 100, durationSec: 86_400 }, 5);
    expect(calls.map((c) => c.body.side)).toEqual(["BUY", "BUY"]);
  });

  it("lists strategies from an envelope or a bare array, and cancels by id", async () => {
    const row = { strategy_id: "s-1", market: "ADA-USD", status: "active", side: "SELL", total_size: "100", filled_size: "40", duration_sec: 600, slices_fired: 4, nominal_slices: 10, created_at_ms: 5 };
    for (const payload of [{ strategies: [row] }, [row]]) {
      const { f, calls } = fakeFetch({ "GET /v2/algo/twap": () => payload, "DELETE /v2/algo/twap/s-1": () => ({ status: "cancelling" }) });
      const t = new Trading(await signedHttp(f), {} as AccountApi);
      expect(await t.twaps()).toEqual([{ id: "s-1", symbol: "ADA-USD", side: "sell", status: "active", totalSize: 100, filledSize: 40, durationSec: 600, slicesFired: 4, nominalSlices: 10, createdAt: 5, lastError: "" }]);
      expect(calls[0].url.search).toBe("?status=active");
      await t.cancelTwap("s-1");
      expect(calls[1].method).toBe("DELETE");
      await expect(t.cancelTwap("../order")).rejects.toThrow(/Invalid/);
    }
  });
});


describe("margin mode (applied asynchronously by Strike)", () => {
  const realFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = realFetch;
    vi.useRealTimers();
  });

  async function clientWith(o: { mode: string; applyAfterPolls: number; positions?: any[] }) {
    let target: string | undefined;
    let polls = 0;
    const { f, calls } = fakeFetch({
      "POST /v2/marginMode": (b) => ((target = b.marginMode), (polls = 0), { marginMode: b.marginMode, symbol: b.symbol }),
      "/v2/account": () => {
        if (target !== undefined && ++polls > o.applyAfterPolls) o.mode = target;
        return { symbol_settings: { "ADA-USD": { margin_mode: o.mode, leverage: 3 } } };
      },
      "/v2/positions": () => ({ positions: o.positions ?? [] }),
    });
    globalThis.fetch = f;
    const c = new StrikeEverywhere({ network: "mainnet", builderCode: "x" });
    c.http.key = await ApiWalletKey.generate();
    return { c, calls };
  }

  it("posts camelCase marginMode and waits until the account reports it", async () => {
    const { c, calls } = await clientWith({ mode: "cross", applyAfterPolls: 2 });
    await c.setMarginMode("ADA-USD", "isolated");
    const post = calls.filter((x) => x.path === "/v2/marginMode");
    expect(post).toHaveLength(1);
    expect(post[0].body).toEqual({ symbol: "ADA-USD", marginMode: "isolated" });
    expect(calls.filter((x) => x.path === "/v2/account").length).toBeGreaterThanOrEqual(3);
  });

  it("skips the change when already set, and refuses with an open position", async () => {
    const a = await clientWith({ mode: "isolated", applyAfterPolls: 0 });
    await a.c.setMarginMode("ADA-USD", "isolated");
    expect(a.calls.some((x) => x.path === "/v2/marginMode")).toBe(false);
    const b = await clientWith({ mode: "cross", applyAfterPolls: 0, positions: [{ symbol: "ADA-USD", size: "-50" }] });
    await expect(b.c.setMarginMode("ADA-USD", "isolated")).rejects.toThrow(/Close your ADA-USD position/);
    expect(b.calls.some((x) => x.path === "/v2/marginMode")).toBe(false);
  });

  it("fails clearly if Strike never confirms", async () => {
    const { c } = await clientWith({ mode: "cross", applyAfterPolls: 1e9 });
    await expect(c.setMarginMode("ADA-USD", "isolated")).rejects.toThrow(/hasn't confirmed/);
  }, 10_000);
});


describe("history parsing", () => {
  const fill = { id: 77, trade_id: 1, order_id: 5, symbol: "ADA-USD", side: "buy", role: "taker", price: "0.21", size: "100", realized_pnl: "1.5", fee: "0.01", fee_type: "commission", timestamp: 1000, auto_close_type: null };
  const funding = { id: 9, symbol: "ADA-USD", position_size: "100", position_side: "Long", funding_rate: "0.0001", amount: "-0.002", timestamp: 2000 };
  const order = { id: 11079513678, client_order_id: "c", symbol: "ADA-USD", side: "sell", status: "filled", type: "market", size: "10", filled: "10", price: "0", stop_price: "0", reduce_only: false, close_reason: null, create_timestamp: 3 };

  it("accepts envelopes and bare arrays, and pages with the last id", async () => {
    for (const wrap of [(k: string, v: any[]) => ({ [k]: v, count: v.length }), (_k: string, v: any[]) => v]) {
      const { f, calls } = fakeFetch({
        "/v2/history/fill": () => wrap("fills", [fill, { ...fill, id: 76, price: "oops" }, null]),
        "/v2/history/funding": () => wrap("funding", [funding]),
        "/v2/history/order": () => wrap("orders", [order, 42]),
      });
      const a = new AccountApi(await signedHttp(f));
      const fills = await a.fillsPage({ limit: 2, fromId: 100 });
      expect(fills.items.map((x) => x.id)).toEqual([77, 76]);
      expect(fills.items[1].price).toBeNull();
      expect(fills.next).toBe(76);
      expect(calls[0].url.searchParams.get("fromId")).toBe("100");
      const fu = await a.fundingPage({ limit: 20 });
      expect(fu.items[0]).toMatchObject({ amount: -0.002, positionSide: "Long", rate: 0.0001 });
      expect(fu.next).toBeNull();
      const oh = await a.orderHistoryPage({ limit: 1, fromOrderId: 11079513679 });
      expect(oh.items).toHaveLength(1);
      expect(oh.next).toBe(11079513678);
      expect(calls[2].url.searchParams.get("fromOrderID")).toBe("11079513679");
    }
  });

  it("sums realized PnL from fills inside each closed position's window", () => {
    const rows: ClosedPositionRow[] = [
      { id: 1, symbol: "ADA-USD", marginMode: "cross", openTime: 10_000, closeTime: 20_000, realizedPnl: null },
      { id: 2, symbol: "BTC-USD", marginMode: "cross", openTime: 1_000, closeTime: 30_000, realizedPnl: null },
    ];
    const f = (symbol: string, time: number, pnl: number): FillRow => ({ id: time, orderId: 0, symbol, side: "sell", role: "taker", price: 1, size: 1, fee: 0, realizedPnl: pnl, autoClose: "", time });
    const fills = [f("ETH-USD", 5_000, 0), f("ADA-USD", 15_000, 2), f("ADA-USD", 20_500, 1), f("ADA-USD", 40_000, 9), f("BTC-USD", 25_000, -3)];
    const out = attachRealizedPnl(rows, fills, true);
    expect(out[0].realizedPnl).toBe(3);
    expect(out[1].realizedPnl).toBe(-3);
    const partial = attachRealizedPnl(rows, fills, false);
    expect(partial[0].realizedPnl).toBe(3);
    expect(partial[1].realizedPnl).toBeNull();
  });

  it("parses the closed-positions endpoint's PascalCase rows and pages by close time", async () => {
    const { f, calls } = fakeFetch({
      "/v2/closedPositions": () => ({ count: 1, positions: [{ ID: 176691, AccountID: "a", Symbol: "ADA-USD", MarginMode: "cross", OpenTimestamp: 10_000, CloseTimestamp: 20_000 }] }),
      "/v2/history/fill": () => ({ fills: [{ ...fill, timestamp: 19_000, realized_pnl: "-4.25" }] }),
    });
    const a = new AccountApi(await signedHttp(f));
    const page = await a.closedPositionsPage({ limit: 1 });
    expect(page.items[0]).toMatchObject({ id: 176691, symbol: "ADA-USD", realizedPnl: -4.25 });
    expect(page.next).toBe(19_999);
    expect(calls[1].url.searchParams.get("startTime")).toBe("8000");
  });

  it("reads portfolio metrics defensively", () => {
    const p = parsePortfolio({ account: { realized_pnl: "82.5", all_time_volume: "590" }, volume: "600", fees: "-3", fee_tier: 1, fee_tiers: [{ Tier: 0, TakerRate: 0.0005, MakerRate: 0.0002 }, { Tier: 1, TakerRate: 0.00045, MakerRate: 0.00015 }], fee_discount_rate: 10, maker_fee_rate_override: null });
    expect(p).toEqual({ realizedPnl: 82.5, volume: 600, fees: -3, feeTier: 1, takerRate: 0.00045, makerRate: 0.00015, referralDiscountPct: 10, stakingDiscount: null });
    expect(parsePortfolio(null).volume).toBeNull();
  });
});


describe("cancel all", () => {
  it("sends DELETE /v2/order/cancel-all with an optional symbol and reads the count", async () => {
    let count = 3;
    const { f, calls } = fakeFetch({ "DELETE /v2/order/cancel-all": () => ({ canceled_count: count }) });
    const t = new Trading(await signedHttp(f), {} as AccountApi);
    expect(await t.cancelAll("ADA-USD")).toBe(3);
    count = -1;
    expect(await t.cancelAll()).toBeNull();
    expect(calls.map((c) => [c.method, c.path, c.body])).toEqual([
      ["DELETE", "/v2/order/cancel-all", { symbol: "ADA-USD" }],
      ["DELETE", "/v2/order/cancel-all", {}],
    ]);
    expect(calls[0].headers["X-API-Wallet-Signature"]).toBeTruthy();
  });
});


describe("public stats (Strike's /stat endpoints)", () => {
  it("reads hourly funding history, oldest first, dropping bad rows", async () => {
    const { f, calls } = fakeFetch({
      "/stat/v1/stats/coin/history/funding": () => ({ columns: ["ts", "funding_rate"], data: [[2000, -0.00001], [1000, 0.0002], ["x", 1], [3000, null]], days: 30 }),
    });
    const md = new MarketData(new StrikeHttp(NETWORKS.mainnet, f));
    expect(await md.fundingHistory("ADA-USD", 30)).toEqual([
      { time: 1000, rate: 0.0002 },
      { time: 2000, rate: -0.00001 },
    ]);
    expect(calls[0].url.searchParams.get("symbol")).toBe("ADA-USD");
    expect(calls[0].headers["X-API-Wallet-Signature"]).toBeUndefined();
  });

  it("reads the liquidation map by column name and sorts by price", async () => {
    const { f, calls } = fakeFetch({
      "/stat/v1/stats/coin/liquidation-map": () => ({
        bins: 3,
        columns: ["price", "short_base", "long_base", "cum_long_base", "cum_short_base"],
        data: [
          [0.3, 50, 0, 0, 50],
          [0.1, 0, 7250, 7250, 0],
          [-1, 1, 1, 1, 1],
        ],
      }),
    });
    const md = new MarketData(new StrikeHttp(NETWORKS.mainnet, f));
    expect(await md.liquidationMap("ADA-USD")).toEqual([
      { price: 0.1, long: 7250, short: 0 },
      { price: 0.3, long: 0, short: 50 },
    ]);
    expect(calls[0].url.searchParams.get("range_pct")).toBe("0.85");
  });
});
