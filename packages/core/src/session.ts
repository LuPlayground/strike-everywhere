import type { BuilderSession } from "./builderConnect.js";
import { uuid } from "./bytes.js";
import { ApiWalletKey } from "./signer.js";

export type PersistMode = "memory" | "session";

interface Meta {
  v: 2;
  session: BuilderSession;
  keyId: string;
  publicKeyHex: string;
  expiresAt: number;
  lastActive: number;
}

export interface KeyRecord {
  id: string;
  key: CryptoKey;
  publicKeyHex: string;
  expiresAt: number;
  lastActive: number;
}

export interface KeyVault {
  put(r: KeyRecord): Promise<void>;
  get(id: string): Promise<KeyRecord | null>;
  delete(id: string): Promise<void>;
  purge(stale: (r: KeyRecord) => boolean): Promise<void>;
}

type MetaStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export interface Loaded {
  session: BuilderSession;
  key: ApiWalletKey;
}

interface Live extends Loaded {
  keyId: string | null;
  expiresAt: number;
  lastActive: number;
}

const TOUCH_WRITE_MS = 60_000;

export class SessionStore {
  private live: Live | null = null;
  private lastWrite = 0;

  constructor(
    private readonly mode: PersistMode,
    private readonly storageKey: string,
    private readonly ttlMs: number,
    private readonly idleMs: number,
    private readonly meta: MetaStorage | null = defaultMetaStorage(),
    private readonly vault: KeyVault | null = defaultVault(),
  ) {}

  private stale(expiresAt: number, lastActive: number, now = Date.now()): boolean {
    return !(Number(expiresAt) > now) || (this.idleMs > 0 && !(now - Number(lastActive) <= this.idleMs));
  }

  expiry(now = Date.now()): "expired" | "idle" | null {
    const l = this.live;
    if (!l) return null;
    if (!(Number(l.expiresAt) > now)) return "expired";
    if (this.idleMs > 0 && !(now - Number(l.lastActive) <= this.idleMs)) return "idle";
    return null;
  }

  async save(session: BuilderSession, key: ApiWalletKey): Promise<void> {
    const prev = this.readMeta();
    const now = Date.now();
    const live: Live = { session, key, keyId: null, expiresAt: now + this.ttlMs, lastActive: now };
    this.live = live;
    this.lastWrite = now;
    if (prev) void this.vault?.delete(prev.keyId).catch(() => {});
    this.removeMeta();
    if (this.mode !== "session" || !key.cryptoKey || !this.meta || !this.vault) return;
    try {
      const keyId = uuid();
      await this.vault.put({ id: keyId, key: key.cryptoKey, publicKeyHex: key.publicKeyHex, expiresAt: live.expiresAt, lastActive: now });
      if (this.live !== live) return void this.vault.delete(keyId).catch(() => {});
      live.keyId = keyId;
      const m: Meta = { v: 2, session, keyId, publicKeyHex: key.publicKeyHex, expiresAt: live.expiresAt, lastActive: now };
      this.meta.setItem(this.storageKey, JSON.stringify(m));
    } catch {
    }
  }

  async load(): Promise<Loaded | null> {
    if (this.live) {
      if (this.expiry()) return this.clear(), null;
      return { session: this.live.session, key: this.live.key };
    }
    if (this.mode !== "session") return null;
    void this.vault?.purge((r) => this.stale(r.expiresAt, r.lastActive)).catch(() => {});
    const m = this.readMeta();
    if (!m) return null;
    if (this.stale(m.expiresAt, m.lastActive) || !this.vault) return this.clear(), null;
    try {
      const rec = await this.vault.get(m.keyId);
      if (!rec || rec.publicKeyHex !== m.publicKeyHex) return this.clear(), null;
      const key = await ApiWalletKey.fromCryptoKey(rec.key, m.publicKeyHex);
      this.live = { session: m.session, key, keyId: m.keyId, expiresAt: m.expiresAt, lastActive: m.lastActive };
      return { session: m.session, key };
    } catch {
      this.clear();
      return null;
    }
  }

  touch(now = Date.now()): void {
    const live = this.live;
    if (!live || this.expiry(now)) return;
    live.lastActive = now;
    if (now - this.lastWrite < TOUCH_WRITE_MS || !live.keyId) return;
    this.lastWrite = now;
    const m = this.readMeta();
    if (m && m.keyId === live.keyId) {
      try {
        this.meta?.setItem(this.storageKey, JSON.stringify({ ...m, lastActive: now }));
      } catch {
      }
    }
    if (live.key.cryptoKey) {
      void this.vault?.put({ id: live.keyId, key: live.key.cryptoKey, publicKeyHex: live.key.publicKeyHex, expiresAt: live.expiresAt, lastActive: now }).catch(() => {});
    }
  }

  clear(onlyIfPublicKeyHex?: string): void {
    this.live = null;
    const m = this.readMeta();
    if (!m) return this.removeMeta();
    if (onlyIfPublicKeyHex && m.publicKeyHex !== onlyIfPublicKeyHex) return;
    this.removeMeta();
    void this.vault?.delete(m.keyId).catch(() => {});
  }

  private readMeta(): Meta | null {
    let raw: string | null = null;
    try {
      raw = this.meta?.getItem(this.storageKey) ?? null;
    } catch {
      return null;
    }
    if (!raw) return null;
    try {
      const m = JSON.parse(raw) as Meta;
      if (m && m.v === 2 && typeof m.keyId === "string" && typeof m.publicKeyHex === "string" && m.session && !("privateKeyHex" in m)) return m;
    } catch {
    }
    this.removeMeta();
    return null;
  }

  private removeMeta(): void {
    try {
      this.meta?.removeItem(this.storageKey);
    } catch {
    }
  }
}

function defaultMetaStorage(): MetaStorage | null {
  try {
    return typeof sessionStorage !== "undefined" ? sessionStorage : null;
  } catch {
    return null;
  }
}

function defaultVault(): KeyVault | null {
  try {
    return typeof indexedDB !== "undefined" ? new IndexedDbVault() : null;
  } catch {
    return null;
  }
}

const DB = "strike-everywhere-keys";
const STORE = "keys";

export class IndexedDbVault implements KeyVault {
  private db: Promise<IDBDatabase> | null = null;

  private open(): Promise<IDBDatabase> {
    this.db ??= new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error("IndexedDB blocked"));
    }).catch((e) => {
      this.db = null;
      throw e;
    });
    return this.db;
  }

  private async run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest | void): Promise<T> {
    const db = await this.open();
    return new Promise<T>((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const req = fn(tx.objectStore(STORE));
      tx.oncomplete = () => resolve((req ? req.result : undefined) as T);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  async put(r: KeyRecord): Promise<void> {
    await this.run("readwrite", (s) => s.put(r));
  }

  async get(id: string): Promise<KeyRecord | null> {
    return ((await this.run<KeyRecord | undefined>("readonly", (s) => s.get(id))) ?? null) as KeyRecord | null;
  }

  async delete(id: string): Promise<void> {
    await this.run("readwrite", (s) => s.delete(id));
  }

  async purge(stale: (r: KeyRecord) => boolean): Promise<void> {
    await this.run("readwrite", (s) => {
      const cur = s.openCursor();
      cur.onsuccess = () => {
        const c = cur.result;
        if (!c) return;
        if (stale(c.value as KeyRecord)) c.delete();
        c.continue();
      };
    });
  }
}
