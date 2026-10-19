import type { MarketData } from "./market.js";
import type { PriceStream } from "./ws.js";

export type BookLevel = [number, number];

export interface DepthSnapshot {
  lastUpdateId: bigint;
  bids: BookLevel[];
  asks: BookLevel[];
}

export interface DepthDiff {
  symbol: string;
  u: bigint;
  bids: BookLevel[];
  asks: BookLevel[];
}

export interface BookView {
  bids: BookLevel[];
  asks: BookLevel[];
  bestBid: number;
  bestAsk: number;
  mid: number;
  spread: number;
}

export function parseJsonKeepingIds(text: string): any {
  return JSON.parse(text.replace(/"(lastUpdateId|U|u)":\s*(\d+)/g, '"$1":"$2"'));
}

export function toSeqId(v: unknown): bigint | null {
  const s = typeof v === "number" ? (Number.isSafeInteger(v) && v >= 0 ? String(v) : "") : typeof v === "string" ? v.trim() : typeof v === "bigint" ? String(v) : "";
  return /^\d{1,20}$/.test(s) ? BigInt(s) : null;
}

export function parseLevels(raw: unknown): BookLevel[] {
  if (!Array.isArray(raw)) return [];
  const out: BookLevel[] = [];
  for (const r of raw) {
    if (!Array.isArray(r)) continue;
    const p = Number(r[0]);
    const q = Number(r[1]);
    if (Number.isFinite(p) && p > 0 && Number.isFinite(q) && q >= 0) out.push([p, q]);
  }
  return out;
}

export function parseDepthSnapshot(j: any): DepthSnapshot | null {
  const id = toSeqId(j?.lastUpdateId);
  if (id === null) return null;
  return { lastUpdateId: id, bids: parseLevels(j.bids).filter((l) => l[1] > 0), asks: parseLevels(j.asks).filter((l) => l[1] > 0) };
}

export function parseDepthDiff(msg: any): DepthDiff | null {
  if (msg?.e !== "depthUpdate" || typeof msg.s !== "string") return null;
  const u = toSeqId(msg.u);
  if (u === null) return null;
  return { symbol: msg.s, u, bids: parseLevels(msg.b), asks: parseLevels(msg.a) };
}

export class LocalBook {
  private bids = new Map<number, number>();
  private asks = new Map<number, number>();
  lastUpdateId: bigint | null = null;

  constructor(private readonly maxLevels = 400) {}

  reset(snap: DepthSnapshot): void {
    this.bids = new Map(snap.bids);
    this.asks = new Map(snap.asks);
    this.lastUpdateId = snap.lastUpdateId;
  }

  get synced(): boolean {
    return this.lastUpdateId !== null;
  }

  apply(d: DepthDiff): boolean {
    if (this.lastUpdateId === null || d.u <= this.lastUpdateId) return false;
    for (const [p, q] of d.bids) q > 0 ? this.bids.set(p, q) : this.bids.delete(p);
    for (const [p, q] of d.asks) q > 0 ? this.asks.set(p, q) : this.asks.delete(p);
    this.lastUpdateId = d.u;
    if (this.bids.size > this.maxLevels) this.prune(this.bids, true);
    if (this.asks.size > this.maxLevels) this.prune(this.asks, false);
    return true;
  }

  private prune(side: Map<number, number>, desc: boolean): void {
    const keep = [...side.keys()].sort((a, b) => (desc ? b - a : a - b)).slice(0, this.maxLevels);
    const next = new Map<number, number>();
    for (const p of keep) next.set(p, side.get(p)!);
    side === this.bids ? (this.bids = next) : (this.asks = next);
  }

  view(depth = 1000): BookView | null {
    if (!this.synced) return null;
    const bids = [...this.bids].sort((a, b) => b[0] - a[0]).slice(0, depth);
    const asks = [...this.asks].sort((a, b) => a[0] - b[0]).slice(0, depth);
    return makeView(bids, asks);
  }
}

export function makeView(bids: BookLevel[], asks: BookLevel[]): BookView | null {
  if (!bids.length && !asks.length) return null;
  const bestBid = bids.length ? bids[0][0] : NaN;
  const bestAsk = asks.length ? asks[0][0] : NaN;
  const both = bids.length > 0 && asks.length > 0;
  if (both && !(bestBid < bestAsk)) return null;
  return { bids, asks, bestBid, bestAsk, mid: both ? (bestBid + bestAsk) / 2 : NaN, spread: both ? bestAsk - bestBid : NaN };
}

export interface FillEstimate {
  avgPrice: number;
  filled: number;
  complete: boolean;
  worstPrice: number;
  slippage: number;
  beyondBand: boolean;
}

export function estimateMarketFill(book: BookView, side: "buy" | "sell", size: number, opts: { mark?: number; bound?: number } = {}): FillEstimate | null {
  if (!(size > 0)) return null;
  const levels = side === "buy" ? book.asks : book.bids;
  if (!levels.length) return null;
  const ref = opts.mark && opts.mark > 0 ? opts.mark : Number.isFinite(book.mid) ? book.mid : levels[0][0];
  const bound = opts.mark && opts.mark > 0 ? opts.bound ?? 0.05 : Infinity;
  const limit = side === "buy" ? ref * (1 + bound) : ref * (1 - bound);
  let left = size;
  let cost = 0;
  let worst = levels[0][0];
  let beyondBand = false;
  for (const [p, q] of levels) {
    if (left <= 0) break;
    if (side === "buy" ? p > limit : p < limit) {
      beyondBand = true;
      break;
    }
    const take = Math.min(left, q);
    cost += take * p;
    left -= take;
    worst = p;
  }
  const filled = size - Math.max(0, left);
  const avg = filled > 0 ? cost / filled : levels[0][0];
  const slippage = ref > 0 ? (side === "buy" ? avg - ref : ref - avg) / ref : 0;
  return { avgPrice: avg, filled, complete: left <= size * 1e-9, worstPrice: worst, slippage: Math.max(0, slippage), beyondBand };
}

export class OrderBookFeed {
  private book = new LocalBook();
  private recent: Array<{ at: number; d: DepthDiff }> = [];
  private listeners = new Set<(v: BookView | null) => void>();
  private offs: Array<() => void> = [];
  private timeout?: ReturnType<typeof setTimeout>;
  private interval?: ReturnType<typeof setInterval>;
  private syncing = false;
  private lastResync = 0;
  private closed = false;

  constructor(
    private readonly market: Pick<MarketData, "depth">,
    private readonly stream: Pick<PriceStream, "subscribe" | "unsubscribe" | "onMessage" | "onState">,
    readonly symbol: string,
    private readonly opts: { snapshotDepth?: number; resyncMs?: number } = {},
  ) {}

  start(): this {
    this.offs.push(
      this.stream.onMessage((msg) => this.onMessage(msg)),
      this.stream.onState((s) => {
        if (s !== "open") return;
        void this.resync(true);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.resync(true), 6000);
      }),
    );
    this.stream.subscribe("depth", this.symbol);
    void this.resync(true);
    this.timeout = setTimeout(() => this.resync(true), 6000);
    this.interval = setInterval(() => this.resync(false), this.opts.resyncMs ?? 30_000);
    return this;
  }

  onUpdate(fn: (v: BookView | null) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  view(depth?: number): BookView | null {
    return this.book.view(depth);
  }

  close(): void {
    this.closed = true;
    this.offs.forEach((f) => f());
    this.offs = [];
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.listeners.clear();
    this.stream.unsubscribe("depth", this.symbol);
  }

  private emit(): void {
    const v = this.book.view();
    this.listeners.forEach((f) => f(v));
  }

  private onMessage(msg: any): void {
    if (this.closed) return;
    const d = parseDepthDiff(msg);
    if (!d || d.symbol !== this.symbol) return;
    const now = Date.now();
    this.recent.push({ at: now, d });
    while (this.recent.length > 600 || (this.recent.length && now - this.recent[0].at > 15_000)) this.recent.shift();
    if (!this.book.apply(d)) return;
    if (!this.book.view(1)) {
      this.emit();
      void this.resync(false);
      return;
    }
    this.emit();
  }

  async resync(force: boolean): Promise<void> {
    if (this.closed || this.syncing || (!force && Date.now() - this.lastResync < 3000)) return;
    this.syncing = true;
    this.lastResync = Date.now();
    try {
      const snap = await this.market.depth(this.symbol, this.opts.snapshotDepth ?? 200);
      if (this.closed) return;
      const next = new LocalBook();
      next.reset(snap);
      for (const { d } of this.recent) next.apply(d);
      if (!this.book.synced || !this.book.view(1) || (next.lastUpdateId ?? 0n) >= (this.book.lastUpdateId ?? 0n)) {
        if (next.view(1) || !this.book.view(1)) this.book = next;
      }
      this.emit();
    } catch {
    } finally {
      this.syncing = false;
    }
  }
}
