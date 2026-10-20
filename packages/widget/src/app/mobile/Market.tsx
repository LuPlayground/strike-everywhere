import { useEffect, useState } from "preact/hooks";
import { fundingWords } from "@strike-everywhere/core";
import { Chart } from "../../Chart";
import { LineChart, RANGES, type Hover, type Range } from "../LineChart";
import { compactUsd, countdown, pctText, priceText, qtyText, timeText, usdText } from "../markets";
import type { PerpsState } from "../state";
import { Coin, Group, Icon, RoundBtn, Row } from "../ui";
import type { Nav } from "./Mobile";

const CANDLE_IV: Record<Range, string> = { LIVE: "1m", "1D": "15m", "1W": "1h", "1M": "4h", "1Y": "1d", ALL: "1w" };

export function Market({ s, nav, sym, onLearn }: { s: PerpsState; nav: Nav; sym: string; onLearn: (t: string) => void }) {
  const m = s.bySymbol[sym];
  const [range, setRange] = useState<Range>("1D");
  const [hover, setHover] = useState<Hover | null>(null);
  const [first, setFirst] = useState(0);
  const [candles, setCandles] = useState(false);
  const [oi, setOi] = useState<number | null>(null);
  const [, tick] = useState(0);
  useEffect(() => {
    let alive = true;
    const load = () => s.client.market.openInterest(sym).then((v) => alive && setOi(v)).catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    const c = setInterval(() => tick((n) => n + 1), 1000);
    return () => {
      alive = false;
      clearInterval(t);
      clearInterval(c);
    };
  }, [sym]);

  if (!m) {
    return (
      <div class="pa-screen">
        <div class="pa-top">
          <RoundBtn n="back" label="Back" onClick={nav.back} />
        </div>
        <div class="pa-empty">{s.markets.length ? `${sym} isn't listed on this network.` : "Loading…"}</div>
      </div>
    );
  }

  const tick_ = m.spec.tickSize;
  const ref = range === "1D" && m.ref24 > 0 ? m.ref24 : first;
  const shown = hover?.price ?? m.mark;
  const chg = hover ? hover.change : ref > 0 ? ((m.mark - ref) / ref) * 100 : 0;
  const chgAbs = hover ? (first > 0 ? hover.price - first : 0) : ref > 0 ? m.mark - ref : 0;
  const pos = s.positions.find((p) => p.symbol === sym);
  const mine = s.orders.filter((o) => o.symbol === sym);

  return (
    <div class="pa-screen">
      <div class="pa-top">
        <RoundBtn n="back" label="Back" onClick={nav.back} />
        <span class="sp" />
        {s.testnet && <span class="pa-chip-test">Testnet</span>}
      </div>
      <div class="pa-scroll">
        <div class="pa-coinhead">
          <Coin base={m.base} size={30} />
          <span class="nm">{m.name}</span>
          <span class="pa-lev">{m.maxLev}x</span>
        </div>
        <div class="pa-price num">{priceText(shown, tick_)}</div>
        <div class={`pa-chg num ${chg >= 0 ? "pos" : "neg"}`}>
          {usdText(chgAbs, { sign: true, decimals: Math.abs(chgAbs) < 1 ? 4 : 2 })} ({pctText(chg)}){" "}
          <span class="muted">{hover ? timeText(hover.time) : range === "LIVE" ? "Past 2h" : range === "1D" ? "Past day" : range === "1W" ? "Past week" : range === "1M" ? "Past month" : range === "1Y" ? "Past year" : "All time"}</span>
        </div>

        {candles ? (
          <div class="pa-candles">
            <Chart client={s.client} symbol={sym} interval={CANDLE_IV[range] as any} tick={tick_} live={{ mark: m.mark, last: m.last, index: m.index }} />
          </div>
        ) : (
          <LineChart client={s.client} symbol={sym} range={range} live={m.mark} onHover={setHover} onFirst={setFirst} />
        )}
        <div class="pa-ranges" role="radiogroup" aria-label="Chart range">
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <button key={r} role="radio" aria-checked={range === r} class={range === r ? "on" : ""} onClick={() => setRange(r)}>
              {r === "LIVE" ? <><span class="pa-livedot" />LIVE</> : r}
            </button>
          ))}
          <button class="ic" aria-label={candles ? "Line chart" : "Candle chart"} onClick={() => setCandles(!candles)}>
            <Icon n={candles ? "line" : "candles"} size={18} />
          </button>
        </div>

        {pos && (
          <>
            <h2 class="pa-h2">Your Position</h2>
            <Group>
              <button class="pa-pos" onClick={() => nav.push({ k: "position", id: pos.id })}>
                <Coin base={m.base} size={36} />
                <span class="l">
                  <b>
                    {m.base} <span class={Number(pos.size) > 0 ? "pos" : "neg"}>{Number(pos.size) > 0 ? "Long" : "Short"}</span> <span class="pa-lev">{pos.leverage}x</span>
                  </b>
                  <span class="s num">
                    {qtyText(Math.abs(Number(pos.size)))} {m.base}
                  </span>
                </span>
                <span class="r num">
                  <b>{usdText(Math.abs(Number(pos.size)) * m.mark)}</b>
                  <span class={Number(pos.upnl) >= 0 ? "pos" : "neg"}>{usdText(Number(pos.upnl), { sign: true })}</span>
                </span>
                <Icon n="right" size={18} cls="chev" />
              </button>
            </Group>
          </>
        )}

        {mine.length > 0 && (
          <>
            <h2 class="pa-h2">Open Orders</h2>
            <Group>
              {mine.map((o) => (
                <div class="pa-row" key={o.id}>
                  <span class="l">
                    <span class="k">
                      <span class={o.side === "buy" ? "pos" : "neg"}>{o.side === "buy" ? "Buy" : "Sell"}</span> {String(o.type).replace(/_/g, " ")}
                      {o.reduce_only ? " · closes" : ""}
                    </span>
                    <span class="s num">
                      {qtyText(Number(o.size))} {m.base} @ {priceText(Number(o.price) || Number(o.stop_price), tick_)}
                    </span>
                  </span>
                  <button class="pa-btn dark xs" onClick={() => s.cancelOrder(o)}>
                    Cancel
                  </button>
                </div>
              ))}
            </Group>
          </>
        )}

        <h2 class="pa-h2">Stats</h2>
        <Group>
          <Row k="Mark price" info={() => onLearn("mark")} v={<span class="num">{priceText(m.mark, tick_)}</span>} />
          <Row k="Index price" info={() => onLearn("index")} v={<span class="num">{priceText(m.index, tick_)}</span>} />
          <Row k="24h volume" v={<span class="num">{compactUsd(m.vol24)}</span>} />
          <Row k="Open interest" v={<span class="num">{oi === null ? "—" : compactUsd(oi * m.mark)}</span>} />
          <Row
            k="Funding"
            info={() => onLearn("funding")}
            v={<span class={`num ${m.funding > 0 ? "neg" : m.funding < 0 ? "pos" : ""}`}>{fundingWords(m.funding)}</span>}
            vsub={m.nextFunding > Date.now() ? <span class="num">{`next in ${countdown(m.nextFunding)}`}</span> : undefined}
          />
          <Row k="Max leverage" v={`${m.maxLev}x`} />
          <Row k="Minimum order" v={<span class="num">{usdText(m.spec.minNotional, { decimals: 0 })}</span>} />
        </Group>
        <div class="pa-bottom-pad" />
      </div>
      <div class="pa-dock">
        <button class="pa-btn long" onClick={() => nav.push({ k: "trade", sym, side: "buy" })}>
          Long
        </button>
        <button class="pa-btn short" onClick={() => nav.push({ k: "trade", sym, side: "sell" })}>
          Short
        </button>
      </div>
    </div>
  );
}
