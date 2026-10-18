import { StrikeHttp, query } from "./http.js";
import type { FeeTiers, Kline, MarginTier, MarketSpec, PremiumIndex, Ticker24h } from "./types.js";

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
  mark_price: string;
  index_price: string;
  last_price: string;
  bid1_price?: string;
  ask1_price?: string;
  funding_rate: string;
  next_funding_time: number;
}

export function toMarketSpec(m: RawMarket): MarketSpec {
  return {
    symbol: m.symbol,
    name: m.name,
    baseAsset: m.base_asset,
    status: m.status,
    tickSize: Number(m.order_tick_price),
    stepSize: Number(m.order_limit_step_size),
    minQty: Number(m.order_limit_min_size),
    minNotional: Number(m.order_min_notional),
    defaultLeverage: m.default_leverage,
    maxLeverage: Math.max(1, ...m.margin_tiers.map((t) => t.max_leverage)),
    marginTiers: m.margin_tiers,
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

  async klines(symbol: string, interval = "1h", limit = 48): Promise<Kline[]> {
    const rows = await this.http.request<any[][]>("GET", `/v2/klines${query({ symbol, interval, limit })}`, { base: "price", auth: false });
    return rows.map((r) => ({ openTime: Number(r[0]), open: +r[1], high: +r[2], low: +r[3], close: +r[4], volume: +r[5] }));
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
