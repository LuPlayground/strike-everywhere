import { StrikeHttp, query } from "./http.js";
import { parseDepthSnapshot, parseJsonKeepingIds, type DepthSnapshot } from "./book.js";
import { listFrom, numOrNull } from "./parse.js";
import type { FeeTiers, Kline, MarginTier, MarketSpec, PremiumIndex, Ticker24h, Vault } from "./types.js";

export function parseKlines(rows: unknown): Kline[] {
  if (!Array.isArray(rows)) return [];
  const out: Kline[] = [];
  for (const r of rows) {
    if (!Array.isArray(r)) continue;
    const k = { openTime: Number(r[0]), open: +r[1], high: +r[2], low: +r[3], close: +r[4], volume: +r[5] || 0 };
    if ([k.openTime, k.open, k.high, k.low, k.close].every((n) => Number.isFinite(n) && n > 0)) out.push(k);
  }
  return out.sort((a, b) => a.openTime - b.openTime);
}

export interface PublicTrade {
  id: number;
  price: number;
  size: number;
  time: number;
  side: "buy" | "sell";
}

export function parseTrades(rows: unknown): PublicTrade[] {
  if (!Array.isArray(rows)) return [];
  const out: PublicTrade[] = [];
  for (const r of rows) {
    const t = { id: Number(r?.id), price: Number(r?.price), size: Number(r?.qty), time: Number(r?.time), side: r?.isBuyerMaker ? ("sell" as const) : ("buy" as const) };
    if (Number.isFinite(t.id) && t.price > 0 && t.size > 0 && t.time > 0) out.push(t);
  }
  return out.sort((a, b) => b.time - a.time || b.id - a.id);
}

export function parseVault(v: any): Vault | null {
  if (!v || typeof v.vault_id !== "string" || typeof v.name !== "string") return null;
  return {
    id: v.vault_id,
    name: v.name,
    type: String(v.type ?? ""),
    status: String(v.status ?? ""),
    tvl: numOrNull(v.equity),
    aprPct: numOrNull(v.apr),
    periodReturnPct: numOrNull(v.period_return),
    allTimePnl: numOrNull(v.all_time_pnl),
    depositors: numOrNull(v.depositors),
  };
}

export interface RawMarket {
  symbol: string;
  name: string;
  base_asset: string;
  status: string;
  default_leverage: number;
  margin_tiers: MarginTier[];
  reduce_only: boolean;
  order_tick_price: string;
  order_limit_step_size: string;
  order_limit_min_size: string;
  order_market_step_size: string;
  order_min_notional: string;
  order_limit_price_bound: string;
  order_market_price_bound?: string;
  mark_price: string;
  index_price: string;
  last_price: string;
  bid1_price?: string;
  ask1_price?: string;
  funding_rate: string;
  next_funding_time: number;
}

export function toMarketSpec(m: RawMarket): MarketSpec {
  const tiers = Array.isArray(m.margin_tiers) ? m.margin_tiers : [];
  const stepSize = Number(m.order_limit_step_size);
  const marketStep = Number(m.order_market_step_size);
  return {
    symbol: m.symbol,
    name: m.name,
    baseAsset: m.base_asset,
    status: m.status,
    tickSize: Number(m.order_tick_price),
    stepSize,
    marketStepSize: marketStep > 0 ? marketStep : stepSize,
    minQty: Number(m.order_limit_min_size),
    minNotional: Number(m.order_min_notional),
    defaultLeverage: m.default_leverage,
    maxLeverage: Math.max(1, ...tiers.map((t) => Number(t.max_leverage) || 1)),
    marginTiers: tiers,
  };
}

export class MarketData {
  constructor(private readonly http: StrikeHttp) {}

  async markets(): Promise<RawMarket[]> {
    const j = await this.http.request<{ markets: Record<string, RawMarket> }>("GET", "/v2/markets", { auth: false });
    return Object.values(j.markets ?? {});
  }

  async tickers(): Promise<Ticker24h[]> {
    return this.http.request<Ticker24h[]>("GET", "/v2/ticker/24hr", { base: "price", auth: false });
  }

  async premiumIndex(symbol: string): Promise<PremiumIndex> {
    return this.http.request<PremiumIndex>("GET", `/v2/premiumIndex${query({ symbol })}`, { base: "price", auth: false });
  }

  async klines(symbol: string, interval = "1h", limit = 48, priceType: "last" | "mark" | "index" = "last"): Promise<Kline[]> {
    const rows = await this.http.request<unknown>("GET", `/v2/klines${query({ symbol, interval, limit, priceType: priceType === "last" ? undefined : priceType })}`, { base: "price", auth: false });
    return parseKlines(rows);
  }

  async depth(symbol: string, limit = 20): Promise<DepthSnapshot> {
    const j = await this.http.request<unknown>("GET", `/v2/depth${query({ symbol, limit: Math.max(1, Math.min(1000, Math.round(limit))) })}`, {
      base: "price",
      auth: false,
      parse: parseJsonKeepingIds,
    });
    const snap = parseDepthSnapshot(j);
    if (!snap) throw new Error("Malformed order book from Strike");
    if (snap.bids.length && snap.asks.length && snap.bids[0][0] >= snap.asks[0][0]) throw new Error("Crossed order book from Strike");
    return snap;
  }

  async trades(symbol: string, limit = 30): Promise<PublicTrade[]> {
    const rows = await this.http.request<unknown>("GET", `/v2/trades${query({ symbol, limit: Math.max(1, Math.min(500, Math.round(limit))) })}`, { base: "price", auth: false });
    return parseTrades(rows);
  }

  async openInterest(symbol: string): Promise<number | null> {
    const j = await this.http.request<any>("GET", `/v2/openInterest${query({ symbol })}`, { base: "price", auth: false });
    return numOrNull(j?.openInterest);
  }

  async fundingHistory(symbol: string, days = 7): Promise<Array<{ time: number; rate: number }>> {
    const j = await this.http.request<any>("GET", `/v1/stats/coin/history/funding${query({ symbol, days: Math.max(1, Math.min(90, Math.round(days))) })}`, { base: "stat", auth: false });
    const rows: unknown[] = Array.isArray(j?.data) ? j.data : [];
    return rows
      .map((r) => (Array.isArray(r) ? { time: Number(r[0]), rate: Number(r[1]) } : null))
      .filter((r): r is { time: number; rate: number } => !!r && r.time > 0 && Number.isFinite(r.rate))
      .sort((a, b) => a.time - b.time);
  }

  async vaults(limit = 20): Promise<Vault[]> {
    const j = await this.http.request<unknown>("GET", `/v2/vaults${query({ limit })}`, { auth: false });
    return listFrom(j, "vaults").map(parseVault).filter((v): v is Vault => v !== null);
  }

  async feeTiers(): Promise<FeeTiers> {
    return this.http.request<FeeTiers>("GET", "/v2/fee-tiers", { auth: false });
  }

  async baseTakerRate(): Promise<number> {
    try {
      const f = await this.feeTiers();
      const t0 = f.feeTiers?.find((t) => t.Tier === 0);
      return t0?.TakerRate ?? 0.0005;
    } catch {
      return 0.0005;
    }
  }
}
