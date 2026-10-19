import type { ApiWalletKey } from "./signer.js";
import { signLogon } from "./signer.js";
import { parseJsonKeepingIds } from "./book.js";

type Listener = (msg: any) => void;

abstract class ReconnectingSocket {
  protected ws: WebSocket | null = null;
  private listeners = new Set<Listener>();
  private stateListeners = new Set<(s: "open" | "closed") => void>();
  private retry = 0;
  private closedByUser = false;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
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
    this.clearTimers();
    let ws: WebSocket;
    try {
      ws = new this.WS(this.url);
    } catch {
      this.scheduleReconnect();
      return;
    }
    this.ws = ws;
    let openedAt = 0;
    const current = () => this.ws === ws && !this.closedByUser;
    ws.onopen = async () => {
      if (!current()) return;
      openedAt = Date.now();
      try {
        await this.onOpen();
      } catch (e) {
        console.warn("[strike-everywhere] socket init failed", e);
      }
      if (!current()) return;
      this.stateListeners.forEach((f) => f("open"));
      if (this.pingTimer) clearInterval(this.pingTimer);
      this.pingTimer = setInterval(() => this.send({ method: "ping", id: "hb" }), 30_000);
    };
    ws.onmessage = (ev) => {
      if (this.ws !== ws) return;
      const text = typeof ev.data === "string" ? ev.data : "";
      for (const line of text.split("\n")) {
        const t = line.trim();
        if (!t) continue;
        let msg: any;
        try {
          msg = this.parse(t);
        } catch {
          continue;
        }
        if (msg?.method === "pong" || msg?.result === "pong") continue;
        this.listeners.forEach((f) => f(msg));
      }
    };
    ws.onclose = () => {
      if (!current()) return;
      this.clearTimers();
      this.stateListeners.forEach((f) => f("closed"));
      if (openedAt && Date.now() - openedAt > 20_000) this.retry = 0;
      this.scheduleReconnect();
    };
    ws.onerror = () => ws.close();
  }

  private scheduleReconnect(): void {
    if (this.closedByUser) return;
    const delay = Math.min(30_000, 500 * 2 ** Math.min(this.retry++, 6));
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.closedByUser) this.connect();
    }, delay);
  }

  private clearTimers(): void {
    if (this.pingTimer) clearInterval(this.pingTimer);
    this.pingTimer = null;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
  }

  close(): void {
    this.closedByUser = true;
    this.clearTimers();
    const ws = this.ws;
    this.ws = null;
    ws?.close();
  }

  protected send(obj: Record<string, unknown>): void {
    if (this.ws?.readyState === 1) this.ws.send(JSON.stringify({ id: this.nextId++, ...obj }));
  }

  protected abstract onOpen(): Promise<void>;

  protected parse(text: string): any {
    return JSON.parse(text);
  }
}

export class PriceStream extends ReconnectingSocket {
  private subs = new Map<string, Record<string, unknown>>();

  protected parse(text: string): any {
    return text.includes('"depthUpdate"') ? parseJsonKeepingIds(text) : JSON.parse(text);
  }

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

const LOGON_ID = 900_001;

export class UserStream extends ReconnectingSocket {
  constructor(url: string, private readonly key: ApiWalletKey, private readonly serverNowMs: () => number = () => Date.now() - 500, WS?: typeof WebSocket) {
    super(url, WS);
    this.onMessage((msg) => {
      if (msg?.result?.authenticated) {
        this.send({ method: "subscribe", channel: "userstream" });
        return;
      }
      if (msg?.id === LOGON_ID && !this.triedAltLogon) {
        this.triedAltLogon = true;
        void this.logon(true);
      }
    });
  }

  private triedAltLogon = false;

  private async logon(alt: boolean): Promise<void> {
    const ts = this.serverNowMs();
    const pk = this.key.publicKeyHex;
    const signature = alt ? await this.key.sign(`apiKey=${pk}&timestamp=${ts}`) : await signLogon(this.key, ts);
    this.send({ id: alt ? LOGON_ID + 1 : LOGON_ID, method: "session.logon", params: { apiKey: pk, signature, timestamp: ts } });
  }

  protected async onOpen(): Promise<void> {
    this.triedAltLogon = false;
    await this.logon(false);
  }
}
