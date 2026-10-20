import { StrikeApiError, StrikeHttp, query } from "./http.js";
import { listFrom, numOrNull, pick, pickNum, pickStr } from "./parse.js";
import type { Account, ClosedPositionRow, Fill, FillRow, FundingRow, MarginMode, OrderHistoryEntry, Page, PortfolioSummary, Position, TransactionRow } from "./types.js";

export class AccountApi {
  constructor(private readonly http: StrikeHttp) {}

  account(): Promise<Account> {
    return this.http.request<Account>("GET", "/v2/account");
  }

  async symbolLeverage(symbol: string): Promise<number | null> {
    const a: any = await this.account();
    const v = Number(a?.symbol_settings?.[symbol]?.leverage);
    return Number.isFinite(v) && v >= 1 ? v : null;
  }

  async symbolMarginMode(symbol: string): Promise<MarginMode | null> {
    return marginModeOf(await this.account(), symbol, false);
  }

  async portfolio(): Promise<PortfolioSummary> {
    return parsePortfolio(await this.http.request<unknown>("GET", "/v2/portfolio"));
  }

  async fillsPage(p: { limit?: number; fromId?: number | null; symbol?: string; startTime?: number; endTime?: number } = {}): Promise<Page<FillRow>> {
    const limit = p.limit ?? 20;
    const j = await this.http.request<unknown>("GET", `/v2/history/fill${query({ symbol: p.symbol, limit, fromId: p.fromId ?? undefined, startTime: p.startTime, endTime: p.endTime })}`);
    const items = listFrom(j, "fills").map(parseFill).filter((f): f is FillRow => f !== null);
    return { items, next: nextCursor(items, limit, (f) => f.id) };
  }

  async fundingPage(p: { limit?: number; fromId?: number | null } = {}): Promise<Page<FundingRow>> {
    const limit = p.limit ?? 20;
    const j = await this.http.request<unknown>("GET", `/v2/history/funding${query({ limit, fromId: p.fromId ?? undefined })}`);
    const items = listFrom(j, "funding").map(parseFunding).filter((f): f is FundingRow => f !== null);
    return { items, next: nextCursor(items, limit, (f) => f.id) };
  }

  async transactions(accountId: string, limit = 100): Promise<TransactionRow[]> {
    const j = await this.http.request<unknown>("GET", `/v2/history/transaction${query({ account_id: accountId, limit: Math.max(1, Math.min(1000, limit)) })}`, { auth: false });
    return listFrom(j, "transactions").map(parseTransaction).filter((t): t is TransactionRow => t !== null).sort((a, b) => b.time - a.time);
  }

  async orderHistoryPage(p: { limit?: number; fromOrderId?: number | null } = {}): Promise<Page<OrderHistoryEntry>> {
    const limit = p.limit ?? 20;
    const j = await this.http.request<unknown>("GET", `/v2/history/order${query({ limit, fromOrderID: p.fromOrderId ?? undefined })}`);
    const items = listFrom(j, "orders").filter(isObj).map(normalizeOrder).filter((o) => Number.isFinite(Number(o.id)));
    return { items, next: nextCursor(items, limit, (o) => Number(o.id)) };
  }

  async closedPositionsPage(p: { limit?: number; endTime?: number | null } = {}): Promise<Page<ClosedPositionRow>> {
    const limit = p.limit ?? 10;
    const j = await this.http.request<unknown>("GET", `/v2/closedPositions${query({ limit, endTime: p.endTime ?? undefined })}`);
    const rows = listFrom(j, "positions").map(parseClosedPosition).filter((r): r is ClosedPositionRow => r !== null);
    if (!rows.length) return { items: [], next: null };
    const start = Math.min(...rows.map((r) => r.openTime)) - PNL_WINDOW_SLACK_MS;
    const end = Math.max(...rows.map((r) => r.closeTime)) + PNL_WINDOW_SLACK_MS;
    const fills: FillRow[] = [];
    let complete = false;
    let fromId: number | null = null;
    try {
      for (let i = 0; i < 3; i++) {
        const page: Page<FillRow> = await this.fillsPage({ limit: 1000, fromId, startTime: Math.max(0, start), endTime: end });
        fills.push(...page.items);
        if (page.next === null) {
          complete = true;
          break;
        }
        fromId = page.next;
      }
    } catch {
    }
    const last = rows[rows.length - 1];
    return { items: attachRealizedPnl(rows, fills, complete), next: rows.length >= limit && last.closeTime > 0 ? last.closeTime - 1 : null };
  }

  async withdrawLimits(): Promise<{ maxUsd: number | null; minUsd: number | null; feeDiscountPct: number | null }> {
    const [b, p] = await Promise.all([
      this.http.request<any>("GET", "/v2/balances").catch(() => null),
      this.http.request<any>("GET", "/v2/portfolio").catch(() => null),
    ]);
    const num = (v: unknown) => (v === null || v === undefined || v === "" || !Number.isFinite(Number(v)) ? null : Number(v));
    const bal = Array.isArray(b) ? (b.length === 1 ? b[0] : null) : b;
    return { maxUsd: num(bal?.maxWithdrawAmount), minUsd: num(p?.min_withdraw_usd), feeDiscountPct: num(p?.fee_discount_rate) };
  }

  async referralDiscountPct(): Promise<number | null> {
    const p = await this.http.request<any>("GET", "/v2/portfolio").catch(() => null);
    const v = Number(p?.fee_discount_rate);
    return p && Number.isFinite(v) ? v : null;
  }

  async positions(): Promise<Position[]> {
    const j = await this.http.request<unknown>("GET", "/v2/positions");
    return (listFrom(j, "positions") as Position[]).filter((p) => p && Number.isFinite(Number(p.size)) && Number(p.size) !== 0);
  }

  async openOrders(symbol?: string): Promise<OrderHistoryEntry[]> {
    const j = await this.http.request<unknown>("GET", `/v2/openOrders${query({ symbol })}`);
    return listFrom(j, "orders").filter(isObj).map(normalizeOrder);
  }

  async orderHistory(params: { symbol?: string; limit?: number } = {}): Promise<OrderHistoryEntry[]> {
    const j = await this.http.request<unknown>("GET", `/v2/history/order${query({ symbol: params.symbol, limit: params.limit ?? 20 })}`);
    return listFrom(j, "orders").filter(isObj).map(normalizeOrder);
  }

  async fills(params: { symbol?: string; limit?: number } = {}): Promise<Fill[]> {
    const j = await this.http.request<unknown>("GET", `/v2/history/fill${query({ symbol: params.symbol, limit: params.limit ?? 50 })}`);
    return listFrom(j, "fills") as Fill[];
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

export function parseTransaction(t: any): TransactionRow | null {
  if (!t || typeof t !== "object") return null;
  const id = Number(t.id);
  const time = Number(t.timestamp ?? t.create_timestamp);
  const amount = numOrNull(t.amount ?? t.usd_value);
  if (!Number.isFinite(id) || !(time > 0) || amount === null) return null;
  return {
    id,
    type: String(t.type ?? ""),
    status: String(t.status ?? ""),
    amount,
    time,
    txHash: typeof t.tx_hash === "string" && t.tx_hash ? t.tx_hash.split("#")[0] : null,
    asset: typeof t.asset_symbol === "string" ? t.asset_symbol : null,
    assetAmount: numOrNull(t.asset_amount),
  };
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

export function marginModeOf(a: any, symbol: string, useDefault = true): MarginMode | null {
  const m = String(a?.symbol_settings?.[symbol]?.margin_mode ?? (useDefault ? a?.default_margin_mode ?? "" : "")).toLowerCase();
  return m === "cross" || m === "isolated" ? m : null;
}

function nextCursor<T>(items: T[], limit: number, id: (t: T) => number): number | null {
  if (items.length < limit) return null;
  const v = id(items[items.length - 1]);
  return Number.isFinite(v) ? v : null;
}

const ts = (o: any, ...keys: string[]) => pickNum(o, ...keys) ?? 0;
const isObj = (o: unknown): boolean => !!o && typeof o === "object";

export function parseFill(f: any): FillRow | null {
  const id = pickNum(f, "id", "ID");
  if (id === null) return null;
  const side = pickStr(f, "side", "Side").toLowerCase();
  return {
    id,
    orderId: pickNum(f, "order_id", "OrderID") ?? 0,
    symbol: pickStr(f, "symbol", "Symbol"),
    side: side === "buy" || side === "sell" ? side : "",
    role: pickStr(f, "role", "Role"),
    price: pickNum(f, "price", "Price"),
    size: pickNum(f, "size", "Size", "qty"),
    fee: pickNum(f, "fee", "Fee", "commission"),
    realizedPnl: pickNum(f, "realized_pnl", "RealizedPnl"),
    autoClose: pickStr(f, "auto_close_type"),
    time: ts(f, "timestamp", "Timestamp", "time"),
  };
}

export function parseFunding(f: any): FundingRow | null {
  const id = pickNum(f, "id", "ID");
  if (id === null) return null;
  return {
    id,
    symbol: pickStr(f, "symbol", "Symbol"),
    positionSide: pickStr(f, "position_side", "PositionSide"),
    positionSize: pickNum(f, "position_size", "PositionSize"),
    rate: pickNum(f, "funding_rate", "FundingRate"),
    amount: pickNum(f, "amount", "Amount", "income"),
    time: ts(f, "timestamp", "Timestamp", "time"),
  };
}

export function parseClosedPosition(p: any): ClosedPositionRow | null {
  const id = pickNum(p, "ID", "id");
  const symbol = pickStr(p, "Symbol", "symbol");
  if (id === null || !symbol) return null;
  return {
    id,
    symbol,
    marginMode: pickStr(p, "MarginMode", "margin_mode"),
    openTime: ts(p, "OpenTimestamp", "open_timestamp", "create_timestamp"),
    closeTime: ts(p, "CloseTimestamp", "close_timestamp"),
    realizedPnl: pickNum(p, "realized_pnl", "RealizedPnl", "RealizedPNL"),
  };
}

const PNL_WINDOW_SLACK_MS = 2000;

export function attachRealizedPnl(rows: ClosedPositionRow[], fills: FillRow[], complete: boolean): ClosedPositionRow[] {
  const oldest = fills.length ? Math.min(...fills.map((f) => f.time)) : Infinity;
  const sums = new Map<number, number>();
  for (const f of fills) {
    const same = rows.filter((r) => r.symbol === f.symbol && r.openTime && r.closeTime);
    let owner = same.find((r) => f.time > r.openTime && f.time <= r.closeTime);
    if (!owner) {
      let best = Infinity;
      for (const r of same) {
        const dist = f.time <= r.openTime ? r.openTime - f.time : f.time - r.closeTime;
        if (dist <= PNL_WINDOW_SLACK_MS && dist < best) (best = dist), (owner = r);
      }
    }
    if (owner) sums.set(owner.id, (sums.get(owner.id) ?? 0) + (f.realizedPnl ?? 0));
  }
  return rows.map((r) => {
    if (r.realizedPnl !== null) return r;
    if (!r.openTime || !r.closeTime || (!complete && r.openTime - PNL_WINDOW_SLACK_MS < oldest)) return { ...r, realizedPnl: null };
    return { ...r, realizedPnl: sums.get(r.id) ?? 0 };
  });
}

export function parsePortfolio(j: any): PortfolioSummary {
  const acct = pick(j, "account", "perp_account") as any;
  const tier = numOrNull(j?.fee_tier);
  const tiers = listFrom(j, "fee_tiers");
  const t = tier === null ? undefined : tiers.find((x: any) => Number(pick(x, "Tier", "tier")) === tier);
  const makerOverride = numOrNull(j?.maker_fee_rate_override);
  return {
    realizedPnl: pickNum(acct, "realized_pnl"),
    volume: numOrNull(j?.volume) ?? pickNum(acct, "all_time_volume"),
    fees: numOrNull(j?.fees),
    feeTier: tier,
    takerRate: pickNum(t, "TakerRate", "taker_rate"),
    makerRate: makerOverride ?? pickNum(t, "MakerRate", "maker_rate"),
    referralDiscountPct: numOrNull(j?.fee_discount_rate),
    stakingDiscount: numOrNull(j?.staking_fee_discount_rate),
  };
}
