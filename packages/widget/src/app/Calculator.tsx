import { useState } from "preact/hooks";
import { estimateLiquidationPrice, maxLeverageFor, type Side } from "@strike-everywhere/core";
import { priceText, qtyText, usdText } from "./markets";
import type { Mkt } from "./state";
import { Icon, Slider } from "./ui";


type Tab = "pnl" | "liq" | "target";
const clean = (v: string) => v.replace(/,/g, ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
const plain = (v: number, tick?: number) => (Number.isFinite(v) && v > 0 ? priceText(v, tick).replace(/[$,]/g, "") : "");

export function Calculator({ m }: { m: Mkt }) {
  const tick = m.spec.tickSize;
  const [tab, setTab] = useState<Tab>("pnl");
  const [side, setSide] = useState<Side>("buy");
  const [lev, setLev] = useState(Math.max(1, Math.min(m.maxLev, m.spec.defaultLeverage || 10)));
  const [entry, setEntry] = useState(plain(m.mark, tick));
  const [exit, setExit] = useState("");
  const [amount, setAmount] = useState("");
  const [usd, setUsd] = useState(true);
  const [roi, setRoi] = useState("");

  const e = Number(entry);
  const a = Number(amount);
  const notional = e > 0 && a > 0 ? (usd ? a : a * e) : 0;
  const size = notional > 0 ? notional / e : 0;
  const margin = notional > 0 ? notional / lev : 0;
  const dir = side === "buy" ? 1 : -1;
  const x = Number(exit);
  const pnl = size > 0 && x > 0 ? size * (x - e) * dir : NaN;
  const pnlPct = margin > 0 && Number.isFinite(pnl) ? (pnl / margin) * 100 : NaN;
  const liq = notional > 0 ? estimateLiquidationPrice({ side, entry: e, leverage: lev, notional, tiers: m.spec.marginTiers }) : NaN;
  const r = Number(roi);
  const target = e > 0 && roi !== "" && Number.isFinite(r) ? e * (1 + (dir * r) / 100 / lev) : NaN;
  const tierMax = notional > 0 ? Number(maxLeverageFor(m.spec.marginTiers, notional)) : m.maxLev;
  const levStep = (d: number) => setLev((v) => Math.max(1, Math.min(m.maxLev, v + d)));

  const row = (k: string, v: string, cls = "") => (
    <div class="calc-r">
      <span>{k}</span>
      <b class={`num ${cls}`}>{v}</b>
    </div>
  );

  return (
    <div class="calc">
      <div class="pd-tabs left calc-tabs" role="tablist">
        {(
          [
            ["pnl", "PnL"],
            ["liq", "Liquidation Price"],
            ["target", "Target Price"],
          ] as const
        ).map(([t, label]) => (
          <button key={t} role="tab" aria-selected={tab === t} class={tab === t ? "on" : ""} onClick={() => setTab(t)}>
            {label}
          </button>
        ))}
      </div>
      <div class="calc-body">
        <div class="calc-in">
          <div class="pd-seg2" role="radiogroup" aria-label="Side">
            <button role="radio" aria-checked={side === "buy"} class={side === "buy" ? "on long" : ""} onClick={() => setSide("buy")}>
              Long/Buy
            </button>
            <button role="radio" aria-checked={side === "sell"} class={side === "sell" ? "on short" : ""} onClick={() => setSide("sell")}>
              Short/Sell
            </button>
          </div>
          <span class="calc-l">Leverage</span>
          <div class="calc-lev">
            <button aria-label="Less leverage" onClick={() => levStep(-1)}>
              <Icon n="minus" size={16} />
            </button>
            <b class="num">{lev}x</b>
            <button aria-label="More leverage" onClick={() => levStep(1)}>
              <Icon n="plus" size={16} />
            </button>
          </div>
          <Slider min={1} max={m.maxLev} value={lev} onChange={setLev} label="Leverage" marks={[1, Math.round(m.maxLev / 4), Math.round(m.maxLev / 2), Math.round((m.maxLev * 3) / 4), m.maxLev].filter((v, i, arr) => v >= 1 && arr.indexOf(v) === i)} />
          <div class="calc-ends">
            <span>1x</span>
            <span>{m.maxLev}x</span>
          </div>
          <span class="calc-l">Entry Price</span>
          <label class="pd-input">
            <input inputMode="decimal" value={entry} onInput={(ev) => setEntry(clean((ev.target as HTMLInputElement).value))} aria-label="Entry price" />
            <span class="suf">USD</span>
          </label>
          {tab === "pnl" && (
            <>
              <span class="calc-l">Exit Price</span>
              <label class="pd-input">
                <input inputMode="decimal" placeholder="0" value={exit} onInput={(ev) => setExit(clean((ev.target as HTMLInputElement).value))} aria-label="Exit price" />
                <span class="suf">USD</span>
              </label>
            </>
          )}
          {tab !== "target" ? (
            <>
              <span class="calc-l">Amount</span>
              <label class="pd-input">
                <input inputMode="decimal" placeholder="0" value={amount} onInput={(ev) => setAmount(clean((ev.target as HTMLInputElement).value))} aria-label={`Amount in ${usd ? "USD" : m.base}`} />
                <button class="suf unit" onClick={(ev) => (ev.preventDefault(), setUsd(!usd), setAmount(""))} aria-label="Switch unit">
                  {usd ? "USD" : m.base} <Icon n="swap" size={12} />
                </button>
              </label>
            </>
          ) : (
            <>
              <span class="calc-l">ROI</span>
              <label class="pd-input">
                <input inputMode="decimal" placeholder="0" value={roi} onInput={(ev) => setRoi((ev.target as HTMLInputElement).value.replace(/[^0-9.\-]/g, ""))} aria-label="Return on margin, percent" />
                <span class="suf">%</span>
              </label>
            </>
          )}
        </div>
        <div class="calc-out">
          <b class="calc-h">Results</b>
          {tab === "pnl" && (
            <>
              {row("Margin", margin > 0 ? usdText(margin) : "—")}
              {row("Est. PnL", Number.isFinite(pnl) ? usdText(pnl, { sign: true }) : "—", Number.isFinite(pnl) ? (pnl >= 0 ? "pos" : "neg") : "")}
              {row("PnL%", Number.isFinite(pnlPct) ? `${pnlPct > 0 ? "+" : ""}${pnlPct.toFixed(2)}%` : "—", Number.isFinite(pnlPct) ? (pnlPct >= 0 ? "pos" : "neg") : "")}
              {row("Size", size > 0 ? `${qtyText(size)} ${m.base}` : "—")}
            </>
          )}
          {tab === "liq" && (
            <>
              {row("Est. Liquidation Price", Number.isFinite(liq) && liq > 0 ? priceText(liq, tick) : "—")}
              {row("Margin", margin > 0 ? usdText(margin) : "—")}
              {row("Size", size > 0 ? `${qtyText(size)} ${m.base}` : "—")}
            </>
          )}
          {tab === "target" && row("Target Price", Number.isFinite(target) && target > 0 ? priceText(target, tick) : "—")}
          {notional > 0 && lev > tierMax && tab !== "target" && <p class="calc-warn">Strike allows up to {tierMax}x for a position this size.</p>}
          <p class="calc-note">{tab === "liq" ? "Estimate for an isolated position. With cross margin your whole balance backs it, so liquidation is usually further away." : "Estimate before fees and funding."}</p>
        </div>
      </div>
    </div>
  );
}
