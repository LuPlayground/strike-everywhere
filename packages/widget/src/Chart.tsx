import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { formatPrice, type Kline, type StrikeEverywhere } from "@strike-everywhere/core";
import { fmtTime, pageHidden } from "./parts";

export const INTERVALS = { "15m": 900_000, "1h": 3_600_000, "4h": 14_400_000, "1d": 86_400_000 } as const;
export const ALL_INTERVALS = { "1m": 60_000, "5m": 300_000, ...INTERVALS, "1w": 604_800_000 } as const;
export type Interval = keyof typeof ALL_INTERVALS;
type PriceType = "mark" | "last" | "index";

const AXIS = 58;
const fmtVol = (v: number) => v.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });

export function Chart({
  client,
  symbol,
  interval,
  tick,
  live,
  height,
}: {
  client: StrikeEverywhere;
  symbol: string;
  interval: Interval;
  tick?: number;
  live: Record<PriceType, number>;
  height?: number;
}) {
  const [priceType, setPriceType] = useState<PriceType>("mark");
  const [candles, setCandles] = useState<Kline[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<{ i: number; y: number } | null>(null);
  const [w, setW] = useState(352);
  const [reload, setReload] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => el.clientWidth && setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth || 352);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    setCandles(null);
    setFailed(false);
    setHover(null);
    const load = () =>
      client.market
        .klines(symbol, interval, 120, priceType)
        .then((k) => alive && (setCandles(k), setFailed(!k.length)))
        .catch(() => alive && setFailed(true));
    load();
    const t = setInterval(() => !pageHidden() && load(), 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client, symbol, interval, priceType, reload]);

  const px = live[priceType];
  useEffect(() => {
    if (!(px > 0)) return;
    setCandles((prev) => {
      if (!prev?.length) return prev;
      const last = prev[prev.length - 1];
      const step = ALL_INTERVALS[interval];
      const now = Date.now();
      if (now >= last.openTime + step) {
        const openTime = last.openTime + Math.floor((now - last.openTime) / step) * step;
        return [...prev.slice(-199), { openTime, open: last.close, high: Math.max(last.close, px), low: Math.min(last.close, px), close: px, volume: 0 }];
      }
      return [...prev.slice(0, -1), { ...last, close: px, high: Math.max(last.high, px), low: Math.min(last.low, px) }];
    });
  }, [px, interval]);

  const types = (
    <div class="ptype" role="radiogroup" aria-label="Price type">
      {(["mark", "last", "index"] as const).map((t) => (
        <button key={t} role="radio" aria-checked={priceType === t} class={priceType === t ? "on" : ""} onClick={() => setPriceType(t)}>
          {t === "mark" ? "Mark" : t === "last" ? "Last" : "Index"}
        </button>
      ))}
    </div>
  );

  const h = height ?? (w >= 480 ? 250 : 210);
  if (!candles?.length) {
    return (
      <div class="chart" ref={box} style={{ height: `${h}px` }}>
        {types}
        <div class="chart-msg">
          {failed ? (
            <>
              Chart data isn't available right now.{" "}
              <button class="linkbtn" onClick={() => setReload(reload + 1)}>Retry</button>
            </>
          ) : (
            "Loading chart…"
          )}
        </div>
      </div>
    );
  }

  const plotW = Math.max(60, w - AXIS);
  const n = Math.max(10, Math.min(candles.length, Math.floor(plotW / 6.5)));
  const vis = candles.slice(-n);
  const step = plotW / n;
  const top = 30;
  const priceH = h * 0.66;
  const volTop = top + priceH + 6;
  const volH = h - volTop - 18;
  let lo = Math.min(...vis.map((c) => c.low));
  let hi = Math.max(...vis.map((c) => c.high));
  if (px > 0) (lo = Math.min(lo, px)), (hi = Math.max(hi, px));
  const pad = (hi - lo) * 0.06 || hi * 0.01 || 1;
  lo -= pad;
  hi += pad;
  const y = (v: number) => top + ((hi - v) / (hi - lo)) * priceH;
  const vMax = Math.max(...vis.map((c) => c.volume), 0) || 1;
  const bw = Math.max(1, step * 0.64);
  const grid = [0.1, 0.37, 0.63, 0.9].map((f) => hi - (hi - lo) * f);
  const hc = hover ? vis[hover.i] : null;
  const hoverPrice = hover ? hi - ((hover.y - top) / priceH) * (hi - lo) : 0;
  const timeIdx = [Math.floor(n * 0.15), Math.floor(n * 0.5), Math.floor(n * 0.85)];
  const dateOnly = interval === "1d" || interval === "4h" || interval === "1w";

  const onMove = (e: PointerEvent) => {
    const r = (e.currentTarget as SVGElement).getBoundingClientRect();
    const x = e.clientX - r.left;
    const yy = e.clientY - r.top;
    if (x < 0 || x > plotW || yy < top || yy > top + priceH) return setHover(null);
    setHover({ i: Math.max(0, Math.min(n - 1, Math.floor(x / step))), y: yy });
  };

  const flat = vis.length > 1 && hi - lo - 2 * pad <= (tick ?? 0) / 2;
  return (
    <div class="chart" ref={box} style={{ height: `${h}px`, position: "relative" }}>
      {types}
      {flat && (
        <div class="chart-note">
          {priceType === "last" ? "No trades in this period, so the last-traded price hasn't moved. Mark follows the market." : "The price hasn't moved in this period."}
        </div>
      )}
      {hc && (
        <div class="ohlc num" aria-live="polite">
          <span class="muted">{fmtTime(hc.openTime)}</span> O <b>{formatPrice(hc.open, tick)}</b> H <b>{formatPrice(hc.high, tick)}</b> L <b>{formatPrice(hc.low, tick)}</b> C{" "}
          <b class={hc.close >= hc.open ? "pos" : "neg"}>{formatPrice(hc.close, tick)}</b>
          {hc.volume > 0 && <> V <b>{fmtVol(hc.volume)}</b></>}
        </div>
      )}
      <svg width={w} height={h} role="img" aria-label={`${symbol} ${interval} candlestick chart`} onPointerMove={onMove} onPointerDown={onMove} onPointerLeave={() => setHover(null)}>
        {grid.map((g) => (
          <g key={g}>
            <line x1={0} x2={plotW} y1={y(g)} y2={y(g)} class="gl" />
            {!(px > 0 && Math.abs(y(g) - y(px)) < 14) && !(hover && Math.abs(y(g) - hover.y) < 14) && (
              <text x={w - 4} y={y(g) + 3.5} class="ax" text-anchor="end">{formatPrice(g, tick)}</text>
            )}
          </g>
        ))}
        {vis.map((c, i) => {
          const x = i * step + step / 2;
          const up = c.close >= c.open;
          const cls = up ? "cu" : "cd";
          const vh = (c.volume / vMax) * volH;
          return (
            <g key={c.openTime} class={cls}>
              {vh > 0 && <rect x={x - bw / 2} y={volTop + volH - vh} width={bw} height={vh} class="vol" />}
              <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} />
              <rect x={x - bw / 2} y={y(Math.max(c.open, c.close))} width={bw} height={Math.max(1, Math.abs(y(c.open) - y(c.close)))} />
            </g>
          );
        })}
        {timeIdx.map((i) =>
          vis[i] ? (
            <text key={i} x={i * step + step / 2 < 40 ? 2 : i * step + step / 2} y={h - 5} class="ax" text-anchor={i * step + step / 2 < 40 ? "start" : "middle"}>
              {fmtTime(vis[i].openTime, dateOnly)}
            </text>
          ) : null,
        )}
        {px > 0 && (
          <g class={px >= vis[vis.length - 1].open ? "cu" : "cd"}>
            <line x1={0} x2={plotW} y1={y(px)} y2={y(px)} class="now" />
            <rect x={plotW + 2} y={y(px) - 8} width={AXIS - 3} height={16} rx={2} />
            <text x={w - 4} y={y(px) + 3.5} class="tag" text-anchor="end">{formatPrice(px, tick)}</text>
          </g>
        )}
        {hover && hc && (
          <g class="xh">
            <line x1={hover.i * step + step / 2} x2={hover.i * step + step / 2} y1={top} y2={volTop + volH} />
            <line x1={0} x2={plotW} y1={hover.y} y2={hover.y} />
            <rect x={plotW + 2} y={hover.y - 8} width={AXIS - 3} height={16} rx={2} />
            <text x={w - 4} y={hover.y + 3.5} text-anchor="end">{formatPrice(hoverPrice, tick)}</text>
          </g>
        )}
      </svg>
    </div>
  );
}
