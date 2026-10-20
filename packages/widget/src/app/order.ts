import { maxLeverageFor, previewOrder, roundToStep, type MarketSpec, type Side } from "@strike-everywhere/core";

export type AppOrderType = "market" | "limit";
export type Unit = "usd" | "base";
export type AutoMode = "pnl" | "price";

export interface Draft {
  symbol: string;
  side: Side;
  type: AppOrderType;
  amount: number;
  unit: Unit;
  leverage: number;
  limitPrice: number;
  tp: number;
  sl: number;
  autoMode: AutoMode;
}

export interface DraftCtx {
  spec: MarketSpec | undefined;
  mark: number;
  available: number;
  takerRate: number;
  feeBps: number;
  maxLeverage: number;
  limitBound: number;
}

export interface Sized {
  ok: boolean;
  problem: string | null;
  kind: "empty" | "min" | "funds" | "price" | "tpsl" | "load" | null;
  px: number;
  lev: number;
  levCap: number;
  size: number;
  notional: number;
  margin: number;
  fee: number;
  feeRate: number;
  liq: number;
  liqDistance: number;
  minMargin: number;
  maxMargin: number;
  tpPrice: number;
  slPrice: number;
  step: number;
}

const ceil2 = (v: number) => Math.ceil(v * 100 - 1e-9) / 100;
const floor2 = (v: number) => Math.floor(v * 100 + 1e-9) / 100;

export function priceForPnl(side: Side, entry: number, lev: number, pct: number): number {
  const move = pct / 100 / Math.max(1, lev);
  return side === "buy" ? entry * (1 + move) : entry * (1 - move);
}

export function pnlForPrice(side: Side, entry: number, lev: number, price: number): number {
  if (!(entry > 0) || !(price > 0)) return 0;
  const move = (price - entry) / entry;
  return (side === "buy" ? move : -move) * Math.max(1, lev) * 100;
}

export function marginForFraction(ctx: DraftCtx, lev: number, fraction: number): number {
  const spec = ctx.spec;
  if (!spec || !(ctx.available > 0)) return 0;
  const feeRate = ctx.takerRate + ctx.feeBps / 10_000;
  let l = Math.max(1, lev);
  let margin = 0;
  for (let i = 0; i < 4; i++) {
    margin = (ctx.available * fraction) / (1 + l * feeRate);
    l = Math.max(1, Math.min(lev, maxLeverageFor(spec.marginTiers, margin * l)));
  }
  return floor2(margin * 0.998);
}

export function sizeDraft(d: Draft, ctx: DraftCtx): Sized {
  const spec = ctx.spec;
  const feeRate = ctx.takerRate + ctx.feeBps / 10_000;
  const base: Sized = {
    ok: false,
    problem: null,
    kind: null,
    px: 0,
    lev: Math.max(1, Math.round(d.leverage)),
    levCap: Math.max(1, ctx.maxLeverage),
    size: 0,
    notional: 0,
    margin: 0,
    fee: 0,
    feeRate,
    liq: 0,
    liqDistance: 0,
    minMargin: 0,
    maxMargin: 0,
    tpPrice: 0,
    slPrice: 0,
    step: 0,
  };
  if (!spec || !(ctx.mark > 0)) return { ...base, problem: "Loading market…", kind: "load" };

  const px = d.type === "limit" && d.limitPrice > 0 ? d.limitPrice : ctx.mark;
  const step = d.type === "market" ? spec.marketStepSize ?? spec.stepSize : spec.stepSize;
  const wantLev = Math.max(1, Math.round(d.leverage));
  const guess = d.unit === "usd" ? d.amount * wantLev : d.amount * px;
  const tierCap = maxLeverageFor(spec.marginTiers, Math.max(guess, 1));
  const levCap = Math.max(1, Math.min(ctx.maxLeverage, spec.maxLeverage, tierCap));
  const lev = Math.min(wantLev, levCap);

  const notionalWanted = d.unit === "usd" ? d.amount * lev : d.amount * px;
  const floorSize = Number(roundToStep(notionalWanted / px, step, "floor"));
  const size =
    step > 0 && floorSize * px < spec.minNotional && notionalWanted >= spec.minNotional ? Number(roundToStep(floorSize + step, step, "floor")) : floorSize;
  const notional = size * px;
  const p = previewOrder({ side: d.side, price: px, notional: notional || 1, leverage: lev, takerRate: ctx.takerRate, builderFeeBps: ctx.feeBps, tiers: spec.marginTiers });
  const margin = notional / lev;
  const fee = notional * feeRate;
  const minMargin = ceil2(spec.minNotional / lev);
  const maxMargin = marginForFraction(ctx, lev, 1);

  const tpPrice = d.tp > 0 ? (d.autoMode === "pnl" ? priceForPnl(d.side, px, lev, d.tp) : d.tp) : 0;
  const slPrice = d.sl > 0 ? (d.autoMode === "pnl" ? priceForPnl(d.side, px, lev, -d.sl) : d.sl) : 0;

  const out: Sized = { ...base, px, lev, levCap, size, notional, margin, fee, liq: p.liquidationPrice, liqDistance: p.liquidationDistance, minMargin, maxMargin, tpPrice, slPrice, step };
  const fail = (problem: string, kind: Sized["kind"]) => ({ ...out, problem, kind });

  if (!(d.amount > 0)) return fail("Enter an amount", "empty");
  if (d.type === "limit") {
    if (!(d.limitPrice > 0)) return fail("Enter a limit price", "price");
    if (Math.abs(d.limitPrice - ctx.mark) / ctx.mark > ctx.limitBound) return fail(`Limit price must be within ${(ctx.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  if (notional < spec.minNotional) {
    return fail(d.unit === "usd" ? `Minimum margin: $${minMargin.toFixed(2)}` : `Minimum order: $${spec.minNotional.toFixed(0)}`, "min");
  }
  if (margin + fee > ctx.available * 1.0001) return fail("Insufficient funds", "funds");
  if (tpPrice && (d.side === "buy" ? tpPrice <= px : tpPrice >= px)) return fail("Take profit must be above entry for a long, below for a short", "tpsl");
  if (slPrice && (d.side === "buy" ? slPrice >= px : slPrice <= px)) return fail("Stop loss must be below entry for a long, above for a short", "tpsl");
  if (slPrice && p.liquidationPrice > 0 && (d.side === "buy" ? slPrice <= p.liquidationPrice : slPrice >= p.liquidationPrice)) {
    return fail("Stop loss is past the liquidation price, so it would never trigger", "tpsl");
  }
  return { ...out, ok: true };
}
