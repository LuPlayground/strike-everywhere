import { uuid } from "./bytes.js";
import { roundToStep } from "./format.js";
import { StrikeHttp } from "./http.js";
import { AccountApi } from "./account.js";
import type { MarketSpec, OrderHistoryEntry, Position, Side, TimeInForce } from "./types.js";

export interface PlaceOrderInput {
  symbol: string;
  side: Side;
  type: "market" | "limit";
  size: number;
  price?: number;
  timeInForce?: TimeInForce;
  reduceOnly?: boolean;
  postOnly?: boolean;
  takeProfit?: number;
  stopLoss?: number;
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

  async placeOrder(spec: MarketSpec, input: PlaceOrderInput, builderFeeBps: number): Promise<PlacedOrder> {
    const clientOrderId = uuid();
    const base: Record<string, unknown> = {
      client_order_id: clientOrderId,
      symbol: input.symbol,
      side: input.side,
      type: input.type,
      size: roundToStep(input.size, spec.stepSize, "floor"),
    };
    if (input.type === "limit") {
      if (!input.price) throw new Error("Limit orders need a price.");
      base.price = roundToStep(input.price, spec.tickSize);
      base.time_in_force = input.timeInForce ?? "GTC";
      if (input.postOnly) base.post_only = true;
    }
    if (input.reduceOnly) base.reduce_only = true;

    if (input.takeProfit || input.stopLoss) {
      const strategyId = uuid();
      const exitSize = base.size as string;
      const body: Record<string, unknown> = { ...base, strategy_id: strategyId };
      const legClientOrderIds: string[] = [];
      if (input.takeProfit) {
        const id = uuid();
        legClientOrderIds.push(id);
        body.tp_order = { client_order_id: id, type: "take_profit", size: exitSize, stop_price: roundToStep(input.takeProfit, spec.tickSize), working_type: "mark_price" };
      }
      if (input.stopLoss) {
        const id = uuid();
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
      const orders = await this.account.orderHistory({ symbol, limit: 25 });
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

  async closePosition(spec: MarketSpec, position: Position, builderFeeBps: number): Promise<PlacedOrder> {
    const size = Math.abs(Number(position.size));
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    return this.placeOrder(spec, { symbol: position.symbol, side, type: "market", size, reduceOnly: true }, builderFeeBps);
  }
}
