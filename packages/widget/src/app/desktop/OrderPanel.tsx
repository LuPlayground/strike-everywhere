import { useEffect, useState } from "preact/hooks";
import { MIN_WITHDRAW_USD, estimateMarketFill, movePct, roundToStep, shortAddress, type BookView, type Side } from "@strike-everywhere/core";
import { cleanDecimal } from "../../parts";
import { pctText, priceText, qtyText, usdText } from "../markets";
import { marginForFraction, pnlForPrice, sizeDraft, type AppOrderType, type AutoMode, type Draft, type DraftCtx, type Unit } from "../order";
import type { Mkt, PerpsState } from "../state";
import { Icon, Slider, Spin, pref } from "../ui";

const SLIP_CONFIRM = 0.02;

export function OrderPanel({ s, m, book, side, setSide, limitPick }: { s: PerpsState; m: Mkt | undefined; book: BookView | null | undefined; side: Side; setSide: (v: Side) => void; limitPick: { p: number; n: number } | null }) {
  const sym = m?.symbol ?? "";
  const raw = m ? s.client.raw(sym) : undefined;
  const [type, setType] = useState<AppOrderType>("market");
  const [typeOpen, setTypeOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>("usd");
  const [amt, setAmt] = useState("");
  const [lev, setLev] = useState(() => Math.max(1, Number(pref("default-leverage")) || 3));
  const [limitStr, setLimitStr] = useState("");
  const [auto, setAuto] = useState(false);
  const [autoMode, setAutoMode] = useState<AutoMode>("price");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [armed, setArmed] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => (setLimitStr(""), setTp(""), setSl(""), setArmed("")), [sym]);
  useEffect(() => {
    if (!limitPick || !m) return;
    setType("limit");
    setLimitStr(roundToStep(limitPick.p, m.spec.tickSize));
  }, [limitPick?.n]);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(""), 15_000);
    return () => clearTimeout(t);
  }, [armed]);

  const ctx: DraftCtx = {
    spec: m?.spec,
    mark: m?.mark ?? 0,
    available: s.available,
    takerRate: s.takerRate,
    feeBps: s.client.orderFeeBps,
    maxLeverage: s.config.maxLeverage,
    limitBound: Number(raw?.order_limit_price_bound) || 0.05,
  };
  const draft: Draft = { symbol: sym, side, type, amount: Number(amt) || 0, unit, leverage: lev, limitPrice: Number(limitStr) || 0, tp: auto ? Number(tp) || 0 : 0, sl: auto ? Number(sl) || 0 : 0, autoMode };
  const z = sizeDraft(draft, ctx);
  const base = m?.base ?? "";
  const tick = m?.spec.tickSize;
  const levMax = m ? Math.max(1, Math.min(s.config.maxLeverage, m.spec.maxLeverage)) : 1;
  const fraction = z.maxMargin > 0 ? Math.min(100, (z.margin / z.maxMargin) * 100) : 0;
  const marketBound = Number(raw?.order_market_price_bound) || ctx.limitBound;
  const fill = type === "market" && book && z.size > 0 ? estimateMarketFill(book, side, z.size, { mark: ctx.mark, bound: marketBound }) : null;
  const bookDown = type === "market" && z.size > 0 && book === null;
  const emptySide = type === "market" && z.size > 0 && !!book && !(side === "buy" ? book.asks.length : book.bids.length);
  const slipHigh = (!!fill && (fill.slippage > SLIP_CONFIRM || !fill.complete || fill.beyondBand)) || bookDown || emptySide;
  const slipKey = `k|${sym}|${side}|${z.size}|${fill ? (fill.complete ? Math.ceil(fill.slippage * 200) : "p") : bookDown ? "n" : "e"}`;

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

  const submit = async () => {
    if (!m || !z.ok) return;
    if (slipHigh && armed !== slipKey) return setArmed(slipKey);
    setPlacing(true);
    setArmed("");
    const r = await s.placeDraft(draft, z, base);
    setPlacing(false);
    if (r !== "failed") (setAmt(""), setTp(""), setSl(""));
  };

  const cta = (() => {
    if (!s.session)
      return (
        <button class="pd-cta" onClick={() => s.setSheet("connect")}>
          Connect wallet
        </button>
      );
    if (s.accountLoaded && s.available <= 0)
      return (
        <button class="pd-cta" onClick={() => s.openFunds("deposit")}>
          Deposit to trade
        </button>
      );
    if (z.ok && slipHigh && armed === slipKey && !placing)
      return (
        <button class="pd-cta caution" onClick={submit}>
          {bookDown ? "Confirm: slippage unknown" : fill && !fill.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((fill?.slippage ?? 0) * 100).toFixed(2)}%`}
        </button>
      );
    return (
      <button class={`pd-cta ${side === "buy" ? "long" : "short"}`} disabled={!z.ok || placing} onClick={submit}>
        {placing ? <Spin size={16} /> : z.kind === "empty" || z.kind === "load" ? `${side === "buy" ? "Long" : "Short"} ${base}` : z.problem ?? `${side === "buy" ? "Long" : "Short"} ${base}${type === "limit" ? ` @ ${priceText(z.px, tick)}` : ""}`}
      </button>
    );
  })();

  const tpPrice = auto ? z.tpPrice : 0;
  const slPrice = auto ? z.slPrice : 0;

  return (
    <div class="pd-panel pd-order">
      <div class="pd-tabs ls">
        <button class={side === "buy" ? "on long" : ""} onClick={() => setSide("buy")}>
          Long
        </button>
        <button class={side === "sell" ? "on short" : ""} onClick={() => setSide("sell")}>
          Short
        </button>
      </div>
      <div class="pd-form">
        <div class="pd-kv">
          <span>Available to Trade</span>
          <span class="num">{usdText(s.session ? s.available : 0)}</span>
        </div>
        <div class="pd-kv">
          <span>Order Type</span>
          <span class="pd-dd">
            <button onClick={() => setTypeOpen(!typeOpen)} aria-haspopup="listbox" aria-expanded={typeOpen}>
              {type === "market" ? "Market" : "Limit"} <Icon n="down" size={14} />
            </button>
            {typeOpen && (
              <span class="pd-menu" role="listbox">
                {(["market", "limit"] as const).map((t) => (
                  <button key={t} role="option" aria-selected={type === t} class={type === t ? "on" : ""} onClick={() => (setType(t), setTypeOpen(false))}>
                    <b>{t === "market" ? "Market" : "Limit"}</b>
                    <span>{t === "market" ? "Fill now at the best price" : "Fill at your price or better"}</span>
                  </button>
                ))}
              </span>
            )}
          </span>
        </div>
        {type === "limit" && (
          <label class="pd-input">
            <span class="pre">Price</span>
            <input inputMode="decimal" placeholder={m ? priceText(m.mark, tick).slice(1).replace(/,/g, "") : "0"} value={limitStr} onInput={(e) => setLimitStr(cleanDecimal(e))} aria-label="Limit price" />
            <button class="suf" onClick={() => m && setLimitStr(roundToStep(m.mark, tick ?? 0.0001))}>
              Mark
            </button>
          </label>
        )}
        <label class="pd-input big">
          {unit === "usd" && <span class="pre">$</span>}
          <input inputMode="decimal" placeholder="0" value={amt} onInput={(e) => setAmt(cleanDecimal(e))} aria-label={unit === "usd" ? "Margin in USD" : `Size in ${base}`} />
          <button class="suf unit" onClick={switchUnit} title="Switch between margin in USD and size in the coin">
            {unit === "usd" ? "USD" : base} <Icon n="swap" size={14} />
          </button>
        </label>
        <div class="pd-sl">
          <Slider min={0} max={100} value={Math.round(fraction)} onChange={setFraction} label="Share of available balance" marks={[0, 25, 50, 75, 100]} />
          <label class="pd-box">
            <input inputMode="decimal" value={fraction ? Math.round(fraction) : ""} placeholder="0" aria-label="Percent of available balance" onInput={(e) => setFraction(Math.min(100, Number(cleanDecimal(e)) || 0))} />
            <span>%</span>
          </label>
        </div>
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
        <div class="pd-kv muted">
          <span>Liquidation Price Est.</span>
          <span class="num">{z.size > 0 ? `${priceText(z.liq, tick)} (${movePct(z.px, z.liq)})` : "N/A"}</span>
        </div>
        <div class="pd-kv muted">
          <span>Order Value</span>
          <span class="num">{z.size > 0 ? `${usdText(z.notional)} · ${qtyText(z.size)} ${base}` : "N/A"}</span>
        </div>
        <div class="pd-kv muted">
          <span>Margin Required</span>
          <span class="num">{z.size > 0 ? usdText(z.margin) : "N/A"}</span>
        </div>
        <div class="pd-kv muted">
          <span title={`Strike ${(s.takerRate * 100).toFixed(3)}% + builder ${(s.client.orderFeeBps / 100).toFixed(2)}%`}>Fees</span>
          <span class="num">{z.size > 0 ? usdText(z.fee, { decimals: z.fee < 0.1 ? 4 : 2 }) : `${(z.feeRate * 100).toFixed(3)}%`}</span>
        </div>
        {fill && fill.complete && !fill.beyondBand && (
          <div class="pd-kv muted">
            <span>Est. Fill · Slippage</span>
            <span class={`num ${fill.slippage > 0.005 ? "neg" : ""}`}>
              {priceText(fill.avgPrice, tick)} · {(fill.slippage * 100).toFixed(2)}%
            </span>
          </div>
        )}
        <div class="pd-kv">
          <span>Auto Close</span>
          <button class={`pd-switch${auto ? " on" : ""}`} role="switch" aria-checked={auto} aria-label="Auto close (take profit / stop loss)" onClick={() => setAuto(!auto)}>
            <span />
          </button>
        </div>
        {auto && (
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
        {z.ok && z.liqDistance > 0 && z.liqDistance < 0.1 && <div class="pd-warn">High risk: liquidation is only {(z.liqDistance * 100).toFixed(1)}% away.</div>}
        {cta}
      </div>
    </div>
  );
}

export function AccountCard({ s }: { s: PerpsState }) {
  const mm = Number(s.account?.maintenance_margin) || 0;
  const ratio = s.equity > 0 ? mm / s.equity : 0;
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
          <span class="muted" title="Maintenance margin ÷ equity. Strike liquidates at 100%.">
            Margin Ratio
          </span>
          <b class={`num ${ratio >= 0.7 ? "neg" : ""}`}>{(ratio * 100).toFixed(1)}%</b>
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
