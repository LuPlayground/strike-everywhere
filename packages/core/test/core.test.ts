import { afterEach, describe, expect, it, vi } from "vitest";
import * as ed from "@noble/ed25519";
import { hexToBytes, sha256Hex, utf8 } from "../src/bytes.js";
import { ApiWalletKey, canonicalRequestMessage, signRequest } from "../src/signer.js";
import { decimalsOf, roundToStep } from "../src/format.js";
import { estimateLiquidationPrice, maxLeverageFor, previewOrder } from "../src/math.js";
import type { MarginTier } from "../src/types.js";
import { StrikeHttp } from "../src/http.js";
import { NETWORKS } from "../src/config.js";
import { AccountApi } from "../src/account.js";
import { walletErrorMessage } from "../src/cardano/wallet.js";
import { StrikeEverywhere } from "../src/client.js";
import { builderConnect, checkConsentMessage } from "../src/builderConnect.js";
import { Withdrawals } from "../src/withdraw.js";
import { UserStream } from "../src/ws.js";

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

  it("restores a bring-your-own key from its private hex", async () => {
    const priv = "9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60";
    const k = await ApiWalletKey.fromPrivateKeyHex(priv);
    expect(k.publicKeyHex).toBe("d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a");
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

describe("StrikeHttp signing clock", () => {
  const fakeStrike = (offsetMs: number, calls: string[]) =>
    (async (url: string, init: any) => {
      const now = Date.now() + offsetMs;
      if (url.endsWith("/v2/time")) return new Response(JSON.stringify({ serverTime: now }), { status: 200 });
      const ts = Number(init.headers["X-API-Wallet-Timestamp"]);
      calls.push(String(ts));
      if (ts * 1000 > now) return new Response(JSON.stringify({ error: "signature expired or invalid timestamp" }), { status: 401 });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as unknown as typeof fetch;

  it("never signs with a timestamp ahead of server time (sub-second offsets)", async () => {
    for (const offset of [850, 999, 1490, -300, 0, 120_000]) {
      const calls: string[] = [];
      const http = new StrikeHttp(NETWORKS.testnet, fakeStrike(offset, calls));
      http.key = await ApiWalletKey.generate();
      await http.syncClock();
      for (let i = 0; i < 25; i++) {
        await http.request("GET", "/v2/account");
        await new Promise((r) => setTimeout(r, 37));
      }
      expect(calls.length).toBe(25);
    }
  }, 30_000);

  it("re-syncs and retries once when Strike rejects the timestamp", async () => {
    const calls: string[] = [];
    const http = new StrikeHttp(NETWORKS.testnet, fakeStrike(5_000, calls));
    http.key = await ApiWalletKey.generate();
    http.clockSkewMs = 60_000;
    await expect(http.request("GET", "/v2/account")).resolves.toEqual({ ok: true });
    expect(calls.length).toBe(2);
  });

  it("does not retry other errors", async () => {
    let n = 0;
    const http = new StrikeHttp(NETWORKS.testnet, (async () => (n++, new Response(JSON.stringify({ error: "insufficient_balance" }), { status: 400 }))) as unknown as typeof fetch);
    http.key = await ApiWalletKey.generate();
    await expect(http.request("POST", "/v2/order", { body: {} })).rejects.toThrow("insufficient_balance");
    expect(n).toBe(1);
  });
});

describe("StrikeHttp clock: edge cases", () => {
  const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status });

  it("ignores nonsense server times (seconds, 0, strings)", async () => {
    for (const bad of [Math.floor(Date.now() / 1000), 0, "soon", null]) {
      const http = new StrikeHttp(NETWORKS.testnet, (async () => json({ serverTime: bad })) as unknown as typeof fetch);
      http.clockSkewMs = 123;
      await http.syncClock();
      expect(http.clockSkewMs).toBe(123);
    }
  });

  it("is never ahead of the server even when the request leg is slow (asymmetric latency)", async () => {
    const http = new StrikeHttp(NETWORKS.testnet, (async () => {
      await new Promise((r) => setTimeout(r, 300));
      const server = Date.now();
      return json({ serverTime: server });
    }) as unknown as typeof fetch);
    await http.syncClock();
    expect(http.clockSkewMs).toBeLessThanOrEqual(0);
    expect(http.serverNowMs()).toBeLessThan(Date.now());
  });

  it("retries a timestamp rejection exactly once, then throws", async () => {
    let signed = 0;
    const http = new StrikeHttp(NETWORKS.testnet, (async (url: string) => {
      if (url.endsWith("/v2/time")) return json({ serverTime: Date.now() });
      signed++;
      return json({ error: "signature expired or invalid timestamp" }, 401);
    }) as unknown as typeof fetch);
    http.key = await ApiWalletKey.generate();
    await expect(http.request("GET", "/v2/account")).rejects.toThrow(/invalid timestamp/);
    expect(signed).toBe(2);
  });

  it("does not retry unauthenticated requests", async () => {
    let n = 0;
    const http = new StrikeHttp(NETWORKS.testnet, (async () => (n++, json({ error: "invalid timestamp" }, 400))) as unknown as typeof fetch);
    await expect(http.request("GET", "/v2/markets", { auth: false })).rejects.toThrow();
    expect(n).toBe(1);
  });
});

describe("AccountApi.exists", () => {
  const api = (status: number) => new AccountApi(new StrikeHttp(NETWORKS.testnet, (async () => new Response(JSON.stringify(status === 200 ? {} : { error: "x" }), { status })) as unknown as typeof fetch));
  it("maps 200 / 404 / 500 to true / false / null (unknown)", async () => {
    expect(await api(200).exists("addr_test1x")).toBe(true);
    expect(await api(404).exists("addr_test1x")).toBe(false);
    expect(await api(500).exists("addr_test1x")).toBe(null);
  });
});

describe("walletErrorMessage", () => {
  it("maps CIP-30 errors and wallet texts to plain language", () => {
    expect(walletErrorMessage({ code: -3, info: "Refused" })).toMatch(/refused/);
    expect(walletErrorMessage({ code: 2, info: "user declined to sign tx" })).toMatch(/Declined/);
    expect(walletErrorMessage({ code: 2, info: "address is not a key hash" })).toMatch(/can't sign messages/);
    expect(walletErrorMessage({ code: 3, info: "user declined" })).toMatch(/Declined/);
    expect(walletErrorMessage(new Error("Wallet is locked"))).toMatch(/locked/);
    expect(walletErrorMessage(new Error("blockchain fee too low"))).toBe("blockchain fee too low");
  });
});

describe("leverage changes (Strike applies them asynchronously)", () => {
  const realFetch = globalThis.fetch;
  afterEach(() => { globalThis.fetch = realFetch; });

  async function clientWith(lev: { now: number; applyAfterPolls: number; target?: number }) {
    const calls: string[] = [];
    let polls = 0;
    globalThis.fetch = (async (url: string, init: any) => {
      const path = new URL(url).pathname;
      calls.push(`${init?.method ?? "GET"} ${path}`);
      if (path === "/v2/leverage") { lev.target = JSON.parse(init.body).leverage; polls = 0; return new Response("{}", { status: 200 }); }
      if (path === "/v2/account") {
        if (lev.target !== undefined && ++polls > lev.applyAfterPolls) lev.now = lev.target;
        return new Response(JSON.stringify({ symbol_settings: { "ADA-USD": { leverage: lev.now } } }), { status: 200 });
      }
      return new Response("{}", { status: 200 });
    }) as any;
    const c = new StrikeEverywhere({ network: "testnet", builderCode: "x" });
    c.http.key = await ApiWalletKey.generate();
    return { c, calls };
  }

  it("waits until Strike reports the new leverage", async () => {
    const { c, calls } = await clientWith({ now: 3, applyAfterPolls: 2 });
    await (c as any).applyLeverage("ADA-USD", 5);
    expect(calls.filter((x) => x === "POST /v2/leverage")).toHaveLength(1);
    expect(calls.filter((x) => x === "GET /v2/account").length).toBeGreaterThanOrEqual(3);
  });

  it("skips the change when that leverage is already set", async () => {
    const { c, calls } = await clientWith({ now: 5, applyAfterPolls: 0 });
    await (c as any).applyLeverage("ADA-USD", 5);
    expect(calls).not.toContain("POST /v2/leverage");
  });
});

describe("lessons from production integrations", () => {
  const res = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status });

  it("screens Strike's consent message before the wallet signs", () => {
    const pk = "ab".repeat(32);
    expect(() => checkConsentMessage("", pk)).toThrow(/empty/);
    expect(() => checkConsentMessage("Approve builder\u202Eevil", pk)).toThrow(/control characters/);
    expect(() => checkConsentMessage("x".repeat(5000), pk)).toThrow(/long/);
    expect(() => checkConsentMessage(`Approve builder fee 0.05%\nAPI key: ${pk}`, pk)).not.toThrow();
  });

  it("falls back to USDM when Strike says ADA is an unsupported withdraw asset", async () => {
    const assets: string[] = [];
    const http = new StrikeHttp(NETWORKS.mainnet, (async (_u: string, init: any) => {
      const a = JSON.parse(init.body).asset;
      assets.push(a);
      return a === "ADA" ? res({ error: "unsupported asset" }, 400) : res({ withdraw_id: "w1", fee: "1", message_to_sign: "Withdraw 5 USD" });
    }) as unknown as typeof fetch);
    http.key = await ApiWalletKey.generate();
    const p = await new Withdrawals(http).prepareAda(5);
    expect(assets).toEqual(["ADA", "USDM"]);
    expect(p.asset).toBe("USDM");
  });

  it("retries Builder Connect without referral_code if Strike rejects the field", async () => {
    const bodies: any[] = [];
    const http = new StrikeHttp(NETWORKS.mainnet, (async (url: string, init: any) => {
      const body = JSON.parse(init.body);
      if (url.endsWith("/request-signature")) {
        bodies.push(body);
        if ("referral_code" in body) return res({ error: "unknown field \"referral_code\"" }, 400);
        return res({ nonce: "n1", message_to_sign: `Approve ${body.public_key}` });
      }
      return res({ account_id: "acc", fee_share_bps: 5 });
    }) as unknown as typeof fetch);
    const s = await builderConnect({ http, address: "addr1x", chain: "cardano", builderCode: "code", feeShareBps: 5, referralCode: "REF", signMessage: async () => "sig:key" });
    expect(bodies.map((b) => "referral_code" in b)).toEqual([true, false]);
    expect(bodies[1]).toMatchObject({ fee_share_bps: 5, code: "code" });
    expect(s.session.accountId).toBe("acc");
  });

  it("explains Strike's refusal to connect a builder's own account, before any signature", async () => {
    const signMessage = vi.fn(async () => "sig:key");
    const http = new StrikeHttp(NETWORKS.testnet, (async () => res({ error: "cannot connect an account to its own builder code" }, 400)) as unknown as typeof fetch);
    await expect(builderConnect({ http, address: "addr_test1x", chain: "cardano", builderCode: "Playground101", feeShareBps: 10, signMessage })).rejects.toThrow(/owns the builder code Playground101.*different wallet/);
    expect(signMessage).not.toHaveBeenCalled();
  });

  it("tries the alternative userstream logon payload once if the first is rejected", async () => {
    const sent: any[] = [];
    class FakeWS {
      readyState = 1;
      onopen: any; onmessage: any; onclose: any; onerror: any;
      constructor() { FakeWS.last = this; setTimeout(() => this.onopen?.(), 0); }
      static last: FakeWS;
      send(s: string) { sent.push(JSON.parse(s)); }
      close() {}
    }
    const key = await ApiWalletKey.generate();
    const ws = new UserStream("wss://x", key, () => 1_800_000_000_000, FakeWS as any);
    ws.connect();
    await new Promise((r) => setTimeout(r, 20));
    expect(sent).toHaveLength(1);
    FakeWS.last.onmessage({ data: JSON.stringify({ id: sent[0].id, status: 401, error: "invalid signature" }) });
    await new Promise((r) => setTimeout(r, 20));
    expect(sent).toHaveLength(2);
    expect(sent[1].method).toBe("session.logon");
    expect(await ed.verifyAsync(sent[1].params.signature, new TextEncoder().encode(`apiKey=${key.publicKeyHex}&timestamp=1800000000000`), key.publicKeyHex)).toBe(true);
    ws.close();
  });
});
