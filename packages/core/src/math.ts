import type { MarginTier, Position, Side } from "./types.js";

export function positionMargin(p: Pick<Position, "margin_mode" | "size" | "entry_price" | "leverage" | "iso_balance">): number {
  const iso = Number(p.iso_balance);
  if (p.margin_mode === "isolated" && iso > 0) return iso;
  return (Math.abs(Number(p.size)) * Number(p.entry_price)) / Math.max(1, Number(p.leverage) || 1);
}

export function tierForNotional(tiers: MarginTier[], notional: number): MarginTier | undefined {
  const sorted = [...tiers].sort((a, b) => Number(a.max_notional) - Number(b.max_notional));
  return sorted.find((t) => notional <= Number(t.max_notional)) ?? sorted[sorted.length - 1];
}

export function maxLeverageFor(tiers: MarginTier[], notional: number): number {
  return tierForNotional(tiers, notional)?.max_leverage ?? 1;
}

export function estimateLiquidationPrice(p: { side: Side; entry: number; leverage: number; notional: number; tiers: MarginTier[] }): number {
  const tier = tierForNotional(p.tiers, p.notional);
  const mmr = Number(tier?.maintenance_margin_rate ?? 0.01);
  const maintAmt = Number(tier?.maintenance_amount ?? 0);
  const qty = p.notional / p.entry;
  const margin = p.notional / p.leverage;
  if (p.side === "buy") {
    return Math.max(0, (qty * p.entry - margin - maintAmt) / (qty * (1 - mmr)));
  }
  return (margin + qty * p.entry + maintAmt) / (qty * (1 + mmr));
}

export interface OrderPreview {
  notional: number;
  margin: number;
  strikeFee: number;
  builderFee: number;
  totalFee: number;
  liquidationPrice: number;
  liquidationDistance: number;
}

export function previewOrder(p: {
  side: Side;
  price: number;
  notional: number;
  leverage: number;
  takerRate: number;
  builderFeeBps: number;
  tiers: MarginTier[];
}): OrderPreview {
  const strikeFee = p.notional * p.takerRate;
  const builderFee = (p.notional * p.builderFeeBps) / 10_000;
  const liq = estimateLiquidationPrice({ side: p.side, entry: p.price, leverage: p.leverage, notional: p.notional, tiers: p.tiers });
  return {
    notional: p.notional,
    margin: p.notional / p.leverage,
    strikeFee,
    builderFee,
    totalFee: strikeFee + builderFee,
    liquidationPrice: liq,
    liquidationDistance: p.price > 0 ? Math.abs(p.price - liq) / p.price : 0,
  };
}
