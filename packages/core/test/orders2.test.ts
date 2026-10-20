import { describe, expect, it, vi } from "vitest";
import { buildOrderBody, gridProblem, parseGridBot, stopOrderProblem, Trading } from "../src/trading.js";
import type { MarketSpec } from "../src/types.js";

const SPEC: MarketSpec = {
  symbol: "SOL-USD",
  name: "Solana / USD",
  baseAsset: "SOL",
  status: "trading",
  tickSize: 0.01,
  stepSize: 0.01,
  marketStepSize: 0.1,
  minQty: 0.01,
  minNotional: 10,
  defaultLeverage: 10,
  maxLeverage: 20,
  marginTiers: [{ max_notional: "100000", max_leverage: 20, maintenance_margin_rate: "0.01", maintenance_amount: "0" }],
};

describe("order bodies (Strike CreateOrderRequest)", () => {
  it("take profit market: trigger rounded away from the mark, market step, mark trigger by default", () => {
    const b = buildOrderBody(SPEC, { symbol: "SOL-USD", side: "sell", type: "take_profit", size: 0.37, stopPrice: 110.004, reduceOnly: true, closePosition: true }, "id1");
    expect(b).toMatchObject({ type: "take_profit", size: "0.3", stop_price: "110.01", working_type: "mark_price", reduce_only: true, close_position: true });
    expect(b.price).toBeUndefined();
  });

  it("take profit limit and stop limit carry a limit price with time in force", () => {
    const tp = buildOrderBody(SPEC, { symbol: "SOL-USD", side: "buy", type: "take_profit_limit", size: 0.37, stopPrice: 90.006, price: 90.1, timeInForce: "IOC" }, "id2");
    expect(tp).toMatchObject({ type: "take_profit_limit", size: "0.37", stop_price: "90.00", price: "90.10", time_in_force: "IOC" });
    const sl = buildOrderBody(SPEC, { symbol: "SOL-USD", side: "sell", type: "stop_limit", size: 1, stopPrice: 95, price: 94.5, workingType: "contract_price" }, "id3");
    expect(sl).toMatchObject({ type: "stop_limit", working_type: "contract_price", time_in_force: "GTC" });
  });

  it("trailing stop sends callback_rate (and activation price) and enforces Strike's 0.1–5% range", () => {
    const b = buildOrderBody(SPEC, { symbol: "SOL-USD", side: "sell", type: "trailing_stop_market", size: 1, callbackRate: 1.25, activationPrice: 120.123, reduceOnly: true }, "id4");
    expect(b).toMatchObject({ type: "trailing_stop_market", callback_rate: "1.25", activation_price: "120.12", reduce_only: true });
    expect(() => buildOrderBody(SPEC, { symbol: "SOL-USD", side: "sell", type: "trailing_stop_market", size: 1, callbackRate: 6 }, "x")).toThrow(/0.1–5%/);
  });

  it("market slippage and post-only limits", () => {
    expect(buildOrderBody(SPEC, { symbol: "SOL-USD", side: "buy", type: "market", size: 1, slippage: 0.015 }, "a").slippage).toBe("0.015");
    expect(buildOrderBody(SPEC, { symbol: "SOL-USD", side: "buy", type: "limit", size: 1, price: 100, postOnly: true }, "b").post_only).toBe(true);
    expect(() => buildOrderBody(SPEC, { symbol: "SOL-USD", side: "buy", type: "stop", size: 1, stopPrice: 110, takeProfit: 120 }, "c")).toThrow(/market and limit/);
  });
});

describe("trigger checks", () => {
  const base = { mark: 100, tickSize: 0.01 } as const;
  it("take profit triggers sit on the profit side of the mark", () => {
    expect(stopOrderProblem({ ...base, side: "sell", type: "take_profit", stopPrice: 99 })).toMatch(/above the mark/);
    expect(stopOrderProblem({ ...base, side: "sell", type: "take_profit", stopPrice: 101 })).toBeNull();
    expect(stopOrderProblem({ ...base, side: "buy", type: "take_profit", stopPrice: 101 })).toMatch(/below the mark/);
    expect(stopOrderProblem({ ...base, side: "buy", type: "take_profit_limit", stopPrice: 98, price: 98 })).toBeNull();
  });
  it("trailing stops check the callback rate only", () => {
    expect(stopOrderProblem({ ...base, side: "sell", type: "trailing_stop_market", callbackRate: 0.05 })).toMatch(/0.1–5/);
    expect(stopOrderProblem({ ...base, side: "sell", type: "trailing_stop_market", callbackRate: 2 })).toBeNull();
  });
});

describe("grid bots", () => {
  it("validates Strike's grid rules", () => {
    const g = { symbol: "SOL-USD", mode: "LONG" as const, lower: 90, upper: 110, grids: 10, collateral: 50 };
    expect(gridProblem(g, 100)).toBeNull();
    expect(gridProblem({ ...g, grids: 1 }, 100)).toMatch(/2 to 200/);
    expect(gridProblem({ ...g, sl: 95 }, 100)).toMatch(/below the lower/);
    expect(gridProblem({ ...g, mode: "NEUTRAL", lower: 101 }, 100)).toMatch(/include the current price/);
    expect(gridProblem({ ...g, mode: "NEUTRAL", sl: 80 }, 100)).toMatch(/separate long and short/);
  });
  it("parses a GridBotView", () => {
    const b = parseGridBot({ id: "g1", symbol: "SOL-USD", status: "running", mode: "LONG", lower_price: "90", upper_price: "110", grid_count: 10, leverage: 3, collateral: "50", grid_profit: "1.2", orders: [{ filled: true }, { filled: false }], created_at_ms: 5 });
    expect(b).toMatchObject({ id: "g1", status: "RUNNING", lower: 90, upper: 110, grids: 10, profit: 1.2, levels: 2, filledLevels: 1 });
  });
});

describe("replace / margin requests", () => {
  it("replace sends cancel + new_order with the builder fee", async () => {
    const http: any = { request: vi.fn().mockResolvedValue({}) };
    const t = new Trading(http, {} as any);
    await t.replaceOrder(SPEC, { symbol: "SOL-USD", id: 42 }, { symbol: "SOL-USD", side: "buy", type: "limit", size: 1, price: 99.5 }, 5, "new-id");
    const [method, path, opts] = http.request.mock.calls[0];
    expect([method, path]).toEqual(["POST", "/v2/order/replace"]);
    expect(opts.builderFeeBps).toBe(5);
    expect(opts.body.cancel).toEqual({ order_id: 42, symbol: "SOL-USD" });
    expect(opts.body.new_order).toMatchObject({ client_order_id: "new-id", type: "limit", price: "99.50", size: "1.00" });
  });
  it("isolated margin uses /v2/isoMargin", async () => {
    const http: any = { request: vi.fn().mockResolvedValue({}) };
    await new Trading(http, {} as any).modifyIsolatedMargin("SOL-USD", 12.345, "add");
    expect(http.request.mock.calls[0]).toEqual(["POST", "/v2/isoMargin", { body: { symbol: "SOL-USD", amount: "12.34", modify_type: "add" } }]);
  });
});
