
export type Side = "buy" | "sell";
export type OrderType = "limit" | "market" | "stop" | "stop_limit" | "take_profit" | "take_profit_limit" | "trailing_stop_market";
export type OrderStatus = "pending" | "open" | "filled" | "canceled" | "untriggered" | "rejected" | "expired";
export type TimeInForce = "GTC" | "IOC" | "FOK";

export interface MarginTier {
  max_notional: string;
  max_leverage: number;
  maintenance_margin_rate: string;
  maintenance_amount: string;
}

export interface MarketSpec {
  symbol: string;
  name: string;
  baseAsset: string;
  status: string;
  tickSize: number;
  stepSize: number;
  minQty: number;
  minNotional: number;
  defaultLeverage: number;
  maxLeverage: number;
  marginTiers: MarginTier[];
}

export interface Ticker24h {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  quoteVolume: string;
}

export interface PremiumIndex {
  symbol: string;
  markPrice: string;
  indexPrice: string;
  fundingRate: string;
  nextFundingTime: number;
}

export interface Account {
  account_id: string;
  blockchain: string;
  blockchain_address: string | null;
  wallet_balance: string;
  available_balance: string;
  unrealized_pnl: string;
  margin_balance: string;
  total_margin: string;
  maintenance_margin: string;
  default_margin_mode: "cross" | "isolated";
  default_leverage: number;
}

export interface Position {
  id: number;
  symbol: string;
  margin_mode: "cross" | "isolated";
  leverage: number;
  size: string;
  entry_price: string;
  upnl: string;
  liquidation_price: string;
  bankruptcy_price: string;
  maintenance_margin: string;
  accumulated_funding_fees: string;
  create_timestamp: number;
  update_timestamp: number;
}

export interface OrderHistoryEntry {
  id: number;
  client_order_id: string;
  account_id: string;
  symbol: string;
  side: Side;
  status: OrderStatus;
  type: OrderType;
  size: string;
  filled: string;
  price: string;
  stop_price: string;
  reduce_only: boolean;
  close_reason: string | null;
  error_message?: string | null;
  create_timestamp: number;
}

export interface Fill {
  id: number;
  trade_id: number;
  order_id: number;
  account_id: string;
  symbol: string;
  side: Side;
  role: "maker" | "taker";
  price: string;
  size: string;
  realized_pnl: string;
  fee: string;
  timestamp: number;
}

export interface FeeTiers {
  feeTiers?: Array<{ Tier: number; MinVolume: number; TakerRate: number; MakerRate: number }>;
  [k: string]: unknown;
}

export interface Kline {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
