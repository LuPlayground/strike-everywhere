import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  OrderRejectedError,
  StrikeEverywhere,
  type Account,
  type MarketSpec,
  type OrderHistoryEntry,
  type Position,
  type RawMarket,
} from "@strike-everywhere/core";
import type { WidgetConfig } from "../App";
import { pageHidden } from "../parts";
import { displayName } from "./markets";
import { ORDER_TYPES, toOrderInput, type Draft, type Sized } from "./order";

export interface AppConfig extends WidgetConfig {
  layout: "auto" | "mobile" | "desktop" | "panel";
  closable: boolean;
}

export interface Mkt {
  spec: MarketSpec;
  symbol: string;
  base: string;
  name: string;
  mark: number;
  index: number;
  last: number;
  funding: number;
  nextFunding: number;
  ref24: number;
  change: number;
  changeAbs: number;
  vol24: number;
  high24: number;
  low24: number;
  createdAt: number;
  maxLev: number;
  strikeMaxLev: number;
}

interface Live {
  mark: number;
  index: number;
  last: number;
  funding: number;
  nextFunding: number;
  open: number;
  vol: number;
  high: number;
  low: number;
}

export type ToastKind = "progress" | "ok" | "err";
export interface Toast {
  id: number;
  kind: ToastKind;
  title: string;
  text?: string;
}

export type FundsSheet = null | "connect" | "deposit" | "withdraw";

const WALLET_KEY = "strike-everywhere:wallet";
const fin = (v: unknown, fb = 0) => (v !== null && v !== "" && v !== undefined && Number.isFinite(Number(v)) ? Number(v) : fb);

function sget(k: string): string | null {
  try {
    return sessionStorage.getItem(k);
  } catch {
    return null;
  }
}
function sset(k: string, v: string) {
  try {
    sessionStorage.setItem(k, v);
  } catch {
  }
}

export type PerpsState = ReturnType<typeof usePerps>;

export function usePerps(config: AppConfig) {
  const client = useMemo(() => new StrikeEverywhere(config), []);
  const [specs, setSpecs] = useState<MarketSpec[]>([]);
  const [live, setLive] = useState<Record<string, Live>>({});
  const [ref24, setRef24] = useState<Record<string, number>>({});
  const [takerRate, setTakerRate] = useState(0.0005);
  const [loadError, setLoadError] = useState("");
  const [session, setSession] = useState(client.session);
  const [account, setAccount] = useState<Account | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([]);
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [sheet, setSheet] = useState<FundsSheet>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const toastSeq = useRef(0);
  const mounted = useRef(true);
  const testnet = client.net.network === "testnet";

  const notify = (kind: ToastKind, title: string, text?: string, ms?: number) => {
    const id = ++toastSeq.current;
    setToast({ id, kind, title, text });
    clearTimeout(toastTimer.current);
    if (kind !== "progress") toastTimer.current = setTimeout(() => setToast((t) => (t?.id === id ? null : t)), ms ?? (kind === "ok" ? 4500 : 9000));
  };
  const dismissToast = () => (clearTimeout(toastTimer.current), setToast(null));

  useEffect(() => {
    let alive = true;
    const off = client.on((e) => {
      if (e.type === "session") setSession(e.session);
      if (e.type === "session" && e.reason === "idle") notify("err", `Signed out after ${Math.round(client.idleTimeoutMs / 60_000)} minutes without activity`, "Your trading key was forgotten for safety. Connect again to keep trading.");
      if (e.type === "session" && e.reason === "expired") notify("err", "Session expired", "Connect again to keep trading.");
      if (e.type === "user") scheduleRefresh();
    });
    (async () => {
      for (let attempt = 0; alive; attempt++) {
        try {
          if (attempt === 0) await client.init();
          const [list, tickers, rate] = await Promise.all([client.loadMarkets(), client.market.tickers().catch(() => [] as any[]), client.market.baseTakerRate()]);
          if (!alive) return;
          const next: Record<string, Live> = {};
          for (const s of list) {
            const raw: any = client.raw(s.symbol) ?? {};
            const t: any = Array.isArray(tickers) ? tickers.find((x: any) => x?.symbol === s.symbol) : undefined;
            const mark = fin(raw.mark_price);
            next[s.symbol] = {
              mark,
              index: fin(raw.index_price, mark),
              last: fin(t?.lastPrice, fin(raw.last_price, mark)),
              funding: fin(raw.funding_rate),
              nextFunding: fin(raw.next_funding_time),
              open: fin(t?.openPrice, 0),
              vol: fin(t?.quoteVolume),
              high: fin(t?.highPrice),
              low: fin(t?.lowPrice),
            };
          }
          setSpecs(list);
          setLive(next);
          setTakerRate(rate);
          setLoadError("");
          return;
        } catch (e: any) {
          if (!alive) return;
          setLoadError(e?.message || "Could not reach Strike.");
          await new Promise((r) => setTimeout(r, Math.min(30_000, 2000 * 2 ** attempt)));
        }
      }
    })();

    const ps = client.prices();
    ps.subscribe("!markprice@arr");
    ps.subscribe("!miniticker@arr");
    const offWs = ps.onMessage((msg) => {
      const items: any[] = Array.isArray(msg) ? msg : Array.isArray(msg?.data) ? msg.data : msg?.data ? [msg.data] : [msg];
      setLive((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const it of items) {
          const cur = it?.s && next[it.s];
          if (!cur) continue;
          if (it.e === "markPriceUpdate") {
            next[it.s] = { ...cur, mark: fin(it.p, cur.mark), index: fin(it.i, cur.index), funding: fin(it.r, cur.funding), nextFunding: fin(it.T, cur.nextFunding) };
            changed = true;
          } else if (it.e === "24hrMiniTicker") {
            next[it.s] = { ...cur, open: fin(it.o, cur.open), last: fin(it.c, cur.last), vol: fin(it.q, cur.vol), high: fin(it.h, cur.high), low: fin(it.l, cur.low) };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    });
    const poll = setInterval(async () => {
      if (pageHidden()) return;
      try {
        const raws: RawMarket[] = await client.market.markets();
        setLive((prev) => {
          const next = { ...prev };
          for (const r of raws) {
            const cur = next[r.symbol];
            if (cur) next[r.symbol] = { ...cur, mark: fin(r.mark_price, cur.mark), index: fin(r.index_price, cur.index), funding: fin(r.funding_rate, cur.funding), nextFunding: fin(r.next_funding_time, cur.nextFunding) };
          }
          return next;
        });
      } catch {
      }
    }, 15000);
    return () => {
      alive = false;
      mounted.current = false;
      off();
      offWs();
      clearInterval(poll);
      clearTimeout(refreshTimer.current);
      clearTimeout(toastTimer.current);
      client.dispose();
    };
  }, [client]);

  useEffect(() => {
    if (!testnet || !specs.length) return;
    let alive = true;
    const load = () =>
      Promise.all(
        specs.map((s) =>
          client.market
            .klines(s.symbol, "1h", 25, "mark")
            .then((k) => [s.symbol, k.length ? k[0].open : 0] as const)
            .catch(() => [s.symbol, 0] as const),
        ),
      ).then((rows) => alive && setRef24(Object.fromEntries(rows.filter(([, v]) => v > 0))));
    load();
    const t = setInterval(() => !pageHidden() && load(), 10 * 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [specs]);

  const markets: Mkt[] = useMemo(
    () =>
      specs.map((spec) => {
        const l = live[spec.symbol];
        const raw: any = client.raw(spec.symbol) ?? {};
        const mark = l?.mark ?? 0;
        const ref = testnet ? ref24[spec.symbol] ?? 0 : l?.open ?? 0;
        return {
          spec,
          symbol: spec.symbol,
          base: spec.baseAsset,
          name: displayName(spec.name, spec.baseAsset),
          mark,
          index: l?.index ?? 0,
          last: l?.last ?? 0,
          funding: l?.funding ?? 0,
          nextFunding: l?.nextFunding ?? 0,
          ref24: ref,
          change: ref > 0 && mark > 0 ? ((mark - ref) / ref) * 100 : 0,
          changeAbs: ref > 0 && mark > 0 ? mark - ref : 0,
          vol24: l?.vol ?? 0,
          high24: l?.high ?? 0,
          low24: l?.low ?? 0,
          createdAt: fin(raw.created_at),
          maxLev: Math.max(1, Math.min(config.maxLeverage, spec.maxLeverage)),
          strikeMaxLev: spec.maxLeverage,
        };
      }),
    [specs, live, ref24, config.maxLeverage],
  );
  const bySymbol = useMemo(() => Object.fromEntries(markets.map((m) => [m.symbol, m])), [markets]);

  const refreshTimer = useRef<ReturnType<typeof setTimeout>>();
  const refresh = async () => {
    const started = client.session;
    if (!mounted.current || !started) return;
    try {
      const [a, p, o] = await Promise.all([client.account.account(), client.account.positions(), client.account.openOrders()]);
      if (!mounted.current || client.session !== started) return;
      setAccount(a);
      setPositions(p);
      setOrders(o);
      setAccountLoaded(true);
    } catch (e: any) {
      if (e?.status === 401 && client.session) {
        client.disconnect();
        notify("err", "Session expired", "Connect again to keep trading.");
      } else if (e?.status === 404) {
        setAccount(null);
        setAccountLoaded(true);
      }
    }
  };
  const scheduleRefresh = () => {
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(refresh, 400);
  };
  useEffect(() => {
    if (!session) {
      setAccount(null);
      setPositions([]);
      setOrders([]);
      setAccountLoaded(false);
      return;
    }
    refresh();
    client.userEvents();
    const t = setInterval(() => !pageHidden() && refresh(), 5000);
    return () => clearInterval(t);
  }, [session]);

  const available = fin(account?.available_balance);
  const equity = fin(account?.margin_balance, fin(account?.wallet_balance));
  const upnl = fin(account?.unrealized_pnl);
  const isNewAccount = !account || (fin(account.wallet_balance) <= 0 && positions.length === 0);

  const openFunds = async (which: "deposit" | "withdraw") => {
    if (!client.session) return setSheet("connect");
    if (!client.wallet) {
      const id = sget(WALLET_KEY);
      if (id) {
        try {
          await client.ensureWallet(id);
        } catch (e: any) {
          notify("err", "Wallet", e?.message || String(e));
          return;
        }
      }
    }
    if (!client.wallet) return setSheet("connect");
    setSheet(which);
  };
  const onConnected = () => {
    if (client.wallet) sset(WALLET_KEY, client.wallet.id);
    setSheet(null);
    notify("ok", "Wallet connected", "Your trades run on Strike.");
  };

  const placeDraft = async (d: Draft, s: Sized, base: string, estPrice?: number): Promise<"filled" | "resting" | "failed"> => {
    const dir = d.side === "buy" ? "long" : "short";
    const label = ORDER_TYPES.find((t) => t.type === d.type)?.label ?? "Order";
    notify("progress", d.type === "market" ? `Opening ${qty(s.size)} ${base} ${dir} ${s.lev}x` : `Placing ${label.toLowerCase()} · ${qty(s.size)} ${base} ${dir}`);
    try {
      if (d.type === "twap") {
        const minutes = d.twapMinutes ?? 60;
        await client.placeTwap({ symbol: d.symbol, side: d.side, size: s.size, durationSec: minutes * 60, limitPrice: Number(d.twapLimit) > 0 ? d.twapLimit : undefined, reduceOnly: d.reduceOnly, randomize: d.randomize, leverage: d.reduceOnly ? undefined : s.lev });
        refresh();
        notify("ok", "TWAP started", `${d.side === "buy" ? "Long" : "Short"} ${qty(s.size)} ${base} over ${minutes < 60 ? `${minutes} min` : `${Math.round((minutes / 60) * 10) / 10} h`}`);
        return "resting";
      }
      const o = await client.placeOrder(toOrderInput(d, s));
      refresh();
      if (d.type !== "market" && d.type !== "limit" && (o.status === "untriggered" || o.status === "open" || o.status === "pending")) {
        notify("ok", `${label} placed`, d.type === "trailing_stop_market" ? `Trails ${d.callbackRate}% behind the price` : `Triggers at $${Number(d.triggerPrice).toLocaleString("en-US", { maximumFractionDigits: 8 })}`);
        return "resting";
      }
      if (o.status === "filled") {
        const px = d.type === "market" && estPrice && estPrice > 0 ? estPrice : s.px;
        notify("ok", `Opened ${qty(s.size)} ${base} ${dir}`, `${s.lev}x · about ${usd(s.size * px)} at ~$${px.toLocaleString("en-US", { maximumFractionDigits: px >= 1 ? 2 : 5 })}`);
        return "filled";
      }
      if (o.status === "open" || o.status === "untriggered" || o.status === "pending") {
        notify("ok", "Limit order placed", `${d.side === "buy" ? "Long" : "Short"} ${qty(s.size)} ${base} at $${d.limitPrice.toLocaleString("en-US", { maximumFractionDigits: 8 })}`);
        return "resting";
      }
      if (/cancel|expire/i.test(o.status)) {
        notify("err", "Position opening failed", `There were no ${d.side === "buy" ? "sellers" : "buyers"} close enough to the market price, so Strike cancelled the order. Nothing was traded.`);
        return "failed";
      }
      notify("err", "Position opening failed", `Strike: order ${o.status}`);
      return "failed";
    } catch (e: any) {
      notify("err", "Position opening failed", e instanceof OrderRejectedError ? e.message : e?.message || String(e));
      return "failed";
    }
  };

  const closePosition = async (p: Position, fraction = 1): Promise<boolean> => {
    const base = p.symbol.split("-")[0];
    const size = Math.abs(Number(p.size));
    const dir = Number(p.size) > 0 ? "long" : "short";
    notify("progress", fraction >= 1 ? `Closing ${qty(size)} ${base} ${dir}` : `Closing ${Math.round(fraction * 100)}% of your ${base} ${dir}`);
    try {
      const o = await client.closePosition(p, fraction);
      refresh();
      if (o.status === "filled") {
        notify("ok", fraction >= 1 ? `Closed your ${base} ${dir}` : `Closed ${Math.round(fraction * 100)}% of your ${base} ${dir}`, fraction >= 1 ? `PnL ≈ ${usd(Number(p.upnl), true)}` : undefined);
        return true;
      }
      if (/cancel|expire/i.test(o.status)) {
        notify("err", "Close failed", `There were no ${Number(p.size) > 0 ? "buyers" : "sellers"} close enough to the market price, so Strike cancelled the close. Your position is still open.`);
        return false;
      }
      notify("ok", `Close order ${o.status}`);
      return true;
    } catch (e: any) {
      notify("err", "Close failed", e?.message || String(e));
      return false;
    }
  };

  const limitClose = async (p: Position, price: number, fraction = 1): Promise<boolean> => {
    const base = p.symbol.split("-")[0];
    notify("progress", `Placing a limit close for your ${base} position`);
    try {
      const o = await client.limitClose(p, price, fraction);
      refresh();
      if (o.status === "filled") notify("ok", `Closed ${fraction >= 1 ? "your" : `${Math.round(fraction * 100)}% of your`} ${base} position`);
      else notify("ok", "Limit close placed", `It closes when the price reaches $${price.toLocaleString("en-US", { maximumFractionDigits: 8 })}. You'll find it under Open Orders.`);
      return true;
    } catch (e: any) {
      notify("err", "Limit close failed", e instanceof OrderRejectedError ? e.message : e?.message || String(e));
      return false;
    }
  };

  const act = async (progress: string, run: () => Promise<unknown>, ok: string | ((r: any) => string), errTitle: string): Promise<boolean> => {
    notify("progress", progress);
    try {
      const r = await run();
      refresh();
      notify("ok", typeof ok === "function" ? ok(r) : ok);
      return true;
    } catch (e: any) {
      notify("err", errTitle, e instanceof OrderRejectedError ? e.message : e?.message || String(e));
      return false;
    }
  };
  const setExits = (p: Position, exits: { takeProfit?: number; stopLoss?: number; fraction?: number; workingType?: "mark_price" | "contract_price" }) =>
    act("Placing take profit / stop loss", () => client.setPositionExits(p, exits), "Take profit / stop loss set", "Couldn't set TP/SL");
  const trail = (p: Position, pct: number, activation?: number, workingType?: "mark_price" | "contract_price") =>
    act("Placing trailing stop", () => client.trailPosition(p, pct, activation, workingType), `Trailing stop set (${pct}%)`, "Couldn't set the trailing stop");
  const reverse = (p: Position) =>
    act(
      `Reversing your ${p.symbol.split("-")[0]} position`,
      () => client.reversePosition(p),
      (o: OrderHistoryEntry) => (o.status === "filled" ? `Reversed to ${Number(p.size) > 0 ? "Short" : "Long"}` : `Reverse order ${o.status}`),
      "Couldn't reverse",
    );
  const closeAll = () =>
    act(
      "Closing all positions",
      () => client.closeAllPositions(),
      (r: Array<{ ok: boolean }>) => (r.every((x) => x.ok) ? `Closed ${r.length} position${r.length === 1 ? "" : "s"}` : `Closed ${r.filter((x) => x.ok).length} of ${r.length}; the rest were cancelled by Strike (no liquidity near the price)`),
      "Close all failed",
    );
  const modifyMargin = (symbol: string, amount: number, dir: "add" | "remove") =>
    act(dir === "add" ? "Adding margin" : "Removing margin", () => client.modifyMargin(symbol, amount, dir), dir === "add" ? "Margin added" : "Margin removed", "Couldn't change the margin");
  const editOrder = (o: OrderHistoryEntry, changes: { price?: number; stopPrice?: number; size?: number }) =>
    act("Updating the order", () => client.editOrder(o, changes), "Order updated", "Couldn't update the order");
  const cancelAll = (symbol?: string) =>
    act("Cancelling orders", () => client.cancelAll(symbol), (n: number | null) => (n === null ? "Cancelling orders…" : `Cancelled ${n} order${n === 1 ? "" : "s"}`), "Couldn't cancel");

  const cancelOrder = async (o: OrderHistoryEntry) => {
    try {
      await client.trading.cancelOrder(o.symbol, o.id);
      notify("ok", "Order cancelled");
      setTimeout(refresh, 600);
    } catch (e: any) {
      notify("err", "Couldn't cancel", e?.message || String(e));
    }
  };

  const disconnect = () => {
    client.disconnect();
    notify("ok", "Disconnected");
  };

  return {
    config,
    client,
    testnet,
    markets,
    bySymbol,
    loadError,
    takerRate,
    session,
    account,
    accountLoaded,
    positions,
    orders,
    available,
    equity,
    upnl,
    isNewAccount,
    sheet,
    setSheet,
    toast,
    notify,
    dismissToast,
    refresh,
    openFunds,
    onConnected,
    placeDraft,
    closePosition,
    limitClose,
    setExits,
    trail,
    reverse,
    closeAll,
    modifyMargin,
    editOrder,
    cancelAll,
    cancelOrder,
    disconnect,
  };
}

function qty(v: number): string {
  const a = Math.abs(v);
  return v.toLocaleString("en-US", a >= 1000 ? { maximumFractionDigits: 0 } : a >= 1 ? { maximumFractionDigits: 4 } : { maximumSignificantDigits: 4 });
}
function usd(v: number, sign = false): string {
  if (!Number.isFinite(v)) return "—";
  const s = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${v < 0 ? "-" : sign && v > 0 ? "+" : ""}$${s}`;
}
