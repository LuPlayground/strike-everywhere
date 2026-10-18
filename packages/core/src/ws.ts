import type { ApiWalletKey } from "./signer.js";
import { signLogon } from "./signer.js";

type Listener = (msg: any) => void;

abstract class ReconnectingSocket {
  protected ws: WebSocket | null = null;
  private listeners = new Set<Listener>();
  private stateListeners = new Set<(s: "open" | "closed") => void>();
  private retry = 0;
  private closedByUser = false;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private nextId = 1;

  constructor(protected readonly url: string, private readonly WS: typeof WebSocket = globalThis.WebSocket) {}

  onMessage(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  onState(fn: (s: "open" | "closed") => void): () => void {
    this.stateListeners.add(fn);
    return () => this.stateListeners.delete(fn);
  }

  connect(): void {
    this.closedByUser = false;
    const ws = new this.WS(this.url);
    this.ws = ws;
    ws.onopen = async () => {
      this.retry = 0;
      try {
        await this.onOpen();
      } catch (e) {
        console.warn("[strike-everywhere] socket init failed", e);
      }
      this.stateListeners.forEach((f) => f("open"));
      this.pingTimer = setInterval(() => this.send({ method: "ping", id: "hb" }), 30_000);
    };
    ws.onmessage = (ev) => {
      const text = typeof ev.data === "string" ? ev.data : "";
      for (const line of text.split("\n")) {
        const t = line.trim();
        if (!t) continue;
        let msg: any;
        try {
          msg = JSON.parse(t);
        } catch {
          continue;
        }
        if (msg?.method === "pong" || msg?.result === "pong") continue;
        this.listeners.forEach((f) => f(msg));
      }
    };
    ws.onclose = () => {
      if (this.pingTimer) clearInterval(this.pingTimer);
      this.stateListeners.forEach((f) => f("closed"));
      if (this.closedByUser) return;
      const delay = Math.min(30_000, 500 * 2 ** this.retry++);
      setTimeout(() => !this.closedByUser && this.connect(), delay);
    };
    ws.onerror = () => ws.close();
  }

  close(): void {
    this.closedByUser = true;
    if (this.pingTimer) clearInterval(this.pingTimer);
    this.ws?.close();
    this.ws = null;
  }

  protected send(obj: Record<string, unknown>): void {
    if (this.ws?.readyState === 1) this.ws.send(JSON.stringify({ id: this.nextId++, ...obj }));
  }

  protected abstract onOpen(): Promise<void>;
}

export class PriceStream extends ReconnectingSocket {
  private subs = new Map<string, Record<string, unknown>>();

  subscribe(channel: string, symbol?: string): void {
    const key = `${channel}|${symbol ?? ""}`;
    const req = { method: "subscribe", channel, ...(symbol ? { symbol } : {}) };
    this.subs.set(key, req);
    this.send(req);
  }

  unsubscribe(channel: string, symbol?: string): void {
    this.subs.delete(`${channel}|${symbol ?? ""}`);
    this.send({ method: "unsubscribe", channel, ...(symbol ? { symbol } : {}) });
  }

  protected async onOpen(): Promise<void> {
    for (const req of this.subs.values()) this.send(req);
  }
}

export class UserStream extends ReconnectingSocket {
  constructor(url: string, private readonly key: ApiWalletKey, private readonly clockSkewMs = 0, WS?: typeof WebSocket) {
    super(url, WS);
    this.onMessage((msg) => {
      if (msg?.result?.authenticated) this.send({ method: "subscribe", channel: "userstream" });
    });
  }

  protected async onOpen(): Promise<void> {
    const ts = Date.now() + this.clockSkewMs;
    const signature = await signLogon(this.key, ts);
    this.send({ method: "session.logon", params: { apiKey: this.key.publicKeyHex, signature, timestamp: ts } });
  }
}
