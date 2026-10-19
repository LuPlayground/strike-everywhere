import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  OrderRejectedError,
  StrikeEverywhere,
  formatPct,
  formatPrice,
  formatUsd,
  maxLeverageFor,
  previewOrder,
  roundToStep,
  shortAddress,
  type Account,
  type MarketSpec,
  type OrderHistoryEntry,
  type Position,
  type RawMarket,
  type StrikeEverywhereOptions,
} from "@strike-everywhere/core";
import { Check, Chevron, CoinIcon, KV, PctSlider, Sparkline, Spinner, decimalInput } from "./parts";
import { ConnectSheet } from "./ConnectSheet";
import { DepositSheet } from "./DepositSheet";
import { WithdrawSheet } from "./WithdrawSheet";
import { OrdersList, PositionsList } from "./Lists";

export interface WidgetConfig extends StrikeEverywhereOptions {
  market: string;
  maxLeverage: number;
  side?: "buy" | "sell";
}

interface Live {
  mark: number;
  open: number;
  funding: number;
  index: number;
  quoteVolume: number;
}

const LEVERAGE_STEPS = [1, 2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 100];
const WALLET_KEY = "strike-everywhere:wallet";


function storageGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
  }
}

const fmtQty = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 8 });

export function App({ config }: { config: WidgetConfig }) {
  const client = useMemo(() => new StrikeEverywhere(config), []);

  const [markets, setMarkets] = useState<MarketSpec[]>([]);
  const [symbol, setSymbol] = useState(config.market);
  const [live, setLive] = useState<Record<string, Live>>({});
  const [spark, setSpark] = useState<number[]>([]);
  const [takerRate, setTakerRate] = useState(0.0005);
  const [loadError, setLoadError] = useState("");

  const [session, setSession] = useState(client.session);
  const [account, setAccount] = useState<Account | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([]);

  const [side, setSide] = useState<"buy" | "sell">(config.side ?? "buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [sizeUsd, setSizeUsd] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [leverage, setLeverage] = useState(Math.min(3, config.maxLeverage));
  const [reduceOnly, setReduceOnly] = useState(false);
  const [tpsl, setTpsl] = useState(false);
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [placing, setPlacing] = useState(false);

  const [sheet, setSheet] = useState<null | "connect" | "deposit" | "withdraw">(null);
  const [menu, setMenu] = useState<null | "market" | "leverage">(null);
  const [query, setQuery] = useState("");
  const [lowerTab, setLowerTab] = useState<"positions" | "orders" | "account">("positions");
  const [busy, setBusy] = useState<Set<string>>(new Set());
  const markBusy = (id: string, on: boolean) =>
    setBusy((prev) => {
      const next = new Set(prev);
      on ? next.add(id) : next.delete(id);
      return next;
    });

  const [referralMissing, setReferralMissing] = useState(false);
  useEffect(() => {
    setReferralMissing(false);
    if (!session || !config.referralCode) return;
    client.withdrawLimits().then((l) => setReferralMissing(l.feeDiscountPct === 0)).catch(() => {});
  }, [session]);

  useEffect(() => setSymbol(config.market), [config.market]);
  useEffect(() => setSide(config.side ?? "buy"), [config.side]);
  useEffect(() => setLeverage((l) => Math.min(l, config.maxLeverage)), [config.maxLeverage]);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const notify = (kind: "ok" | "err", text: string) => {
    setToast({ kind, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), kind === "ok" ? 4500 : 8000);
  };

  useEffect(() => {
    let alive = true;
    const off = client.on((e) => {
      if (e.type === "session") setSession(e.session);
      if (e.type === "user") scheduleRefresh();
    });
    (async () => {
      for (let attempt = 0; alive; attempt++) {
        try {
          if (attempt === 0) await client.init();
          const [specs, tickers, rate] = await Promise.all([client.loadMarkets(), client.market.tickers().catch(() => []), client.market.baseTakerRate()]);
          if (!alive) return;
          setMarkets(specs);
          setTakerRate(rate);
          setLoadError("");
          const next: Record<string, Live> = {};
          for (const s of specs) {
            const raw = client.raw(s.symbol)!;
            const t = tickers.find((x) => x.symbol === s.symbol);
            next[s.symbol] = {
              mark: Number(raw.mark_price),
              index: Number(raw.index_price),
              funding: Number(raw.funding_rate),
              open: t ? Number(t.lastPrice) / (1 + Number(t.priceChangePercent) / 100) : Number(raw.mark_price),
              quoteVolume: t ? Number(t.quoteVolume) : 0,
            };
          }
          setLive(next);
          return;
        } catch (e: any) {
          if (!alive) return;
          setLoadError(e?.message || "Could not reach Strike.");
          await new Promise((r) => setTimeout(r, Math.min(30_000, 2000 * 2 ** attempt)));
        }
      }
    })();

    const ps = client.prices();
    ps.subscribe("!markprice@arr");
    ps.subscribe("!miniticker@arr");
    const offWs = ps.onMessage((msg) => {
      const items: any[] = Array.isArray(msg) ? msg : Array.isArray(msg?.data) ? msg.data : msg?.data ? [msg.data] : [msg];
      setLive((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const it of items) {
          if (!it?.s || !next[it.s]) continue;
          if (it.e === "markPriceUpdate") {
            next[it.s] = { ...next[it.s], mark: Number(it.p), index: Number(it.i ?? next[it.s].index), funding: Number(it.r ?? next[it.s].funding) };
            changed = true;
          } else if (it.e === "24hrMiniTicker") {
            next[it.s] = { ...next[it.s], open: Number(it.o), quoteVolume: Number(it.q ?? next[it.s].quoteVolume) };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    });
    const poll = setInterval(async () => {
      try {
        const raws: RawMarket[] = await client.market.markets();
        setLive((prev) => {
          const next = { ...prev };
          for (const r of raws) if (next[r.symbol]) next[r.symbol] = { ...next[r.symbol], mark: Number(r.mark_price), index: Number(r.index_price), funding: Number(r.funding_rate) };
          return next;
        });
      } catch {
      }
    }, 15000);
    return () => {
      alive = false;
      off();
      offWs();
      clearInterval(poll);
      client.dispose();
    };
  }, [client]);

  useEffect(() => {
    if (markets.length && !markets.find((s) => s.symbol === symbol)) setSymbol(markets[0].symbol);
  }, [markets, symbol]);

  useEffect(() => {
    let alive = true;
    setSpark([]);
    const load = () =>
      client.market
        .klines(symbol, "1h", 48, "mark")
        .then((k) => alive && setSpark(k.map((c) => c.close)))
        .catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client, symbol]);

  const refreshTimer = useRef<ReturnType<typeof setTimeout>>();
  const refresh = async () => {
    if (!client.session) return;
    try {
      const [a, p, o] = await Promise.all([client.account.account(), client.account.positions(), client.account.openOrders()]);
      setAccount(a);
      setPositions(p);
      setOrders(o);
    } catch (e: any) {
      if (e?.status === 401) {
        client.disconnect();
        notify("err", "Session expired. Connect again.");
      }
    }
  };
  const scheduleRefresh = () => {
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(refresh, 400);
  };

  useEffect(() => {
    if (!session) {
      setAccount(null);
      setPositions([]);
      setOrders([]);
      return;
    }
    refresh();
    client.userEvents();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, [session]);

  const spec = markets.find((m) => m.symbol === symbol);
  const raw = client.raw(symbol);
  const lv = live[symbol];
  const mark = lv?.mark ?? 0;
  const ref24 = spark.length >= 25 ? spark[spark.length - 25] : lv?.open ?? 0;
  const chg = ref24 > 0 && mark > 0 ? ((mark - ref24) / ref24) * 100 : 0;
  const base = spec?.baseAsset ?? symbol.split("-")[0];
  const tick = spec?.tickSize;
  const ticks = useMemo(() => Object.fromEntries(markets.map((m) => [m.symbol, m.tickSize])), [markets]);
  const marks = useMemo(() => Object.fromEntries(Object.entries(live).map(([k, v]) => [k, v.mark])), [live]);
  const sparkPoints = spark.length ? [...spark.slice(0, -1), mark || spark[spark.length - 1]] : [];

  const usd = Number(sizeUsd) || 0;
  const px = orderType === "limit" && Number(limitPrice) > 0 ? Number(limitPrice) : mark;
  const tierCap = spec ? maxLeverageFor(spec.marginTiers, Math.max(usd, 1)) : 1;
  const levCap = Math.max(1, Math.min(config.maxLeverage, tierCap));
  const lev = Math.min(leverage, levCap);
  const available = Number(account?.available_balance ?? 0);
  const buyingPower = available * lev;
  const pct = buyingPower > 0 ? Math.min(100, (usd / buyingPower) * 100) : 0;
  const sizeStep = spec ? (orderType === "market" ? spec.marketStepSize ?? spec.stepSize : spec.stepSize) : 0;
  const floorSize = px > 0 && spec ? Number(roundToStep(usd / px, sizeStep, "floor")) : 0;
  const baseSize =
    spec && px > 0 && sizeStep > 0 && floorSize * px < spec.minNotional && usd >= spec.minNotional ? Number(roundToStep(floorSize + sizeStep, sizeStep, "floor")) : floorSize;
  const feeBps = client.orderFeeBps;
  const preview = spec && px > 0 && usd > 0 ? previewOrder({ side, price: px, notional: baseSize * px, leverage: lev, takerRate, builderFeeBps: feeBps, tiers: spec.marginTiers }) : null;
  const position = positions.find((p) => p.symbol === symbol);
  const posSize = position ? Number(position.size) : 0;
  const isNewAccount = !account || (Number(account.wallet_balance) <= 0 && positions.length === 0);
  const bound = Number(raw?.order_limit_price_bound ?? 0.05);

  const problem = ((): string | null => {
    if (!spec) return "Loading market…";
    if (!session) return null;
    if (available <= 0 && !reduceOnly) return null;
    if (!usd) return "Enter a size";
    if (!reduceOnly && baseSize * px < spec.minNotional) return `Minimum order ${formatUsd(spec.minNotional, { decimals: 0 })}`;
    if (!reduceOnly && usd / lev > available * 1.0001) return "Not enough available balance";
    if (orderType === "limit") {
      if (!(Number(limitPrice) > 0)) return "Enter a limit price";
      if (Math.abs(Number(limitPrice) - mark) / mark > bound) return `Limit price must be within ${(bound * 100).toFixed(0)}% of mark`;
    }
    if (tpsl) {
      const t = Number(tp);
      const s = Number(sl);
      if (t && (side === "buy" ? t <= px : t >= px)) return "Take-profit must be beyond entry";
      if (s && (side === "buy" ? s >= px : s <= px)) return "Stop-loss must be on the losing side of entry";
    }
    return null;
  })();

  const submit = async () => {
    if (!spec || problem) return;
    setPlacing(true);
    try {
      const order = await client.placeOrder({
        symbol,
        side,
        type: orderType,
        size: baseSize,
        price: orderType === "limit" ? Number(limitPrice) : undefined,
        reduceOnly,
        takeProfit: tpsl && Number(tp) > 0 ? Number(tp) : undefined,
        stopLoss: tpsl && Number(sl) > 0 ? Number(sl) : undefined,
        leverage: reduceOnly ? undefined : lev,
      });
      const verb = order.status === "filled" ? "Filled" : order.status === "open" ? "Order placed" : `Order ${order.status}`;
      notify("ok", `${verb}: ${side === "buy" ? "Long" : "Short"} ${fmtQty(baseSize)} ${base}`);
      setSizeUsd("");
      setLowerTab(order.status === "open" ? "orders" : "positions");
      refresh();
    } catch (e: any) {
      notify("err", e instanceof OrderRejectedError ? `Rejected: ${e.message}` : e?.message || String(e));
    } finally {
      setPlacing(false);
    }
  };

  const closePosition = async (p: Position) => {
    const id = `pos:${p.id}`;
    if (busy.has(id)) return;
    markBusy(id, true);
    try {
      const o = await client.closePosition(p);
      notify("ok", o.status === "filled" ? `Closed ${p.symbol}` : `Close order ${o.status}`);
      refresh();
    } catch (e: any) {
      notify("err", e?.message || String(e));
    } finally {
      markBusy(id, false);
    }
  };

  const cancelOrder = async (o: OrderHistoryEntry) => {
    const id = `ord:${o.id}`;
    if (busy.has(id)) return;
    markBusy(id, true);
    try {
      await client.trading.cancelOrder(o.symbol, o.id);
      notify("ok", "Order cancelled");
      setTimeout(refresh, 600);
    } catch (e: any) {
      notify("err", e?.message || String(e));
    } finally {
      markBusy(id, false);
    }
  };

  const openWalletSheet = async (which: "deposit" | "withdraw") => {
    if (!client.wallet) {
      const id = storageGet(WALLET_KEY);
      if (id) {
        try {
          await client.ensureWallet(id);
        } catch (e: any) {
          notify("err", e?.message || String(e));
          return;
        }
      }
    }
    if (!client.wallet) return setSheet("connect");
    setSheet(which);
  };
  const openDeposit = () => openWalletSheet("deposit");

  const setPct = (v: number) => {
    if (buyingPower <= 0 || !spec) return;
    if (v === 0) return setSizeUsd("");
    const feeRate = takerRate + feeBps / 10_000;
    let target = available * lev * (v / 100);
    for (let i = 0; i < 4; i++) {
      const cap = Math.max(1, Math.min(lev, maxLeverageFor(spec.marginTiers, target)));
      target = (available * (v / 100)) / (1 / cap + feeRate);
    }
    setSizeUsd((Math.floor(target * 0.998 * 100) / 100).toString());
  };

  const filtered = markets.filter((m) => !query || m.symbol.toLowerCase().includes(query.toLowerCase()) || m.name.toLowerCase().includes(query.toLowerCase()));

  const cta = (() => {
    if (!session) return <button class="cta" onClick={() => setSheet("connect")}>Connect Wallet</button>;
    if (available <= 0 && !reduceOnly) return <button class="cta" onClick={openDeposit}>Deposit to trade</button>;
    return (
      <button class={`cta${side === "sell" ? " short" : ""}`} disabled={!!problem || placing} onClick={submit}>
        {placing ? <><Spinner /> Placing…</> : problem ?? `${side === "buy" ? "Long" : "Short"} ${base}${usd ? ` · ${formatUsd(baseSize * px)}` : ""}`}
      </button>
    );
  })();

  if (loadError && !markets.length) {
    return (
      <div class="card">
        <div class="ticket">
          <div class="warn">Strike is unreachable right now: {loadError}</div>
        </div>
      </div>
    );
  }

  return (
    <div class="card" onClick={(e) => menu && !(e.target as HTMLElement).closest(".menu, [data-menu]") && setMenu(null)} onKeyDown={(e) => e.key === "Escape" && (menu ? setMenu(null) : sheet && setSheet(null))}>
      <div class="mkt">
        <CoinIcon base={base} />
        <button class="mkt-pick" data-menu onClick={() => setMenu(menu === "market" ? null : "market")} aria-haspopup="listbox" aria-expanded={menu === "market"}>
          {symbol} <Chevron />
        </button>
        <div class="mkt-price">
          <div class="big num">{mark ? formatPrice(mark, tick) : "—"}</div>
          <div class={`chg num ${chg >= 0 ? "pos" : "neg"}`}>{lv ? formatPct(chg) : ""}</div>
        </div>
      </div>
      {menu === "market" && (
        <div class="menu" role="listbox">
          <input placeholder="Search markets" value={query} onInput={(e) => setQuery((e.target as HTMLInputElement).value)} autoFocus />
          {filtered.map((m) => {
            const l = live[m.symbol];
            const c = l && l.open ? ((l.mark - l.open) / l.open) * 100 : 0;
            return (
              <button key={m.symbol} class={`menu-row${m.symbol === symbol ? " on" : ""}`} role="option" aria-selected={m.symbol === symbol} onClick={() => (setSymbol(m.symbol), setMenu(null), setQuery(""), setLimitPrice(""), setTp(""), setSl(""))}>
                <span>
                  <div class="n">{m.symbol}</div>
                  <div class="t">{m.name} · {m.maxLeverage}x</div>
                </span>
                <span class="num">{l ? formatPrice(l.mark, m.tickSize) : ""}</span>
                <span class={`num ${c >= 0 ? "pos" : "neg"}`}>{l ? formatPct(c) : ""}</span>
              </button>
            );
          })}
        </div>
      )}
      <div class="stats">
        <div class="stat">
          <div class="k dotted" title="Strike's index: a weighted average of external spot prices">Index</div>
          <div class="v num">{lv ? formatPrice(lv.index, tick) : "—"}</div>
        </div>
        <div class="stat">
          <div class="k dotted" title="Hourly funding rate paid between longs and shorts">Funding / 1h</div>
          <div class={`v num ${lv && lv.funding < 0 ? "neg" : "pos"}`}>{lv ? `${(lv.funding * 100).toFixed(4)}%` : "—"}</div>
        </div>
        <div class="stat">
          <div class="k">24h Volume</div>
          <div class="v num">{lv ? formatUsd(lv.quoteVolume, { decimals: 0 }) : "—"}</div>
        </div>
      </div>
      <Sparkline points={sparkPoints} up={chg >= 0} />

      <div class="ticket">
        <div class="pills">
          <span class="pill static" title="Strike accounts trade in cross margin by default">Cross</span>
          <button class="pill" data-menu onClick={() => setMenu(menu === "leverage" ? null : "leverage")} aria-label="Leverage">
            {lev}x
          </button>
          <span class="pill static">One-Way</span>
        </div>
        {menu === "leverage" && (
          <div class="menu" style={{ top: "auto", marginTop: "-6px", position: "relative", left: 0, right: 0 }}>
            <div class="t muted" style={{ padding: "4px 8px 6px", fontSize: "11.5px" }}>
              Max {levCap}x for this size{config.maxLeverage < tierCap ? ` (site limit ${config.maxLeverage}x)` : ""}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", padding: "0 4px 4px" }}>
              {LEVERAGE_STEPS.filter((l) => l <= levCap).map((l) => (
                <button key={l} class="pill" style={l === lev ? { background: "rgba(78,250,176,.18)", color: "var(--se-accent)" } : undefined} onClick={() => (setLeverage(l), setMenu(null))}>
                  {l}x
                </button>
              ))}
            </div>
          </div>
        )}
        <div class="tabs" role="tablist">
          {(["market", "limit"] as const).map((t) => (
            <button key={t} role="tab" aria-selected={orderType === t} class={`tab${orderType === t ? " on" : ""}`} onClick={() => setOrderType(t)}>
              {t === "market" ? "Market" : "Limit"}
            </button>
          ))}
        </div>
        <div class="seg">
          <button class={`long${side === "buy" ? " on" : ""}`} onClick={() => setSide("buy")}>Long/Buy</button>
          <button class={`short${side === "sell" ? " on" : ""}`} onClick={() => setSide("sell")}>Short/Sell</button>
        </div>
        <KV k="Available to Trade" v={session ? <span class="num">{formatUsd(available)}</span> : "—"} />
        <KV k="Current Position" v={posSize ? <span class={`num ${posSize > 0 ? "pos" : "neg"}`}>{posSize > 0 ? "+" : ""}{fmtQty(posSize)} {base}</span> : "—"} />
        {orderType === "limit" && (
          <div class="field">
            <label for="se-price">Price</label>
            <input id="se-price" inputMode="decimal" placeholder={mark ? formatPrice(mark, tick).replace(/,/g, "") : "0"} value={limitPrice} onInput={(e) => setLimitPrice(decimalInput((e.target as HTMLInputElement).value))} />
            <button class="unit linkbtn" style={{ textDecoration: "none" }} onClick={() => setLimitPrice(roundToStep(mark, tick ?? 0.0001))}>Mark</button>
          </div>
        )}
        <div class="field">
          <label for="se-size">Size</label>
          <input id="se-size" inputMode="decimal" placeholder="0.00" value={sizeUsd} onInput={(e) => setSizeUsd(decimalInput((e.target as HTMLInputElement).value))} aria-label="Order size in USD" />
          <span class="unit">USD</span>
        </div>
        <div class="slider-row">
          <PctSlider value={pct} onChange={setPct} />
          <div class="pct num">{pct.toFixed(1)} %</div>
        </div>
        <div class="checks">
          <Check on={reduceOnly} label="Reduce Only" onToggle={() => setReduceOnly(!reduceOnly)} />
          <Check on={tpsl} label="TP/SL" onToggle={() => setTpsl(!tpsl)} />
        </div>
        {tpsl && (
          <div class="tpsl">
            <div class="field">
              <label for="se-tp">TP</label>
              <input id="se-tp" inputMode="decimal" placeholder="Take-profit price" value={tp} onInput={(e) => setTp(decimalInput((e.target as HTMLInputElement).value))} />
            </div>
            <div class="field">
              <label for="se-sl">SL</label>
              <input id="se-sl" inputMode="decimal" placeholder="Stop-loss price" value={sl} onInput={(e) => setSl(decimalInput((e.target as HTMLInputElement).value))} />
            </div>
          </div>
        )}
        {cta}
        {preview && preview.liquidationDistance < 0.1 && !reduceOnly && (
          <div class="warn">
            <b>High risk:</b> the estimated liquidation price is only {(preview.liquidationDistance * 100).toFixed(1)}% away. Consider lower leverage.
          </div>
        )}
        <div class="details">
          <KV k="Est. Entry" hint={orderType === "market" ? "Market orders fill near the mark price" : "Your limit price"} v={<span class="num">{px ? formatPrice(px, tick) : "—"}</span>} />
          <KV k="Est. Liquidation Price" hint="Conservative estimate treating this position as isolated. In cross margin your whole balance backs it, so the real price is usually further away." v={<span class="num">{preview && !reduceOnly ? formatPrice(preview.liquidationPrice, tick) : "—"}</span>} />
          <KV k="Margin" v={<span class="num">{preview ? formatUsd(preview.margin) : "—"}</span>} />
          <KV k="Order Size" v={<span class="num">{baseSize ? `${fmtQty(baseSize)} ${base}` : "—"}</span>} />
          <KV
            k="Fees"
            hint={`Strike taker fee ${(takerRate * 100).toFixed(3)}% + builder fee ${(feeBps / 100).toFixed(2)}% (${config.builderCode})`}
            v={<span class="num">{preview ? formatUsd(preview.totalFee, { decimals: preview.totalFee < 0.1 ? 4 : 2 }) : "—"}</span>}
          />
        </div>
      </div>

      {session && (
        <div class="lower">
          <div class="tabs" role="tablist">
            <button role="tab" class={`tab${lowerTab === "positions" ? " on" : ""}`} onClick={() => setLowerTab("positions")}>Positions ({positions.length})</button>
            <button role="tab" class={`tab${lowerTab === "orders" ? " on" : ""}`} onClick={() => setLowerTab("orders")}>Orders ({orders.length})</button>
            <button role="tab" class={`tab${lowerTab === "account" ? " on" : ""}`} onClick={() => setLowerTab("account")}>Account</button>
          </div>
          <div class="list">
            {lowerTab === "positions" && <PositionsList positions={positions} marks={marks} ticks={ticks} busy={busy} onClose={closePosition} />}
            {lowerTab === "orders" && <OrdersList orders={orders} ticks={ticks} busy={busy} onCancel={cancelOrder} />}
            {lowerTab === "account" && (
              <>
                <KV k="Balance" v={<span class="num">{formatUsd(Number(account?.wallet_balance ?? 0))}</span>} />
                <KV k="Equity" v={<span class="num">{formatUsd(Number(account?.margin_balance ?? 0))}</span>} />
                <KV k="Unrealized PnL" v={<span class={`num ${Number(account?.unrealized_pnl ?? 0) >= 0 ? "pos" : "neg"}`}>{formatUsd(Number(account?.unrealized_pnl ?? 0), { sign: true })}</span>} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }}>
                  <button class="cta" style={{ height: "34px", fontSize: "13px" }} onClick={openDeposit}>Deposit ADA</button>
                  <button class="cta ghost" style={{ height: "34px", fontSize: "13px" }} disabled={available < 5} onClick={() => openWalletSheet("withdraw")}>
                    Withdraw
                  </button>
                </div>
                {referralMissing && client.referralLink() && (
                  <div class="note">
                    Save on Strike's trading fees: apply referral code <b>{config.referralCode}</b>.{" "}
                    <a class="linkbtn" href={client.referralLink()!} target="_blank" rel="noopener">
                      Apply on Strike ↗
                    </a>
                  </div>
                )}
                <a class="linkbtn" style={{ fontSize: "12px", justifySelf: "end" }} href={client.appUrl("/portfolio")} target="_blank" rel="noopener">
                  Full account on Strike ↗
                </a>
              </>
            )}
          </div>
        </div>
      )}

      <div class="foot">
        <span class="acct">
          <span class={`dot${client.net.network === "testnet" ? " test" : ""}`} />
          {client.net.network === "testnet" ? "Testnet" : "Mainnet"}
        </span>
        {session && (
          <span class="acct">
            · <span class="num" title={session.address}>{shortAddress(session.address, 9, 4)}</span>
            <button class="linkbtn" onClick={() => (client.disconnect(), notify("ok", "Disconnected"))}>Disconnect</button>
          </span>
        )}
        <span class="brand">
          Powered by <a href={client.appUrl()} target="_blank" rel="noopener"><b>Strike</b></a> · via {config.builderCode}
        </span>
      </div>

      {toast && (
        <div class={`toast ${toast.kind}`} role="status">
          <span>{toast.text}</span>
          <button class="x" onClick={() => setToast(null)} aria-label="Dismiss">×</button>
        </div>
      )}
      {sheet === "connect" && (
        <ConnectSheet
          client={client}
          onClose={() => setSheet(null)}
          onConnected={() => {
            if (client.wallet) storageSet(WALLET_KEY, client.wallet.id);
            setSheet(null);
            notify("ok", "Connected to Strike");
          }}
        />
      )}
      {sheet === "deposit" && (
        <DepositSheet
          client={client}
          adaPrice={live["ADA-USD"]?.mark ?? 0}
          isNewAccount={isNewAccount}
          startBalance={Number(account?.wallet_balance ?? 0)}
          onClose={() => setSheet(null)}
          onCredited={() => (refresh(), notify("ok", "Deposit credited"))}
        />
      )}
      {sheet === "withdraw" && (
        <WithdrawSheet
          client={client}
          available={available}
          adaPrice={live["ADA-USD"]?.mark ?? 0}
          startBalance={Number(account?.wallet_balance ?? 0)}
          onClose={() => setSheet(null)}
          onDone={() => (refresh(), notify("ok", "Withdrawal processed"))}
        />
      )}
    </div>
  );
}
