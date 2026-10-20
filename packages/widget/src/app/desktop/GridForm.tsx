import { useEffect, useState } from "preact/hooks";
import { gridProblem, roundToStep, type GridInput } from "@strike-everywhere/core";
import { cleanDecimal } from "../../parts";
import { priceText, usdText } from "../markets";
import type { Mkt, PerpsState } from "../state";
import { Icon, Slider, Spin } from "../ui";

export function GridForm({ s, m, onBack }: { s: PerpsState; m: Mkt | undefined; onBack: () => void }) {
  const [gmode, setGmode] = useState<GridInput["mode"]>("NEUTRAL");
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");
  const [grids, setGrids] = useState("10");
  const [collateral, setCollateral] = useState("");
  const [lev, setLev] = useState(2);
  const [sl, setSl] = useState("");
  const [longSl, setLongSl] = useState("");
  const [shortSl, setShortSl] = useState("");
  const [busy, setBusy] = useState(false);
  const tick = m?.spec.tickSize ?? 0.0001;

  useEffect(() => {
    if (!m?.mark) return;
    setLower(roundToStep(m.mark * 0.95, tick));
    setUpper(roundToStep(m.mark * 1.05, tick));
  }, [m?.symbol, !!m?.mark]);

  if (!m) return <div class="pd-center muted">Loading market…</div>;
  const levMax = Math.max(1, Math.min(s.config.maxLeverage, m.spec.maxLeverage));
  const g: GridInput = {
    symbol: m.symbol,
    mode: gmode,
    lower: Number(lower) || 0,
    upper: Number(upper) || 0,
    grids: Math.round(Number(grids) || 0),
    collateral: Number(collateral) || 0,
    sl: gmode !== "NEUTRAL" && Number(sl) > 0 ? Number(sl) : undefined,
    longSl: gmode === "NEUTRAL" && Number(longSl) > 0 ? Number(longSl) : undefined,
    shortSl: gmode === "NEUTRAL" && Number(shortSl) > 0 ? Number(shortSl) : undefined,
  };
  const perLevel = g.grids > 0 ? (g.collateral * lev) / g.grids : 0;
  const stepPct = g.grids > 1 && g.lower > 0 ? ((g.upper - g.lower) / (g.grids - 1) / g.lower) * 100 : 0;
  const problem =
    !s.session
      ? null
      : gridProblem(g, m.mark) ??
        (g.collateral > s.available ? "More than your available balance" : perLevel > 0 && perLevel < m.spec.minNotional ? `Each level needs at least ${usdText(m.spec.minNotional, { decimals: 0 })}: add collateral, leverage or fewer grids` : null);

  const start = async () => {
    if (problem) return;
    setBusy(true);
    s.notify("progress", `Starting a ${gmode.toLowerCase()} grid on ${m.base}`);
    try {
      const r = await s.client.startGrid({ ...g, leverage: lev });
      s.notify("ok", "Grid bot started", `Bot ${r.id.slice(0, 8)}… · ${g.grids} levels from ${priceText(g.lower, tick)} to ${priceText(g.upper, tick)}. Find it under Grid below.`);
      setCollateral("");
      s.refresh();
    } catch (e: any) {
      s.notify("err", "Grid not started", e?.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const field = (label: string, v: string, set: (x: string) => void, aria: string, suf?: string) => (
    <label class="pd-input">
      <span class="pre">{label}</span>
      <input inputMode="decimal" value={v} onInput={(e) => set(cleanDecimal(e))} aria-label={aria} />
      {suf && <span class="suf muted">{suf}</span>}
    </label>
  );

  return (
    <>
      <div class="pd-form">
        <div class="pd-kv">
          <button class="pd-link" onClick={onBack}>
            <Icon n="back" size={12} /> Order types
          </button>
          <b>Grid bot</b>
        </div>
        <div class="pd-tif wide" role="radiogroup" aria-label="Grid mode">
          {(["LONG", "NEUTRAL", "SHORT"] as const).map((x) => (
            <button key={x} role="radio" aria-checked={gmode === x} class={gmode === x ? "on" : ""} onClick={() => setGmode(x)}>
              {x === "LONG" ? "Long" : x === "SHORT" ? "Short" : "Neutral"}
            </button>
          ))}
        </div>
        <div class="pd-hint">
          {gmode === "LONG" ? "Places buy entries in the range and sells each one level higher." : gmode === "SHORT" ? "Places sell entries in the range and buys each back one level lower." : "Places both sides around the current price and trades the range."}
        </div>
        {field("Lower", lower, setLower, "Lower price")}
        {field("Upper", upper, setUpper, "Upper price")}
        {field("Grids", grids, setGrids, "Number of grid levels", "2–200")}
        {field("Collateral", collateral, setCollateral, "Collateral in USD", "USD")}
        <div class="pd-lbl">Leverage</div>
        <div class="pd-sl">
          <Slider min={1} max={levMax} value={Math.min(lev, levMax)} onChange={setLev} label="Grid leverage" marks={[1, levMax]} />
          <span class="pd-box static">{lev}x</span>
        </div>
        {gmode === "NEUTRAL" ? (
          <>
            {field("Long SL", longSl, setLongSl, "Long stop-loss (optional)")}
            {field("Short SL", shortSl, setShortSl, "Short stop-loss (optional)")}
          </>
        ) : (
          field("Stop loss", sl, setSl, "Stop-loss (optional)")
        )}
        <div class="pd-kv muted">
          <span>Per level</span>
          <span class="num">{perLevel > 0 ? usdText(perLevel) : "—"}</span>
        </div>
        <div class="pd-kv muted">
          <span>Grid step</span>
          <span class="num">{stepPct > 0 ? `${stepPct.toFixed(2)}%` : "—"}</span>
        </div>
        <div class="pd-kv muted">
          <span>Current price</span>
          <span class="num">{priceText(m.mark, tick)}</span>
        </div>
      </div>
      <div class="pd-order-foot">
        {problem && <div class="pd-warn">{problem}</div>}
        {!s.session ? (
          <button class="pd-cta" onClick={() => s.setSheet("connect")}>
            Connect wallet
          </button>
        ) : (
          <button class="pd-cta" disabled={!!problem || busy || !(g.collateral > 0)} onClick={start}>
            {busy ? <Spin size={16} /> : `Start ${gmode.toLowerCase()} grid`}
          </button>
        )}
      </div>
    </>
  );
}
