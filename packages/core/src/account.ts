import { StrikeApiError, StrikeHttp, query } from "./http.js";
import type { Account, Fill, OrderHistoryEntry, Position } from "./types.js";

export class AccountApi {
  constructor(private readonly http: StrikeHttp) {}

  account(): Promise<Account> {
    return this.http.request<Account>("GET", "/v2/account");
  }

  async positions(): Promise<Position[]> {
    const j = await this.http.request<{ positions: Position[] }>("GET", "/v2/positions");
    return (j.positions ?? []).filter((p) => Number(p.size) !== 0);
  }

  async openOrders(symbol?: string): Promise<OrderHistoryEntry[]> {
    const j = await this.http.request<{ orders: any[] }>("GET", `/v2/openOrders${query({ symbol })}`);
    return (j.orders ?? []).map(normalizeOrder);
  }

  async orderHistory(params: { symbol?: string; limit?: number } = {}): Promise<OrderHistoryEntry[]> {
    const j = await this.http.request<{ orders: OrderHistoryEntry[] }>("GET", `/v2/history/order${query({ symbol: params.symbol, limit: params.limit ?? 20 })}`);
    return j.orders ?? [];
  }

  async fills(params: { symbol?: string; limit?: number } = {}): Promise<Fill[]> {
    const j = await this.http.request<{ fills: Fill[] }>("GET", `/v2/history/fill${query({ symbol: params.symbol, limit: params.limit ?? 50 })}`);
    return j.fills ?? [];
  }

  async exists(blockchainAddress: string): Promise<boolean | null> {
    try {
      await this.http.request("GET", `/v2/account${query({ blockchain_address: blockchainAddress })}`, { auth: false });
      return true;
    } catch (e) {
      if (e instanceof StrikeApiError && e.status === 404) return false;
      console.warn("[strike-everywhere] account lookup failed:", (e as Error)?.message || e);
      return null;
    }
  }
}

export function normalizeOrder(o: any): OrderHistoryEntry {
  if (o && "id" in o) return o as OrderHistoryEntry;
  return {
    id: o.ID,
    client_order_id: o.ClientOrderID,
    account_id: o.AccountID,
    symbol: o.Symbol,
    side: o.Side,
    status: o.Status,
    type: o.Type,
    size: String(o.Size ?? o.Quantity ?? "0"),
    filled: String(o.Filled ?? o.FilledSize ?? "0"),
    price: String(o.Price ?? "0"),
    stop_price: String(o.StopPrice ?? "0"),
    reduce_only: Boolean(o.ReduceOnly),
    close_reason: o.CloseReason ?? null,
    create_timestamp: o.CreateTimestamp ?? 0,
  };
}
