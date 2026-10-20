import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import type { BookView } from "@strike-everywhere/core";
import { pageHidden } from "../../parts";
import { countdown, priceText, qtyText, usdText } from "../markets";
import type { Mkt, PerpsState } from "../state";
import { Spin } from "../ui";


function useBox<T extends HTMLElement>(): [{ current: T | null }, number, number] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setSize([el.clientWidth, el.clientHeight]));
    ro.observe(el);
    setSize([el.clientWidth, el.clientHeight]);
    return () => ro.disconnect();
  }, []);
  return [ref, size[0], size[1]];
}

const pct = (v: number, d = 4) => {
  const s = Math.abs(v).toFixed(d);
  return `${v < 0 && Number(s) !== 0 ? "-" : ""}${s}%`;
};
const axisTicks = (lo: number, hi: number) => [lo, 0, hi].filter((v, i, a) => a.indexOf(v) === i && v >= lo && v <= hi);


type FRange = "24h" | "1w" | "1m";
const HOURS: Record<FRange, number> = { "24h": 24, "1w": 168, "1m": 720 };

export function FundingChart({ s, sym }: { s: PerpsState; sym: string }) {
  const [rows, setRows] = useState<Array<{ time: number; rate: number }> | null | undefined>(undefined);
  const [range, setRange] = useState<FRange>("1w");
  const [hover, setHover] = useState<number | null>(null);
  const [box, w, h] = useBox<HTMLDivElement>();

  useEffect(() => {
    let alive = true;
    setRows(undefined);
    const load = () =>
      s.client.market
        .fundingHistory(sym, 30)
        .then((r) => alive && setRows(r))
        .catch(() => alive && setRows((r) => r ?? null));
    load();
    const t = setInterval(() => !pageHidden() && load(), 10 * 60_000);
    return () => ((alive = false), clearInterval(t));
  }, [sym]);

  const data = (rows ?? []).slice(-HOURS[range]).map((r) => ({ time: r.time, v: r.rate * 100 }));
  let run = 0;
  const cum = data.map((d) => (run += d.v));
  const padL = 70;
  const padR = 66;
  const padT = 14;
  const padB = 26;
  const iw = Math.max(10, w - padL - padR);
  const ih = Math.max(10, h - padT - padB);
  const lo = Math.min(0, ...data.map((d) => d.v));
  const hi = Math.max(0, ...data.map((d) => d.v)) || 0.0001;
  const clo = Math.min(0, ...cum);
  const chi = Math.max(0, ...cum) || 0.0001;
  const y = (v: number) => padT + (1 - (v - lo) / (hi - lo || 1)) * ih;
  const yc = (v: number) => padT + (1 - (v - clo) / (chi - clo || 1)) * ih;
  const step = data.length ? iw / data.length : iw;
  const bw = Math.max(1, step * 0.7);
  const zero = y(0);
  const line = cum.map((c, i) => `${i ? "L" : "M"}${(padL + i * step + step / 2).toFixed(1)},${yc(c).toFixed(1)}`).join("");
  const ticks = axisTicks(lo, hi);
  const cticks = axisTicks(clo, chi);
  const dates = data.length ? [0, Math.floor(data.length / 2), data.length - 1] : [];
  const at = hover !== null && data[hover] ? hover : null;
  const dateLab = (ms: number) =>
    range === "24h" ? new Date(ms).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }) : new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div class="pd-tabbody">
      <div class="pd-fh">
        <b>Funding Rate History</b>
        <span class="muted">{at !== null ? `${new Date(data[at].time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })} · ${pct(data[at].v)} · total ${pct(cum[at], 3)}` : "Paid every hour. Positive: longs pay shorts."}</span>
        <span class="sp" />
        <span class="pd-ivs flat" role="radiogroup" aria-label="Range">
          {(["24h", "1w", "1m"] as const).map((r) => (
            <button key={r} role="radio" aria-checked={range === r} class={range === r ? "on" : ""} onClick={() => setRange(r)}>
              {r === "24h" ? "24H" : r === "1w" ? "1W" : "1M"}
            </button>
          ))}
        </span>
      </div>
      <div class="pd-svgbox" ref={box} onMouseLeave={() => setHover(null)}>
        {rows === undefined ? (
          <div class="pd-center">
            <Spin />
          </div>
        ) : rows === null ? (
          <div class="pd-center muted">Funding history is unavailable right now.</div>
        ) : !data.length ? (
          <div class="pd-center muted">{s.testnet ? "Strike testnet has no funding history yet." : "No funding history yet for this market."}</div>
        ) : (
          w > 0 && (
            <svg
              width={w}
              height={h}
              viewBox={`0 0 ${w} ${h}`}
              role="img"
              aria-label={`Hourly funding rates for ${sym}, ${range}`}
              onMouseMove={(e) => {
                const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
                const i = Math.floor((e.clientX - r.left - padL) / step);
                setHover(i >= 0 && i < data.length ? i : null);
              }}
            >
              {ticks.map((t) => (
                <g key={`l${t}`}>
                  <line x1={padL} x2={padL + iw} y1={y(t)} y2={y(t)} class="grid" />
                  <text x={padL - 8} y={y(t) + 4} text-anchor="end" class="ax">
                    {pct(t, 4)}
                  </text>
                </g>
              ))}
              {cticks.map((t) => (
                <text key={`r${t}`} x={padL + iw + 8} y={yc(t) + 4} class="ax">
                  {pct(t, 2)}
                </text>
              ))}
              <line x1={padL} x2={padL + iw} y1={zero} y2={zero} class="zero" />
              {data.map((d, i) => {
                const x = padL + i * step + (step - bw) / 2;
                const top = Math.min(y(d.v), zero);
                return <rect key={d.time} x={x} y={top} width={bw} height={Math.max(1, Math.abs(y(d.v) - zero))} class={d.v >= 0 ? "pos" : "neg"} opacity={at === null || at === i ? 1 : 0.45} />;
              })}
              <path d={line} class="cum" />
              {at !== null && <line x1={padL + at * step + step / 2} x2={padL + at * step + step / 2} y1={padT} y2={padT + ih} class="cross" />}
              {dates.map((i, k) => (
                <text key={i} x={padL + i * step + step / 2} y={h - 6} text-anchor={k === 0 ? "start" : k === 2 ? "end" : "middle"} class="ax">
                  {dateLab(data[i].time)}
                </text>
              ))}
            </svg>
          )
        )}
      </div>
      <div class="pd-legend">
        <span>
          <i class="sw pos" /> Funding rate (+)
        </span>
        <span>
          <i class="sw neg" /> Funding rate (−)
        </span>
        <span>
          <i class="sw line" /> Running total
        </span>
      </div>
    </div>
  );
}


export function DepthChart({ book, base, tick }: { book: BookView | null | undefined; base: string; tick?: number }) {
  const [box, w, h] = useBox<HTMLDivElement>();
  const [hx, setHx] = useState<number | null>(null);
  if (book === undefined)
    return (
      <div class="pd-tabbody">
        <div class="pd-center">
          <Spin />
        </div>
      </div>
    );
  if (book === null || (!book.bids.length && !book.asks.length))
    return (
      <div class="pd-tabbody">
        <div class="pd-center muted">The order book is unavailable right now.</div>
      </div>
    );
  const mid = Number.isFinite(book.mid) && book.mid > 0 ? book.mid : (book.bids[0]?.[0] ?? book.asks[0]?.[0] ?? 0);
  const span = 0.15;
  const bids = book.bids.filter(([p]) => p >= mid * (1 - span));
  const asks = book.asks.filter(([p]) => p <= mid * (1 + span));
  let cb = 0;
  const bc = bids.map(([p, q]) => [p, (cb += q)] as const);
  let ca = 0;
  const ac = asks.map(([p, q]) => [p, (ca += q)] as const);
  const lo = Math.min(bc.length ? bc[bc.length - 1][0] : mid, mid * 0.995);
  const hi = Math.max(ac.length ? ac[ac.length - 1][0] : mid, mid * 1.005);
  const half = Math.max(mid - lo, hi - mid);
  const xmin = mid - half;
  const xmax = mid + half;
  const ymax = Math.max(cb, ca) || 1;
  const padL = 62;
  const padR = 12;
  const padT = 12;
  const padB = 26;
  const iw = Math.max(10, w - padL - padR);
  const ih = Math.max(10, h - padT - padB);
  const x = (p: number) => padL + ((p - xmin) / (xmax - xmin || 1)) * iw;
  const y = (q: number) => padT + (1 - q / ymax) * ih;
  const stepPath = (pts: ReadonlyArray<readonly [number, number]>) => {
    let d = `M${x(mid).toFixed(1)},${y(0).toFixed(1)}`;
    let prev = 0;
    for (const [p, c] of pts) d += `L${x(p).toFixed(1)},${y(prev).toFixed(1)}L${x(p).toFixed(1)},${y(c).toFixed(1)}`, (prev = c);
    return d;
  };
  const bidLine = stepPath(bc);
  const askLine = stepPath(ac);
  const close = (pts: ReadonlyArray<readonly [number, number]>, line: string) => (pts.length ? `${line}L${x(pts[pts.length - 1][0]).toFixed(1)},${y(0).toFixed(1)}Z` : "");
  let read: { p: number; q: number; impact: number } | null = null;
  if (hx !== null) {
    const p = xmin + ((hx - padL) / iw) * (xmax - xmin);
    if (p >= mid) {
      const lv = ac.filter(([ap]) => ap <= p);
      read = { p, q: lv.length ? lv[lv.length - 1][1] : 0, impact: (p - mid) / mid };
    } else {
      const lv = bc.filter(([bp]) => bp >= p);
      read = { p, q: lv.length ? lv[lv.length - 1][1] : 0, impact: (mid - p) / mid };
    }
  }
  const xt = [xmin, (xmin + mid) / 2, mid, (mid + xmax) / 2, xmax];
  return (
    <div class="pd-tabbody">
      <div class="pd-fh">
        <b>Depth</b>
        <span class="muted">
          {read ? `Price ${priceText(read.p, tick)} · Impact ${(read.impact * 100).toFixed(2)}% · ${qtyText(read.q)} ${base} · ${usdText(read.q * read.p, { decimals: 0 })}` : `Mid ${priceText(mid, tick)} · buyers left, sellers right`}
        </span>
      </div>
      <div class="pd-svgbox" ref={box} onMouseLeave={() => setHx(null)}>
        {w > 0 && (
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            role="img"
            aria-label={`Order book depth around ${priceText(mid, tick)}`}
            onMouseMove={(e) => {
              const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
              const v = e.clientX - r.left;
              setHx(v >= padL && v <= padL + iw ? v : null);
            }}
          >
            {[0, 0.5, 1].map((f) => (
              <g key={f}>
                <line x1={padL} x2={padL + iw} y1={y(ymax * f)} y2={y(ymax * f)} class="grid" />
                <text x={padL - 8} y={y(ymax * f) + 4} text-anchor="end" class="ax">
                  {qtyText(ymax * f)}
                </text>
              </g>
            ))}
            <path d={close(bc, bidLine)} class="bidfill" />
            <path d={close(ac, askLine)} class="askfill" />
            <path d={bidLine} class="bidline" />
            <path d={askLine} class="askline" />
            <line x1={x(mid)} x2={x(mid)} y1={padT} y2={padT + ih} class="cross" />
            {hx !== null && <line x1={hx} x2={hx} y1={padT} y2={padT + ih} class="cross" />}
            {xt.map((p, i) => (
              <text key={i} x={x(p)} y={h - 6} text-anchor={i === 0 ? "start" : i === xt.length - 1 ? "end" : "middle"} class="ax">
                {priceText(p, tick).replace("$", "")}
              </text>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}


const n = (v: unknown) => (v === undefined || v === null || v === "" ? NaN : Number(v));
const decs = (step: number) => {
  if (!Number.isFinite(step) || step <= 0) return 0;
  const s = step.toString();
  return s.includes("e-") ? Number(s.split("e-")[1]) : (s.split(".")[1] ?? "").length;
};
const bandText = (f: number) => (Number.isFinite(f) && f > 0 ? `±${(f * 100).toFixed(f * 100 < 1 ? 2 : 0)}% from the mark` : "—");

function DRow({ k, d, v }: { k: string; d: string; v: string }) {
  return (
    <div class="pd-drow">
      <span class="l">
        <span>{k}</span>
        <small>{d}</small>
      </span>
      <b class="num">{v}</b>
    </div>
  );
}

export function MarketDetails({ s, m }: { s: PerpsState; m: Mkt }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const raw = s.client.raw(m.symbol);
  if (!raw)
    return (
      <div class="pd-tabbody">
        <div class="pd-center muted">Market details are unavailable right now.</div>
      </div>
    );
  const base = m.base;
  const qty = (v: unknown) => (Number.isFinite(n(v)) ? `${qtyText(n(v))} ${base}` : "—");
  const tiers = [...m.spec.marginTiers].sort((a, b) => Number(a.max_notional) - Number(b.max_notional));
  const mmrs = tiers.map((t) => Number(t.maintenance_margin_rate)).filter((v) => Number.isFinite(v));
  const mmrText = mmrs.length ? `${(Math.min(...mmrs) * 100).toFixed(2)}% – ${(Math.max(...mmrs) * 100).toFixed(2)}%` : "—";
  const tickSize = m.spec.tickSize;
  const stepSize = m.spec.stepSize;
  return (
    <div class="pd-tabbody pd-details">
      <div class="pd-dgrid">
        <section>
          <h4>Market Overview</h4>
          <DRow k="Trading Pair" d={m.name} v={m.symbol} />
          <DRow k="Maximum Leverage" d="The most you can use when opening a small position" v={`${m.strikeMaxLev}x`} />
          {m.maxLev < m.strikeMaxLev && <DRow k="Leverage in this app" d="This app caps leverage below Strike's maximum" v={`${m.maxLev}x`} />}
        </section>
        <section>
          <h4>Order Size Rules</h4>
          <DRow k="Smallest Limit Order" d="Minimum size for a limit order" v={qty(raw.order_limit_min_size)} />
          <DRow k="Largest Limit Order" d="Maximum size of one limit order" v={qty(raw.order_limit_max_size)} />
          <DRow k="Smallest Market Order" d="Minimum size for a market order" v={qty(raw.order_market_min_size)} />
          <DRow k="Largest Market Order" d="Maximum size of one market order" v={qty(raw.order_market_max_size)} />
          <DRow k="Minimum Order Value" d="An order must be worth at least this" v={Number.isFinite(n(raw.order_min_notional)) ? usdText(n(raw.order_min_notional), { decimals: 0 }) : "—"} />
        </section>
        <section>
          <h4>Funding & Fees</h4>
          <DRow k="Current Funding Rate" d="Paid every hour. Positive: longs pay shorts" v={pct(m.funding * 100)} />
          <DRow k="Next Funding Payment" d="Time until the next hourly payment" v={m.nextFunding > Date.now() ? countdown(m.nextFunding) : "—"} />
          <DRow k="Maintenance Margin" d="Below this a position is liquidated (rises with size)" v={mmrText} />
          <DRow k="Liquidation Fee" d="Charged if a position is liquidated" v={Number.isFinite(n(raw.liquidation_fee_rate)) ? `${(n(raw.liquidation_fee_rate) * 100).toFixed(2)}%` : "—"} />
          <DRow k="Trading Fee" d="Strike's base taker fee, plus this app's builder fee" v={`${(s.takerRate * 100).toFixed(3)}% + ${(s.client.orderFeeBps / 100).toFixed(2)}%`} />
        </section>
        <section>
          <h4>Order Precision</h4>
          <DRow k="Price Decimal Places" d="Decimals allowed in a price" v={`${decs(tickSize)}`} />
          <DRow k="Size Decimal Places" d="Decimals allowed in a size" v={`${decs(stepSize)}`} />
          <DRow k="Minimum Price Movement" d="Smallest price step" v={Number.isFinite(tickSize) ? String(raw.order_tick_price) : "—"} />
          <DRow k="Order Size Increment" d="Sizes are multiples of this" v={qty(raw.order_limit_step_size)} />
        </section>
        <section>
          <h4>Price Protection</h4>
          <DRow k="Limit Order Price Range" d="How far a limit price can be from the market" v={bandText(n(raw.order_limit_price_bound))} />
          <DRow k="Market Order Price Range" d="Most a market order can move from the market" v={bandText(n(raw.order_market_price_bound))} />
          <DRow k="Stop Order Protection" d="Buffer against stops triggering on brief spikes" v={bandText(n(raw.trigger_protect)).replace(" from the mark", "")} />
        </section>
        <section>
          <h4>Margin Tiers</h4>
          <table class="pd-tiers">
            <thead>
              <tr>
                <th>Max Notional</th>
                <th>Max Leverage</th>
                <th>MMR</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.max_notional}>
                  <td class="num">{usdText(Number(t.max_notional), { decimals: 0 })}</td>
                  <td class="num">{t.max_leverage}x</td>
                  <td class="num">{(Number(t.maintenance_margin_rate) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
