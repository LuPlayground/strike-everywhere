import { TWAP_MAX_SEC, TWAP_MIN_SEC, executesAtMarket, twapPlan, maxLeverageFor, needsLimitPrice, previewOrder, roundToStep, stopOrderProblem, type MarketSpec, type PlaceOrderInput, type Side } from "@strike-everywhere/core";

export type AppOrderType = "market" | "limit" | "stop" | "stop_limit" | "take_profit" | "take_profit_limit" | "trailing_stop_market" | "twap";
export type Unit = "usd" | "base";
export type AutoMode = "pnl" | "price";
export type Tif = "GTC" | "IOC" | "FOK";

export const ORDER_TYPES: Array<{ type: AppOrderType; label: string; desc: string; advanced?: boolean }> = [
  { type: "market", label: "Market", desc: "Fills right away, near the market price" },
  { type: "limit", label: "Limit", desc: "Fills only at your price or better" },
  { type: "stop", label: "Stop Market", desc: "Market order once the price reaches your trigger", advanced: true },
  { type: "stop_limit", label: "Stop Limit", desc: "Limit order once the price reaches your trigger", advanced: true },
  { type: "take_profit", label: "Take Profit Market", desc: "Market order once the price reaches your target", advanced: true },
  { type: "take_profit_limit", label: "Take Profit Limit", desc: "Limit order once the price reaches your target", advanced: true },
  { type: "trailing_stop_market", label: "Trailing Stop", desc: "Follows the price and triggers when it turns by your trail %", advanced: true },
  { type: "twap", label: "TWAP", desc: "Splits the order into slices over 5 min – 24 h", advanced: true },
];

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
  triggerPrice?: number;
  workingType?: "mark_price" | "contract_price";
  tif?: Tif;
  postOnly?: boolean;
  reduceOnly?: boolean;
  callbackRate?: number;
  activationPrice?: number;
  slippage?: number;
  twapMinutes?: number;
  twapLimit?: number;
  randomize?: boolean;
}

export function referencePrice(d: Draft, mark: number): number {
  if (needsLimitPrice(d.type as any) && d.limitPrice > 0) return d.limitPrice;
  if ((d.type === "stop" || d.type === "take_profit") && Number(d.triggerPrice) > 0) return Number(d.triggerPrice);
  if (d.type === "trailing_stop_market" && Number(d.activationPrice) > 0) return Number(d.activationPrice);
  return mark;
}

export function toOrderInput(d: Draft, s: Sized): PlaceOrderInput & { leverage?: number } {
  const t = d.type as PlaceOrderInput["type"];
  return {
    symbol: d.symbol,
    side: d.side,
    type: t,
    size: s.size,
    price: needsLimitPrice(t) ? d.limitPrice : undefined,
    stopPrice: t === "stop" || t === "stop_limit" || t === "take_profit" || t === "take_profit_limit" ? d.triggerPrice : undefined,
    workingType: d.workingType,
    timeInForce: needsLimitPrice(t) ? d.tif : undefined,
    postOnly: t === "limit" ? d.postOnly : undefined,
    reduceOnly: d.reduceOnly || t === "trailing_stop_market" || undefined,
    callbackRate: t === "trailing_stop_market" ? d.callbackRate : undefined,
    activationPrice: t === "trailing_stop_market" && Number(d.activationPrice) > 0 ? d.activationPrice : undefined,
    slippage: t === "market" && Number(d.slippage) > 0 ? d.slippage : undefined,
    takeProfit: (t === "market" || t === "limit") && s.tpPrice > 0 ? s.tpPrice : undefined,
    stopLoss: (t === "market" || t === "limit") && s.slPrice > 0 ? s.slPrice : undefined,
    leverage: d.reduceOnly || t === "trailing_stop_market" ? undefined : s.lev,
  };
}

export interface DraftCtx {
  spec: MarketSpec | undefined;
  mark: number;
  last?: number;
  available: number;
  takerRate: number;
  feeBps: number;
  maxLeverage: number;
  limitBound: number;
  position?: number;
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

  const px = referencePrice(d, ctx.mark);
  const step = d.type === "twap" || executesAtMarket(d.type as any) ? spec.marketStepSize ?? spec.stepSize : spec.stepSize;
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

  const bracket = d.type === "market" || d.type === "limit";
  const tpPrice = bracket && d.tp > 0 ? (d.autoMode === "pnl" ? priceForPnl(d.side, px, lev, d.tp) : d.tp) : 0;
  const slPrice = bracket && d.sl > 0 ? (d.autoMode === "pnl" ? priceForPnl(d.side, px, lev, -d.sl) : d.sl) : 0;

  const out: Sized = { ...base, px, lev, levCap, size, notional, margin, fee, liq: p.liquidationPrice, liqDistance: p.liquidationDistance, minMargin, maxMargin, tpPrice, slPrice, step };
  const fail = (problem: string, kind: Sized["kind"]) => ({ ...out, problem, kind });

  if (!(d.amount > 0)) return fail("Enter an amount", "empty");
  const reduce = d.reduceOnly || d.type === "trailing_stop_market";
  if (d.type === "trailing_stop_market" && ctx.position !== undefined) {
    const pos = ctx.position;
    if (!pos) return fail("A trailing stop closes or reduces an open position. Open one first.", "price");
    if ((pos > 0) === (d.side === "buy")) return fail(`A trailing stop protects your ${pos > 0 ? "long" : "short"}: switch to ${pos > 0 ? "Short/Sell" : "Long/Buy"}.`, "price");
    if (size > Math.abs(pos) + 1e-12) return fail("A trailing stop can't be larger than your position", "price");
  }
  if (d.type === "limit") {
    if (!(d.limitPrice > 0)) return fail("Enter a limit price", "price");
    if (Math.abs(d.limitPrice - ctx.mark) / ctx.mark > ctx.limitBound) return fail(`Limit price must be within ${(ctx.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  if (d.type !== "market" && d.type !== "limit" && d.type !== "twap") {
    const p2 = stopOrderProblem({ side: d.side, type: d.type, stopPrice: d.triggerPrice, price: d.limitPrice, mark: ctx.mark, last: ctx.last, workingType: d.workingType, priceBound: ctx.limitBound, tickSize: spec.tickSize, callbackRate: d.callbackRate, activationPrice: Number(d.activationPrice) > 0 ? d.activationPrice : undefined });
    if (p2) return fail(p2, "price");
  }
  if (d.type === "twap") {
    const sec = (d.twapMinutes ?? 0) * 60;
    if (!(sec >= TWAP_MIN_SEC && sec <= TWAP_MAX_SEC)) return fail("Duration must be 5 – 1440 minutes", "price");
    const plan = twapPlan(spec, size, sec, px);
    if (d.amount > 0 && plan.perOrder < plan.minPerOrder - 1e-12) {
      return fail(`Too small for ${d.twapMinutes} min: at least ${Number(plan.minTotal.toPrecision(6))} ${spec.baseAsset} (≈ $${Math.ceil(plan.minTotal * px).toLocaleString("en-US")})`, "min");
    }
    if (Number(d.twapLimit) > 0 && Math.abs(Number(d.twapLimit) - ctx.mark) / ctx.mark > ctx.limitBound) return fail(`Limit price must be within ${(ctx.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  if (!reduce && notional < spec.minNotional) {
    return fail(d.unit === "usd" ? `Minimum margin: $${minMargin.toFixed(2)}` : `Minimum order: $${spec.minNotional.toFixed(0)}`, "min");
  }
  if (!reduce && margin + fee > ctx.available * 1.0001) return fail("Insufficient funds", "funds");
  if (tpPrice && (d.side === "buy" ? tpPrice <= px : tpPrice >= px)) return fail("Take profit must be above entry for a long, below for a short", "tpsl");
  if (slPrice && (d.side === "buy" ? slPrice >= px : slPrice <= px)) return fail("Stop loss must be below entry for a long, above for a short", "tpsl");
  if (slPrice && p.liquidationPrice > 0 && (d.side === "buy" ? slPrice <= p.liquidationPrice : slPrice >= p.liquidationPrice)) {
    return fail("Stop loss is past the liquidation price, so it would never trigger", "tpsl");
  }
  return { ...out, ok: true };
}
