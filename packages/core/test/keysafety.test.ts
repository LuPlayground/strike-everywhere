import { afterEach, describe, expect, it, vi } from "vitest";
import * as ed from "@noble/ed25519";
import { hexToBytes, utf8 } from "../src/bytes.js";
import { ApiWalletKey } from "../src/signer.js";
import { SessionStore, type KeyRecord, type KeyVault } from "../src/session.js";
import { StrikeEverywhere } from "../src/client.js";
import type { BuilderSession } from "../src/builderConnect.js";

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
  removeItem(k: string) {
    this.m.delete(k);
  }
}

class MemVault implements KeyVault {
  m = new Map<string, KeyRecord>();
  async put(r: KeyRecord) {
    this.m.set(r.id, { ...r });
  }
  async get(id: string) {
    return this.m.get(id) ?? null;
  }
  async delete(id: string) {
    this.m.delete(id);
  }
  async purge(stale: (r: KeyRecord) => boolean) {
    for (const [id, r] of this.m) if (stale(r)) this.m.delete(id);
  }
}

const session = (pub: string): BuilderSession => ({
  accountId: "01a150f0-e1b4-70ff-a08f-005955eba8aa",
  builderCode: "Playground101",
  feeShareBps: 10,
  apiWalletId: 1,
  apiWalletPublicKey: pub,
  apiWalletExpiresAt: "9999-12-31T23:59:59Z",
  address: "addr_test1...",
  chain: "cardano",
  connectedAt: Date.now(),
});

const verifies = async (key: ApiWalletKey, msg: string) => ed.verifyAsync(hexToBytes(await key.sign(msg)), utf8(msg), hexToBytes(key.publicKeyHex));
const flush = () => new Promise((r) => setTimeout(r, 0));

afterEach(() => vi.useRealTimers());

describe("browser-held trading key", () => {
  it("is non-extractable and signs Ed25519 that verifies against its public key", async () => {
    const key = await ApiWalletKey.generate();
    expect(key.nonExtractable).toBe(true);
    expect(key.cryptoKey!.extractable).toBe(false);
    expect(key.publicKeyHex).toMatch(/^[0-9a-f]{64}$/);
    expect(await verifies(key, "GET:/v2/account:1700000000:n:e3b0")).toBe(true);
    await expect(crypto.subtle.exportKey("pkcs8", key.cryptoKey!)).rejects.toThrow();
    await expect(crypto.subtle.exportKey("jwk", key.cryptoKey!)).rejects.toThrow();
    expect("exportPrivateKeyHex" in key).toBe(false);
  });

  it("refuses an exportable key and a key that doesn't match its public key", async () => {
    const exportable = (await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"])) as CryptoKeyPair;
    const pub = Buffer.from(await crypto.subtle.exportKey("raw", exportable.publicKey)).toString("hex");
    await expect(ApiWalletKey.fromCryptoKey(exportable.privateKey, pub)).rejects.toThrow(/exported/);
    const a = await ApiWalletKey.generate();
    const b = await ApiWalletKey.generate();
    await expect(ApiWalletKey.fromCryptoKey(a.cryptoKey!, b.publicKeyHex)).rejects.toThrow(/match/);
  });

  it("falls back to an in-memory key that still signs correctly", async () => {
    const key = await ApiWalletKey.generateInMemory();
    expect(key.nonExtractable).toBe(false);
    expect(await verifies(key, "hello")).toBe(true);
  });
});

describe("session persistence", () => {
  it("stores only a pointer and the browser-held key handle, never a secret", async () => {
    const meta = new MemStorage();
    const vault = new MemVault();
    const key = await ApiWalletKey.generate();
    await new SessionStore("session", "k", 3600_000, 1800_000, meta, vault).save(session(key.publicKeyHex), key);
    const raw = meta.getItem("k")!;
    expect(raw).not.toMatch(/privateKey/i);
    expect(JSON.parse(raw).publicKeyHex).toBe(key.publicKeyHex);
    expect([...vault.m.values()][0].key).toBe(key.cryptoKey);

    const back = await new SessionStore("session", "k", 3600_000, 1800_000, meta, vault).load();
    expect(back?.key.publicKeyHex).toBe(key.publicKeyHex);
    expect(back?.key.nonExtractable).toBe(true);
    expect(await verifies(back!.key, "after reload")).toBe(true);
  });

  it("never persists the in-memory fallback key", async () => {
    const meta = new MemStorage();
    const vault = new MemVault();
    const key = await ApiWalletKey.generateInMemory();
    await new SessionStore("session", "k", 3600_000, 1800_000, meta, vault).save(session(key.publicKeyHex), key);
    expect(meta.m.size).toBe(0);
    expect(vault.m.size).toBe(0);
  });

  it("memory mode writes nothing", async () => {
    const meta = new MemStorage();
    const vault = new MemVault();
    const key = await ApiWalletKey.generate();
    const store = new SessionStore("memory", "k", 3600_000, 1800_000, meta, vault);
    await store.save(session(key.publicKeyHex), key);
    expect(meta.m.size + vault.m.size).toBe(0);
    expect((await store.load())?.key).toBe(key);
  });

  it("wipes a raw key left by an older version instead of using it", async () => {
    const meta = new MemStorage();
    meta.setItem("k", JSON.stringify({ session: session("ab"), privateKeyHex: "11".repeat(32), expiresAt: Date.now() + 1e6 }));
    expect(await new SessionStore("session", "k", 3600_000, 1800_000, meta, new MemVault()).load()).toBeNull();
    expect(meta.m.size).toBe(0);
  });

  it("forgets the key after the idle limit, in this tab and in storage", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const meta = new MemStorage();
    const vault = new MemVault();
    const key = await ApiWalletKey.generate();
    const store = new SessionStore("session", "k", 12 * 3600_000, 30 * 60_000, meta, vault);
    await store.save(session(key.publicKeyHex), key);
    vi.advanceTimersByTime(20 * 60_000);
    store.touch();
    vi.advanceTimersByTime(20 * 60_000);
    expect(store.expiry()).toBeNull();
    vi.advanceTimersByTime(11 * 60_000);
    expect(store.expiry()).toBe("idle");
    expect(await store.load()).toBeNull();
    await flush();
    expect(meta.m.size + vault.m.size).toBe(0);
  });

  it("drops a stored session that went idle while the tab was closed, and purges leftover keys", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const meta = new MemStorage();
    const vault = new MemVault();
    const key = await ApiWalletKey.generate();
    await new SessionStore("session", "k", 12 * 3600_000, 30 * 60_000, meta, vault).save(session(key.publicKeyHex), key);
    vault.m.set("orphan", { id: "orphan", key: key.cryptoKey!, publicKeyHex: "x", expiresAt: Date.now() + 1e9, lastActive: Date.now() });
    vi.advanceTimersByTime(31 * 60_000);
    expect(await new SessionStore("session", "k", 12 * 3600_000, 30 * 60_000, meta, vault).load()).toBeNull();
    await flush();
    expect(vault.m.size).toBe(0);
    expect(meta.m.size).toBe(0);
  });

  it("ends at the absolute lifetime even with constant activity", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const key = await ApiWalletKey.generate();
    const store = new SessionStore("memory", "k", 3600_000, 30 * 60_000, null, null);
    await store.save(session(key.publicKeyHex), key);
    for (let i = 0; i < 7; i++) (vi.advanceTimersByTime(10 * 60_000), store.touch());
    expect(store.expiry()).toBe("expired");
  });
});

describe("client idle timeout", () => {
  it("refuses to sign after the idle limit and reports why the session ended", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const client = new StrikeEverywhere({ network: "testnet", builderCode: "Playground101", idleTimeoutMs: 30 * 60_000 });
    const key = await ApiWalletKey.generate();
    const s = session(key.publicKeyHex);
    await (client as any).store.save(s, key);
    client.session = s;
    client.http.key = key;
    const events: any[] = [];
    client.on((e) => events.push(e));
    vi.advanceTimersByTime(31 * 60_000);
    await expect(client.http.request("GET", "/v2/account")).rejects.toMatchObject({ status: 401 });
    expect(client.session).toBeNull();
    expect(client.http.key).toBeNull();
    expect(events).toEqual([{ type: "session", session: null, reason: "idle" }]);
  });

  it("can be turned off", () => {
    expect(new StrikeEverywhere({ builderCode: "x", idleTimeoutMs: 0 }).idleTimeoutMs).toBe(0);
    expect(new StrikeEverywhere({ builderCode: "x" }).idleTimeoutMs).toBe(30 * 60_000);
  });
});
