import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { decimalsOf, estimateMarketFill, maxLeverageFor, movePct, roundToStep, type BookView, type Side } from "@strike-everywhere/core";
import { cleanDecimal } from "../../parts";
import { pctText, priceText, qtyText, usdText } from "../markets";
import { marginForFraction, pnlForPrice, sizeDraft, type AppOrderType, type AutoMode, type Draft, type DraftCtx, type Unit } from "../order";
import type { PerpsState } from "../state";
import { Group, Icon, Keypad, RoundBtn, Row, Sheet, Slider, Spin, applyKey, pref } from "../ui";
import type { Nav } from "./Mobile";

type SheetId = null | "lev" | "settings" | "currency" | "ordertype" | "auto" | "alert" | "fees" | "side";
const SLIP_CONFIRM = 0.02;

function capForMargin(tiers: any[], margin: number, max: number): number {
  for (let l = Math.max(1, Math.floor(max)); l > 1; l--) if (maxLeverageFor(tiers, Math.max(1, margin) * l) >= l) return l;
  return 1;
}

export function Trade({ s, nav, sym, side: side0, onLearn, onDisclosures }: { s: PerpsState; nav: Nav; sym: string; side: Side; onLearn: (t: string) => void; onDisclosures: () => void }) {
  const m = s.bySymbol[sym];
  const raw = s.client.raw(sym);
  const [side, setSide] = useState<Side>(side0);
  const [phase, setPhase] = useState<"amount" | "review">("amount");
  const [type, setType] = useState<AppOrderType>("market");
  const [unit, setUnit] = useState<Unit>("usd");
  const [amt, setAmt] = useState("");
  const [lev, setLev] = useState(() => {
    const saved = Number(pref("default-leverage"));
    return Math.max(1, Math.min(m?.maxLev ?? 2, saved >= 1 ? saved : 2));
  });
  const [limitStr, setLimitStr] = useState("");
  const [tp, setTp] = useState(0);
  const [sl, setSl] = useState(0);
  const [autoMode, setAutoMode] = useState<AutoMode>("pnl");
  const [sheet, setSheet] = useState<SheetId>(null);
  const [armed, setArmed] = useState("");
  const [placing, setPlacing] = useState(false);
  const [book, setBook] = useState<BookView | null | undefined>(undefined);

  const base = m?.base ?? sym.split("-")[0];
  const mark = m?.mark ?? 0;
  const tick = m?.spec.tickSize;
  const ctx: DraftCtx = {
    spec: m?.spec,
    mark,
    available: s.available,
    takerRate: s.takerRate,
    feeBps: s.client.orderFeeBps,
    maxLeverage: s.config.maxLeverage,
    limitBound: Number(raw?.order_limit_price_bound) || 0.05,
  };
  const draft: Draft = { symbol: sym, side, type, amount: Number(amt) || 0, unit, leverage: lev, limitPrice: Number(limitStr) || 0, tp, sl, autoMode };
  const z = sizeDraft(draft, ctx);
  const dp = unit === "usd" ? 2 : decimalsOf(m?.spec.stepSize ?? 0.01);

  const dpRef = useRef(dp);
  dpRef.current = dp;
  const onKey = useMemo(() => (k: string) => setAmt((cur) => applyKey(cur, k, dpRef.current)), []);

  const needBook = phase === "review" && type === "market" && z.size > 0;
  useEffect(() => {
    setBook(undefined);
    if (!needBook) return;
    const feed = s.client.orderBook(sym);
    let t: ReturnType<typeof setTimeout> | undefined;
    const off = feed.onUpdate(() => {
      if (!t) t = setTimeout(() => ((t = undefined), setBook(feed.view(200))), 250);
    });
    const giveUp = setTimeout(() => setBook((b) => (b === undefined ? null : b)), 10_000);
    return () => (off(), clearTimeout(t), clearTimeout(giveUp), feed.close());
  }, [needBook, sym]);
  const marketBound = Number(raw?.order_market_price_bound) || ctx.limitBound;
  const fill = needBook && book ? estimateMarketFill(book, side, z.size, { mark, bound: marketBound }) : null;
  const slipKey = `k|${side}|${z.size}|${fill ? (fill.complete ? Math.ceil(fill.slippage * 200) : "partial") : book === null ? "nobook" : "empty"}`;
  const emptySide = needBook && !!book && !(side === "buy" ? book.asks.length : book.bids.length);
  const slipHigh = needBook && ((!!fill && (fill.slippage > SLIP_CONFIRM || !fill.complete || fill.beyondBand)) || book === null || emptySide);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(""), 15_000);
    return () => clearTimeout(t);
  }, [armed]);

  if (!m) {
    return (
      <div class="pa-screen">
        <div class="pa-top">
          <RoundBtn n="x" label="Close" onClick={nav.back} />
        </div>
        <div class="pa-empty">{s.markets.length ? `${sym} isn't listed here.` : "Loading…"}</div>
      </div>
    );
  }

  const sideWord = side === "buy" ? "Long" : "Short";
  const setPct = (f: number) => {
    const margin = marginForFraction(ctx, lev, f);
    if (!(margin > 0)) return;
    if (unit === "usd") setAmt(margin.toFixed(2));
    else setAmt(roundToStep((margin * z.lev) / (z.px || mark), m.spec.stepSize, "floor"));
  };
  const amountText = unit === "usd" ? `$${amt || "0"}` : `${amt || "0"} ${base}`;
  const big = amountText.length > 9 ? "xl" : amountText.length > 6 ? "xxl" : "xxxl";
  const errLine = z.kind === "min" || z.kind === "funds" || z.kind === "price" || z.kind === "tpsl" ? z.problem : null;

  const confirm = async () => {
    if (!z.ok) return setSheet("alert");
    if (slipHigh && armed !== slipKey) return setArmed(slipKey);
    setPlacing(true);
    setArmed("");
    const r = await s.placeDraft(draft, z, base, fill && fill.complete && !fill.beyondBand ? fill.avgPrice : undefined);
    setPlacing(false);
    if (r !== "failed") nav.replace({ k: "market", sym });
  };

  const header = (
    <div class="pa-top">
      {phase === "review" ? <RoundBtn n="back" label="Back" onClick={() => setPhase("amount")} /> : <RoundBtn n="x" label="Close" onClick={nav.back} />}
      <div class="pa-title two">
        {phase === "review" ? (
          <>
            <b>Review</b>
            <span>
              {sideWord} {base}
            </span>
          </>
        ) : (
          <>
            <button class="pa-side" onClick={() => setSheet("side")} aria-label="Change side">
              {sideWord} {base} <Icon n="down" size={14} />
            </button>
            <span class="num">Price {priceText(mark, tick)}</span>
          </>
        )}
      </div>
      <span class="sp" />
      <RoundBtn n="sliders" label="Settings" onClick={() => setSheet("settings")} />
    </div>
  );

  return (
    <div class="pa-screen trade">
      {header}
      {phase === "amount" ? (
        <div class="pa-amount">
          <div class="pa-amount-top">
            <div class={`pa-big num ${big}${amt ? "" : " zero"}`} aria-live="polite">
              {amountText}
            </div>
            <button class="pa-levline" onClick={() => setSheet("lev")}>
              {z.lev}x leverage <Icon n="down" size={16} />
            </button>
            {type === "limit" && (
              <button class="pa-levline sub" onClick={() => setSheet("ordertype")}>
                Limit {limitStr ? priceText(Number(limitStr), tick) : "· set a price"} <Icon n="down" size={16} />
              </button>
            )}
            {errLine && <div class="pa-err">{errLine}</div>}
            {!errLine && amt && z.size > 0 && (
              <div class="pa-note num">
                ≈ {qtyText(z.size)} {base} position · {usdText(z.notional)}
              </div>
            )}
          </div>
          <button class="pa-balance" onClick={() => (s.session ? s.openFunds("deposit") : s.setSheet("connect"))}>
            <span>
              <b>Perps Balance</b> · <span class="num">{usdText(s.session ? s.available : 0)}</span>
            </span>
            <Icon n="down" size={18} />
          </button>
          {!s.session ? (
            <button class="pa-btn primary big" onClick={() => s.setSheet("connect")}>
              Connect wallet
            </button>
          ) : s.accountLoaded && s.available <= 0 ? (
            <button class="pa-btn primary big" onClick={() => s.openFunds("deposit")}>
              Add funds
            </button>
          ) : !amt ? (
            <div class="pa-pcts">
              {[0.25, 0.5, 1].map((f) => (
                <button key={f} class="pa-btn dark" onClick={() => setPct(f)}>
                  {f * 100}%
                </button>
              ))}
            </div>
          ) : (
            <button class="pa-btn primary big" disabled={!z.ok} onClick={() => setPhase("review")}>
              Review
            </button>
          )}
          <Keypad onKey={onKey} />
        </div>
      ) : (
        <div class="pa-review">
          <div class="pa-scroll">
            <div class="pa-big num xxl">{usdText(z.margin)}</div>
            <div class="pa-lines">
              <Row
                k={sideWord}
                sub={
                  <span class="num">
                    {qtyText(z.size)} {base} · {type === "limit" ? `Limit ${priceText(z.px, tick)}` : `Current Price ${priceText(mark, tick)}`}
                  </span>
                }
                info={() => setSheet("side")}
              />
              <Row k="Leverage" sub={<span class="num">{`${z.lev}x · Liq. ≈ ${priceText(z.liq, tick)}`}</span>} onClick={() => setSheet("lev")} chevron="down" />
              <Row
                k={tp || sl ? "Auto Close" : "Add Auto Close"}
                sub={tp || sl ? <span class="num">{[z.tpPrice ? `TP ${priceText(z.tpPrice, tick)}` : "", z.slPrice ? `SL ${priceText(z.slPrice, tick)}` : ""].filter(Boolean).join(" · ")}</span> : undefined}
                onClick={() => setSheet("auto")}
                chevron={tp || sl ? "down" : "plus"}
              />
              <Row k="Payment" sub={<span class="num">{`Perps Balance · ${type === "limit" ? "up to " : ""}${(z.feeRate * 100).toFixed(3)}% fee`}</span>} info={() => setSheet("fees")} />
              {fill && fill.complete && !fill.beyondBand && (
                <Row
                  k="Est. fill price"
                  sub={<span class={`num ${fill.slippage > 0.005 ? "neg" : ""}`}>{`${priceText(fill.avgPrice, tick)} · slippage ${(fill.slippage * 100).toFixed(2)}%`}</span>}
                />
              )}
            </div>
            {needBook && book === undefined && (
              <div class="pa-note">
                <Spin size={12} /> Checking the order book…
              </div>
            )}
            {slipHigh && (
              <div class="pa-warn">
                <Icon n="warn" size={16} />
                {book === null
                  ? "The order book isn't available, so slippage can't be estimated."
                  : emptySide
                    ? `There are no ${side === "buy" ? "sellers" : "buyers"} on the order book right now, so a market order would be cancelled.`
                  : fill && (!fill.complete || fill.beyondBand)
                    ? `There aren't enough ${side === "buy" ? "sellers" : "buyers"} near the market price to fill this, so Strike may cancel some or all of it.`
                    : `This size moves through the book: est. ${((fill?.slippage ?? 0) * 100).toFixed(2)}% from the market price.`}
                {armed === slipKey ? " Tap Confirm again to send it anyway." : ""}
              </div>
            )}
            {z.liqDistance > 0 && z.liqDistance < 0.1 && (
              <div class="pa-warn">
                <Icon n="warn" size={16} /> High risk: liquidation is only {(z.liqDistance * 100).toFixed(1)}% away. Lower leverage gives you more room.
              </div>
            )}
            <button class="pa-foot-link" onClick={onDisclosures}>
              <Icon n="info" size={15} /> View Disclosures
            </button>
          </div>
          <div class="pa-dock single">
            <button class={`pa-btn primary big${armed === slipKey && slipHigh ? " caution" : ""}`} disabled={placing || (needBook && book === undefined)} onClick={confirm}>
              {placing ? <Spin size={18} /> : armed === slipKey && slipHigh ? "Confirm anyway" : "Confirm"}
            </button>
          </div>
        </div>
      )}

      {sheet === "lev" && <LeverageSheet s={s} z={z} draft={draft} ctx={ctx} onClose={() => setSheet(null)} onApply={(l) => (setLev(l), setSheet(null))} />}
      {sheet === "settings" && (
        <Sheet title="Settings" onClose={() => setSheet(null)}>
          <Group>
            <Row k="Display currency" v={unit === "usd" ? "USD" : base} onClick={() => setSheet("currency")} chevron="right" />
            <Row k="Order Type" v={type === "market" ? "Market" : "Limit"} onClick={() => setSheet("ordertype")} chevron="right" />
          </Group>
        </Sheet>
      )}
      {sheet === "currency" && (
        <Sheet title="Display currency" onClose={() => setSheet(null)} onBack={() => setSheet("settings")} onDone={() => setSheet(null)}>
          <Group>
            {(["usd", "base"] as const).map((u) => (
              <button key={u} class="pa-row" onClick={() => (u !== unit && setAmt(""), setUnit(u))}>
                <span class="l">
                  <span class="k">{u === "usd" ? "USD" : base}</span>
                  <span class="s">{u === "usd" ? "Enter the margin you put in, in US dollars" : `Enter the position size in ${base}`}</span>
                </span>
                <span class={`pa-radio${unit === u ? " on" : ""}`} />
              </button>
            ))}
          </Group>
        </Sheet>
      )}
      {sheet === "ordertype" && (
        <OrderTypeSheet
          type={type}
          limit={limitStr}
          mark={mark}
          tick={tick}
          onBack={() => setSheet("settings")}
          onClose={() => setSheet(null)}
          onApply={(t, l) => (setType(t), setLimitStr(l), setSheet(null))}
        />
      )}
      {sheet === "auto" && (
        <AutoCloseSheet
          side={side}
          entry={z.px || mark}
          lev={z.lev}
          tick={tick}
          mode={autoMode}
          tp={tp}
          sl={sl}
          onClose={() => setSheet(null)}
          onApply={(mode, t, l) => (setAutoMode(mode), setTp(t), setSl(l), setSheet(null))}
        />
      )}
      {sheet === "alert" && (
        <Sheet title="" onClose={() => setSheet(null)}>
          <div class="pa-alert">
            <span class="ic">
              <Icon n="warn" size={26} />
            </span>
            <b>{z.problem}</b>
            <span>{z.kind === "min" ? "Increase your margin or leverage to continue." : z.kind === "funds" ? "Add funds or lower the amount to continue." : "Edit your order to continue."}</span>
            <button class="pa-btn dark wide" onClick={() => (setSheet(null), setPhase("amount"))}>
              Edit
            </button>
          </div>
        </Sheet>
      )}
      {sheet === "fees" && (
        <Sheet title="Fees" onClose={() => setSheet(null)}>
          <Group>
            <Row k="Strike trading fee (taker)" v={<span class="num">{(s.takerRate * 100).toFixed(3)}%</span>} />
            <Row k={`Builder fee (${s.config.builderCode})`} v={<span class="num">{(s.client.orderFeeBps / 100).toFixed(2)}%</span>} />
            <Row k={type === "limit" ? "Estimated total (if it fills at once)" : "Estimated total"} v={<span class="num">{usdText(z.fee, { decimals: z.fee < 0.1 ? 4 : 2 })}</span>} />
          </Group>
          <p class="pa-p">Fees are charged on the position size when the order fills, and again when you close. A limit order that waits on the book pays Strike's lower maker fee instead of the taker fee; the builder fee is the same. Funding is paid or received every hour while the position is open.</p>
        </Sheet>
      )}
      {sheet === "side" && (
        <Sheet title="Long or Short" onClose={() => setSheet(null)}>
          <Group>
            {(["buy", "sell"] as const).map((sd) => (
              <button key={sd} class="pa-row" onClick={() => (setSide(sd), setSheet(null))}>
                <span class="l">
                  <span class={`k ${sd === "buy" ? "pos" : "neg"}`}>{sd === "buy" ? "Long" : "Short"}</span>
                  <span class="s">{sd === "buy" ? `Profit if ${base} goes up` : `Profit if ${base} goes down`}</span>
                </span>
                <span class={`pa-radio${side === sd ? " on" : ""}`} />
              </button>
            ))}
          </Group>
          <button class="pa-foot-link" onClick={() => (setSheet(null), onLearn("basics"))}>
            <Icon n="info" size={15} /> How Perps work
          </button>
        </Sheet>
      )}
    </div>
  );
}

function LeverageSheet({ s, z, draft, ctx, onClose, onApply }: { s: PerpsState; z: ReturnType<typeof sizeDraft>; draft: Draft; ctx: DraftCtx; onClose: () => void; onApply: (l: number) => void }) {
  const spec = ctx.spec!;
  const margin = draft.unit === "usd" ? draft.amount : z.margin;
  const cap = Math.max(1, Math.min(s.config.maxLeverage, spec.maxLeverage, margin > 0 ? capForMargin(spec.marginTiers, margin, spec.maxLeverage) : spec.maxLeverage));
  const [l, setL] = useState(Math.min(z.lev, cap));
  const at = sizeDraft({ ...draft, leverage: l }, ctx);
  const minLev = margin > 0 ? Math.ceil(spec.minNotional / margin - 1e-9) : 1;
  const tick = spec.tickSize;
  const marks = [1, 2, 5, 10, 20, 25, 40, 50, 75, 100].filter((x) => x <= cap);
  return (
    <Sheet title="Leverage" onClose={onClose} onDone={() => onApply(l)}>
      <p class="pa-p c">Leverage multiplies your position, and your gains and losses with it.</p>
      <div class="pa-levbig num">{l}x</div>
      <Slider min={1} max={cap} value={l} onChange={setL} label="Leverage" marks={marks} />
      <div class="pa-levmarks">
        {marks.map((x) => (
          <button key={x} class={x === l ? "on" : ""} onClick={() => setL(x)}>
            {x}x
          </button>
        ))}
      </div>
      <Group>
        <Row k="Current Price" v={<span class="num">{priceText(ctx.mark, tick)}</span>} />
        <Row k="Liquidation (est.)" v={<span class="num">{at.liq > 0 ? priceText(at.liq, tick) : "—"}</span>} />
        <Row k="Distance" v={<span class="num">{at.liq > 0 ? movePct(at.px || ctx.mark, at.liq) : "—"}</span>} />
      </Group>
      {margin > 0 && l < minLev && minLev <= cap && (
        <div class="pa-err sm">
          This leverage makes your position smaller than the market minimum ({usdText(spec.minNotional, { decimals: 0 })}). Use at least {minLev}x or increase your margin.
        </div>
      )}
      {at.liqDistance > 0 && at.liqDistance < 0.1 && <div class="pa-err sm">High risk: a {(at.liqDistance * 100).toFixed(1)}% move against you liquidates this position.</div>}
      {cap < spec.maxLeverage && (
        <p class="pa-p sm">Up to {cap}x here{s.config.maxLeverage < spec.maxLeverage ? ` (this app's limit)` : " for this size (Strike's margin tiers)"}.</p>
      )}
    </Sheet>
  );
}

function OrderTypeSheet({
  type,
  limit,
  mark,
  tick,
  onBack,
  onClose,
  onApply,
}: {
  type: AppOrderType;
  limit: string;
  mark: number;
  tick?: number;
  onBack: () => void;
  onClose: () => void;
  onApply: (t: AppOrderType, limit: string) => void;
}) {
  const [t, setT] = useState(type);
  const [l, setL] = useState(limit || (mark ? roundToStep(mark, tick ?? 0.0001) : ""));
  const raw = Number(l) > 0 && mark > 0 ? ((Number(l) - mark) / mark) * 100 : 0;
  const diff = Math.abs(raw) < 0.005 ? 0 : raw;
  return (
    <Sheet title="Order Type" onClose={onClose} onBack={onBack} onDone={() => onApply(t, t === "limit" ? l : "")} doneDisabled={t === "limit" && !(Number(l) > 0)}>
      <Group>
        {(["market", "limit"] as const).map((x) => (
          <button key={x} class="pa-row opt" onClick={() => setT(x)}>
            <span class="ck">{t === x && <Icon n="check" size={18} />}</span>
            <span class="l">
              <span class="k">{x === "market" ? "Market Order" : "Limit Order"}</span>
              <span class="s">{x === "market" ? "Fills right away, near the market price" : "Fills only at your price or better"}</span>
            </span>
          </button>
        ))}
      </Group>
      {t === "limit" && (
        <label class="pa-field">
          <span class="lbl">Limit Price</span>
          <span class="in">
            <input inputMode="decimal" value={l} aria-label="Limit price" onInput={(e) => setL(cleanDecimal(e))} />
            <span class={`num ${diff >= 0 ? "pos" : "neg"}`}>({pctText(diff)})</span>
          </span>
        </label>
      )}
      <Group>
        <Row k="Current Price" v={<span class="num">{priceText(mark, tick)}</span>} />
      </Group>
    </Sheet>
  );
}

function AutoCloseSheet({
  side,
  entry,
  lev,
  tick,
  mode: mode0,
  tp: tp0,
  sl: sl0,
  onClose,
  onApply,
}: {
  side: Side;
  entry: number;
  lev: number;
  tick?: number;
  mode: AutoMode;
  tp: number;
  sl: number;
  onClose: () => void;
  onApply: (mode: AutoMode, tp: number, sl: number) => void;
}) {
  const [mode, setMode] = useState<AutoMode>(mode0);
  const [tp, setTp] = useState(tp0 ? String(tp0) : "");
  const [sl, setSl] = useState(sl0 ? String(sl0) : "");
  const [focus, setFocus] = useState<"tp" | "sl">("tp");
  const tpPrice = Number(tp) > 0 ? (mode === "pnl" ? (side === "buy" ? entry * (1 + Number(tp) / 100 / lev) : entry * (1 - Number(tp) / 100 / lev)) : Number(tp)) : 0;
  const slPrice = Number(sl) > 0 ? (mode === "pnl" ? (side === "buy" ? entry * (1 - Number(sl) / 100 / lev) : entry * (1 + Number(sl) / 100 / lev)) : Number(sl)) : 0;
  const switchMode = () => {
    const next: AutoMode = mode === "pnl" ? "price" : "pnl";
    if (next === "price") {
      setTp(tpPrice ? roundToStep(tpPrice, tick ?? 0.0001) : "");
      setSl(slPrice ? roundToStep(slPrice, tick ?? 0.0001) : "");
    } else {
      setTp(tpPrice ? pnlForPrice(side, entry, lev, tpPrice).toFixed(0) : "");
      setSl(slPrice ? Math.abs(pnlForPrice(side, entry, lev, slPrice)).toFixed(0) : "");
    }
    setMode(next);
  };
  const chips = focus === "tp" ? [10, 25, 50, 100] : [10, 25, 50, 75];
  return (
    <Sheet title="Auto Close" onClose={onClose} onDone={() => onApply(mode, Number(tp) || 0, Number(sl) || 0)}>
      <button class="pa-field toggle" onClick={switchMode}>
        <span class="lbl big">Use</span>
        <span class="v">
          {mode === "pnl" ? "% P&L" : "Price"} <Icon n="down" size={14} />
        </span>
      </button>
      <label class={`pa-field${focus === "tp" ? " focus" : ""}`}>
        <span class="lbl">Take Profit</span>
        <span class="in">
          {mode === "pnl" && <span class="pos">+</span>}
          <input inputMode="decimal" placeholder="Enter Amount" value={tp} onFocus={() => setFocus("tp")} onInput={(e) => setTp(cleanDecimal(e))} aria-label="Take profit" />
          {mode === "pnl" && tp && <span>%</span>}
          {tp && (
            <button class="clr" aria-label="Clear take profit" onClick={(e) => (e.preventDefault(), setTp(""))}>
              <Icon n="x" size={12} />
            </button>
          )}
        </span>
        {tpPrice > 0 && <span class="hint num">{mode === "pnl" ? `Closes at ≈ ${priceText(tpPrice, tick)}` : `≈ ${pctText(pnlForPrice(side, entry, lev, tpPrice), 1)} P&L`}</span>}
      </label>
      <label class={`pa-field${focus === "sl" ? " focus" : ""}`}>
        <span class="lbl">Stop Loss</span>
        <span class="in">
          {mode === "pnl" && <span class="neg">-</span>}
          <input inputMode="decimal" placeholder="Enter Amount" value={sl} onFocus={() => setFocus("sl")} onInput={(e) => setSl(cleanDecimal(e))} aria-label="Stop loss" />
          {mode === "pnl" && sl && <span>%</span>}
          {sl && (
            <button class="clr" aria-label="Clear stop loss" onClick={(e) => (e.preventDefault(), setSl(""))}>
              <Icon n="x" size={12} />
            </button>
          )}
        </span>
        {slPrice > 0 && <span class="hint num">{mode === "pnl" ? `Closes at ≈ ${priceText(slPrice, tick)}` : `≈ ${pctText(pnlForPrice(side, entry, lev, slPrice), 1)} P&L`}</span>}
      </label>
      {mode === "pnl" && (
        <div class="pa-pcts four">
          {chips.map((c) => (
            <button key={c} class="pa-btn dark" onClick={() => (focus === "tp" ? setTp(String(c)) : setSl(String(c)))}>
              {focus === "tp" ? "+" : "-"}
              {c}%
            </button>
          ))}
        </div>
      )}
      <p class="pa-p sm">% P&L is the return on your margin: at {lev}x, 10% P&L is a {(10 / lev).toFixed(1)}% price move. Auto close orders trigger on the mark price.</p>
    </Sheet>
  );
}
