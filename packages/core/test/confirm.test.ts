import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OrderRejectedError, OrderUnconfirmedError, Trading } from "../src/trading.js";
import type { AccountApi } from "../src/account.js";
import type { StrikeHttp } from "../src/http.js";
import type { Fill, OrderHistoryEntry } from "../src/types.js";

const order = (coid: string, status: string): OrderHistoryEntry =>
  ({ id: 7, client_order_id: coid, account_id: "a", symbol: "ETH-USD", side: "buy", status, type: "market", size: "0.006", filled: "0", price: "0", stop_price: "0", reduce_only: false, close_reason: null, create_timestamp: 1 }) as OrderHistoryEntry;
const fill = (coid: string, size: string): Fill =>
  ({ id: 1, trade_id: 1, order_id: 7, account_id: "a", symbol: "ETH-USD", side: "buy", role: "taker", price: "2389.6", size, realized_pnl: "0", fee: "0.007", timestamp: 2, client_order_id: coid }) as Fill;

function account(history: (n: number, symbol?: string) => OrderHistoryEntry[], fills: (n: number) => Fill[] = () => []) {
  let h = 0;
  let f = 0;
  const symbols: Array<string | undefined> = [];
  const acc = {
    orderHistory: async (p: { symbol?: string }) => (symbols.push(p.symbol), history(h++, p.symbol)),
    fills: async () => fills(f++),
  } as unknown as AccountApi;
  return { acc, symbols };
}

describe("order confirmation (Strike accepts orders asynchronously)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("confirms from fills when the order history still says pending", async () => {
    const { acc } = account(() => [order("c1", "pending")], (n) => (n >= 1 ? [fill("c1", "0.006")] : []));
    const p = new Trading({} as StrikeHttp, acc).waitForOrder("ETH-USD", "c1");
    await vi.advanceTimersByTimeAsync(2000);
    const o = await p;
    expect(o.status).toBe("filled");
    expect(o.filled).toBe("0.006");
    expect(o.id).toBe(7);
  });

  it("keeps going when history requests fail, and confirms once they answer", async () => {
    const { acc } = account((n) => {
      if (n < 3) throw new Error("HTTP 502");
      return [order("c2", "filled")];
    });
    const p = new Trading({} as StrikeHttp, acc).waitForOrder("ETH-USD", "c2");
    await vi.advanceTimersByTimeAsync(8000);
    expect((await p).status).toBe("filled");
  });

  it("drops the symbol filter every third poll", async () => {
    const { acc, symbols } = account((n) => (n === 2 ? [order("c3", "filled")] : []));
    const p = new Trading({} as StrikeHttp, acc).waitForOrder("ETH-USD", "c3");
    await vi.advanceTimersByTimeAsync(5000);
    expect((await p).status).toBe("filled");
    expect(symbols).toEqual(["ETH-USD", "ETH-USD", undefined]);
  });

  it("still reports a rejection as a rejection", async () => {
    const { acc } = account(() => [{ ...order("c4", "rejected"), error_message: "insufficient_margin" }]);
    const p = new Trading({} as StrikeHttp, acc).waitForOrder("ETH-USD", "c4");
    const check = expect(p).rejects.toBeInstanceOf(OrderRejectedError);
    await vi.advanceTimersByTimeAsync(1000);
    await check;
  });

  it("says 'unconfirmed' (not failed) when Strike never reports in time, with the last error kept", async () => {
    const { acc } = account(() => {
      throw new Error("HTTP 429");
    });
    const p = new Trading({} as StrikeHttp, acc).waitForOrder("ETH-USD", "c5", 5000);
    const check = p.catch((e) => e);
    await vi.advanceTimersByTimeAsync(7000);
    const e = await check;
    expect(e).toBeInstanceOf(OrderUnconfirmedError);
    expect(e.message).toMatch(/Sent to Strike/);
    expect(e.message).not.toMatch(/fail/i);
    expect(String(e.lastError)).toMatch(/429/);
  });

  it("a stalled request can't use up the whole wait", async () => {
    let n = 0;
    const acc = {
      orderHistory: () => (n++ === 0 ? new Promise(() => {}) : Promise.resolve([order("c6", "filled")])),
      fills: async () => [],
    } as unknown as AccountApi;
    const p = new Trading({} as StrikeHttp, acc).waitForOrder("ETH-USD", "c6");
    await vi.advanceTimersByTimeAsync(9000);
    expect((await p).status).toBe("filled");
  });
});
