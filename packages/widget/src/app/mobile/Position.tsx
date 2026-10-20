import { useState } from "preact/hooks";
import { priceText, qtyText, usdText, pctText } from "../markets";
import type { PerpsState } from "../state";
import { Coin, Group, Icon, RoundBtn, Row, Sheet, Spin } from "../ui";
import type { Nav } from "./Mobile";

export function PositionScreen({ s, nav, id, onLearn }: { s: PerpsState; nav: Nav; id: number; onLearn: (t: string) => void }) {
  const p = s.positions.find((x) => x.id === id);
  const [closing, setClosing] = useState(false);
  const [frac, setFrac] = useState(1);
  const [busy, setBusy] = useState(false);

  if (!p) {
    return (
      <div class="pa-screen">
        <div class="pa-top">
          <RoundBtn n="back" label="Back" onClick={nav.back} />
          <div class="pa-title">Position</div>
        </div>
        <div class="pa-empty">This position is closed.</div>
      </div>
    );
  }
  const m = s.bySymbol[p.symbol];
  const base = p.symbol.split("-")[0];
  const size = Number(p.size);
  const long = size > 0;
  const mark = m?.mark || Number(p.entry_price);
  const tick = m?.spec.tickSize;
  const value = Math.abs(size) * mark;
  const entry = Number(p.entry_price);
  const upnl = Number(p.upnl);
  const margin = (Math.abs(size) * entry) / Math.max(1, Number(p.leverage) || 1);
  const roe = margin > 0 ? (upnl / margin) * 100 : 0;
  const liq = Number(p.liquidation_price);
  const exits = s.orders.filter((o) => o.symbol === p.symbol && o.reduce_only);
  const funding = Number(p.accumulated_funding_fees);

  const close = async () => {
    setBusy(true);
    const ok = await s.closePosition(p, frac);
    setBusy(false);
    if (ok) {
      setClosing(false);
      if (frac >= 1) nav.back();
    }
  };

  return (
    <div class="pa-screen">
      <div class="pa-top">
        <RoundBtn n="back" label="Back" onClick={nav.back} />
        <div class="pa-title two">
          <b>
            {base} {long ? "Long" : "Short"}
          </b>
          <span>
            {p.leverage}x · {p.margin_mode === "isolated" ? "Isolated" : "Cross"} margin
          </span>
        </div>
      </div>
      <div class="pa-scroll">
        <div class="pa-coinhead">
          <Coin base={base} size={30} />
          <span class="nm">{m?.name ?? base}</span>
        </div>
        <div class={`pa-price num ${upnl >= 0 ? "pos" : "neg"}`}>{usdText(upnl, { sign: true })}</div>
        <div class={`pa-chg num ${roe >= 0 ? "pos" : "neg"}`}>
          {pctText(roe)} <span class="muted">return on margin</span>
        </div>
        <Group>
          <Row k="Size" v={<span class="num">{`${qtyText(Math.abs(size))} ${base}`}</span>} vsub={<span class="num">{usdText(value)}</span>} />
          <Row k="Entry price" v={<span class="num">{priceText(entry, tick)}</span>} />
          <Row k="Mark price" info={() => onLearn("mark")} v={<span class="num">{priceText(mark, tick)}</span>} />
          <Row k="Liquidation price" info={() => onLearn("leverage")} v={<span class="num">{liq > 0 ? priceText(liq, tick) : "—"}</span>} vsub={liq > 0 && mark > 0 ? <span class="num">{`${((Math.abs(liq - mark) / mark) * 100).toFixed(1)}% away`}</span> : undefined} />
          <Row k="Margin" v={<span class="num">{usdText(margin)}</span>} />
          {Number.isFinite(funding) && funding !== 0 && <Row k="Funding so far" info={() => onLearn("funding")} v={<span class={`num ${funding > 0 ? "pos" : "neg"}`}>{usdText(funding, { sign: true, decimals: 4 })}</span>} />}
        </Group>

        {exits.length > 0 && (
          <>
            <h2 class="pa-h2">Auto Close</h2>
            <Group>
              {exits.map((o) => (
                <div class="pa-row" key={o.id}>
                  <span class="l">
                    <span class="k">{/take_profit/.test(String(o.type)) ? "Take profit" : /stop/.test(String(o.type)) ? "Stop loss" : "Closing order"}</span>
                    <span class="s num">at {priceText(Number(o.stop_price) || Number(o.price), tick)}</span>
                  </span>
                  <button class="pa-btn dark xs" onClick={() => s.cancelOrder(o)}>
                    Remove
                  </button>
                </div>
              ))}
            </Group>
          </>
        )}
        <div class="pa-bottom-pad" />
      </div>
      <div class="pa-dock">
        <button class="pa-btn dark" onClick={() => nav.push({ k: "trade", sym: p.symbol, side: long ? "buy" : "sell" })}>
          Add more
        </button>
        <button class="pa-btn primary" onClick={() => (setFrac(1), setClosing(true))}>
          Close
        </button>
      </div>

      {closing && (
        <Sheet title="Close position" onClose={() => !busy && setClosing(false)}>
          <div class="pa-pcts four">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <button key={f} class={`pa-btn dark${frac === f ? " on" : ""}`} onClick={() => setFrac(f)}>
                {f * 100}%
              </button>
            ))}
          </div>
          <Group>
            <Row k="You close" v={<span class="num">{`${qtyText(Math.abs(size) * frac)} ${base}`}</span>} vsub={<span class="num">{`≈ ${usdText(value * frac)}`}</span>} />
            <Row k="Estimated P&L" v={<span class={`num ${upnl >= 0 ? "pos" : "neg"}`}>{usdText(upnl * frac, { sign: true })}</span>} />
            {frac < 1 && <Row k="Stays open" v={<span class="num">{`${qtyText(Math.abs(size) * (1 - frac))} ${base}`}</span>} />}
          </Group>
          <p class="pa-p sm">Closes at the market price. Strike cancels the close if there are no {long ? "buyers" : "sellers"} close enough to the market price; your position then stays open.</p>
          <button class="pa-btn primary big" disabled={busy} onClick={close}>
            {busy ? <Spin size={18} /> : frac >= 1 ? "Close position" : `Close ${frac * 100}%`}
          </button>
        </Sheet>
      )}
    </div>
  );
}
