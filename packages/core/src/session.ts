import type { BuilderSession } from "./builderConnect.js";

export type PersistMode = "memory" | "session";

interface Stored {
  session: BuilderSession;
  privateKeyHex: string;
  expiresAt: number;
}

export class SessionStore {
  private mem: Stored | null = null;

  constructor(private readonly mode: PersistMode, private readonly storageKey: string, private readonly ttlMs: number) {}

  save(session: BuilderSession, privateKeyHex: string): void {
    const s: Stored = { session, privateKeyHex, expiresAt: Date.now() + this.ttlMs };
    this.mem = s;
    if (this.mode === "session") {
      try {
        sessionStorage.setItem(this.storageKey, JSON.stringify(s));
      } catch {
      }
    }
  }

  load(): Stored | null {
    let s = this.mem;
    if (!s && this.mode === "session") {
      try {
        const raw = sessionStorage.getItem(this.storageKey);
        s = raw ? (JSON.parse(raw) as Stored) : null;
      } catch {
        s = null;
      }
    }
    if (s && s.expiresAt < Date.now()) {
      this.clear();
      return null;
    }
    return s;
  }

  clear(): void {
    this.mem = null;
    try {
      sessionStorage.removeItem(this.storageKey);
    } catch {
    }
  }
}
