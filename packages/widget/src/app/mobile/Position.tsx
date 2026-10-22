import { useState } from "preact/hooks";
import { positionMargin } from "@strike-everywhere/core";
import { priceText, qtyText, usdText, pctText } from "../markets";
import { CloseSheet, MarginSheet, ReverseSheet, TpSlSheet, TrailSheet, exitOrders } from "../PositionTools";
import type { PerpsState } from "../state";
import { Coin, Group, Icon, RoundBtn, Row } from "../ui";
import type { Nav } from "./Mobile";

type Tool = null | "close" | "tpsl" | "trail" | "margin" | "reverse";

export function PositionScreen({ s, nav, id, onLearn }: { s: PerpsState; nav: Nav; id: number; onLearn: (t: string) => void }) {
  const p = s.positions.find((x) => x.id === id);
  const [tool, setTool] = useState<Tool>(null);

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
  const margin = positionMargin(p);
  const roe = margin > 0 ? (upnl / margin) * 100 : 0;
  const liq = Number(p.liquidation_price);
  const exits = exitOrders(s, p.symbol);
  const funding = Number(p.accumulated_funding_fees);
  const isolated = p.margin_mode === "isolated";

  return (
    <div class="pa-screen">
      <div class="pa-top">
        <RoundBtn n="back" label="Back" onClick={nav.back} />
        <div class="pa-title two">
          <b>
            {base} {long ? "Long" : "Short"}
          </b>
          <span>
            {p.leverage}x · {isolated ? "Isolated" : "Cross"} margin
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
        <div class="pa-tools">
          <button onClick={() => setTool("tpsl")}>
            <Icon n="shield" size={18} />
            TP / SL
          </button>
          <button onClick={() => setTool("trail")}>
            <Icon n="line" size={18} />
            Trailing
          </button>
          {isolated && (
            <button onClick={() => setTool("margin")}>
              <Icon n="plus" size={18} />
              Margin
            </button>
          )}
          <button onClick={() => setTool("reverse")}>
            <Icon n="swap" size={18} />
            Reverse
          </button>
        </div>
        <Group>
          <Row k="Size" v={<span class="num">{`${qtyText(Math.abs(size))} ${base}`}</span>} vsub={<span class="num">{usdText(value)}</span>} />
          <Row k="Entry price" v={<span class="num">{priceText(entry, tick)}</span>} />
          <Row k="Mark price" info={() => onLearn("mark")} v={<span class="num">{priceText(mark, tick)}</span>} />
          <Row k="Liquidation price" info={() => onLearn("leverage")} v={<span class="num">{liq > 0 ? priceText(liq, tick) : "—"}</span>} vsub={liq > 0 && mark > 0 ? <span class="num">{`${((Math.abs(liq - mark) / mark) * 100).toFixed(1)}% away`}</span> : undefined} />
          <Row k="Margin" v={<span class="num">{usdText(margin)}</span>} />
          {Number.isFinite(funding) && funding !== 0 && <Row k="Funding fees" info={() => onLearn("funding")} v={<span class="num">{usdText(funding, { decimals: 4 })}</span>} vsub="as Strike reports" />}
        </Group>

        {exits.length > 0 && (
          <>
            <h2 class="pa-h2">Exit orders</h2>
            <Group>
              {exits.map((o) => (
                <div class="pa-row" key={o.id}>
                  <span class="l">
                    <span class="k">{/take_profit/.test(String(o.type)) ? "Take profit" : /trailing/.test(String(o.type)) ? "Trailing stop" : /stop/.test(String(o.type)) ? "Stop loss" : "Limit close"}</span>
                    <span class="s num">
                      {qtyText(Number(o.size))} {base} at {priceText(Number(o.stop_price) || Number(o.price), tick)}
                    </span>
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
        <button class="pa-btn primary" onClick={() => setTool("close")}>
          Close
        </button>
      </div>

      {tool === "close" && <CloseSheet s={s} p={p} onClose={() => setTool(null)} onClosed={nav.back} />}
      {tool === "tpsl" && <TpSlSheet s={s} p={p} onClose={() => setTool(null)} />}
      {tool === "trail" && <TrailSheet s={s} p={p} onClose={() => setTool(null)} />}
      {tool === "margin" && <MarginSheet s={s} p={p} onClose={() => setTool(null)} />}
      {tool === "reverse" && <ReverseSheet s={s} p={p} onClose={() => setTool(null)} />}
    </div>
  );
}
