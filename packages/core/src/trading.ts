import { uuid } from "./bytes.js";
import { decimalsOf, roundToStep } from "./format.js";
import { StrikeHttp, query } from "./http.js";
import { AccountApi } from "./account.js";
import { listFrom, numOrNull, pickNum, pickStr } from "./parse.js";
import type { MarginMode, MarketSpec, OrderHistoryEntry, Position, Side, TimeInForce, TwapStrategy } from "./types.js";

export interface PlaceOrderInput {
  symbol: string;
  side: Side;
  type: "market" | "limit" | "stop" | "stop_limit";
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

export function roundStopPrice(side: Side, stopPrice: number, tickSize: number): number {
  return Number(roundToStep(stopPrice, tickSize, side === "buy" ? "ceil" : "floor"));
}

export function stopOrderProblem(p: { side: Side; type: PlaceOrderInput["type"]; stopPrice?: number; price?: number; mark: number; priceBound?: number; tickSize?: number }): string | null {
  if (!isStop(p.type)) return null;
  const stop = p.tickSize && Number(p.stopPrice) > 0 ? roundStopPrice(p.side, Number(p.stopPrice), p.tickSize) : Number(p.stopPrice);
  if (!(stop > 0)) return "Enter a trigger price";
  if (p.type === "stop_limit" && !(Number(p.price) > 0)) return "Enter a limit price";
  if (!(p.mark > 0)) return "Waiting for the mark price";
  if (p.side === "buy" && !(stop > p.mark)) return "Buy stop trigger must be above the mark price";
  if (p.side === "sell" && !(stop < p.mark)) return "Sell stop trigger must be below the mark price";
  const bound = p.priceBound ?? 0.05;
  if (p.type === "stop_limit" && Math.abs(Number(p.price) - stop) / stop > bound) return `Limit price must be within ${(bound * 100).toFixed(0)}% of the trigger`;  return null;
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

export class Trading {
  constructor(private readonly http: StrikeHttp, private readonly account: AccountApi) {}

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
    const step = input.type === "market" || input.type === "stop" ? spec.marketStepSize ?? spec.stepSize : spec.stepSize;
    const size = roundToStep(input.size, step, "floor");
    if (!(Number(size) > 0)) throw new Error("Order size is below this market's minimum step.");
    const base: Record<string, unknown> = {
      client_order_id: clientOrderId,
      symbol: input.symbol,
      side: input.side,
      type: input.type,
      size,
    };
    if (input.type === "limit" || input.type === "stop_limit") {
      if (!(Number(input.price) > 0)) throw new Error("Limit orders need a price.");
      base.price = roundToStep(Number(input.price), spec.tickSize);
      base.time_in_force = input.timeInForce ?? "GTC";
      if (input.postOnly && input.type === "limit") base.post_only = true;
    }
    if (isStop(input.type)) {
      if (!(Number(input.stopPrice) > 0)) throw new Error("Stop orders need a trigger price.");
      base.stop_price = roundStopPrice(input.side, Number(input.stopPrice), spec.tickSize).toFixed(decimalsOf(spec.tickSize));
      base.working_type = input.workingType ?? "mark_price";
      if (input.takeProfit || input.stopLoss) throw new Error("TP/SL can't be attached to a stop order.");
    }
    if (input.reduceOnly) base.reduce_only = true;

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

  async closePosition(spec: MarketSpec, position: Position, builderFeeBps: number, ids?: PlacedOrder): Promise<PlacedOrder> {
    const size = Math.abs(Number(position.size));
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    return this.placeOrder(spec, { symbol: position.symbol, side, type: "market", size, reduceOnly: true }, builderFeeBps, ids);
  }
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
