import { uuid } from "./bytes.js";
import type { NetworkConfig } from "./config.js";
import { ApiWalletKey, signRequest } from "./signer.js";

export class StrikeApiError extends Error {
  constructor(public status: number, message: string, public body: unknown, public path: string) {
    super(message);
    this.name = "StrikeApiError";
  }
}

export type Base = "api" | "price" | "stat";

export interface RequestOptions {
  body?: unknown;
  auth?: boolean;
  builderFeeBps?: number;
  base?: Base;
  signal?: AbortSignal;
}

const TIMESTAMP_REJECTED = /signature expired|invalid timestamp/i;

export class StrikeHttp {
  clockSkewMs = 0;
  key: ApiWalletKey | null = null;

  constructor(public readonly net: NetworkConfig, private readonly fetchImpl: typeof fetch = globalThis.fetch.bind(globalThis)) {}

  get clockSkewSec(): number {
    return Math.round(this.clockSkewMs / 1000);
  }

  async syncClock(): Promise<void> {
    try {
      const t0 = Date.now();
      const j = await this.request<{ serverTime: number }>("GET", "/v2/time", { auth: false });
      const t1 = Date.now();
      if (Number.isFinite(j?.serverTime)) this.clockSkewMs = j.serverTime - (t0 + t1) / 2;
    } catch {
    }
  }

  serverNowMs(): number {
    return Math.floor(Date.now() + this.clockSkewMs - 500);
  }

  async request<T = any>(method: string, path: string, opts: RequestOptions = {}): Promise<T> {
    try {
      return await this.send<T>(method, path, opts);
    } catch (e) {
      if (e instanceof StrikeApiError && (opts.auth ?? (opts.base ?? "api") === "api") && TIMESTAMP_REJECTED.test(e.message)) {
        await this.syncClock();
        return this.send<T>(method, path, opts);
      }
      throw e;
    }
  }

  private async send<T>(method: string, path: string, opts: RequestOptions): Promise<T> {
    const base = opts.base ?? "api";
    const auth = opts.auth ?? base === "api";
    const body = opts.body === undefined ? "" : JSON.stringify(opts.body);
    const headers: Record<string, string> = {};
    if (body) headers["Content-Type"] = "application/json";
    if (auth) {
      if (!this.key) throw new StrikeApiError(401, "Not connected: connect a wallet first.", null, path);
      const ts = Math.floor(this.serverNowMs() / 1000);
      Object.assign(headers, await signRequest(this.key, method, path, body, ts, uuid()));
    }
    if (opts.builderFeeBps !== undefined) headers["X-Builder-Fee-Bps"] = String(opts.builderFeeBps);

    const url = (base === "price" ? this.net.price : base === "stat" ? this.net.stat : this.net.api) + path;
    const res = await this.fetchImpl(url, { method, headers, body: body || undefined, signal: opts.signal });
    const text = await res.text();
    let json: any = text;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
    }
    if (!res.ok) {
      const msg = (json && (json.error || json.msg || json.message)) || `HTTP ${res.status}`;
      throw new StrikeApiError(res.status, String(msg), json, path);
    }
    return json as T;
  }
}

export const query = (params: Record<string, string | number | boolean | undefined | null>): string => {
  const parts = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return parts.length ? `?${parts.join("&")}` : "";
};
