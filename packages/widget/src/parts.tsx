import type { ComponentChildren } from "preact";

export const Chevron = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const COIN_TINTS = ["#4efab0", "#7aa2ff", "#f8931a", "#c084fc", "#38bdf8", "#facc15", "#fb7185"];
export function CoinIcon({ base }: { base: string }) {
  const tint = base === "ADA" ? "#4efab0" : COIN_TINTS[[...base].reduce((n, c) => n + c.charCodeAt(0), 0) % COIN_TINTS.length];
  return (
    <span class="coin" style={{ background: tint }} aria-hidden="true">
      {base.slice(0, base.length > 3 ? 2 : 3)}
    </span>
  );
}

export function KV({ k, v, hint, cls }: { k: ComponentChildren; v: ComponentChildren; hint?: string; cls?: string }) {
  return (
    <div class="kv">
      <span class={`k${hint ? " dotted" : ""}`} title={hint}>
        {k}
      </span>
      <span class={`v ${cls ?? ""}`}>{v}</span>
    </div>
  );
}

export function Check({ on, label, onToggle }: { on: boolean; label: string; onToggle: () => void }) {
  return (
    <span class={`check${on ? " on" : ""}`} role="checkbox" aria-checked={on} tabIndex={0} onClick={onToggle} onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), onToggle())}>
      <span class="box">
        {on && (
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 5.2 4.1 7.2 8 3" fill="none" stroke="#04120c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </span>
  );
}

export function PctSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div class="slider">
      <div class="track" />
      <div class="fill" style={{ width: `${v}%` }} />
      {[0, 25, 50, 75, 100].map((t) => (
        <span key={t} class={`tick${v >= t ? " on" : ""}`} style={{ left: `${t}%` }} />
      ))}
      <span class="knob" style={{ left: `${v}%` }} />
      <input type="range" min={0} max={100} step={1} value={v} aria-label="Order size as % of buying power" onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))} />
    </div>
  );
}

export function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  if (points.length < 2) return <svg class="spark" />;
  const w = 380;
  const h = 56;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const xy = points.map((p, i) => [(i / (points.length - 1)) * w, h - 6 - ((p - min) / span) * (h - 14)]);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const color = up ? "#4efab0" : "#f43f5e";
  const id = up ? "se-up" : "se-dn";
  return (
    <svg class="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-label="48-hour price chart" role="img">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color={color} stop-opacity=".22" />
          <stop offset="1" stop-color={color} stop-opacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} stroke-width="1.6" vector-effect="non-scaling-stroke" />
    </svg>
  );
}

export function Spinner() {
  return <span class="spin" aria-label="Loading" />;
}

export function Step({ state, n, children }: { state: "todo" | "active" | "done"; n: number; children: ComponentChildren }) {
  return (
    <div class={`step ${state === "todo" ? "" : state}`}>
      <span class="s">{state === "done" ? "✓" : state === "active" ? <Spinner /> : n}</span>
      <span>{children}</span>
    </div>
  );
}

export function fmtSize(v: number | null | undefined): string {
  if (v === null || v === undefined || !Number.isFinite(v)) return "—";
  const a = Math.abs(v);
  return v.toLocaleString("en-US", a >= 1000 ? { maximumFractionDigits: 0 } : a >= 1 ? { maximumFractionDigits: 2 } : { maximumSignificantDigits: 4 });
}

export function fmtTime(ms: number, dateOnly = false): string {
  if (!(ms > 0)) return "—";
  return new Date(ms).toLocaleString("en-US", dateOnly ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

export const pageHidden = () => typeof document !== "undefined" && document.hidden;

export function Confirm({ children, actions }: { children: ComponentChildren; actions: ComponentChildren }) {
  return (
    <div class="confirm" role="alertdialog">
      <div>{children}</div>
      <div class="confirm-a">{actions}</div>
    </div>
  );
}

export function decimalInput(v: string): string {
  const s = v.replace(/,/g, ".").replace(/[^0-9.]/g, "");
  const i = s.indexOf(".");
  return i === -1 ? s : s.slice(0, i + 1) + s.slice(i + 1).replace(/\./g, "");
}
