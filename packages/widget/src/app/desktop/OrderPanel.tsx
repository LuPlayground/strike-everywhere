import { useEffect, useState } from "preact/hooks";
import { MIN_WITHDRAW_USD, twapPlan, TRAILING_MAX_PCT, TRAILING_MIN_PCT, estimateMarketFill, marginModeOf, movePct, needsLimitPrice, roundToStep, shortAddress, type BookView, type Side } from "@strike-everywhere/core";
import { cleanDecimal } from "../../parts";
import { pctText, priceText, qtyText, usdText } from "../markets";
import { ORDER_TYPES, marginForFraction, pnlForPrice, sizeDraft, type AppOrderType, type AutoMode, type Draft, type DraftCtx, type Tif, type Unit } from "../order";
import type { Mkt, PerpsState } from "../state";
import { Calculator } from "../Calculator";
import { Icon, Sheet, Slider, Spin, pref } from "../ui";
import { GridForm } from "./GridForm";

const SLIP_CONFIRM = 0.02;
const TWAP_PRESETS = [5, 15, 60, 240];
const TRAIL_PRESETS = [0.5, 1, 2, 5];

type Mode = AppOrderType | "grid";

export function OrderPanel({ s, m, book, side, setSide, limitPick }: { s: PerpsState; m: Mkt | undefined; book: BookView | null | undefined; side: Side; setSide: (v: Side) => void; limitPick: { p: number; n: number } | null }) {
  const sym = m?.symbol ?? "";
  const raw = m ? s.client.raw(sym) : undefined;
  const [mode, setMode] = useState<Mode>("market");
  const type: AppOrderType = mode === "grid" ? "market" : mode;
  const [typeOpen, setTypeOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>("usd");
  const [amt, setAmt] = useState("");
  const [lev, setLev] = useState(() => Math.max(1, Number(pref("default-leverage")) || 3));
  const [limitStr, setLimitStr] = useState("");
  const [trigger, setTrigger] = useState("");
  const [working, setWorking] = useState<"mark_price" | "contract_price">("mark_price");
  const [tif, setTif] = useState<Tif>("GTC");
  const [postOnly, setPostOnly] = useState(false);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [callback, setCallback] = useState("1");
  const [activation, setActivation] = useState("");
  const [slip, setSlip] = useState("");
  const [slipOpen, setSlipOpen] = useState(false);
  const [twapMin, setTwapMin] = useState(60);
  const [twapLimit, setTwapLimit] = useState("");
  const [randomize, setRandomize] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoMode, setAutoMode] = useState<AutoMode>("price");
  const [tp, setTp] = useState("");
  const [calc, setCalc] = useState(false);
  const [sl, setSl] = useState("");
  const [armed, setArmed] = useState("");
  const [placing, setPlacing] = useState(false);
  const [marginBusy, setMarginBusy] = useState(false);

  useEffect(() => {
    if (s.config.amount && s.config.amount > 0) (setUnit("usd"), setAmt(String(Math.round(s.config.amount * 100) / 100)));
  }, [s.config.amount]);
  useEffect(() => {
    if (s.config.leverage && s.config.leverage >= 1) setLev(s.config.leverage);
  }, [s.config.leverage]);
  const savedLev = Number(s.account?.symbol_settings?.[sym]?.leverage) || 0;
  useEffect(() => {
    if (savedLev >= 1 && !s.config.leverage) setLev(savedLev);
  }, [sym, savedLev]);
  useEffect(() => (setLimitStr(""), setTrigger(""), setActivation(""), setTwapLimit(""), setTp(""), setSl(""), setArmed("")), [sym]);
  useEffect(() => {
    if (!limitPick || !m) return;
    if (mode === "market" || mode === "grid" || mode === "trailing_stop_market" || mode === "stop" || mode === "take_profit") setMode("limit");
    if (mode === "twap") setTwapLimit(roundToStep(limitPick.p, m.spec.tickSize));
    else setLimitStr(roundToStep(limitPick.p, m.spec.tickSize));
  }, [limitPick?.n]);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(""), 15_000);
    return () => clearTimeout(t);
  }, [armed]);

  const ctx: DraftCtx = {
    spec: m?.spec,
    mark: m?.mark ?? 0,
    last: m?.last ?? 0,
    available: s.available,
    takerRate: s.takerRate,
    feeBps: s.client.orderFeeBps,
    maxLeverage: s.config.maxLeverage,
    limitBound: Number(raw?.order_limit_price_bound) || 0.05,
    position: s.session ? Number(s.positions.find((p) => p.symbol === sym)?.size) || 0 : undefined,
  };
  const bracketOk = type === "market" || type === "limit";
  const draft: Draft = {
    symbol: sym,
    side,
    type,
    amount: Number(amt) || 0,
    unit,
    leverage: lev,
    limitPrice: Number(limitStr) || 0,
    tp: auto && bracketOk ? Number(tp) || 0 : 0,
    sl: auto && bracketOk ? Number(sl) || 0 : 0,
    autoMode,
    triggerPrice: Number(trigger) || 0,
    workingType: working,
    tif,
    postOnly,
    reduceOnly,
    callbackRate: Number(callback) || 0,
    activationPrice: Number(activation) || 0,
    slippage: Number(slip) > 0 ? Number(slip) / 100 : 0,
    twapMinutes: twapMin,
    twapLimit: Number(twapLimit) || 0,
    randomize,
  };
  const z = sizeDraft(draft, ctx);
  const reducing = reduceOnly || type === "trailing_stop_market";
  const base = m?.base ?? "";
  const tick = m?.spec.tickSize;
  const levMax = m ? Math.max(1, Math.min(s.config.maxLeverage, m.spec.maxLeverage)) : 1;
  const fraction = z.maxMargin > 0 ? Math.min(100, (z.margin / z.maxMargin) * 100) : 0;
  const marketBound = Number(raw?.order_market_price_bound) || ctx.limitBound;
  const isMarket = type === "market";
  const fill = isMarket && book && z.size > 0 ? estimateMarketFill(book, side, z.size, { mark: ctx.mark, bound: Number(slip) > 0 ? Math.min(Number(slip) / 100, marketBound) : marketBound }) : null;
  const bookDown = isMarket && z.size > 0 && book === null;
  const emptySide = isMarket && z.size > 0 && !!book && !(side === "buy" ? book.asks.length : book.bids.length);
  const slipHigh = (!!fill && (fill.slippage > SLIP_CONFIRM || !fill.complete || fill.beyondBand)) || bookDown || emptySide;
  const slipKey = `k|${sym}|${side}|${z.size}|${fill ? (fill.complete ? Math.ceil(fill.slippage * 200) : "p") : bookDown ? "n" : "e"}`;
  const marginMode = marginModeOf(s.account, sym) ?? "cross";
  const busySymbol = s.positions.some((p) => p.symbol === sym) || s.orders.some((o) => o.symbol === sym);

  const canPct = !!s.session && s.available > 0 && !!m;
  const setFraction = (pct: number) => {
    if (pct <= 0) return setAmt("");
    const margin = marginForFraction(ctx, z.lev, pct / 100);
    if (!(margin > 0)) return;
    setAmt(unit === "usd" ? margin.toFixed(2) : roundToStep((margin * z.lev) / (z.px || ctx.mark), m!.spec.stepSize, "floor"));
  };
  const switchUnit = () => {
    if (amt && z.size > 0) setAmt(unit === "usd" ? String(z.size) : z.margin.toFixed(2));
    setUnit(unit === "usd" ? "base" : "usd");
  };
  const switchMargin = async () => {
    if (!m) return;
    setMarginBusy(true);
    try {
      await s.client.setMarginMode(sym, marginMode === "cross" ? "isolated" : "cross");
      s.notify("ok", `${sym} now uses ${marginMode === "cross" ? "isolated" : "cross"} margin`);
      s.refresh();
    } catch (e: any) {
      s.notify("err", "Margin mode", e?.message || String(e));
    } finally {
      setMarginBusy(false);
    }
  };

  const submit = async () => {
    if (!m || !z.ok) return;
    if (slipHigh && armed !== slipKey) return setArmed(slipKey);
    setPlacing(true);
    setArmed("");
    const r = await s.placeDraft(draft, z, base, fill && fill.complete && !fill.beyondBand ? fill.avgPrice : undefined);
    setPlacing(false);
    if (r !== "failed") (setAmt(""), setTp(""), setSl(""));
  };

  const typeLabel = mode === "grid" ? "Grid bot" : ORDER_TYPES.find((t) => t.type === mode)?.label ?? "Market";
  const sideWord = side === "buy" ? "Long" : "Short";
  const cta = (() => {
    if (!s.session) return <button class="pd-cta" onClick={() => s.setSheet("connect")}>Connect wallet</button>;
    if (s.accountLoaded && s.available <= 0 && !reducing) return <button class="pd-cta" onClick={() => s.openFunds("deposit")}>Deposit to trade</button>;
    if (z.ok && slipHigh && armed === slipKey && !placing)
      return (
        <button class="pd-cta caution" onClick={submit}>
          {bookDown ? "Confirm: slippage unknown" : fill && !fill.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((fill?.slippage ?? 0) * 100).toFixed(2)}%`}
        </button>
      );
    const what =
      type === "market" ? `${sideWord} ${base}` : type === "limit" ? `${sideWord} ${base} @ ${priceText(z.px, tick)}` : type === "twap" ? `Start TWAP · ${sideWord} ${base}` : `Place ${typeLabel} · ${sideWord}`;
    return (
      <button class={`pd-cta ${side === "buy" ? "long" : "short"}`} disabled={!z.ok || placing} onClick={submit}>
        {placing ? <Spin size={16} /> : z.kind === "empty" || z.kind === "load" ? what : z.problem ?? what}
      </button>
    );
  })();

  const tpPrice = auto ? z.tpPrice : 0;
  const slPrice = auto ? z.slPrice : 0;
  const priceField = (label: string, v: string, set: (x: string) => void, aria: string, markBtn = true) => (
    <label class="pd-input">
      <span class="pre">{label}</span>
      <input inputMode="decimal" placeholder={m ? priceText(m.mark, tick).slice(1).replace(/,/g, "") : "0"} value={v} onInput={(e) => set(cleanDecimal(e))} aria-label={aria} />
      {markBtn && (
        <button class="suf" onClick={(e) => (e.preventDefault(), m && set(roundToStep(m.mark, tick ?? 0.0001)))}>
          Mark
        </button>
      )}
    </label>
  );
  const isTrig = type === "stop" || type === "stop_limit" || type === "take_profit" || type === "take_profit_limit";

  return (
    <div class="pd-panel pd-order">
      <div class="pd-pills">
        <button
          class="pd-pill"
          disabled={!s.session || marginBusy || busySymbol}
          title={busySymbol ? "Close this market's position and open orders to change margin mode" : "Cross: your whole balance backs positions. Isolated: each position only risks its own margin."}
          onClick={switchMargin}
        >
          {marginBusy ? <Spin size={12} /> : marginMode === "cross" ? "Cross" : "Isolated"}
        </button>
        <span class="pd-pill static" title="Leverage for this order (set below)">{z.lev}x</span>
      </div>
      <div class="pd-tabs ls">
        <button class={side === "buy" ? "on long" : ""} onClick={() => setSide("buy")}>
          Long
        </button>
        <button class={side === "sell" ? "on short" : ""} onClick={() => setSide("sell")}>
          Short
        </button>
      </div>
      {mode === "grid" ? (
        <GridForm s={s} m={m} onBack={() => setMode("market")} />
      ) : (
        <>
          <div class="pd-form">
            <div class="pd-kv">
              <span>Available to Trade</span>
              <span class="num">{usdText(s.session ? s.available : 0)}</span>
            </div>
            <div class="pd-kv">
              <span>Order Type</span>
              <span class="pd-dd">
                <button onClick={() => setTypeOpen(!typeOpen)} aria-haspopup="listbox" aria-expanded={typeOpen}>
                  {typeLabel} <Icon n="down" size={14} />
                </button>
                {typeOpen && (
                  <span class="pd-menu wide" role="listbox">
                    {[...ORDER_TYPES.map((t) => ({ id: t.type as Mode, label: t.label, desc: t.desc })), { id: "grid" as Mode, label: "Grid bot", desc: "Buys low and sells high inside a price range, automatically" }].map((t) => (
                      <button key={t.id} role="option" aria-selected={mode === t.id} class={mode === t.id ? "on" : ""} onClick={() => (setMode(t.id), setTypeOpen(false))}>
                        <b>{t.label}</b>
                        <span>{t.desc}</span>
                      </button>
                    ))}
                  </span>
                )}
              </span>
            </div>
            {isTrig && priceField(type.startsWith("take") ? "Target" : "Trigger", trigger, setTrigger, "Trigger price")}
            {needsLimitPrice(type as any) && priceField("Price", limitStr, setLimitStr, "Limit price")}
            {type === "trailing_stop_market" && (
              <>
                <label class="pd-input">
                  <span class="pre">Trail</span>
                  <input inputMode="decimal" value={callback} onInput={(e) => setCallback(cleanDecimal(e))} aria-label="Trail distance percent" />
                  <span class="suf muted">%</span>
                </label>
                <div class="pd-chips">
                  {TRAIL_PRESETS.map((v) => (
                    <button key={v} class={Number(callback) === v ? "on" : ""} onClick={() => setCallback(String(v))}>
                      {v}%
                    </button>
                  ))}
                </div>
                <label class="pd-input">
                  <span class="pre">Activation</span>
                  <input inputMode="decimal" placeholder="Optional · starts now" value={activation} onInput={(e) => setActivation(cleanDecimal(e))} aria-label="Activation price (optional)" />
                </label>
                <div class="pd-hint">
                  Trails {TRAILING_MIN_PCT}–{TRAILING_MAX_PCT}% behind the best price and triggers a market order when the price turns by that much. Leave activation empty to start trailing now. Like on Strike, it only closes or reduces your open position.
                </div>
              </>
            )}
            {type === "twap" && (
              <>
                <div class="pd-chips" role="radiogroup" aria-label="TWAP duration">
                  {TWAP_PRESETS.map((v) => (
                    <button key={v} role="radio" aria-checked={twapMin === v} class={twapMin === v ? "on" : ""} onClick={() => setTwapMin(v)}>
                      {v < 60 ? `${v}m` : `${v / 60}h`}
                    </button>
                  ))}
                  <label class="pd-mini">
                    <input inputMode="numeric" value={String(twapMin)} aria-label="TWAP duration in minutes" onInput={(e) => setTwapMin(Math.min(1440, Number(cleanDecimal(e)) || 0))} />
                    min
                  </label>
                </div>
                {priceField("Limit", twapLimit, setTwapLimit, "TWAP price limit (optional)", false)}
                <label class="pd-check">
                  <input type="checkbox" checked={randomize} onChange={(e) => setRandomize((e.target as HTMLInputElement).checked)} /> Randomize slice timing and size
                </label>
              </>
            )}
            <label class="pd-input big">
              {unit === "usd" && <span class="pre">$</span>}
              <input inputMode="decimal" placeholder="0" value={amt} onInput={(e) => setAmt(cleanDecimal(e))} aria-label={unit === "usd" ? "Margin in USD" : `Size in ${base}`} />
              <button class="suf unit" onClick={switchUnit} title="Switch between margin in USD and size in the coin">
                {unit === "usd" ? "USD" : base} <Icon n="swap" size={14} />
              </button>
            </label>
            <div class="pd-sl">
              <Slider min={0} max={100} value={Math.round(fraction)} onChange={setFraction} label="Share of available balance" marks={[0, 25, 50, 75, 100]} disabled={!canPct} />
              <label class="pd-box">
                <input inputMode="decimal" disabled={!canPct} value={fraction ? Math.round(fraction) : ""} placeholder="0" aria-label="Percent of available balance" onInput={(e) => setFraction(Math.min(100, Number(cleanDecimal(e)) || 0))} />
                <span>%</span>
              </label>
            </div>
            {!canPct && <div class="pd-hint">{!s.session ? "Connect a wallet to size by % of your balance." : "Add funds to size by % of your balance."}</div>}
            <div class="pd-lbl">Leverage</div>
            <div class="pd-sl">
              <Slider min={1} max={levMax} value={Math.min(lev, levMax)} onChange={setLev} label="Leverage" marks={[1, ...[2, 5, 10, 20, 40, 75].filter((x) => x < levMax), levMax]} />
              <label class="pd-box">
                <input
                  inputMode="numeric"
                  value={String(Math.min(lev, levMax))}
                  aria-label="Leverage"
                  onInput={(e) => {
                    const v = Number(cleanDecimal(e));
                    if (v >= 1) setLev(Math.min(levMax, Math.round(v)));
                  }}
                />
                <span>x</span>
              </label>
            </div>
            {z.lev < Math.min(lev, levMax) && <div class="pd-hint">Strike allows up to {z.lev}x for this size.</div>}
            <div class="pd-opts">
              <label class="pd-check" title="Only shrinks an open position; never opens or flips one">
                <input type="checkbox" checked={reducing} disabled={type === "trailing_stop_market"} onChange={(e) => setReduceOnly((e.target as HTMLInputElement).checked)} /> Reduce Only
              </label>
              {type === "limit" && (
                <label class="pd-check" title="Rests on the book as a maker order; cancelled if it would fill at once">
                  <input type="checkbox" checked={postOnly} onChange={(e) => setPostOnly((e.target as HTMLInputElement).checked)} /> Post Only
                </label>
              )}
              {needsLimitPrice(type as any) && (
                <span class="pd-tif" role="radiogroup" aria-label="Time in force">
                  {(["GTC", "IOC", "FOK"] as const).map((t) => (
                    <button key={t} role="radio" aria-checked={tif === t} class={tif === t ? "on" : ""} title={t === "GTC" ? "Good till cancelled" : t === "IOC" ? "Immediate or cancel: fill what you can now, cancel the rest" : "Fill or kill: fill all now or cancel"} onClick={() => setTif(t)}>
                      {t}
                    </button>
                  ))}
                </span>
              )}
              {(isTrig || type === "trailing_stop_market") && (
                <span class="pd-tif" role="radiogroup" aria-label="Trigger price type">
                  {(["mark_price", "contract_price"] as const).map((t) => (
                    <button key={t} role="radio" aria-checked={working === t} class={working === t ? "on" : ""} onClick={() => setWorking(t)}>
                      {t === "mark_price" ? "Mark" : "Last"}
                    </button>
                  ))}
                </span>
              )}
            </div>
            <div class="pd-kv muted">
              <span>Liquidation Price Est.</span>
              <span class="num">{z.size > 0 && !reducing ? `${priceText(z.liq, tick)} (${movePct(z.px, z.liq)})` : "N/A"}</span>
            </div>
            <div class="pd-kv muted">
              <span>Order Value</span>
              <span class="num">{z.size > 0 ? `${usdText(z.notional)} · ${qtyText(z.size)} ${base}` : "N/A"}</span>
            </div>
            {type === "twap" && m && Number(twapMin) > 0 && (() => {
              const plan = twapPlan(m.spec, z.size, Number(twapMin) * 60, z.px);
              return (
                <div class="pd-kv muted">
                  <span title="Strike sends one suborder about every 30 seconds; sizes adjust to catch up if some are skipped.">Suborders</span>
                  <span class="num">{`~${plan.orders} · every ${plan.intervalSec}s${z.size > 0 ? ` · ${qtyText(plan.perOrder)} ${base} each` : ""}`}</span>
                </div>
              );
            })()}
            <div class="pd-kv muted">
              <span>Margin Required</span>
              <span class="num">{z.size > 0 && !reducing ? usdText(z.margin) : "N/A"}</span>
            </div>
            <div class="pd-kv muted">
              <span title={`Strike taker ${(s.takerRate * 100).toFixed(3)}% + builder ${(s.client.orderFeeBps / 100).toFixed(2)}%. A limit order that waits on the book pays Strike's lower maker fee.`}>{type === "market" ? "Fees" : "Fees (up to)"}</span>
              <span class="num">{z.size > 0 ? usdText(z.fee, { decimals: z.fee < 0.1 ? 4 : 2 }) : `${(z.feeRate * 100).toFixed(3)}%`}</span>
            </div>
            <button class="pd-calc" onClick={() => setCalc(true)}>
              <Icon n="sliders" size={14} /> Calculator
            </button>
            {isMarket && (
              <div class="pd-kv muted">
                <span>Max slippage</span>
                <span class="pd-dd">
                  <button onClick={() => setSlipOpen(!slipOpen)}>
                    {Number(slip) > 0 ? `${slip}%` : `Auto (${(marketBound * 100).toFixed(0)}%)`} <Icon n="down" size={12} />
                  </button>
                  {slipOpen && (
                    <span class="pd-menu" role="listbox">
                      {["", "0.5", "1", "2", "3"].filter((v) => !v || Number(v) / 100 <= marketBound).map((v) => (
                        <button key={v || "auto"} class={slip === v ? "on" : ""} onClick={() => (setSlip(v), setSlipOpen(false))}>
                          <b>{v ? `${v}%` : "Auto"}</b>
                          <span>{v ? "Fill only within this distance from the mark; the rest is cancelled" : `Strike's band for this market (${(marketBound * 100).toFixed(0)}%)`}</span>
                        </button>
                      ))}
                    </span>
                  )}
                </span>
              </div>
            )}
            {fill && fill.complete && !fill.beyondBand && (
              <div class="pd-kv muted">
                <span>Est. Fill · Slippage</span>
                <span class={`num ${fill.slippage > 0.005 ? "neg" : ""}`}>
                  {priceText(fill.avgPrice, tick)} · {(fill.slippage * 100).toFixed(2)}%
                </span>
              </div>
            )}
            {bracketOk && (
              <div class="pd-kv">
                <span>Auto Close</span>
                <button class={`pd-switch${auto ? " on" : ""}`} role="switch" aria-checked={auto} aria-label="Auto close (take profit / stop loss)" onClick={() => setAuto(!auto)}>
                  <span />
                </button>
              </div>
            )}
            {auto && bracketOk && (
              <div class="pd-auto">
                <div class="pd-auto-h">
                  <span>Take profit / Stop loss</span>
                  <button
                    class="pd-chipbtn"
                    onClick={() => {
                      const next: AutoMode = autoMode === "price" ? "pnl" : "price";
                      const entry = z.px || ctx.mark;
                      if (next === "pnl") {
                        setTp(tpPrice ? pnlForPrice(side, entry, z.lev, tpPrice).toFixed(0) : "");
                        setSl(slPrice ? Math.abs(pnlForPrice(side, entry, z.lev, slPrice)).toFixed(0) : "");
                      } else {
                        setTp(tpPrice ? roundToStep(tpPrice, tick ?? 0.0001) : "");
                        setSl(slPrice ? roundToStep(slPrice, tick ?? 0.0001) : "");
                      }
                      setAutoMode(next);
                    }}
                  >
                    {autoMode === "price" ? "Price" : "% P&L"} <Icon n="swap" size={12} />
                  </button>
                </div>
                <label class="pd-input">
                  <span class="pre pos">TP</span>
                  <input inputMode="decimal" placeholder={autoMode === "price" ? "Price" : "% gain"} value={tp} onInput={(e) => setTp(cleanDecimal(e))} aria-label="Take profit" />
                  <span class="suf muted num">{tpPrice ? (autoMode === "price" ? pctText(pnlForPrice(side, z.px || ctx.mark, z.lev, tpPrice), 0) : priceText(tpPrice, tick)) : ""}</span>
                </label>
                <label class="pd-input">
                  <span class="pre neg">SL</span>
                  <input inputMode="decimal" placeholder={autoMode === "price" ? "Price" : "% loss"} value={sl} onInput={(e) => setSl(cleanDecimal(e))} aria-label="Stop loss" />
                  <span class="suf muted num">{slPrice ? (autoMode === "price" ? pctText(pnlForPrice(side, z.px || ctx.mark, z.lev, slPrice), 0) : priceText(slPrice, tick)) : ""}</span>
                </label>
              </div>
            )}
          </div>
          <div class="pd-order-foot">
            {slipHigh && z.ok && (
              <div class="pd-warn">
                {bookDown
                  ? "The order book isn't available, so slippage can't be estimated."
                  : emptySide
                    ? `There are no ${side === "buy" ? "sellers" : "buyers"} on the order book right now, so a market order would be cancelled.`
                    : fill && (!fill.complete || fill.beyondBand)
                      ? `There aren't enough ${side === "buy" ? "sellers" : "buyers"} near the market price to fill this, so Strike may cancel some or all of it.`
                      : `Est. slippage ${((fill?.slippage ?? 0) * 100).toFixed(2)}% from the market price.`}
              </div>
            )}
            {z.ok && !reducing && z.liqDistance > 0 && z.liqDistance < 0.1 && <div class="pd-warn">High risk: liquidation is only {(z.liqDistance * 100).toFixed(1)}% away.</div>}
            {cta}
          </div>
        </>
      )}
      {calc && m && (
        <Sheet title="Calculator" onClose={() => setCalc(false)}>
          <Calculator m={m} />
        </Sheet>
      )}
    </div>
  );
}

export function AccountCard({ s }: { s: PerpsState }) {
  const mm = Number(s.account?.maintenance_margin) || 0;
  const ratio = s.equity > 0 ? mm / s.equity : 0;
  const posValue = s.positions.reduce((a, p) => a + Math.abs(Number(p.size) || 0) * (s.bySymbol[p.symbol]?.mark || Number(p.entry_price) || 0), 0);
  return (
    <div class="pd-panel pd-acct">
      <div class="pd-kv">
        <span class="muted">Total Balance</span>
        <b class="num">{usdText(s.session ? s.equity : 0)}</b>
      </div>
      <div class="pd-kv">
        <span class="muted">Available Balance</span>
        <b class="num">{usdText(s.session ? s.available : 0)}</b>
      </div>
      <div class="pd-kv">
        <span class="muted">Unrealized P&L</span>
        <b class={`num ${s.upnl > 0 ? "pos" : s.upnl < 0 ? "neg" : ""}`}>{usdText(s.upnl, { sign: true })}</b>
      </div>
      {s.session && mm > 0 && (
        <div class="pd-kv">
          <span class="muted" title="Maintenance margin ÷ equity. Strike issues a margin call at 70%, allows only reducing orders at 90% and liquidates at 100%.">
            Margin Ratio
          </span>
          <b class={`num ${ratio >= 0.7 ? "neg" : ""}`}>{(ratio * 100).toFixed(1)}%</b>
        </div>
      )}
      {s.session && mm > 0 && (
        <div class="pd-kv">
          <span class="muted" title="Margin your open positions must keep; below it they are liquidated">Maintenance Margin</span>
          <b class="num">{usdText(mm)}</b>
        </div>
      )}
      {s.session && posValue > 0 && (
        <div class="pd-kv">
          <span class="muted">Total Position Value</span>
          <b class="num">{usdText(posValue)}</b>
        </div>
      )}
      {s.session ? (
        <>
          <button class="pd-btn primary" onClick={() => s.openFunds("deposit")}>
            Deposit
          </button>
          <button class="pd-btn" disabled={s.available < MIN_WITHDRAW_USD} onClick={() => s.openFunds("withdraw")}>
            Withdraw
          </button>
          <div class="pd-addr">
            <span class="num" title={s.session.address}>
              {shortAddress(s.session.address, 10, 6)}
            </span>
            <button class="pd-link" onClick={s.disconnect}>
              Disconnect
            </button>
          </div>
        </>
      ) : (
        <button class="pd-btn primary" onClick={() => s.setSheet("connect")}>
          Connect wallet
        </button>
      )}
    </div>
  );
}
