import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  MIN_WITHDRAW_USD,
  OrderRejectedError,
  StrikeEverywhere,
  TWAP_MAX_SEC,
  TWAP_MIN_SEC,
  closePrompt,
  ctaLabel,
  estimateMarketFill,
  flipNote,
  fmtBase,
  formatPct,
  formatPrice,
  formatUsd,
  fundingWords,
  marginModeOf,
  maxLeverageFor,
  movePct,
  orderSummary,
  positionAfter,
  positionText,
  previewOrder,
  roundToStep,
  shortAddress,
  sizeLine,
  stopOrderProblem,
  type Account,
  type BookView,
  type MarketSpec,
  type OrderHistoryEntry,
  type Position,
  type RawMarket,
  type StrikeEverywhereOptions,
  type TwapStrategy,
} from "@strike-everywhere/core";
import { Check, Chevron, CoinIcon, Confirm, Info, KV, PctSlider, Sparkline, Spinner, decimalInput, pageHidden, cleanDecimal } from "./parts";
import { ConnectSheet } from "./ConnectSheet";
import { DepositSheet } from "./DepositSheet";
import { WithdrawSheet } from "./WithdrawSheet";
import { OrdersList, PositionsList } from "./Lists";
import { Chart, INTERVALS, type Interval } from "./Chart";
import { Book } from "./Book";
import { AccountMetrics, HistoryPanel, TwapList, Vaults } from "./Panels";

export interface WidgetConfig extends StrikeEverywhereOptions {
  market: string;
  maxLeverage: number;
  side?: "buy" | "sell";
  amount?: number;
}

interface Live {
  mark: number;
  open: number;
  funding: number;
  index: number;
  last: number;
  quoteVolume: number;
}

type OrderType = "market" | "limit" | "stop" | "stop_limit" | "twap";
type LowerTab = "positions" | "orders" | "twap" | "history" | "account";

const LEVERAGE_STEPS = [1, 2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 100];
const WALLET_KEY = "strike-everywhere:wallet";
const ADVANCED_TYPES: Array<[OrderType, string, string]> = [
  ["stop", "Stop Market", "Market order once the mark price reaches a trigger"],
  ["stop_limit", "Stop Limit", "Limit order once the mark price reaches a trigger"],
  ["twap", "TWAP", "Split into timed market slices over 5 min – 24 h"],
];
const TWAP_PRESETS = [5, 15, 60, 240];
const BOOK_DEPTH = 8;
const SLIP_WARN = 0.005;
const SLIP_CONFIRM = 0.02;

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

const fmtQty = fmtBase;
const fmtMin = (m: number) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} h`);
const fin = (v: unknown, fallback = 0) => (Number.isFinite(Number(v)) && v !== null && v !== "" ? Number(v) : fallback);

export function App({ config }: { config: WidgetConfig }) {
  const client = useMemo(() => new StrikeEverywhere(config), []);

  const [markets, setMarkets] = useState<MarketSpec[]>([]);
  const [symbol, setSymbol] = useState(config.market);
  const [live, setLive] = useState<Record<string, Live>>({});
  const [spark, setSpark] = useState<number[]>([]);
  const [takerRate, setTakerRate] = useState(0.0005);
  const [loadError, setLoadError] = useState("");
  const [view, setView] = useState<"price" | "chart" | "book">("price");
  const [interval, setInterval_] = useState<Interval>("1h");
  const [book, setBook] = useState<BookView | null | undefined>(undefined);

  const [session, setSession] = useState(client.session);
  const [account, setAccount] = useState<Account | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([]);
  const [twaps, setTwaps] = useState<TwapStrategy[]>([]);

  const [side, setSide] = useState<"buy" | "sell">(config.side ?? "buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [sizeUsd, setSizeUsd] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [trigger, setTrigger] = useState("");
  const [leverage, setLeverage] = useState(Math.min(3, config.maxLeverage));
  const [reduceOnly, setReduceOnly] = useState(false);
  const [tpsl, setTpsl] = useState(false);
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [twapMin, setTwapMin] = useState(60);
  const [twapCustom, setTwapCustom] = useState("");
  const [twapLimit, setTwapLimit] = useState("");
  const [randomize, setRandomize] = useState(false);
  const [slipAck, setSlipAck] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [pctDraft, setPctDraft] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [advOpen, setAdvOpen] = useState(false);
  const [bookSwitch, setBookSwitch] = useState<{ from: OrderType; price: string } | null>(null);

  const [sheet, setSheet] = useState<null | "connect" | "deposit" | "withdraw">(null);
  const [menu, setMenu] = useState<null | "market" | "leverage" | "ordertype">(null);
  const [query, setQuery] = useState("");
  const [lowerTab, setLowerTab] = useState<LowerTab>("positions");
  const [ask, setAsk] = useState<null | "margin" | "cancelall" | `close:${number}`>(null);
  const [flash, setFlash] = useState("");
  const flashTimer = useRef<ReturnType<typeof setTimeout>>();
  const [marginBusy, setMarginBusy] = useState(false);
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
  useEffect(() => {
    setLimitPrice("");
    setTrigger("");
    setTwapLimit("");
    setTp("");
    setSl("");
    setAsk(null);
    setBookSwitch(null);
  }, [symbol]);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const [ticketMsg, setTicketMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const ticketTimer = useRef<ReturnType<typeof setTimeout>>();
  const notify = (kind: "ok" | "err", text: string, inline = false) => {
    setToast({ kind, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), kind === "ok" ? 4500 : 8000);
    if (inline) {
      setTicketMsg({ kind, text });
      clearTimeout(ticketTimer.current);
      ticketTimer.current = setTimeout(() => setTicketMsg(null), kind === "ok" ? 10_000 : 15_000);
    }
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
            const t = Array.isArray(tickers) ? tickers.find((x) => x?.symbol === s.symbol) : undefined;
            const mark = fin(raw.mark_price);
            next[s.symbol] = {
              mark,
              index: fin(raw.index_price),
              funding: fin(raw.funding_rate),
              last: fin(t?.lastPrice, fin(raw.last_price)),
              open: t ? fin(t.lastPrice) / (1 + fin(t.priceChangePercent) / 100) : mark,
              quoteVolume: t ? fin(t.quoteVolume) : 0,
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
          const cur = next[it.s];
          if (it.e === "markPriceUpdate") {
            next[it.s] = { ...cur, mark: fin(it.p, cur.mark), index: fin(it.i, cur.index), funding: fin(it.r, cur.funding) };
            changed = true;
          } else if (it.e === "24hrMiniTicker") {
            next[it.s] = { ...cur, open: fin(it.o, cur.open), last: fin(it.c, cur.last), quoteVolume: fin(it.q, cur.quoteVolume) };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    });
    const poll = setInterval(async () => {
      if (pageHidden()) return;
      try {
        const raws: RawMarket[] = await client.market.markets();
        setLive((prev) => {
          const next = { ...prev };
          for (const r of raws) {
            const cur = next[r.symbol];
            if (cur) next[r.symbol] = { ...cur, mark: fin(r.mark_price, cur.mark), index: fin(r.index_price, cur.index), funding: fin(r.funding_rate, cur.funding) };
          }
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
    const t = setInterval(() => !pageHidden() && load(), 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client, symbol]);

  const refreshTimer = useRef<ReturnType<typeof setTimeout>>();
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
      clearTimeout(refreshTimer.current);
      clearTimeout(flashTimer.current);
    },
    [],
  );
  const twapWatch = useRef(false);
  twapWatch.current = lowerTab === "twap" || twaps.length > 0;
  const refresh = async (withTwaps = false) => {
    if (!mounted.current || !client.session) return;
    const tw = withTwaps || twapWatch.current ? client.trading.twaps().catch(() => null) : null;
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
    const t = await tw;
    if (t) setTwaps(t);
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
      setTwaps([]);
      return;
    }
    refresh(true);
    client.userEvents();
    const t = setInterval(() => !pageHidden() && refresh(), 5000);
    return () => clearInterval(t);
  }, [session]);

  useEffect(() => {
    if (session && lowerTab === "twap") refresh(true);
  }, [lowerTab]);

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

  const isStop = orderType === "stop" || orderType === "stop_limit";
  const usesLimit = orderType === "limit" || orderType === "stop_limit";
  const tpslOk = orderType === "market" || orderType === "limit";
  const usd = Number(sizeUsd) || 0;
  const px =
    orderType === "market"
      ? mark
      : orderType === "stop"
        ? Number(trigger) > 0 ? Number(trigger) : mark
        : orderType === "twap"
          ? mark
          : Number(limitPrice) > 0 ? Number(limitPrice) : mark;
  const tierCap = spec ? maxLeverageFor(spec.marginTiers, Math.max(usd, 1)) : 1;
  const levCap = Math.max(1, Math.min(config.maxLeverage, tierCap));
  const lev = Math.min(leverage, levCap);
  const available = fin(account?.available_balance);
  const buyingPower = available * lev;
  const pct = buyingPower > 0 ? Math.min(100, (usd / buyingPower) * 100) : 0;
  const sizeStep = spec ? (usesLimit ? spec.stepSize : spec.marketStepSize ?? spec.stepSize) : 0;
  const floorSize = px > 0 && spec ? Number(roundToStep(usd / px, sizeStep, "floor")) : 0;
  const baseSize =
    spec && px > 0 && sizeStep > 0 && floorSize * px < spec.minNotional && usd >= spec.minNotional ? Number(roundToStep(floorSize + sizeStep, sizeStep, "floor")) : floorSize;
  const feeBps = client.orderFeeBps;
  const preview = spec && px > 0 && usd > 0 ? previewOrder({ side, price: px, notional: baseSize * px, leverage: lev, takerRate, builderFeeBps: feeBps, tiers: spec.marginTiers }) : null;
  const position = positions.find((p) => p.symbol === symbol);
  const posSize = position ? Number(position.size) : 0;
  const twapSec = (twapMin || Number(twapCustom) || 0) * 60;
  const sizeText = usd > 0 ? sizeLine({ usd, size: baseSize, price: px, leverage: lev, base, step: sizeStep }) : null;
  const flip = flipNote({ position: posSize, side, size: baseSize, base, reduceOnly, step: sizeStep });
  const fmtPx = (v: number) => formatPrice(v, tick);
  const when =
    orderType === "limit" && Number(limitPrice) > 0
      ? ` at ${fmtPx(Number(limitPrice))} or better`
      : orderType === "stop" && Number(trigger) > 0
        ? ` once the mark reaches ${fmtPx(Number(trigger))}`
        : orderType === "stop_limit" && Number(trigger) > 0
          ? ` at ${Number(limitPrice) > 0 ? fmtPx(Number(limitPrice)) : "your limit"} once the mark reaches ${fmtPx(Number(trigger))}`
          : orderType === "twap" && twapSec >= TWAP_MIN_SEC && twapSec <= TWAP_MAX_SEC
            ? ` over ${fmtMin(twapSec / 60)}`
            : "";
  const summary =
    preview && baseSize > 0 && !flip
      ? orderSummary({
          side,
          leverage: lev,
          base,
          size: baseSize,
          notional: preview.notional,
          margin: preview.margin,
          entry: px,
          liqPrice: preview.liquidationPrice,
          fmtPrice: fmtPx,
          resting: orderType !== "market",
          when,
          reduceOnly,
        })
      : null;
  const isNewAccount = !account || (Number(account.wallet_balance) <= 0 && positions.length === 0);
  const bound = Number(raw?.order_limit_price_bound ?? 0.05) || 0.05;
  const marginMode = marginModeOf(account, symbol) ?? "cross";

  const marketBound = Number(raw?.order_market_price_bound) || bound;
  const fill = orderType === "market" && book && baseSize > 0 ? estimateMarketFill(book, side, baseSize, { mark, bound: marketBound }) : null;
  const bookDown = orderType === "market" && usd > 0 && book === null;
  const slipKey = `${symbol}|${side}|${baseSize}|${fill ? (fill.complete ? Math.ceil(fill.slippage * 200) : "partial") : bookDown ? "nobook" : ""}`;
  const slipHigh = (!!fill && (fill.slippage > SLIP_CONFIRM || !fill.complete)) || bookDown;

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
    if (isStop) {
      const p = stopOrderProblem({ side, type: orderType, stopPrice: Number(trigger), price: Number(limitPrice), mark, priceBound: bound, tickSize: tick });
      if (p) return p;
    }
    if (orderType === "twap" && !(twapSec >= TWAP_MIN_SEC && twapSec <= TWAP_MAX_SEC)) return "Duration must be 5–1440 minutes";
    if (orderType === "twap" && Number(twapLimit) > 0 && Math.abs(Number(twapLimit) - mark) / mark > bound) return `Limit price must be within ${(bound * 100).toFixed(0)}% of mark`;
    if (orderType === "market" && book === undefined) return "Checking order book…";
    if (tpsl && tpslOk) {
      const t = Number(tp);
      const s = Number(sl);
      if (t && (side === "buy" ? t <= px : t >= px)) return "Take-profit must be beyond entry";
      if (s && (side === "buy" ? s >= px : s <= px)) return "Stop-loss must be on the losing side of entry";
    }
    return null;
  })();
  const needSlipAck = slipHigh && slipAck !== slipKey;
  useEffect(() => {
    if (!slipAck) return;
    const t = setTimeout(() => setSlipAck(""), 15_000);
    return () => clearTimeout(t);
  }, [slipAck]);

  const needBook = !!spec && (view === "book" || (orderType === "market" && usd > 0));
  useEffect(() => {
    setBook(undefined);
    if (!needBook) return;
    const feed = client.orderBook(symbol);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const off = feed.onUpdate(() => {
      if (!timer) timer = setTimeout(() => ((timer = undefined), setBook(feed.view(200))), 200);
    });
    const giveUp = setTimeout(() => setBook((b) => (b === undefined ? null : b)), 10_000);
    return () => {
      off();
      clearTimeout(timer);
      clearTimeout(giveUp);
      feed.close();
    };
  }, [client, symbol, needBook]);

  const submit = async () => {
    if (!spec || problem) return;
    if (needSlipAck) return setSlipAck(slipKey);
    setPlacing(true);
    setSlipAck("");
    try {
      if (orderType === "twap") {
        await client.placeTwap({
          symbol,
          side,
          size: baseSize,
          durationSec: twapSec,
          limitPrice: Number(twapLimit) > 0 ? Number(twapLimit) : undefined,
          reduceOnly,
          randomize,
          leverage: reduceOnly ? undefined : lev,
        });
        notify("ok", `TWAP started: ${side === "buy" ? "Long" : "Short"} ${fmtQty(baseSize)} ${base} over ${fmtMin(twapSec / 60)}`, true);
        setSizeUsd("");
        setLowerTab("twap");
        refresh(true);
        return;
      }
      const order = await client.placeOrder({
        symbol,
        side,
        type: orderType,
        size: baseSize,
        price: usesLimit ? Number(limitPrice) : undefined,
        stopPrice: isStop ? Number(trigger) : undefined,
        reduceOnly,
        takeProfit: tpsl && tpslOk && Number(tp) > 0 ? Number(tp) : undefined,
        stopLoss: tpsl && tpslOk && Number(sl) > 0 ? Number(sl) : undefined,
        leverage: reduceOnly ? undefined : lev,
      });
      const resting = order.status === "open" || order.status === "untriggered";
      const dir = `${side === "buy" ? "Long" : "Short"} ${fmtQty(baseSize)} ${base}`;
      if (order.status === "filled") {
        const avg = fill?.avgPrice ?? px;
        const after = positionAfter(posSize, side, baseSize, reduceOnly);
        notify("ok", `Filled: ${dir} at ~${formatPrice(avg, tick)} (~${formatUsd(baseSize * avg)}). ${after ? `You now hold ${positionText(after, base)}` : `Your ${base} position is closed`}`, true);
        setFlash(symbol);
        clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setFlash(""), 1600);
      } else {
        if (/cancel|expire/i.test(order.status) && (orderType === "market" || orderType === "stop")) {
          notify("err", `Not filled: there were no ${side === "buy" ? "sellers" : "buyers"} close enough to the market price (within Strike's ${(marketBound * 100).toFixed(0)}% band), so Strike cancelled the order. Nothing was traded.`, true);
        } else {
          const verb = order.status === "untriggered" ? "Stop order placed" : order.status === "open" ? "Order placed" : `Order ${order.status}`;
          notify("ok", `${verb}: ${dir}`, true);
        }
      }
      setSizeUsd("");
      setBookSwitch(null);
      setLowerTab(resting ? "orders" : "positions");
      refresh();
    } catch (e: any) {
      notify("err", e instanceof OrderRejectedError ? `Rejected: ${e.message}` : e?.message || String(e), true);
    } finally {
      setPlacing(false);
    }
  };

  useEffect(() => {
    if (!sheet) return;
    const t = setTimeout(() => cardRef.current?.querySelector(".sheet")?.scrollIntoView({ block: "start", behavior: "smooth" }), 30);
    return () => clearTimeout(t);
  }, [sheet]);

  const [closeNote, setCloseNote] = useState<{ id: number; kind: "ok" | "err"; text: string } | null>(null);
  const closeNoteTimer = useRef<ReturnType<typeof setTimeout>>();
  const showCloseNote = (id: number, r: { kind: "ok" | "err"; text: string }) => {
    setCloseNote({ id, ...r });
    clearTimeout(closeNoteTimer.current);
    closeNoteTimer.current = setTimeout(() => setCloseNote(null), 15_000);
    setTimeout(() => cardRef.current?.querySelector(".list .ticket-msg")?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
  };

  const closePosition = async (p: Position) => {
    const id = `pos:${p.id}`;
    setAsk(null);
    if (busy.has(id)) return;
    markBusy(id, true);
    try {
      const o = await client.closePosition(p);
      const what = positionText(Number(p.size), p.symbol.split("-")[0]);
      const res: { kind: "ok" | "err"; text: string } =
        o.status === "filled"
          ? { kind: "ok", text: `✓ Closed ${what} · PnL ≈ ${formatUsd(Number(p.upnl), { sign: true })}` }
          : /cancel|expire/i.test(o.status)
            ? { kind: "err", text: `Not closed: there were no ${Number(p.size) > 0 ? "buyers" : "sellers"} close enough to the market price (within Strike's price band), so Strike cancelled the close order. Your ${what} position is still open.` }
            : { kind: "ok", text: `Close order ${o.status}` };
      notify(res.kind, res.text);
      showCloseNote(p.id, res);
      refresh();
    } catch (e: any) {
      notify("err", e?.message || String(e));
      showCloseNote(p.id, { kind: "err", text: e?.message || String(e) });
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

  const cancelAll = async (sym?: string) => {
    setAsk(null);
    if (busy.has("cancelall")) return;
    markBusy("cancelall", true);
    try {
      const n = await client.cancelAll(sym);
      notify("ok", n === null ? "Cancelling orders…" : `Cancelled ${n} order${n === 1 ? "" : "s"}`);
      setTimeout(refresh, 600);
    } catch (e: any) {
      notify("err", e?.message || String(e));
    } finally {
      markBusy("cancelall", false);
    }
  };

  const cancelTwap = async (t: TwapStrategy) => {
    const id = `twap:${t.id}`;
    if (busy.has(id)) return;
    markBusy(id, true);
    try {
      await client.trading.cancelTwap(t.id);
      notify("ok", "TWAP cancelling");
      refresh(true);
    } catch (e: any) {
      notify("err", e?.message || String(e));
    } finally {
      markBusy(id, false);
    }
  };

  const switchMargin = async () => {
    const to = marginMode === "cross" ? "isolated" : "cross";
    setAsk(null);
    setMarginBusy(true);
    try {
      await client.setMarginMode(symbol, to);
      notify("ok", `${symbol} now uses ${to} margin`);
      refresh();
    } catch (e: any) {
      notify("err", e?.message || String(e));
    } finally {
      setMarginBusy(false);
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

  const pickPrice = (p: number) => {
    const v = roundToStep(p, tick ?? 0.0001);
    if (orderType === "stop") setTrigger(v);
    else if (orderType === "twap") setTwapLimit(v);
    else {
      setLimitPrice(v);
      if (!usesLimit) {
        setBookSwitch({ from: orderType, price: limitPrice });
        setOrderType("limit");
      }
    }
    setTimeout(() => {
      const field = cardRef.current?.querySelector<HTMLElement>(orderType === "stop" ? "#se-trigger" : orderType === "twap" ? "#se-twap-limit" : "#se-price");
      const target = (field?.closest(".field") as HTMLElement | null) ?? field;
      if (!target) return;
      target.scrollIntoView({ block: "center", behavior: "smooth" });
      target.classList.remove("flash");
      void target.offsetWidth;
      target.classList.add("flash");
    }, 50);
  };
  const undoBookSwitch = () => {
    if (!bookSwitch) return;
    setOrderType(bookSwitch.from);
    setLimitPrice(bookSwitch.price);
    setBookSwitch(null);
  };
  const chooseType = (t: OrderType) => (setOrderType(t), setBookSwitch(null));

  const filtered = markets.filter((m) => !query || m.symbol.toLowerCase().includes(query.toLowerCase()) || m.name.toLowerCase().includes(query.toLowerCase()));
  const priceInput = (id: string, label: string, value: string, set: (v: string) => void, placeholder?: string, markBtn = true) => (
    <div class="field">
      <label for={id}>{label}</label>
      <input id={id} inputMode="decimal" placeholder={placeholder ?? (mark ? formatPrice(mark, tick).replace(/,/g, "") : "0")} value={value} onInput={(e) => set(cleanDecimal(e))} />
      {markBtn && (
        <button class="unit linkbtn" style={{ textDecoration: "none" }} onClick={() => set(roundToStep(mark, tick ?? 0.0001))}>
          Mark
        </button>
      )}
    </div>
  );
  const connectPrompt = (what: string) => (
    <div class="empty">
      Connect a wallet to see your {what}.{" "}
      <button class="linkbtn" onClick={() => setSheet("connect")}>Connect</button>
    </div>
  );

  const cta = (() => {
    if (!session) return <button class="cta" onClick={() => setSheet("connect")}>Connect Wallet</button>;
    if (available <= 0 && !reduceOnly) return <button class="cta" onClick={openDeposit}>Deposit to trade</button>;
    if (!problem && needSlipAck && !placing) {
      return (
        <button class="cta caution" onClick={submit}>
          {bookDown ? "Confirm: slippage unknown" : fill && !fill.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((fill?.slippage ?? 0) * 100).toFixed(2)}%`}
        </button>
      );
    }
    const label = ctaLabel({
      side,
      base,
      type: orderType,
      price: usesLimit && Number(limitPrice) > 0 ? fmtPx(Number(limitPrice)) : undefined,
      trigger: isStop && Number(trigger) > 0 ? fmtPx(Number(trigger)) : undefined,
      notional: usd ? baseSize * px : 0,
    });
    return (
      <button class={`cta${side === "sell" ? " short" : ""}`} disabled={!!problem || placing} onClick={submit}>
        {placing ? <><Spinner /> Placing…</> : problem ?? label}
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

  const advLabel = ADVANCED_TYPES.find((t) => t[0] === orderType)?.[1];
  const testnet = client.net.network === "testnet";
  const levRef = px || mark;
  const levNotional = baseSize > 0 && px > 0 ? baseSize * px : 100;
  const liqMove = (l: number) =>
    spec && levRef > 0 ? movePct(levRef, previewOrder({ side, price: levRef, notional: levNotional, leverage: l, takerRate, builderFeeBps: feeBps, tiers: spec.marginTiers }).liquidationPrice) : "";
  const showAdv = advOpen || reduceOnly;
  const entryHint: Record<OrderType, string> = {
    market: fill ? "Average fill estimated from the live order book" : "Market orders fill near the mark price",
    limit: "Your limit price",
    stop: "Your trigger price; once the mark reaches it, a market order fills near it",
    stop_limit: "Your limit price, once the mark reaches the trigger",
    twap: "Slices fill at market over the duration (never past your limit, if set)",
  };
  const lowerTabs: Array<[LowerTab, string]> = [
    ["positions", session ? `Positions (${positions.length})` : "Positions"],
    ["orders", session ? `Orders (${orders.length})` : "Orders"],
    ["twap", session && twaps.length ? `TWAP (${twaps.length})` : "TWAP"],
    ["history", "History"],
    ["account", "Account"],
  ];
  const symbolOrders = orders.filter((o) => o.symbol === symbol).length;

  return (
    <div
      ref={cardRef}
      class="card"
      onClick={(e) => menu && !(e.target as HTMLElement).closest(".menu, [data-menu]") && setMenu(null)}
      onKeyDown={(e) => e.key === "Escape" && (menu ? setMenu(null) : ask ? setAsk(null) : slipAck ? setSlipAck("") : sheet && setSheet(null))}
    >
      <div class="mkt">
        <CoinIcon base={base} />
        <div class="mkt-id">
          <button class="mkt-pick" data-menu onClick={() => setMenu(menu === "market" ? null : "market")} aria-haspopup="listbox" aria-expanded={menu === "market"}>
            {symbol} <Chevron />
          </button>
        </div>
        <div class="mkt-price">
          <div class="big num">{mark ? formatPrice(mark, tick) : "—"}</div>
          <div class={`chg num ${chg >= 0 ? "pos" : "neg"}`}>{lv ? formatPct(chg) : ""}</div>
        </div>
      </div>
      {menu === "market" && (
        <div class="menu" role="listbox">
          <input placeholder="Search markets" aria-label="Search markets" value={query} onInput={(e) => setQuery((e.target as HTMLInputElement).value)} autoFocus />
          {filtered.map((m) => {
            const l = live[m.symbol];
            const c = l && l.open ? ((l.mark - l.open) / l.open) * 100 : 0;
            return (
              <button key={m.symbol} class={`menu-row${m.symbol === symbol ? " on" : ""}`} role="option" aria-selected={m.symbol === symbol} onClick={() => (setSymbol(m.symbol), setMenu(null), setQuery(""))}>
                <span class="menu-id">
                  <CoinIcon base={m.baseAsset ?? m.symbol.split("-")[0]} />
                  <span>
                    <div class="n">{m.symbol}</div>
                    <div class="t">{m.name} · {m.maxLeverage}x</div>
                  </span>
                </span>
                <span class="num">{l ? formatPrice(l.mark, m.tickSize) : ""}</span>
                <span class={`num ${c >= 0 ? "pos" : "neg"}`}>{l ? formatPct(c) : ""}</span>
              </button>
            );
          })}
        </div>
      )}
      {!session && (
        <div class="connect-strip">
          <span>Connect a Cardano wallet to trade</span>
          <button class="mini go" onClick={() => setSheet("connect")}>Connect</button>
        </div>
      )}
      <div class="stats">
        <div class="stat">
          <div class="k">
            Index<Info label="About the index price">The average {base} spot price on major external exchanges. Strike's price is kept close to it.</Info>
          </div>
          <div class="v num">{lv ? formatPrice(lv.index, tick) : "—"}</div>
        </div>
        <div class="stat">
          <div class="k">
            Funding<Info label="About funding">Every hour, one side pays the other to keep the price close to the index. Positive: longs pay shorts; negative: shorts pay longs.</Info>
          </div>
          <div class={`v fund ${!lv || !lv.funding ? "" : lv.funding < 0 ? "neg" : "pos"}`}>{lv ? fundingWords(lv.funding) : "—"}</div>
        </div>
        <div class="stat">
          <div class="k">24h Volume</div>
          <div class="v num">{lv ? formatUsd(lv.quoteVolume, { decimals: 0 }) : "—"}</div>
        </div>
      </div>

      <div class="views">
        <div class="vtabs" role="tablist" aria-label="Market view">
          {(["price", "chart", "book"] as const).map((v) => (
            <button key={v} role="tab" aria-selected={view === v} class={view === v ? "on" : ""} onClick={() => setView(v)}>
              {v === "price" ? "Price" : v === "chart" ? "Chart" : "Book"}
            </button>
          ))}
        </div>
        {view === "chart" && (
          <div class="ivs" role="radiogroup" aria-label="Candle interval">
            {(Object.keys(INTERVALS) as Interval[]).map((i) => (
              <button key={i} role="radio" aria-checked={interval === i} class={interval === i ? "on" : ""} onClick={() => setInterval_(i)}>
                {i === "1d" ? "1D" : i}
              </button>
            ))}
          </div>
        )}
      </div>
      {view === "price" && <Sparkline points={sparkPoints} up={chg >= 0} />}
      {view === "chart" && <Chart client={client} symbol={symbol} interval={interval} tick={tick} live={{ mark, last: lv?.last ?? 0, index: lv?.index ?? 0 }} />}
      {view === "book" && (
        <Book
          book={book}
          depth={BOOK_DEPTH}
          tick={tick}
          base={base}
          onPick={pickPrice}
          hint={orderType === "stop" || orderType === "stop_limit" ? "Tap a price to use it in your stop order" : orderType === "twap" ? "Tap a price to set the TWAP limit" : "Tap a price to place a Limit order there"}
        />
      )}

      <div class="ticket">
        <div class="pills">
          <span class="pillx">
            <button
              class="pill"
              disabled={!session || !account || marginBusy || !!position || orders.some((o) => o.symbol === symbol)}
              aria-label={`Margin mode: ${marginMode}`}
              title={
                !session
                  ? "Cross margin (Strike's default). Connect to change it."
                  : position || orders.some((o) => o.symbol === symbol)
                    ? "Close this market's position and open orders to change margin mode"
                    : "Switch between cross and isolated margin for this market"
              }
              onClick={() => setAsk(ask === "margin" ? null : "margin")}
            >
              {marginBusy ? <Spinner /> : marginMode === "cross" ? "Cross margin" : "Isolated margin"}
            </button>
            <Info label="Cross vs isolated margin">
              <b>Cross:</b> your whole balance backs your positions, so liquidation is further away, but a big loss can use all of it. <b>Isolated:</b> each position can only lose the margin you put in it.
            </Info>
          </span>
          <span class="pillx">
            <button class="pill" data-menu onClick={() => setMenu(menu === "leverage" ? null : "leverage")} aria-label={`Leverage ${lev}x, change`} title="Leverage: tap to change">
              <span class="pill-k">Leverage</span> {lev}x
            </button>
            <Info label="About leverage">
              Leverage multiplies your position: at {lev}x, $10 of your balance controls ${10 * lev} of {base}. Gains and losses grow {lev}x too, and liquidation comes closer.
            </Info>
          </span>
        </div>
        {ask === "margin" &&
          (posSize ? (
            <Confirm actions={<button class="mini" onClick={() => setAsk(null)}>OK</button>}>
              Close your {symbol} position first: Strike only changes margin mode with no open position.
            </Confirm>
          ) : (
            <Confirm
              actions={
                <>
                  <button class="mini" onClick={() => setAsk(null)}>Cancel</button>
                  <button class="mini go" onClick={switchMargin}>Switch</button>
                </>
              }
            >
              {marginMode === "cross"
                ? `Switch ${symbol} to isolated margin? Each new position only risks the margin you give it, so its liquidation price is closer.`
                : `Switch ${symbol} to cross margin? Your whole balance backs positions: liquidation is further away, but losses can draw on all of it.`}
            </Confirm>
          ))}
        {menu === "leverage" && (
          <div class="menu inl">
            <div class="t muted" style={{ padding: "4px 8px 6px", fontSize: "11.5px" }}>
              Max {levCap}x for this size{config.maxLeverage < tierCap ? ` (site limit ${config.maxLeverage}x)` : ""} · % = price move to liquidation
              {baseSize > 0 && px > 0 ? "" : " (for a $100 position)"}
            </div>
            <div class="levs">
              {LEVERAGE_STEPS.filter((l) => l <= levCap).map((l) => (
                <button key={l} class={`pill${l === lev ? " on" : ""}`} onClick={() => (setLeverage(l), setMenu(null))} aria-label={`${l}x leverage, liquidation about ${liqMove(l) || "unknown"} away`}>
                  {l}x
                  <span class="lq num">{liqMove(l) || "—"}</span>
                </button>
              ))}
            </div>
            <div class="t muted" style={{ padding: "6px 8px 2px", fontSize: "11.5px" }}>
              Higher leverage = bigger gains and losses, and liquidation comes closer.
            </div>
          </div>
        )}
        <div class="tabs" role="tablist" aria-label="Order type">
          {(["market", "limit"] as const).map((t) => (
            <button key={t} role="tab" aria-selected={orderType === t} class={`tab${orderType === t ? " on" : ""}`} onClick={() => chooseType(t)}>
              {t === "market" ? "Market" : "Limit"}
            </button>
          ))}
          <button
            role="tab"
            aria-selected={!!advLabel}
            aria-haspopup="menu"
            aria-expanded={menu === "ordertype"}
            data-menu
            class={`tab${advLabel ? " on" : ""}`}
            onClick={() => setMenu(menu === "ordertype" ? null : "ordertype")}
          >
            {advLabel ?? "Advanced"} <Chevron size={10} />
          </button>
        </div>
        {bookSwitch && orderType === "limit" && (
          <div class="helper" role="status">
            Switched to a Limit order{Number(limitPrice) > 0 ? ` at ${fmtPx(Number(limitPrice))}` : ""} ·{" "}
            <button class="linkbtn" onClick={undoBookSwitch}>Undo</button>
          </div>
        )}
        {menu === "ordertype" && (
          <div class="menu inl" role="menu" aria-label="Advanced order types">
            {ADVANCED_TYPES.map(([t, label, desc]) => (
              <button key={t} role="menuitem" class={`menu-row${orderType === t ? " on" : ""}`} onClick={() => (chooseType(t), setMenu(null))}>
                <span>
                  <div class="n">{label}</div>
                  <div class="t">{desc}</div>
                </span>
              </button>
            ))}
          </div>
        )}
        <div class="seg">
          <button class={`long${side === "buy" ? " on" : ""}`} onClick={() => setSide("buy")}>Long/Buy</button>
          <button class={`short${side === "sell" ? " on" : ""}`} onClick={() => setSide("sell")}>Short/Sell</button>
        </div>
        <div class="helper seg-hint">
          Long = profit if {base} goes up · Short = <span class="w">profit </span>if it goes down
        </div>
        <KV
          k={
            <>
              Available to Trade
              {session && (
                <button class="linkbtn dep" onClick={openDeposit}>
                  + Deposit
                </button>
              )}
            </>
          }
          v={session ? <span class="num">{formatUsd(available)}</span> : "—"}
        />
        <KV
          k="Current Position"
          v={posSize ? <span class={`num ${posSize > 0 ? "pos" : "neg"}`}>{positionText(posSize, base)}{mark ? ` (~${formatUsd(Math.abs(posSize) * mark)})` : ""}</span> : "—"}
        />
        {isStop && priceInput("se-trigger", "Trigger", trigger, setTrigger)}
        {usesLimit && priceInput("se-price", "Price", limitPrice, setLimitPrice)}
        <div class="field">
          <label for="se-size">Size</label>
          <input id="se-size" inputMode="decimal" placeholder="0.00" value={sizeUsd} onInput={(e) => setSizeUsd(cleanDecimal(e))} aria-label="Order size in USD" aria-describedby={sizeText ? "se-size-line" : undefined} />
          <span class="unit">USD</span>
        </div>
        {sizeText && (
          <div class="helper" id="se-size-line">
            {sizeText}
          </div>
        )}
        <div class="slider-row">
          <PctSlider value={pct} onChange={setPct} />
          <label class="pct num">
            <input
              inputMode="decimal"
              aria-label="Order size as percent of buying power"
              value={pctDraft ?? (pct ? pct.toFixed(1) : "")}
              placeholder="0"
              onFocus={() => setPctDraft(pct ? pct.toFixed(1) : "")}
              onInput={(e) => setPctDraft(cleanDecimal(e))}
              onBlur={() => {
                const v = Number(pctDraft);
                if (pctDraft !== null && Number.isFinite(v)) setPct(Math.max(0, Math.min(100, v)));
                setPctDraft(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            />
            %
          </label>
          <Info label="About the size slider">
            The slider sets your order size as a % of your buying power (available balance × leverage). Change leverage with the Leverage button above.
          </Info>
        </div>
        {orderType === "twap" && (
          <>
            <div class="durs" role="radiogroup" aria-label="TWAP duration">
              <span class="lbl">Duration</span>
              {TWAP_PRESETS.map((m) => (
                <button key={m} role="radio" aria-checked={twapMin === m} class={twapMin === m ? "on" : ""} onClick={() => setTwapMin(m)}>
                  {m < 60 ? `${m}m` : `${m / 60}h`}
                </button>
              ))}
              <button role="radio" aria-checked={twapMin === 0} class={twapMin === 0 ? "on" : ""} onClick={() => setTwapMin(0)}>
                Custom
              </button>
            </div>
            {twapMin === 0 && (
              <div class="field">
                <label for="se-dur">Duration</label>
                <input id="se-dur" inputMode="numeric" placeholder="5 – 1440" value={twapCustom} onInput={(e) => setTwapCustom((e.target as HTMLInputElement).value.replace(/[^0-9]/g, "").slice(0, 4))} />
                <span class="unit">min</span>
              </div>
            )}
            {priceInput("se-twap-limit", "Limit", twapLimit, setTwapLimit, "Optional", false)}
          </>
        )}
        <div class="checks">
          {tpslOk && <Check on={tpsl} label="TP/SL" onToggle={() => setTpsl(!tpsl)} />}
          {orderType === "twap" && <Check on={randomize} label="Randomize" onToggle={() => setRandomize(!randomize)} />}
          <button class="linkbtn adv" aria-expanded={showAdv} aria-controls="se-adv" disabled={reduceOnly} onClick={() => setAdvOpen(!advOpen)}>
            Advanced options <Chevron size={10} />
          </button>
        </div>
        {showAdv && (
          <div class="checks" id="se-adv">
            <Check on={reduceOnly} label="Reduce Only" onToggle={() => setReduceOnly(!reduceOnly)} />
            <span class="helper">Only shrinks an open position, never opens or flips one</span>
          </div>
        )}
        {tpsl && tpslOk && (
          <div class="tpsl">
            <div class="field">
              <label for="se-tp">TP</label>
              <input id="se-tp" inputMode="decimal" placeholder="Take-profit price" value={tp} onInput={(e) => setTp(cleanDecimal(e))} />
            </div>
            <div class="field">
              <label for="se-sl">SL</label>
              <input id="se-sl" inputMode="decimal" placeholder="Stop-loss price" value={sl} onInput={(e) => setSl(cleanDecimal(e))} />
            </div>
          </div>
        )}
        {flip && <div class={baseSize > Math.abs(posSize) + sizeStep / 2 ? "warn" : "note"}>{flip}</div>}
        {summary && <div class="helper summary">{summary}</div>}
        {cta}
        {ticketMsg && (
          <div class={`ticket-msg ${ticketMsg.kind}`} role="status">
            {ticketMsg.kind === "ok" ? "✓ " : ""}
            {ticketMsg.text}
          </div>
        )}
        {fill && !fill.complete && (
          <div class="warn">
            <b>Thin book:</b> only {fmtQty(Number(roundToStep(fill.filled, sizeStep || 1e-8, "floor")))} of {fmtQty(baseSize)} {base} can fill
            {fill.beyondBand ? ` within Strike's ${(marketBound * 100).toFixed(0)}% price band around the mark` : " from the visible book"}; the rest may not fill.
          </div>
        )}
        {bookDown && (
          <div class="warn">
            <b>Order book unavailable:</b> slippage can't be estimated right now. Click again to send anyway, or wait a moment.
          </div>
        )}
        {fill && fill.complete && fill.slippage > SLIP_WARN && (
          <div class="warn">
            <b>Slippage:</b> this size moves through the book, est. {(fill.slippage * 100).toFixed(2)}% from the mark price (avg ≈ {formatPrice(fill.avgPrice, tick)}).
            {slipHigh ? " Click again to confirm." : ""}
          </div>
        )}
        {preview && preview.liquidationDistance < 0.1 && !reduceOnly && (
          <div class="warn">
            <b>High risk:</b> the estimated liquidation price is only {(preview.liquidationDistance * 100).toFixed(1)}% away. Consider lower leverage.
          </div>
        )}
        <div class="details">
          <KV
            k={orderType === "market" && fill ? "Est. Fill Price" : orderType === "stop" ? "Trigger" : "Est. Entry"}
            hint={entryHint[orderType]}
            v={<span class="num">{fill ? formatPrice(fill.avgPrice, tick) : px ? formatPrice(px, tick) : "—"}</span>}
          />
          {fill && <KV k="Est. Slippage" hint="Average fill vs the mark price, from the live book" v={<span class={`num ${fill.slippage > SLIP_WARN ? "neg" : ""}`}>{(fill.slippage * 100).toFixed(2)}%</span>} />}
          {orderType === "twap" && <KV k="Duration" v={<span class="num">{twapSec >= TWAP_MIN_SEC && twapSec <= TWAP_MAX_SEC ? fmtMin(twapSec / 60) : "—"}</span>} />}
          <KV
            k="Liq. price (worst case)"
            info={
              marginMode === "isolated"
                ? "If the price reaches this, the position is closed and you lose its margin. Estimated for this position alone, backed by size ÷ leverage of margin; fees and funding move it slightly. The position card shows Strike's actual price once it's open."
                : "If the price reaches this, the position is closed and you lose its margin. Worst case: it assumes this position alone, backed only by size ÷ leverage. In cross margin your whole balance backs it, so Strike's actual price (shown on the position card) is usually further away."
            }
            v={<span class="num">{preview && !reduceOnly ? formatPrice(preview.liquidationPrice, tick) : "—"}</span>}
          />
          <KV k="Margin" info="The part of your balance set aside for this position: size ÷ leverage." v={<span class="num">{preview ? formatUsd(preview.margin) : "—"}</span>} />
          <KV k="Order Size" v={<span class="num">{baseSize ? `${fmtQty(baseSize)} ${base}` : "—"}</span>} />
          <KV
            k="Fees"
            info={`Paid when the order fills: Strike's taker fee ${(takerRate * 100).toFixed(3)}% + builder fee ${(feeBps / 100).toFixed(2)}% (${config.builderCode}), on the order's size.`}
            v={<span class="num">{preview ? formatUsd(preview.totalFee, { decimals: preview.totalFee < 0.1 ? 4 : 2 }) : "—"}</span>}
          />
        </div>
      </div>

      <div class="lower">
        <div class="tabs" role="tablist" aria-label="Account panels">
          {lowerTabs.map(([t, label]) => (
            <button key={t} role="tab" aria-selected={lowerTab === t} class={`tab${lowerTab === t ? " on" : ""}`} onClick={() => setLowerTab(t)}>
              {label}
            </button>
          ))}
        </div>
        <div class="list" role="tabpanel">
          {lowerTab === "positions" &&
            (session ? (
              <PositionsList
                positions={positions}
                marks={marks}
                ticks={ticks}
                busy={busy}
                flash={flash}
                note={closeNote}
                confirming={ask?.startsWith("close:") ? Number(ask.slice(6)) : null}
                onAsk={(p) => setAsk(p ? `close:${p.id}` : null)}
                onClose={closePosition}
                closeText={(p) => closePrompt({ size: Number(p.size), base: p.symbol.split("-")[0], mark: marks[p.symbol] ?? Number(p.entry_price), upnl: Number(p.upnl) })}
              />
            ) : (
              connectPrompt("positions")
            ))}
          {lowerTab === "orders" &&
            (session ? (
              <>
                {orders.length > 0 && (
                  <div class="list-h">
                    <span class="muted">{orders.length} open</span>
                    <button class="mini" disabled={busy.has("cancelall")} onClick={() => setAsk(ask === "cancelall" ? null : "cancelall")} aria-expanded={ask === "cancelall"}>
                      {busy.has("cancelall") ? <Spinner /> : "Cancel all"}
                    </button>
                  </div>
                )}
                {ask === "cancelall" && orders.length > 0 && (
                  <Confirm
                    actions={
                      <>
                        <button class="mini" onClick={() => setAsk(null)}>Keep</button>
                        {symbolOrders > 0 && symbolOrders < orders.length && (
                          <button class="mini go" onClick={() => cancelAll(symbol)}>
                            {symbol} ({symbolOrders})
                          </button>
                        )}
                        <button class="mini danger" onClick={() => cancelAll(symbolOrders === orders.length ? symbol : undefined)}>
                          {symbolOrders === orders.length ? `Cancel ${orders.length}` : `All markets (${orders.length})`}
                        </button>
                      </>
                    }
                  >
                    Cancel open orders? Positions stay open; TWAPs are cancelled separately.
                  </Confirm>
                )}
                <OrdersList orders={orders} ticks={ticks} busy={busy} onCancel={cancelOrder} />
              </>
            ) : (
              connectPrompt("open orders")
            ))}
          {lowerTab === "twap" && (session ? <TwapList twaps={twaps} busy={busy} onCancel={cancelTwap} /> : connectPrompt("TWAP orders"))}
          {lowerTab === "history" && (session ? <HistoryPanel key={session.accountId} client={client} ticks={ticks} /> : connectPrompt("trade history"))}
          {lowerTab === "account" && (
            <>
              {session ? (
                <>
                  <AccountMetrics key={session.accountId} client={client} account={account} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }}>
                    <button class="cta" style={{ minHeight: "34px", fontSize: "13px" }} onClick={openDeposit}>Deposit ADA</button>
                    <button class="cta ghost" style={{ minHeight: "34px", fontSize: "13px" }} disabled={available < MIN_WITHDRAW_USD} onClick={() => openWalletSheet("withdraw")}>
                      Withdraw
                    </button>
                  </div>
                  {account && available < MIN_WITHDRAW_USD && <div class="helper" style={{ textAlign: "right" }}>Minimum {formatUsd(MIN_WITHDRAW_USD, { decimals: 0 })} to withdraw</div>}
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
              ) : (
                connectPrompt("balance and account metrics")
              )}
              <Vaults client={client} />
            </>
          )}
        </div>
      </div>

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
