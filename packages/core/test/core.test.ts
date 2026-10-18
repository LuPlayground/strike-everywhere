import { describe, expect, it } from "vitest";
import * as ed from "@noble/ed25519";
import { hexToBytes, sha256Hex, utf8 } from "../src/bytes.js";
import { ApiWalletKey, canonicalRequestMessage, signRequest } from "../src/signer.js";
import { decimalsOf, roundToStep } from "../src/format.js";
import { estimateLiquidationPrice, maxLeverageFor, previewOrder } from "../src/math.js";
import type { MarginTier } from "../src/types.js";

const ADA_TIERS: MarginTier[] = [
  { max_notional: "10000", max_leverage: 40, maintenance_margin_rate: "0.005", maintenance_amount: "0" },
  { max_notional: "25000", max_leverage: 40, maintenance_margin_rate: "0.01", maintenance_amount: "50.000" },
  { max_notional: "50000", max_leverage: 25, maintenance_margin_rate: "0.01", maintenance_amount: "50.000" },
];

describe("request signing", () => {
  it("builds the canonical message Strike verifies", async () => {
    const body = JSON.stringify({ symbol: "ADA-USD", side: "buy" });
    const msg = await canonicalRequestMessage("post", "/v2/order", 1712054096, "550e8400-e29b-41d4-a716-446655440000", body);
    expect(msg).toBe(`POST:/v2/order:1712054096:550e8400-e29b-41d4-a716-446655440000:${await sha256Hex(body)}`);
  });

  it("hashes an empty string for GET requests", async () => {
    const msg = await canonicalRequestMessage("GET", "/v2/account", 1, "n", "");
    expect(msg.endsWith(":e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")).toBe(true);
  });

  it("produces a signature that verifies against the public key", async () => {
    const key = await ApiWalletKey.generate();
    const h = await signRequest(key, "GET", "/v2/account", "", 1700000000, "nonce-1");
    expect(h["X-API-Wallet-Public-Key"]).toHaveLength(64);
    const msg = await canonicalRequestMessage("GET", "/v2/account", 1700000000, "nonce-1", "");
    const ok = await ed.verifyAsync(hexToBytes(h["X-API-Wallet-Signature"]), utf8(msg), hexToBytes(key.publicKeyHex));
    expect(ok).toBe(true);
  });

  it("restores a key from its private hex", async () => {
    const a = await ApiWalletKey.generate();
    const b = await ApiWalletKey.fromPrivateKeyHex(a.exportPrivateKeyHex());
    expect(b.publicKeyHex).toBe(a.publicKeyHex);
  });
});

describe("formatting", () => {
  it("rounds to market steps", () => {
    expect(decimalsOf(0.00001)).toBe(5);
    expect(decimalsOf(1)).toBe(0);
    expect(roundToStep(0.214879, 0.00001)).toBe("0.21488");
    expect(roundToStep(46.9, 1, "floor")).toBe("46");
    expect(roundToStep(0.000123456, 0.00001, "floor")).toBe("0.00012");
  });
});

describe("risk math", () => {
  it("caps leverage by notional tier", () => {
    expect(maxLeverageFor(ADA_TIERS, 500)).toBe(40);
    expect(maxLeverageFor(ADA_TIERS, 40_000)).toBe(25);
  });

  it("puts a long's liquidation below entry and a short's above", () => {
    const long = estimateLiquidationPrice({ side: "buy", entry: 0.215, leverage: 5, notional: 20, tiers: ADA_TIERS });
    const short = estimateLiquidationPrice({ side: "sell", entry: 0.215, leverage: 5, notional: 20, tiers: ADA_TIERS });
    expect(long).toBeLessThan(0.215);
    expect(short).toBeGreaterThan(0.215);
    expect((0.215 - long) / 0.215).toBeGreaterThan(0.19);
    expect((0.215 - long) / 0.215).toBeLessThan(0.2);
  });

  it("previews fees including the builder fee", () => {
    const p = previewOrder({ side: "buy", price: 0.215, notional: 20, leverage: 2, takerRate: 0.0005, builderFeeBps: 10, tiers: ADA_TIERS });
    expect(p.margin).toBeCloseTo(10);
    expect(p.strikeFee).toBeCloseTo(0.01);
    expect(p.builderFee).toBeCloseTo(0.02);
    expect(p.totalFee).toBeCloseTo(0.03);
  });
});
