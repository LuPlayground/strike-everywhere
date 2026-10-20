import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import type { Kline, StrikeEverywhere } from "@strike-everywhere/core";
import { pageHidden } from "../parts";

export const RANGES = {
  LIVE: { interval: "1m", limit: 120, refresh: 20_000 },
  "1D": { interval: "15m", limit: 96, refresh: 60_000 },
  "1W": { interval: "1h", limit: 168, refresh: 120_000 },
  "1M": { interval: "4h", limit: 180, refresh: 300_000 },
  "1Y": { interval: "1d", limit: 365, refresh: 900_000 },
  ALL: { interval: "1w", limit: 520, refresh: 900_000 },
} as const;
export type Range = keyof typeof RANGES;

export interface Hover {
  price: number;
  time: number;
  change: number;
}

export function LineChart({
  client,
  symbol,
  range,
  live,
  height = 240,
  onHover,
  onFirst,
}: {
  client: StrikeEverywhere;
  symbol: string;
  range: Range;
  live: number;
  height?: number;
  onHover?: (h: Hover | null) => void;
  onFirst?: (p: number) => void;
}) {
  const [pts, setPts] = useState<Kline[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [w, setW] = useState(360);
  const [hx, setHx] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => el.clientWidth && setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth || 360);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    setPts(null);
    setFailed(false);
    const r = RANGES[range];
    const load = () =>
      client.market
        .klines(symbol, r.interval, r.limit, "mark")
        .then((k) => alive && (setPts(k), setFailed(!k.length)))
        .catch(() => alive && setFailed(true));
    load();
    const t = setInterval(() => !pageHidden() && load(), r.refresh);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client, symbol, range]);

  const series = pts?.length ? [...pts.map((k) => ({ t: k.openTime, p: k.close })), ...(live > 0 ? [{ t: Date.now(), p: live }] : [])] : [];
  const first = series.length ? pts![0].open : 0;
  useEffect(() => {
    if (first > 0) onFirst?.(first);
  }, [first, symbol, range]);

  if (!series.length) {
    return (
      <div class="pa-line" ref={box} style={{ height: `${height}px` }}>
        <div class="pa-line-msg">{failed ? "Chart isn't available right now." : ""}</div>
      </div>
    );
  }

  const vals = series.map((s) => s.p);
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  const pad = (hi - lo) * 0.08 || hi * 0.002 || 1;
  lo -= pad;
  hi += pad;
  const n = series.length;
  const x = (i: number) => (i / Math.max(1, n - 1)) * (w - 12) + 2;
  const y = (v: number) => 8 + ((hi - v) / (hi - lo)) * (height - 16);
  const d = series.map((s, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(s.p).toFixed(1)}`).join(" ");
  const up = vals[n - 1] >= first;
  const id = `pa-g-${up ? "u" : "d"}`;
  const hi_ = hx === null ? null : Math.max(0, Math.min(n - 1, Math.round(((hx - 2) / (w - 12)) * (n - 1))));

  const move = (e: PointerEvent) => {
    const r = (e.currentTarget as SVGElement).getBoundingClientRect();
    const px = e.clientX - r.left;
    setHx(px);
    const i = Math.max(0, Math.min(n - 1, Math.round(((px - 2) / (w - 12)) * (n - 1))));
    onHover?.({ price: series[i].p, time: series[i].t, change: first > 0 ? ((series[i].p - first) / first) * 100 : 0 });
  };
  const leave = () => (setHx(null), onHover?.(null));

  return (
    <div class={`pa-line ${up ? "up" : "dn"}`} ref={box} style={{ height: `${height}px` }}>
      <svg width={w} height={height} role="img" aria-label={`${symbol} price, ${range}`} onPointerMove={move} onPointerDown={move} onPointerLeave={leave} onPointerUp={(e) => e.pointerType !== "mouse" && leave()}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="currentColor" stop-opacity=".22" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L${x(n - 1)},${height} L${x(0)},${height} Z`} fill={`url(#${id})`} stroke="none" />
        <path d={d} fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" />
        {hi_ === null ? (
          <>
            <circle cx={x(n - 1)} cy={y(vals[n - 1])} r="3.4" fill="currentColor" />
          </>
        ) : (
          <>
            <line x1={x(hi_)} x2={x(hi_)} y1={0} y2={height} class="xh" />
            <circle cx={x(hi_)} cy={y(vals[hi_])} r="4.5" fill="currentColor" stroke="#000" stroke-width="2" />
          </>
        )}
      </svg>
    </div>
  );
}
