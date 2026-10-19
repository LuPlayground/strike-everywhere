import { AccountApi } from "./account.js";
import { builderConnect, type BuilderSession } from "./builderConnect.js";
import { CardanoWallet, detectWallets, type WalletInfo } from "./cardano/wallet.js";
import { MAX_BUILDER_FEE_BPS, NETWORKS, NEW_ACCOUNT_MIN_DEPOSIT_USD, type Network, type NetworkConfig } from "./config.js";
import { DepositRegistrationError, Deposits, type PreparedDeposit } from "./deposit.js";
import { Withdrawals, type PreparedWithdrawal } from "./withdraw.js";
import { StrikeHttp } from "./http.js";
import { MarketData, toMarketSpec, type RawMarket } from "./market.js";
import { SessionStore, type PersistMode } from "./session.js";
import { ApiWalletKey } from "./signer.js";
import { OrderRejectedError, Trading, type PlacedOrder, type PlaceOrderInput } from "./trading.js";
import type { MarketSpec, OrderHistoryEntry, Position } from "./types.js";
import { PriceStream, UserStream } from "./ws.js";

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
}

export type ClientEvent =
  | { type: "session"; session: BuilderSession | null }
  | { type: "order"; order: OrderHistoryEntry }
  | { type: "user"; data: any };

export interface OnboardingCheck {
  address: string;
  hasStrikeAccount: boolean;
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
    this.store = new SessionStore(opts.persist ?? "memory", `strike-everywhere:${this.net.network}:${opts.builderCode}`, opts.sessionTtlMs ?? 12 * 3600_000);
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
    const stored = this.store.load();
    if (stored) {
      if (!(Number(stored.session.feeShareBps) >= this.feeBps) || stored.session.builderCode !== this.opts.builderCode) {
        this.store.clear(stored.privateKeyHex);
        return;
      }
      this.resetUserStream();
      this.http.key = await ApiWalletKey.fromPrivateKeyHex(stored.privateKeyHex);
      this.session = stored.session;
      this.emit({ type: "session", session: this.session });
    }
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
      this.wallet.balanceLovelace(),
      this.markPrice("ADA-USD").catch(() => 0),
    ]);
    const walletAda = Number(lovelace) / 1e6;
    const walletUsd = walletAda * ada;
    return {
      address: this.wallet.address,
      hasStrikeAccount,
      walletAda,
      walletUsd,
      minFirstDepositUsd: NEW_ACCOUNT_MIN_DEPOSIT_USD,
      canAffordFirstDeposit: hasStrikeAccount || walletUsd >= NEW_ACCOUNT_MIN_DEPOSIT_USD * 1.02,
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
    this.store.save(session, key.exportPrivateKeyHex());
    this.beacon({ type: "connect", accountId: session.accountId });
    this.emit({ type: "session", session });
    return session;
  }

  dispose(): void {
    this.priceStream?.close();
    this.priceStream = null;
    this.userStream?.close();
    this.userStream = null;
    this.listeners.clear();
  }

  disconnect(): void {
    this.resetUserStream();
    const keyHex = this.http.key?.exportPrivateKeyHex();
    this.http.key = null;
    this.session = null;
    this.wallet = null;
    this.store.clear(keyHex);
    this.emit({ type: "session", session: null });
  }

  async ensureWallet(walletId: string): Promise<CardanoWallet> {
    if (!this.wallet) this.wallet = await CardanoWallet.enable(walletId, this.net);
    if (this.session?.address && this.wallet.address !== this.session.address) {
      this.wallet = null;
      throw new Error("Your wallet's active account isn't the one connected to Strike here. Switch accounts in your wallet, or disconnect and connect again.");
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
      this.userStream = new UserStream(this.net.wsUser, this.http.key, this.http.clockSkewSec * 1000);
      this.userStream.onMessage((data) => this.emit({ type: "user", data }));
      this.userStream.connect();
    }
    return this.userStream;
  }


  async placeOrder(input: PlaceOrderInput & { leverage?: number }): Promise<OrderHistoryEntry> {
    const spec = this.spec(input.symbol);
    if (input.leverage) await this.applyLeverage(input.symbol, input.leverage);
    const price = input.price ?? Number(this.raw(input.symbol)?.mark_price ?? 0);
    return this.submitTracked(input.symbol, Trading.newOrderIds(input), input.side, input.size * price, (ids) => this.trading.placeOrder(spec, input, this.orderFeeBps, ids));
  }

  async closePosition(position: Position): Promise<OrderHistoryEntry> {
    const spec = this.spec(position.symbol);
    const price = Number(this.raw(position.symbol)?.mark_price ?? position.entry_price);
    const side = Number(position.size) > 0 ? "sell" : "buy";
    return this.submitTracked(position.symbol, Trading.newOrderIds({}), side, Math.abs(Number(position.size)) * price, (ids) => this.trading.closePosition(spec, position, this.orderFeeBps, ids), true);
  }

  private async applyLeverage(symbol: string, leverage: number): Promise<void> {
    try {
      await this.trading.setLeverage(symbol, leverage);
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


  async prepareWithdrawal(usd: number): Promise<PreparedWithdrawal> {
    return this.withdrawals.prepareAda(usd);
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
