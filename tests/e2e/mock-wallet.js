(() => {
  const SEED_HEX = "5e1f3a0c9b8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f";
  const STAKE_SEED_HEX = "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90";
  const hex = (b) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  const unhex = (h) => new Uint8Array(h.match(/../g).map((x) => parseInt(x, 16)));
  const cat = (...a) => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let p = 0; for (const x of a) { o.set(x, p); p += x.length; } return o; };

  const head = (m, n) => n < 24 ? new Uint8Array([(m << 5) | n]) : n < 256 ? new Uint8Array([(m << 5) | 24, n]) : n < 65536 ? new Uint8Array([(m << 5) | 25, n >> 8, n & 255]) : new Uint8Array([(m << 5) | 26, (n >>> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, n & 255]);
  const enc = (v) => {
    if (v instanceof Uint8Array) return cat(head(2, v.length), v);
    if (typeof v === "string") { const b = new TextEncoder().encode(v); return cat(head(3, b.length), b); }
    if (typeof v === "number") return v >= 0 ? head(0, v) : head(1, -1 - v);
    if (typeof v === "boolean") return new Uint8Array([v ? 0xf5 : 0xf4]);
    if (Array.isArray(v)) return cat(head(4, v.length), ...v.map(enc));
    if (v instanceof Map) return cat(head(5, v.size), ...[...v].flatMap(([k, x]) => [enc(k), enc(x)]));
    throw new Error("cbor: unsupported");
  };

  let libs = null;
  const load = async () => {
    if (!libs) {
      const [ed, blake] = await Promise.all([import("https://esm.sh/@noble/ed25519@2.1.0"), import("https://esm.sh/@noble/hashes@1.5.0/blake2b")]);
      libs = { ed, blake2b: blake.blake2b };
    }
    return libs;
  };
  let keys = null;
  const getKeys = async () => {
    if (keys) return keys;
    const { ed, blake2b } = await load();
    const priv = unhex(SEED_HEX);
    const pub = await ed.getPublicKeyAsync(priv);
    const stakePub = await ed.getPublicKeyAsync(unhex(STAKE_SEED_HEX));
    const h = (x) => blake2b(x, { dkLen: 28 });
    const addr = cat(new Uint8Array([0x00]), h(pub), h(stakePub));
    keys = { priv, pub, addr };
    return keys;
  };

  const api = {
    getNetworkId: async () => 0,
    getChangeAddress: async () => hex((await getKeys()).addr),
    getUsedAddresses: async () => [hex((await getKeys()).addr)],
    getRewardAddresses: async () => [],
    getBalance: async () => "1a00989680",
    getUtxos: async () => [],
    signData: async (addrHex, payloadHex) => {
      const { ed } = await load();
      const k = await getKeys();
      if (addrHex.toLowerCase() !== hex(k.addr)) throw { code: 1, info: "address mismatch" };
      const payload = unhex(payloadHex);
      const prot = enc(new Map([[1, -8], ["address", k.addr]]));
      const sigStructure = enc(["Signature1", prot, new Uint8Array(0), payload]);
      const sig = await ed.signAsync(sigStructure, k.priv);
      const coseSign1 = enc([prot, new Map([["hashed", false]]), payload, sig]);
      const coseKey = enc(new Map([[1, 1], [3, -8], [-1, 6], [-2, k.pub]]));
      window.__mockWalletSigned = (window.__mockWalletSigned || 0) + 1;
      return { signature: hex(coseSign1), key: hex(coseKey) };
    },
    signTx: async () => { throw { code: 2, info: "mock wallet does not sign transactions" }; },
    submitTx: async () => { throw { code: 2, info: "mock wallet does not submit" }; },
  };
  window.cardano = window.cardano || {};
  window.cardano.mockwallet = { name: "Mock Wallet (test)", apiVersion: "0.1.0", icon: "", enable: async () => api, isEnabled: async () => true };
})();
