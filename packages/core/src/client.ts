import { AccountApi } from "./account.js";
import { builderConnect, type BuilderSession } from "./builderConnect.js";
import { CardanoWallet, detectWallets, type WalletInfo } from "./cardano/wallet.js";
import { MAX_BUILDER_FEE_BPS, MIN_DEPOSIT_USD, NETWORKS, type Network, type NetworkConfig } from "./config.js";
import { DepositRegistrationError, Deposits, type PreparedDeposit } from "./deposit.js";
import { Withdrawals, type PreparedWithdrawal } from "./withdraw.js";
import { StrikeHttp } from "./http.js";
import { MarketData, toMarketSpec, type RawMarket } from "./market.js";
import { SessionStore, type PersistMode } from "./session.js";
import { OrderRejectedError, OrderUnconfirmedError, Trading, closeSizeFor, gridProblem, twapSizeProblem, isTriggered, needsLimitPrice, stopOrderProblem, type GridInput, type PlacedOrder, type PlaceOrderInput, type TwapInput } from "./trading.js";
import type { MarginMode, MarketSpec, OrderHistoryEntry, Position, Side } from "./types.js";
import { uuid } from "./bytes.js";
import { roundToStep } from "./format.js";
import { PriceStream, UserStream } from "./ws.js";
import { OrderBookFeed } from "./book.js";
import { isUuid } from "./parse.js";

export interface StrikeEverywhereOptions {
  network?: Network;
  builderCode: string;
  feeBps?: number;
  maxFeeBps?: number;
  referralCode?: string;
  partnerId?: string;
  partnerApi?: string;
  persist?: PersistMode;
  sessionTtlMs?: number;
  idleTimeoutMs?: number;
}

export type SessionEndReason = "disconnect" | "expired" | "idle";

export const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60_000;
const ACTIVITY_EVENTS = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"] as const;

export type ClientEvent =
  | { type: "session"; session: BuilderSession | null; reason?: SessionEndReason }
  | { type: "order"; order: OrderHistoryEntry }
  | { type: "user"; data: any };

export interface OnboardingCheck {
  address: string;
  hasStrikeAccount: boolean | null;
  walletAda: number;
  walletUsd: number;
  minFirstDepositUsd: number;
  canAffordFirstDeposit: boolean;
}

export class StrikeEverywhere {
  readonly net: NetworkConfig;
  readonly http: StrikeHttp;
  readonly market: MarketData;
  readonly account: AccountApi;
  readonly trading: Trading;
  readonly deposits: Deposits;
  readonly withdrawals: Withdrawals;
  readonly feeBps: number;
  readonly maxFeeBps: number;

  session: BuilderSession | null = null;
  wallet: CardanoWallet | null = null;

  private readonly store: SessionStore;
  private listeners = new Set<(e: ClientEvent) => void>();
  private specs = new Map<string, MarketSpec>();
  private rawMarkets = new Map<string, RawMarket>();
  private priceStream: PriceStream | null = null;
  private userStream: UserStream | null = null;
  private idleTimer: ReturnType<typeof setInterval> | null = null;
  readonly idleTimeoutMs: number;

  constructor(readonly opts: StrikeEverywhereOptions) {
    this.net = NETWORKS[opts.network ?? "mainnet"];
    this.http = new StrikeHttp(this.net);
    this.market = new MarketData(this.http);
    this.account = new AccountApi(this.http);
    this.trading = new Trading(this.http, this.account);
    this.deposits = new Deposits(this.http);
    this.withdrawals = new Withdrawals(this.http);
    const fee = clampBps(opts.feeBps ?? 5);
    this.maxFeeBps = clampBps(opts.maxFeeBps ?? fee, fee);
    this.feeBps = Math.min(fee, this.maxFeeBps);
    this.idleTimeoutMs = Math.max(0, Number(opts.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS) || 0);
    this.store = new SessionStore(opts.persist ?? "memory", `strike-everywhere:${this.net.network}:${opts.builderCode}`, opts.sessionTtlMs ?? 12 * 3600_000, this.idleTimeoutMs);
    this.http.beforeSign = () => this.checkExpiry();
  }


  on(fn: (e: ClientEvent) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(e: ClientEvent): void {
    this.listeners.forEach((f) => f(e));
  }

  async init(): Promise<void> {
    await this.http.syncClock();
    const stored = await this.store.load();
    if (stored) {
      if (!(Number(stored.session.feeShareBps) >= this.feeBps) || stored.session.builderCode !== this.opts.builderCode) {
        this.store.clear(stored.key.publicKeyHex);
        return;
      }
      this.resetUserStream();
      this.http.key = stored.key;
      this.session = stored.session;
      this.watchActivity();
      this.emit({ type: "session", session: this.session });
    }
  }

  touch(): void {
    if (!this.checkExpiry()) this.store.touch();
  }

  private checkExpiry(): boolean {
    const why = this.session ? this.store.expiry() : null;
    if (!why) return false;
    this.endSession(why);
    return true;
  }

  private onActivity = (e: Event) => {
    if (e.isTrusted) this.touch();
  };

  private onVisible = () => {
    if (typeof document !== "undefined" && document.visibilityState === "visible") this.checkExpiry();
  };

  private watchActivity(): void {
    this.unwatchActivity();
    if (typeof window === "undefined") return;
    for (const t of ACTIVITY_EVENTS) window.addEventListener(t, this.onActivity, { capture: true, passive: true });
    document.addEventListener("visibilitychange", this.onVisible);
    this.idleTimer = setInterval(() => this.checkExpiry(), 30_000);
  }

  private unwatchActivity(): void {
    if (this.idleTimer) clearInterval(this.idleTimer);
    this.idleTimer = null;
    if (typeof window === "undefined") return;
    for (const t of ACTIVITY_EVENTS) window.removeEventListener(t, this.onActivity, { capture: true });
    document.removeEventListener("visibilitychange", this.onVisible);
  }

  get orderFeeBps(): number {
    const approved = Number(this.session?.feeShareBps);
    return Number.isFinite(approved) ? Math.min(this.feeBps, approved) : this.feeBps;
  }

  private resetUserStream(): void {
    this.userStream?.close();
    this.userStream = null;
  }

  static wallets(): WalletInfo[] {
    return detectWallets();
  }

  async checkOnboarding(walletId: string): Promise<OnboardingCheck> {
    this.wallet = await CardanoWallet.enable(walletId, this.net);
    const [hasStrikeAccount, lovelace, ada] = await Promise.all([
      this.account.exists(this.wallet.address),
      this.wallet.balanceLovelace().catch(() => 0n),
      this.markPrice("ADA-USD").catch(() => 0),
    ]);
    const walletAda = Number(lovelace) / 1e6;
    const walletUsd = walletAda * ada;
    return {
      address: this.wallet.address,
      hasStrikeAccount,
      walletAda,
      walletUsd,
      minFirstDepositUsd: MIN_DEPOSIT_USD,
      canAffordFirstDeposit: hasStrikeAccount !== false || walletUsd >= MIN_DEPOSIT_USD * 1.02,
    };
  }

  async connect(walletId: string, hooks: { onMessage?: (m: string) => void } = {}): Promise<BuilderSession> {
    if (!this.wallet || this.wallet.id !== walletId) this.wallet = await CardanoWallet.enable(walletId, this.net);
    const wallet = this.wallet;
    const { session, key } = await builderConnect({
      http: this.http,
      address: wallet.address,
      chain: "cardano",
      builderCode: this.opts.builderCode,
      feeShareBps: this.maxFeeBps,
      referralCode: this.opts.referralCode,
      signMessage: (m) => wallet.signMessage(m),
      onMessage: hooks.onMessage,
    });
    this.resetUserStream();
    this.http.key = key;
    this.session = session;
    await this.store.save(session, key);
    this.watchActivity();
    this.beacon({ type: "connect", accountId: session.accountId });
    this.emit({ type: "session", session });
    return session;
  }

  dispose(): void {
    this.priceStream?.close();
    this.priceStream = null;
    this.userStream?.close();
    this.userStream = null;
    this.unwatchActivity();
    this.listeners.clear();
  }

  disconnect(): void {
    this.endSession("disconnect");
  }

  private endSession(reason: SessionEndReason): void {
    this.unwatchActivity();
    this.resetUserStream();
    const pub = this.http.key?.publicKeyHex;
    this.http.key = null;
    this.session = null;
    this.wallet = null;
    this.store.clear(pub);
    this.emit({ type: "session", session: null, reason });
  }

  async ensureWallet(walletId: string): Promise<CardanoWallet> {
    if (!this.wallet) this.wallet = await CardanoWallet.enable(walletId, this.net);
    if (this.session?.address && this.wallet.address !== this.session.address) {
      this.wallet = null;
      throw new Error(
        "Your wallet's active address isn't the one connected to Strike here. Switch back to that account, or turn on single-address mode in your wallet (multi-address mode can rotate addresses), or disconnect and connect again.",
      );
    }
    return this.wallet;
  }


  async loadMarkets(): Promise<MarketSpec[]> {
    const raw = await this.market.markets();
    for (const m of raw) {
      this.rawMarkets.set(m.symbol, m);
      this.specs.set(m.symbol, toMarketSpec(m));
    }
    return raw.filter((m) => m.status === "trading").map(toMarketSpec);
  }

  spec(symbol: string): MarketSpec {
    const s = this.specs.get(symbol);
    if (!s) throw new Error(`Unknown market ${symbol}; call loadMarkets() first.`);
    return s;
  }

  raw(symbol: string): RawMarket | undefined {
    return this.rawMarkets.get(symbol);
  }

  async markPrice(symbol: string): Promise<number> {
    return Number((await this.market.premiumIndex(symbol)).markPrice);
  }

  async lastPrice(symbol: string): Promise<number> {
    return (await this.market.trades(symbol, 1))[0]?.price ?? 0;
  }

  prices(): PriceStream {
    if (!this.priceStream) {
      this.priceStream = new PriceStream(this.net.wsPrice);
      this.priceStream.connect();
    }
    return this.priceStream;
  }

  userEvents(): UserStream | null {
    if (!this.http.key) return null;
    if (!this.userStream) {
      this.userStream = new UserStream(this.net.wsUser, this.http.key, () => this.http.serverNowMs());
      this.userStream.onMessage((data) => this.emit({ type: "user", data }));
      this.userStream.connect();
    }
    return this.userStream;
  }


  async placeOrder(input: PlaceOrderInput & { leverage?: number }): Promise<OrderHistoryEntry> {
    const spec = this.spec(input.symbol);
    if (input.leverage) await this.applyLeverage(input.symbol, input.leverage);
    if (isTriggered(input.type)) {
      const onLast = input.workingType === "contract_price";
      const [mark, last] = await Promise.all([this.markPrice(input.symbol).catch(() => 0), onLast ? this.lastPrice(input.symbol).catch(() => 0) : Promise.resolve(0)]);
      const problem = stopOrderProblem({ ...input, mark, last, priceBound: Number(this.raw(input.symbol)?.order_limit_price_bound) || undefined, tickSize: spec.tickSize });
      const ref = onLast ? last : mark;
      if (problem) throw new Error(ref > 0 ? `${problem}. Order not sent.` : `Couldn't check the trigger against the current ${onLast ? "last" : "mark"} price. Order not sent.`);
    } else if (input.type === "trailing_stop_market") {
      const problem = stopOrderProblem({ ...input, mark: 0 });
      if (problem) throw new Error(`${problem}. Order not sent.`);
    }
    const price = input.price ?? input.stopPrice ?? Number(this.raw(input.symbol)?.mark_price ?? 0);
    return this.submitTracked(input.symbol, Trading.newOrderIds(input), input.side, input.size * price, (ids) => this.trading.placeOrder(spec, input, this.orderFeeBps, ids));
  }

  cancelAll(symbol?: string): Promise<number | null> {
    return this.trading.cancelAll(symbol);
  }

  async placeTwap(input: TwapInput & { leverage?: number }): Promise<{ strategyId: string; status: string }> {
    const spec = this.spec(input.symbol);
    const mark = await this.markPrice(input.symbol).catch(() => 0);
    if (!(mark > 0)) throw new Error("Couldn't get the current mark price. TWAP not started.");
    const tooSmall = twapSizeProblem(spec, Number(roundToStep(input.size, spec.marketStepSize ?? spec.stepSize, "floor")), Math.round(Number(input.durationSec)), mark);
    if (tooSmall) throw new Error(tooSmall);
    if (input.limitPrice !== undefined) {
      const bound = Number(this.raw(input.symbol)?.order_limit_price_bound) || 0.05;
      if (!(input.limitPrice > 0) || Math.abs(input.limitPrice - mark) / mark > bound) {
        throw new Error(`TWAP limit price must be within ${(bound * 100).toFixed(0)}% of the mark price. TWAP not started.`);
      }
    }
    if (input.leverage) await this.applyLeverage(input.symbol, input.leverage);
    const r = await this.trading.createTwap(spec, input, this.orderFeeBps);
    const price = mark;
    if (isUuid(r.strategyId)) {
      void this.beacon({ type: "order", status: "twap", clientOrderId: r.strategyId, symbol: input.symbol, side: input.side, notional: input.size * price, reduceOnly: !!input.reduceOnly });
    }
    return r;
  }

  async setMarginMode(symbol: string, mode: MarginMode): Promise<void> {
    let pos: Position[];
    try {
      pos = await this.account.positions();
    } catch {
      throw new Error("Couldn't check your open positions. Margin mode not changed; try again.");
    }
    if (pos.some((p) => p.symbol === symbol && Number(p.size) !== 0)) throw new Error(`Close your ${symbol} position first: Strike only changes margin mode with no open position.`);
    if ((await this.account.symbolMarginMode(symbol).catch(() => null)) === mode) return;
    await this.trading.setMarginMode(symbol, mode);
    const deadline = Date.now() + 5000;
    for (;;) {
      if ((await this.account.symbolMarginMode(symbol).catch(() => null)) === mode) return;
      if (Date.now() > deadline) throw new Error("Strike hasn't confirmed the margin mode change yet. Check it again before trading.");
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  orderBook(symbol: string): OrderBookFeed {
    return new OrderBookFeed(this.market, this.prices(), symbol).start();
  }

  vaultUrl(vaultId: string): string {
    return this.appUrl(isUuid(vaultId) ? `/vaults/${vaultId}` : "/vaults");
  }

  async editOrder(order: OrderHistoryEntry, changes: { price?: number; stopPrice?: number; size?: number }): Promise<OrderHistoryEntry> {
    const type = String(order.type) as PlaceOrderInput["type"];
    if (type === "trailing_stop_market") throw new Error("Trailing stops can't be edited: cancel it and place a new one.");
    if (type === "market") throw new Error("Market orders can't be edited.");
    const spec = this.spec(order.symbol);
    const remaining = Math.max(0, Number(order.size) - (Number(order.filled) || 0));
    const input: PlaceOrderInput = {
      symbol: order.symbol,
      side: order.side,
      type,
      size: changes.size ?? remaining,
      price: needsLimitPrice(type) ? changes.price ?? Number(order.price) : undefined,
      stopPrice: isTriggered(type) ? changes.stopPrice ?? Number(order.stop_price) : undefined,
      reduceOnly: !!order.reduce_only,
      workingType: isTriggered(type) && order.working_type === "contract_price" ? "contract_price" : undefined,
    };
    if (isTriggered(type)) {
      const onLast = input.workingType === "contract_price";
      const [mark, last] = await Promise.all([this.markPrice(order.symbol).catch(() => 0), onLast ? this.lastPrice(order.symbol).catch(() => 0) : Promise.resolve(0)]);
      const problem = stopOrderProblem({ ...input, mark, last, priceBound: Number(this.raw(order.symbol)?.order_limit_price_bound) || undefined, tickSize: spec.tickSize });
      if (problem) throw new Error(`${problem}. Order not changed.`);
    }
    const price = input.price ?? input.stopPrice ?? Number(this.raw(order.symbol)?.mark_price ?? 0);
    return this.submitTracked(order.symbol, { clientOrderId: uuid() }, order.side, input.size * price, (ids) => this.trading.replaceOrder(spec, order, input, this.orderFeeBps, ids.clientOrderId), !!input.reduceOnly);
  }

  async setPositionExits(position: Position, exits: { takeProfit?: number; stopLoss?: number; fraction?: number; workingType?: "mark_price" | "contract_price"; limitOffset?: number }): Promise<OrderHistoryEntry[]> {
    const size = Math.abs(Number(position.size)) * Math.min(1, Math.max(0, exits.fraction ?? 1));
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    const out: OrderHistoryEntry[] = [];
    let late: OrderUnconfirmedError | null = null;
    const legs: PlaceOrderInput[] = [];
    if (exits.takeProfit) legs.push({ symbol: position.symbol, side, type: "take_profit", size, stopPrice: exits.takeProfit, reduceOnly: true, closePosition: (exits.fraction ?? 1) >= 1, workingType: exits.workingType });
    if (exits.stopLoss) legs.push({ symbol: position.symbol, side, type: "stop", size, stopPrice: exits.stopLoss, reduceOnly: true, closePosition: (exits.fraction ?? 1) >= 1, workingType: exits.workingType });
    for (const leg of legs) {
      try {
        out.push(await this.placeOrder(leg));
      } catch (e) {
        if (!(e instanceof OrderUnconfirmedError)) throw e;
        if (late) {
          const [a, b] = [late.settled, e.settled];
          e.settled = Promise.all([a, b]).then(([x, y]) => (x && y ? y : null));
        }
        late = e;
      }
    }
    if (late) throw late;
    return out;
  }

  async trailPosition(position: Position, callbackRatePct: number, activationPrice?: number, workingType?: "mark_price" | "contract_price"): Promise<OrderHistoryEntry> {
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    return this.placeOrder({ symbol: position.symbol, side, type: "trailing_stop_market", size: Math.abs(Number(position.size)), callbackRate: callbackRatePct, activationPrice, reduceOnly: true, workingType });
  }

  async limitClose(position: Position, price: number, fraction = 1): Promise<OrderHistoryEntry> {
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    const size = closeSizeFor(this.spec(position.symbol), Math.abs(Number(position.size)), Math.min(1, fraction), "limit");
    if (!(size > 0)) throw new Error("That's smaller than the market's minimum size. Close a larger part.");
    return this.placeOrder({ symbol: position.symbol, side, type: "limit", size, price, reduceOnly: true });
  }

  async reversePosition(position: Position): Promise<OrderHistoryEntry> {
    const side: Side = Number(position.size) > 0 ? "sell" : "buy";
    return this.placeOrder({ symbol: position.symbol, side, type: "market", size: Math.abs(Number(position.size)) * 2 });
  }

  async closeAllPositions(): Promise<Array<{ symbol: string; ok: boolean; status?: string; error?: string }>> {
    const positions = await this.account.positions();
    const results: Array<{ symbol: string; ok: boolean; status?: string; error?: string }> = [];
    for (const p of positions) {
      try {
        const o = await this.closePosition(p);
        results.push({ symbol: p.symbol, ok: o.status === "filled", status: o.status });
      } catch (e: any) {
        if (e instanceof OrderUnconfirmedError) results.push({ symbol: p.symbol, ok: true, status: "unconfirmed" });
        else results.push({ symbol: p.symbol, ok: false, error: e?.message || String(e) });
      }
    }
    return results;
  }

  modifyMargin(symbol: string, amount: number, direction: "add" | "remove"): Promise<void> {
    return this.trading.modifyIsolatedMargin(symbol, amount, direction);
  }

  async startGrid(g: GridInput & { leverage?: number }): Promise<{ id: string; status: string }> {
    const spec = this.spec(g.symbol);
    if (g.leverage) await this.applyLeverage(g.symbol, g.leverage);
    const mark = await this.markPrice(g.symbol).catch(() => 0);
    const problem = gridProblem(g, mark);
    if (problem) throw new Error(`${problem}. Grid not started.`);
    return this.trading.createGrid(spec, g, this.orderFeeBps);
  }

  async closePosition(position: Position, fraction = 1): Promise<OrderHistoryEntry> {
    const spec = this.spec(position.symbol);
    const price = Number(this.raw(position.symbol)?.mark_price ?? position.entry_price);
    const side = Number(position.size) > 0 ? "sell" : "buy";
    const notional = Math.abs(Number(position.size)) * Math.min(1, Math.max(0, fraction)) * price;
    return this.submitTracked(position.symbol, Trading.newOrderIds({}), side, notional, (ids) => this.trading.closePosition(spec, position, this.orderFeeBps, ids, fraction), true);
  }

  private async applyLeverage(symbol: string, leverage: number): Promise<void> {
    const want = Math.round(leverage);
    const before = await this.account.symbolLeverage(symbol).catch(() => null);
    if (before === want) return;
    try {
      await this.trading.setLeverage(symbol, want);
      const deadline = Date.now() + 5000;
      for (;;) {
        const now = await this.account.symbolLeverage(symbol).catch(() => null);
        if (now === want || now === null) break;
        if (Date.now() > deadline) throw new Error("Strike hasn't confirmed the leverage change yet");
        await new Promise((r) => setTimeout(r, 400));
      }
    } catch (e: any) {
      const pos = await this.account.positions().catch(() => [] as Position[]);
      const current = Number(pos.find((p) => p.symbol === symbol && Number(p.size) !== 0)?.leverage);
      if (Number.isFinite(current) && current > 0 && current <= leverage) return;
      throw new Error(`Couldn't set ${symbol} leverage to ${leverage}x (${e?.message || e}). Order not sent.`);
    }
  }

  private async submitTracked(symbol: string, ids: PlacedOrder, side: string, notional: number, send: (ids: PlacedOrder) => Promise<PlacedOrder>, reduceOnly = false): Promise<OrderHistoryEntry> {
    const base = { clientOrderId: ids.clientOrderId, legClientOrderIds: ids.legClientOrderIds, symbol, side, notional, reduceOnly };
    await this.beacon({ type: "order", status: "intent", ...base }, 1500);
    const placed = await send(ids);
    try {
      const order = await this.trading.waitForOrder(symbol, placed.clientOrderId);
      void this.beacon({ type: "order", ...base, orderId: order.id, status: order.status });
      this.emit({ type: "order", order });
      return order;
    } catch (e) {
      void this.beacon({ type: "order", ...base, status: e instanceof OrderRejectedError ? "rejected" : "pending" });
      if (e instanceof OrderUnconfirmedError) {
        e.settled = this.trading.waitForOrder(symbol, placed.clientOrderId, 180_000).then(
          (order) => {
            void this.beacon({ type: "order", ...base, orderId: order.id, status: order.status });
            this.emit({ type: "order", order });
            return order;
          },
          (later) => {
            if (later instanceof OrderRejectedError) {
              void this.beacon({ type: "order", ...base, status: "rejected" });
              throw later;
            }
            return null;
          },
        );
      }
      throw e;
    }
  }


  async prepareDeposit(ada: number): Promise<PreparedDeposit> {
    if (!this.wallet) throw new Error("Connect a wallet first.");
    if (!(ada > 0) || !Number.isFinite(ada)) throw new Error("Enter an amount of ADA.");
    return this.deposits.prepareAda(this.wallet, BigInt(Math.round(ada * 1e6)), this.session?.accountId);
  }

  async confirmDeposit(prepared: PreparedDeposit): Promise<{ txHash: string }> {
    if (!this.wallet) throw new Error("Connect a wallet first.");
    try {
      const r = await this.deposits.signAndSubmit(this.wallet, prepared);
      void this.beacon({ type: "deposit", usd: prepared.usdValue, txHash: r.txHash });
      return r;
    } catch (e) {
      if (e instanceof DepositRegistrationError) void this.beacon({ type: "deposit", usd: prepared.usdValue, txHash: e.txHash });
      throw e;
    }
  }

  async retryDepositRegistration(requestId: string, txHash: string): Promise<void> {
    await this.deposits.register(requestId, txHash);
  }


  withdrawLimits(): Promise<{ maxUsd: number | null; minUsd: number | null; feeDiscountPct: number | null }> {
    return this.account.withdrawLimits();
  }

  referralLink(): string | null {
    const code = this.opts.referralCode;
    return code ? `${this.net.app}/trade/BTC?referralCode=${encodeURIComponent(code)}` : null;
  }

  async prepareWithdrawal(usd: number): Promise<PreparedWithdrawal> {
    return this.withdrawals.prepareAda(usd, this.wallet?.address);
  }

  async confirmWithdrawal(prepared: PreparedWithdrawal): Promise<{ status: string; requestId: string }> {
    if (!this.wallet) throw new Error("Connect a wallet first.");
    return this.withdrawals.signAndSubmit(this.wallet, prepared);
  }

  appUrl(path = ""): string {
    return this.net.app + path;
  }


  private beacon(evt: Record<string, unknown>, waitMs = 0): Promise<void> {
    const accountId = evt.accountId ?? this.session?.accountId;
    if (!this.opts.partnerApi || !accountId) return Promise.resolve();
    const payload = {
      ...evt,
      network: this.net.network,
      builderCode: this.opts.builderCode,
      partnerId: this.opts.partnerId ?? "",
      hostOrigin: typeof location !== "undefined" ? location.origin : "",
      accountId,
      feeBps: this.orderFeeBps,
      ts: Date.now(),
    };
    try {
      const sent = fetch(`${this.opts.partnerApi.replace(/\/$/, "")}/v1/events`, { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "text/plain" }, keepalive: true })
        .then(() => undefined)
        .catch(() => undefined);
      return waitMs > 0 ? Promise.race([sent, new Promise<void>((r) => setTimeout(r, waitMs))]) : Promise.resolve();
    } catch {
      return Promise.resolve();
    }
  }
}

function clampBps(v: number, fallback = 5): number {
  const n = Number(v);
  return Math.max(0, Math.min(MAX_BUILDER_FEE_BPS, Math.round(Number.isFinite(n) ? n : fallback)));
}
