import { describe, expect, it } from "vitest";
import { closePrompt, ctaLabel, fillDirection, flipNote, fundingWords, movePct, orderSummary, positionAfter, positionText, sizeLine } from "../src/explain.js";
import { estimateLiquidationPrice } from "../src/math.js";

describe("plain-language wording", () => {
  it("labels fills as opening or closing Longs and Shorts", () => {
    expect(fillDirection("buy", 0)).toBe("Open Long");
    expect(fillDirection("buy", null)).toBe("Open Long");
    expect(fillDirection("sell", 0)).toBe("Open Short");
    expect(fillDirection("sell", 0.21)).toBe("Close Long");
    expect(fillDirection("sell", -1.5)).toBe("Close Long");
    expect(fillDirection("buy", -0.03)).toBe("Close Short");
    expect(fillDirection("", 1)).toBe("");
  });

  it("explains what an opposite-side order does to an open position", () => {
    const base = { base: "SOL", step: 0.01 };
    expect(flipNote({ ...base, position: 0.07, side: "sell", size: 0.04 })).toBe("This reduces your Long 0.07 SOL to 0.03 SOL.");
    expect(flipNote({ ...base, position: 0.07, side: "sell", size: 0.07 })).toBe("This closes your Long 0.07 SOL.");
    expect(flipNote({ ...base, position: 0.07, side: "sell", size: 0.11 })).toBe(
      "This closes your Long 0.07 SOL and opens a Short of 0.04 SOL. To just exit, use Close in Positions.",
    );
    expect(flipNote({ ...base, position: -2, side: "buy", size: 3 })).toBe("This closes your Short 2 SOL and opens a Long of 1 SOL. To just exit, use Close in Positions.");
    expect(flipNote({ ...base, position: 0.07, side: "buy", size: 0.04 })).toBeNull();
    expect(flipNote({ ...base, position: 0, side: "sell", size: 0.04 })).toBeNull();
    expect(flipNote({ ...base, position: 0.07, side: "sell", size: 0.11, reduceOnly: true })).toBeNull();
    expect(flipNote({ ...base, position: 0.07, side: "sell", size: 0 })).toBeNull();
  });

  it("describes the size after step rounding, and says when rounding changed it", () => {
    expect(sizeLine({ usd: 12, size: 0.11, price: 104, leverage: 2, base: "SOL", step: 0.01 })).toBe(
      "= 0.11 SOL ≈ $11.44 · uses $5.72 of your balance (rounded to Strike's 0.01 SOL step)",
    );
    expect(sizeLine({ usd: 11.44, size: 0.11, price: 104, leverage: 2, base: "SOL", step: 0.01 })).toBe("= 0.11 SOL ≈ $11.44 · uses $5.72 of your balance");
    expect(sizeLine({ usd: 12, size: 0, price: 104, leverage: 2, base: "SOL", step: 0.01 })).toBeNull();
  });

  it("summarizes an order in words, mirrored for shorts", () => {
    const tiers = [{ max_notional: "100000", max_leverage: 20, maintenance_margin_rate: "0.01", maintenance_amount: "0" }];
    const liq = estimateLiquidationPrice({ side: "buy", entry: 104, leverage: 2, notional: 11.44, tiers });
    const long = orderSummary({ side: "buy", leverage: 2, base: "SOL", size: 0.11, notional: 11.44, margin: 5.72, entry: 104, liqPrice: liq });
    expect(long).toBe(`2x Long: you're buying ~0.11 SOL (~$11.44) using $5.72 of your balance. You gain if SOL rises. You'd be liquidated (losing that $5.72) if SOL falls to ~$52.53 (−49%).`);
    const short = orderSummary({ side: "sell", leverage: 2, base: "SOL", size: 0.11, notional: 11.44, margin: 5.72, entry: 104, liqPrice: 154.4, resting: true, when: " at 104.00 or better" });
    expect(short).toBe(`2x Short: you'll sell ~0.11 SOL (~$11.44) at 104.00 or better using $5.72 of your balance. You gain if SOL falls. You'd be liquidated (losing that $5.72) if SOL rises to ~$154.40 (+48%).`);
    expect(orderSummary({ side: "buy", leverage: 1, base: "ADA", size: 50, notional: 12.5, margin: 12.5, entry: 0.25, liqPrice: 0 })).toBe(
      "1x Long: you're buying ~50 ADA (~$12.50) using $12.50 of your balance. You gain if ADA rises.",
    );
    expect(orderSummary({ side: "sell", leverage: 2, base: "SOL", size: 0.07, notional: 7.28, margin: 3.64, entry: 104, reduceOnly: true })).toBe(
      "Reduce-only: you're selling ~0.07 SOL (~$7.28). It can only shrink your Long, never open a new position.",
    );
  });

  it("puts the price into the order button for orders that wait", () => {
    expect(ctaLabel({ side: "buy", base: "SOL", type: "market", notional: 11.44 })).toBe("Long SOL · $11.44");
    expect(ctaLabel({ side: "buy", base: "SOL", type: "limit", price: "103.97", notional: 11.44 })).toBe("Long SOL · Limit @ 103.97 · $11.44");
    expect(ctaLabel({ side: "sell", base: "SOL", type: "stop", trigger: "99.50" })).toBe("Short SOL · Stop @ 99.50");
    expect(ctaLabel({ side: "sell", base: "SOL", type: "stop_limit", trigger: "99.50", price: "99.00", notional: 10 })).toBe("Short SOL · Stop @ 99.50 → Limit 99.00 · $10.00");
    expect(ctaLabel({ side: "buy", base: "ADA", type: "twap", notional: 50 })).toBe("TWAP Long ADA · $50.00");
  });

  it("formats funding, price moves and positions in words", () => {
    expect(fundingWords(0.00011)).toBe("Longs pay 0.011%/h");
    expect(fundingWords(-0.0000126)).toBe("Shorts pay 0.0013%/h");
    expect(fundingWords(0)).toBe("None now");
    expect(movePct(104, 52)).toBe("−50%");
    expect(movePct(104, 109)).toBe("+4.8%");
    expect(movePct(0, 52)).toBe("");
    expect(positionText(0.07, "SOL")).toBe("Long 0.07 SOL");
    expect(positionText(-0.04, "SOL")).toBe("Short 0.04 SOL");
    expect(positionText(0, "SOL")).toBe("");
    expect(positionAfter(0.07, "buy", 0.11)).toBeCloseTo(0.18);
    expect(positionAfter(0.07, "sell", 0.07)).toBe(0);
    expect(positionAfter(0.07, "sell", 0.11, true)).toBe(0);
    expect(positionAfter(0.07, "sell", 0.11)).toBeCloseTo(-0.04);
    expect(closePrompt({ size: 0.07, base: "SOL", mark: 104, upnl: 0.21 })).toBe("Close Long 0.07 SOL at market (~$7.28)? Est. profit/loss +$0.21 before fees.");
  });
});
