import { describe, expect, it } from "vitest";
import { parseTrades } from "../src/market.js";
import { parseTransaction } from "../src/account.js";
import type { MarketSpec } from "../src/types.js";
import { marginForFraction, pnlForPrice, priceForPnl, sizeDraft, type Draft, type DraftCtx } from "../../widget/src/app/order";
import { displayName, kindOf, LISTS } from "../../widget/src/app/markets";

const SOL: MarketSpec = {
  symbol: "SOL-USD",
  name: "Solana / USD",
  baseAsset: "SOL",
  status: "trading",
  tickSize: 0.01,
  stepSize: 0.01,
  marketStepSize: 0.01,
  minQty: 0.01,
  minNotional: 10,
  defaultLeverage: 10,
  maxLeverage: 20,
  marginTiers: [
    { max_notional: "100000", max_leverage: 20, maintenance_margin_rate: "0.01", maintenance_amount: "0" },
    { max_notional: "500000", max_leverage: 5, maintenance_margin_rate: "0.02", maintenance_amount: "1000" },
  ],
};
const ctx = (over: Partial<DraftCtx> = {}): DraftCtx => ({ spec: SOL, mark: 100, available: 200, takerRate: 0.0005, feeBps: 5, maxLeverage: 20, limitBound: 0.05, ...over });
const draft = (over: Partial<Draft> = {}): Draft => ({ symbol: "SOL-USD", side: "buy", type: "market", amount: 25, unit: "usd", leverage: 2, limitPrice: 0, tp: 0, sl: 0, autoMode: "pnl", ...over });

describe("app order sizing (amount = margin, like Phantom)", () => {
  it("sizes margin × leverage, floored to the step", () => {
    const z = sizeDraft(draft({ amount: 25, leverage: 2 }), ctx());
    expect(z.ok).toBe(true);
    expect(z.size).toBe(0.5);
    expect(z.notional).toBeCloseTo(50);
    expect(z.margin).toBeCloseTo(25);
    expect(z.fee).toBeCloseTo(50 * 0.001);
  });

  it("reports the minimum margin for the chosen leverage", () => {
    const z = sizeDraft(draft({ amount: 4, leverage: 2 }), ctx());
    expect(z.ok).toBe(false);
    expect(z.kind).toBe("min");
    expect(z.problem).toBe("Minimum margin: $5.00");
  });

  it("refuses margin + fees above the available balance", () => {
    const z = sizeDraft(draft({ amount: 200, leverage: 2 }), ctx({ available: 200 }));
    expect(z.kind).toBe("funds");
    expect(z.problem).toBe("Insufficient funds");
  });

  it("100% leaves room for fees and still passes", () => {
    const m = marginForFraction(ctx(), 5, 1);
    const z = sizeDraft(draft({ amount: m, leverage: 5 }), ctx());
    expect(m).toBeLessThan(200);
    expect(z.ok).toBe(true);
  });

  it("caps leverage by the site and by Strike's margin tier for the size", () => {
    expect(sizeDraft(draft({ leverage: 50 }), ctx({ maxLeverage: 10 })).lev).toBe(10);
    expect(sizeDraft(draft({ amount: 30_000, leverage: 20 }), ctx({ available: 1e9 })).lev).toBe(5);
  });

  it("checks limit prices against the band", () => {
    expect(sizeDraft(draft({ type: "limit", limitPrice: 0 }), ctx()).problem).toBe("Enter a limit price");
    expect(sizeDraft(draft({ type: "limit", limitPrice: 80 }), ctx()).kind).toBe("price");
    expect(sizeDraft(draft({ type: "limit", limitPrice: 99 }), ctx()).ok).toBe(true);
  });

  it("turns % P&L into exit prices and back (return on margin)", () => {
    expect(priceForPnl("buy", 100, 5, 10)).toBeCloseTo(102);
    expect(priceForPnl("sell", 100, 5, 10)).toBeCloseTo(98);
    expect(pnlForPrice("buy", 100, 5, 102)).toBeCloseTo(10);
    const z = sizeDraft(draft({ leverage: 5, tp: 20, sl: 10 }), ctx());
    expect(z.tpPrice).toBeCloseTo(104);
    expect(z.slPrice).toBeCloseTo(98);
    expect(z.ok).toBe(true);
  });

  it("rejects auto close on the wrong side or past liquidation", () => {
    expect(sizeDraft(draft({ autoMode: "price", tp: 95 }), ctx()).kind).toBe("tpsl");
    expect(sizeDraft(draft({ autoMode: "price", sl: 105 }), ctx()).kind).toBe("tpsl");
    expect(sizeDraft(draft({ leverage: 10, autoMode: "price", sl: 80 }), ctx()).problem).toMatch(/past the liquidation/);
  });

  it("sizes in the coin when the display currency is the base asset", () => {
    const z = sizeDraft(draft({ unit: "base", amount: 0.3, leverage: 3 }), ctx());
    expect(z.size).toBe(0.3);
    expect(z.margin).toBeCloseTo(10);
  });
});

describe("market metadata", () => {
  it("names and groups Strike markets", () => {
    expect(displayName("Applied Optoelectronics / USD", "AAOI")).toBe("Applied Optoelectronics");
    expect(kindOf("XAU")).toBe("commodity");
    expect(kindOf("SP500")).toBe("index");
    expect(kindOf("NVDA")).toBe("stock");
    expect(kindOf("ADA")).toBe("crypto");
    expect(LISTS.find((l) => l.id === "cardano")!.test("NIGHT", { change: 0, createdAt: 0 })).toBe(true);
  });
});

describe("new parsers", () => {
  it("parses public trades newest first with the taker side", () => {
    const t = parseTrades([
      { id: 2, price: "82615", qty: "0.07858", time: 2000, isBuyerMaker: true },
      { id: 3, price: "82620", qty: "0.01", time: 3000, isBuyerMaker: false },
      { id: 4, price: "bad", qty: "1", time: 1 },
    ]);
    expect(t.map((x) => x.id)).toEqual([3, 2]);
    expect(t[1].side).toBe("sell");
    expect(t[0].side).toBe("buy");
  });

  it("parses balance transactions (live shape 2026-10-20)", () => {
    const r = parseTransaction({ id: 1, type: "deposit", amount: "106.93", status: "settled", timestamp: 1792, tx_hash: "e221#0", asset_symbol: "ADA", asset_amount: "500" });
    expect(r).toEqual({ id: 1, type: "deposit", status: "settled", amount: 106.93, time: 1792, txHash: "e221", asset: "ADA", assetAmount: 500 });
    expect(parseTransaction({ id: 2, type: "fee", amount: "x", timestamp: 5 })).toBeNull();
  });
});
