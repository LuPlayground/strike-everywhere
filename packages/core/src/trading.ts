import { uuid } from "./bytes.js";
import { decimalsOf, roundToStep } from "./format.js";
import { StrikeHttp, query } from "./http.js";
import { AccountApi } from "./account.js";
import { listFrom, numOrNull, pickNum, pickStr } from "./parse.js";
import type { MarginMode, MarketSpec, OrderHistoryEntry, Position, Side, TimeInForce, TwapStrategy } from "./types.js";

export type ConditionalType = "stop" | "stop_limit" | "take_profit" | "take_profit_limit" | "trailing_stop_market";

export interface PlaceOrderInput {
  symbol: string;
  side: Side;
  type: "market" | "limit" | ConditionalType;
  callbackRate?: number;
  activationPrice?: number;
  slippage?: number;
  closePosition?: boolean;
  size: number;
  price?: number;
  stopPrice?: number;
  workingType?: "mark_price" | "contract_price";
  timeInForce?: TimeInForce;
  reduceOnly?: boolean;
  postOnly?: boolean;
  takeProfit?: number;
  stopLoss?: number;
}

export interface TwapInput {
  symbol: string;
  side: Side;
  size: number;
  durationSec: number;
  limitPrice?: number;
  reduceOnly?: boolean;
  randomize?: boolean;
}

export const TWAP_MIN_SEC = 300;
export const TWAP_MAX_SEC = 86_400;

const isStop = (t: PlaceOrderInput["type"]) => t === "stop" || t === "stop_limit";
const isTp = (t: PlaceOrderInput["type"]) => t === "take_profit" || t === "take_profit_limit";
export const isTriggered = (t: PlaceOrderInput["type"]) => isStop(t) || isTp(t);
export const needsLimitPrice = (t: PlaceOrderInput["type"]) => t === "limit" || t === "stop_limit" || t === "take_profit_limit";
export const executesAtMarket = (t: PlaceOrderInput["type"]) => t === "market" || t === "stop" || t === "take_profit" || t === "trailing_stop_market";
export const TRAILING_MIN_PCT = 0.1;
export const TRAILING_MAX_PCT = 5;

export function roundStopPrice(side: Side, stopPrice: number, tickSize: number): number {
  return Number(roundToStep(stopPrice, tickSize, side === "buy" ? "ceil" : "floor"));
}

export function roundTpPrice(side: Side, price: number, tickSize: number): number {
  return Number(roundToStep(price, tickSize, side === "buy" ? "floor" : "ceil"));
}

export function stopOrderProblem(p: {
  side: Side;
  type: PlaceOrderInput["type"];
  stopPrice?: number;
  price?: number;
  mark: number;
  last?: number;
  workingType?: "mark_price" | "contract_price";
  priceBound?: number;
  tickSize?: number;
  callbackRate?: number;
  activationPrice?: number;
}): string | null {
  if (p.type === "trailing_stop_market") {
    const cb = Number(p.callbackRate);
    if (!(cb >= TRAILING_MIN_PCT && cb <= TRAILING_MAX_PCT)) return `Trail distance must be ${TRAILING_MIN_PCT}–${TRAILING_MAX_PCT}%`;
    if (p.activationPrice !== undefined && !(Number(p.activationPrice) > 0)) return "Enter a valid activation price";
    return null;
  }
  if (!isTriggered(p.type)) return null;
  const tp = isTp(p.type);
  const raw = Number(p.stopPrice);
  const stop = p.tickSize && raw > 0 ? (tp ? roundTpPrice(p.side, raw, p.tickSize) : roundStopPrice(p.side, raw, p.tickSize)) : raw;
  if (!(stop > 0)) return "Enter a trigger price";
  if (needsLimitPrice(p.type) && !(Number(p.price) > 0)) return "Enter a limit price";
  const onLast = p.workingType === "contract_price";
  const ref = onLast ? Number(p.last) : p.mark;
  const refName = onLast ? "last price" : "mark price";
  if (!(ref > 0)) return `Waiting for the ${refName}`;
  if (!tp && p.side === "buy" && !(stop > ref)) return `Buy stop trigger must be above the ${refName}`;
  if (!tp && p.side === "sell" && !(stop < ref)) return `Sell stop trigger must be below the ${refName}`;
  if (tp && p.side === "sell" && !(stop > ref)) return `Sell take-profit trigger must be above the ${refName}`;
  if (tp && p.side === "buy" && !(stop < ref)) return `Buy take-profit trigger must be below the ${refName}`;
  const bound = p.priceBound ?? 0.05;
  if (needsLimitPrice(p.type) && Math.abs(Number(p.price) - stop) / stop > bound) return `Limit price must be within ${(bound * 100).toFixed(0)}% of the trigger`;
  return null;
}

export interface PlacedOrder {
  clientOrderId: string;
  strategyId?: string;
  legClientOrderIds?: string[];
}

export class OrderRejectedError extends Error {
  constructor(public order: OrderHistoryEntry) {
    super(humanizeRejection(order.error_message || order.close_reason || "rejected"));
    this.name = "OrderRejectedError";
  }
}

export function humanizeRejection(code: string): string {
  const map: Record<string, string> = {
    order_price_out_of_limit: "Price is too far from the market. Limit prices must stay within 5% of the current price.",
    order_price_out_of_price_cap: "Price is outside the allowed range for this market.",
    insufficient_balance: "Not enough available balance for this order.",
    insufficient_margin: "Not enough margin for this order. Lower the size or leverage.",
    reduce_only_rejected: "Reduce-only order would increase the position.",
  };
  return map[code] ?? code.replace(/_/g, " ");
}

export function buildOrderBody(spec: MarketSpec, input: PlaceOrderInput, clientOrderId: string): Record<string, unknown> {
  const step = executesAtMarket(input.type) ? spec.marketStepSize ?? spec.stepSize : spec.stepSize;
  const size = roundToStep(input.size, step, "floor");
  if (!(Number(size) > 0)) throw new Error("Order size is below this market's minimum step.");
  const base: Record<string, unknown> = {
    client_order_id: clientOrderId,
    symbol: input.symbol,
    side: input.side,
    type: input.type,
    size,
  };
  if (needsLimitPrice(input.type)) {
    if (!(Number(input.price) > 0)) throw new Error("Limit orders need a price.");
    base.price = roundToStep(Number(input.price), spec.tickSize);
    base.time_in_force = input.timeInForce ?? "GTC";
    if (input.postOnly && input.type === "limit") base.post_only = true;
  }
  if (isTriggered(input.type)) {
    if (!(Number(input.stopPrice) > 0)) throw new Error("Conditional orders need a trigger price.");
    const trigger = isTp(input.type) ? roundTpPrice(input.side, Number(input.stopPrice), spec.tickSize) : roundStopPrice(input.side, Number(input.stopPrice), spec.tickSize);
    base.stop_price = trigger.toFixed(decimalsOf(spec.tickSize));
    base.working_type = input.workingType ?? "mark_price";
  }
  if (input.type === "trailing_stop_market") {
    const cb = Number(input.callbackRate);
    if (!(cb >= TRAILING_MIN_PCT && cb <= TRAILING_MAX_PCT)) throw new Error(`Trail distance must be ${TRAILING_MIN_PCT}–${TRAILING_MAX_PCT}%.`);
    base.callback_rate = String(Math.round(cb * 100) / 100);
    if (input.activationPrice !== undefined) base.activation_price = roundToStep(Number(input.activationPrice), spec.tickSize);
    base.working_type = input.workingType ?? "mark_price";
  }
  if (input.type !== "market" && input.type !== "limit" && (input.takeProfit || input.stopLoss)) {
    throw new Error("TP/SL can only be attached to market and limit orders.");
  }
  if (input.type === "market" && input.slippage !== undefined && input.slippage > 0) base.slippage = String(Math.round(input.slippage * 10_000) / 10_000);
  if (input.reduceOnly) base.reduce_only = true;
  if (input.closePosition && input.type !== "market" && input.type !== "limit") base.close_position = true;
  return base;
}

export interface GridInput {
  symbol: string;
  mode: "LONG" | "SHORT" | "NEUTRAL";
  lower: number;
  upper: number;
  grids: number;
  collateral: number;
  sl?: number;
  longSl?: number;
  shortSl?: number;
}

export interface GridBot {
  id: string;
  symbol: string;
  status: string;
  mode: string;
  lower: number | null;
  upper: number | null;
  grids: number | null;
  leverage: number | null;
  collateral: number | null;
  profit: number | null;
  levels: number;
  filledLevels: number;
  createdAt: number;
}

export function gridProblem(g: GridInput, mark: number): string | null {
  if (!(g.lower > 0) || !(g.upper > 0)) return "Enter the price range";
  if (!(g.upper > g.lower)) return "Upper price must be above the lower price";
  if (!(Number.isInteger(g.grids) && g.grids >= 2 && g.grids <= 200)) return "Grids must be a whole number from 2 to 200";
  if (!(g.collateral > 0)) return "Enter the collateral";
  if (g.mode === "NEUTRAL" && g.sl) return "Neutral grids take separate long and short stop-losses";
  if (g.mode === "LONG" && g.sl && !(g.sl < g.lower)) return "Stop-loss must be below the lower price";
  if (g.mode === "SHORT" && g.sl && !(g.sl > g.upper)) return "Stop-loss must be above the upper price";
  if (g.longSl && !(g.longSl < g.lower)) return "Long stop-loss must be below the lower price";
  if (g.shortSl && !(g.shortSl > g.upper)) return "Short stop-loss must be above the upper price";
  if (mark > 0 && g.mode === "NEUTRAL" && !(g.lower < mark && mark < g.upper)) return "A neutral grid's range must include the current price";
  return null;
}

export function parseGridBot(b: any): GridBot | null {
  const id = pickStr(b, "id", "bot_id");
  if (!id) return null;
  const orders: any[] = Array.isArray(b?.orders) ? b.orders : [];
  return {
    id,
    symbol: pickStr(b, "symbol"),
    status: pickStr(b, "status").toUpperCase(),
    mode: pickStr(b, "mode").toUpperCase(),
    lower: pickNum(b, "lower_price"),
    upper: pickNum(b, "upper_price"),
    grids: pickNum(b, "grid_count"),
    leverage: pickNum(b, "leverage"),
    collateral: pickNum(b, "collateral"),
    profit: pickNum(b, "grid_profit"),
    levels: orders.length,
    filledLevels: orders.filter((o) => o?.filled === true).length,
    createdAt: pickNum(b, "created_at_ms") ?? 0,
  };
}

export class Trading {
  constructor(private readonly http: StrikeHttp, private readonly account: AccountApi) {}

  async replaceOrder(spec: MarketSpec, current: { symbol: string; id: number }, next: PlaceOrderInput, builderFeeBps: number, clientOrderId = uuid()): Promise<PlacedOrder> {
    const body = { cancel: { order_id: Number(current.id), symbol: current.symbol }, new_order: buildOrderBody(spec, next, clientOrderId) };
    await this.http.request("POST", "/v2/order/replace", { body, builderFeeBps });
    return { clientOrderId };
  }

  async modifyIsolatedMargin(symbol: string, amount: number, direction: "add" | "remove"): Promise<void> {
    if (!(amount > 0)) throw new Error("Enter an amount.");
    await this.http.request("POST", "/v2/isoMargin", { body: { symbol, amount: String(Math.floor(amount * 100) / 100), modify_type: direction } });
  }

  async createGrid(spec: MarketSpec, g: GridInput, builderFeeBps: number): Promise<{ id: string; status: string }> {
    const t = (v: number) => roundToStep(v, spec.tickSize);
    const body: Record<string, unknown> = { symbol: g.symbol, mode: g.mode, upper_price: t(g.upper), lower_price: t(g.lower), grid_count: Math.round(g.grids), collateral: String(Math.floor(g.collateral * 100) / 100) };
    if (g.sl) body.sl_price = t(g.sl);
    if (g.longSl) body.long_sl_price = t(g.longSl);
    if (g.shortSl) body.short_sl_price = t(g.shortSl);
    const j = await this.http.request<any>("POST", "/v2/grid/bot", { body, builderFeeBps });
    return { id: pickStr(j, "bot_id", "id"), status: pickStr(j, "status") };
  }

  async grids(limit = 50): Promise<GridBot[]> {
    const j = await this.http.request<unknown>("GET", `/v2/grid/bot${query({ limit })}`);
    return listFrom(j, "bots").map(parseGridBot).filter((b): b is GridBot => b !== null);
  }

  async stopGrid(id: string, cancelOrders = true): Promise<void> {
    if (!/^[0-9a-zA-Z-]{1,64}$/.test(id)) throw new Error("Invalid grid bot id");
    await this.http.request("DELETE", `/v2/grid/bot/${encodeURIComponent(id)}`, { body: { cancel_orders: cancelOrders } });
  }

  async setLeverage(symbol: string, leverage: number): Promise<void> {
    await this.http.request("POST", "/v2/leverage", { body: { symbol, leverage: Math.round(leverage) } });
  }

  static newOrderIds(input: Pick<PlaceOrderInput, "takeProfit" | "stopLoss">): PlacedOrder {
    const legs: string[] = [];
    if (input.takeProfit) legs.push(uuid());
    if (input.stopLoss) legs.push(uuid());
    return legs.length ? { clientOrderId: uuid(), strategyId: uuid(), legClientOrderIds: legs } : { clientOrderId: uuid() };
  }

  async placeOrder(spec: MarketSpec, input: PlaceOrderInput, builderFeeBps: number, ids: PlacedOrder = Trading.newOrderIds(input)): Promise<PlacedOrder> {
    const clientOrderId = ids.clientOrderId;
    const base = buildOrderBody(spec, input, clientOrderId);

    if (input.takeProfit || input.stopLoss) {
      const strategyId = ids.strategyId ?? uuid();
      const exitSize = base.size as string;
      const body: Record<string, unknown> = { ...base, strategy_id: strategyId };
      const legClientOrderIds: string[] = [];
      const legIds = [...(ids.legClientOrderIds ?? [])];
      if (input.takeProfit) {
        const id = legIds.shift() ?? uuid();
        legClientOrderIds.push(id);
        body.tp_order = { client_order_id: id, type: "take_profit", size: exitSize, stop_price: roundToStep(input.takeProfit, spec.tickSize), working_type: "mark_price" };
      }
      if (input.stopLoss) {
        const id = legIds.shift() ?? uuid();
        legClientOrderIds.push(id);
        body.sl_order = { client_order_id: id, type: "stop", size: exitSize, stop_price: roundToStep(input.stopLoss, spec.tickSize), working_type: "mark_price" };
      }
      await this.http.request("POST", "/v2/order/strategy", { body, builderFeeBps });
      return { clientOrderId, strategyId, legClientOrderIds };
    }

    await this.http.request("POST", "/v2/order", { body: base, builderFeeBps });
    return { clientOrderId };
  }

  async waitForOrder(symbol: string, clientOrderId: string, timeoutMs = 10_000): Promise<OrderHistoryEntry> {
    const deadline = Date.now() + timeoutMs;
    let delay = 400;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, delay));
      const orders = await this.account.orderHistory({ symbol, limit: 50 }).catch(() => null);
      if (!orders) continue;
      const o = orders.find((x) => x.client_order_id === clientOrderId);
      if (o && o.status !== "pending") {
        if (o.status === "rejected") throw new OrderRejectedError(o);
        return o;
      }
      delay = Math.min(delay * 1.5, 1500);
    }
    throw new Error("Order is still pending. Check your open orders shortly.");
  }

  async cancelOrder(symbol: string, orderId: number): Promise<void> {
    await this.http.request("DELETE", "/v2/order/cancel", { body: { order_id: orderId, symbol } });
  }

  async cancelAll(symbol?: string): Promise<number | null> {
    const j = await this.http.request<any>("DELETE", "/v2/order/cancel-all", { body: symbol ? { symbol } : {} });
    const n = numOrNull(j?.canceled_count);
    return n !== null && n >= 0 ? n : null;
  }

  async setMarginMode(symbol: string, mode: MarginMode): Promise<void> {
    if (mode !== "cross" && mode !== "isolated") throw new Error("Unknown margin mode");
    await this.http.request("POST", "/v2/marginMode", { body: { symbol, marginMode: mode } });
  }

  async createTwap(spec: MarketSpec, input: TwapInput, builderFeeBps: number): Promise<{ strategyId: string; status: string }> {
    const duration = Math.round(Number(input.durationSec));
    if (!(duration >= TWAP_MIN_SEC && duration <= TWAP_MAX_SEC)) throw new Error("TWAP duration must be between 5 minutes and 24 hours.");
    const size = roundToStep(input.size, spec.marketStepSize ?? spec.stepSize, "floor");
    if (!(Number(size) > 0)) throw new Error("Order size is below this market's minimum step.");
    const body: Record<string, unknown> = {
      symbol: input.symbol,
      side: input.side === "buy" ? "BUY" : "SELL",
      total_size: size,
      duration_sec: duration,
    };
    if (input.limitPrice !== undefined) {
      if (!(input.limitPrice > 0)) throw new Error("Enter a valid limit price.");
      body.limit_price = roundToStep(input.limitPrice, spec.tickSize);
    }
    if (input.reduceOnly) body.reduce_only = true;
    if (input.randomize) body.randomize = true;
    const j = await this.http.request<any>("POST", "/v2/algo/twap", { body, builderFeeBps });
    return { strategyId: pickStr(j, "strategy_id", "id"), status: pickStr(j, "status") || "active" };
  }

  async twaps(status: "active" | "all" = "active"): Promise<TwapStrategy[]> {
    const j = await this.http.request<unknown>("GET", `/v2/algo/twap${query({ status })}`);
    return listFrom(j, "strategies").map(parseTwap).filter((t): t is TwapStrategy => t !== null);
  }

  async cancelTwap(id: string): Promise<void> {
    if (!/^[0-9a-zA-Z-]{1,64}$/.test(id)) throw new Error("Invalid TWAP id");
    await this.http.request("DELETE", `/v2/algo/twap/${encodeURIComponent(id)}`);
  }

  async closePosition(spec: MarketSpec, position: Position, builderFeeBps: number, ids?: PlacedOrder, fraction = 1): Promise<PlacedOrder> {
    const size = closeSizeFor(spec, Math.abs(Number(position.size)), fraction, "market");
    if (!(size > 0)) throw new Error("That's smaller than the market's minimum size. Close a larger part.");
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    return this.placeOrder(spec, { symbol: position.symbol, side, type: "market", size, reduceOnly: true }, builderFeeBps, ids);
  }
}

export function closeSizeFor(spec: MarketSpec, absSize: number, fraction: number, type: "market" | "limit"): number {
  if (fraction >= 1) return absSize;
  const step = type === "market" ? spec.marketStepSize ?? spec.stepSize : spec.stepSize;
  return Number(roundToStep(absSize * Math.max(0, fraction), step || 1e-8, "floor"));
}

export function parseTwap(t: any): TwapStrategy | null {
  const id = pickStr(t, "strategy_id", "id");
  if (!id) return null;
  return {
    id,
    symbol: pickStr(t, "market", "symbol"),
    side: pickStr(t, "side").toLowerCase() === "sell" ? "sell" : "buy",
    status: pickStr(t, "status").toLowerCase(),
    totalSize: pickNum(t, "total_size"),
    filledSize: pickNum(t, "filled_size"),
    durationSec: pickNum(t, "duration_sec"),
    slicesFired: pickNum(t, "slices_fired"),
    nominalSlices: pickNum(t, "nominal_slices"),
    createdAt: pickNum(t, "created_at_ms", "created_at") ?? 0,
    lastError: pickStr(t, "last_error"),
  };
}
