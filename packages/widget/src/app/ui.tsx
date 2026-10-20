import type { ComponentChildren, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { iconUrls, tintOf } from "./markets";
import type { Toast } from "./state";


const P = { fill: "none", stroke: "currentColor", "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round" } as const;
const ICONS: Record<string, JSX.Element> = {
  x: <path {...P} d="M6 6l12 12M18 6 6 18" />,
  back: <path {...P} d="M15 5l-7 7 7 7" />,
  right: <path {...P} d="M9 5l7 7-7 7" />,
  down: <path {...P} d="M6 9l6 6 6-6" />,
  up: <path {...P} d="M6 15l6-6 6 6" />,
  search: (
    <>
      <circle {...P} cx="11" cy="11" r="6.5" />
      <path {...P} d="M16 16l4 4" />
    </>
  ),
  clock: (
    <>
      <circle {...P} cx="12" cy="12" r="8" />
      <path {...P} d="M12 8v4.5l3 2" />
    </>
  ),
  sliders: <path {...P} d="M6 4v6m0 4v6M12 4v2m0 4v10M18 4v9m0 4v3M4 12h4M10 8h4M16 15h4" />,
  plus: <path {...P} d="M12 5v14M5 12h14" />,
  minus: <path {...P} d="M5 12h14" />,
  check: <path {...P} d="M5 12.5l4.5 4.5L19 7.5" />,
  info: (
    <>
      <circle {...P} cx="12" cy="12" r="8" />
      <path {...P} d="M12 11v5" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" />
    </>
  ),
  warn: (
    <>
      <path {...P} d="M12 4 3 20h18L12 4z" />
      <path {...P} d="M12 10v4.5" />
      <circle cx="12" cy="17.2" r="1.1" fill="currentColor" />
    </>
  ),
  candles: <path {...P} d="M7 4v3m0 8v5M17 4v5m0 8v3M5 7h4v8H5zM15 9h4v8h-4z" />,
  line: <path {...P} d="M3 17l5-6 4 4 8-9" />,
  bulb: <path {...P} d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />,
  ada: (
    <>
      <circle {...P} cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="4.5" r="1.3" fill="currentColor" />
      <circle cx="12" cy="19.5" r="1.3" fill="currentColor" />
      <circle cx="5.5" cy="8.2" r="1.3" fill="currentColor" />
      <circle cx="18.5" cy="8.2" r="1.3" fill="currentColor" />
      <circle cx="5.5" cy="15.8" r="1.3" fill="currentColor" />
      <circle cx="18.5" cy="15.8" r="1.3" fill="currentColor" />
    </>
  ),
  building: <path {...P} d="M4 20h16M6 20V9l6-4 6 4v11M10 20v-5h4v5M9 11h.01M15 11h.01" />,
  chart: <path {...P} d="M4 19h16M5 15l4-4 3 3 6-7" />,
  cube: <path {...P} d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  coins: (
    <>
      <ellipse {...P} cx="9" cy="8" rx="5" ry="2.6" />
      <path {...P} d="M4 8v4c0 1.4 2.2 2.6 5 2.6M14 8v1.5" />
      <ellipse {...P} cx="15" cy="14" rx="5" ry="2.6" />
      <path {...P} d="M10 14v3.4c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6V14" />
    </>
  ),
  sparkle: <path {...P} d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />,
  arrowUp: <path {...P} d="M12 19V5m0 0-6 6m6-6 6 6" />,
  arrowDown: <path {...P} d="M12 5v14m0 0-6-6m6 6 6-6" />,
  chat: <path {...P} d="M5 5h14v10H9l-4 4V5z" />,
  book: <path {...P} d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4zM5 16a4 4 0 0 1 4-4h10" />,
  shield: <path {...P} d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />,
  wallet: <path {...P} d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7zm0 0 11-3v3M16 13.5h.01" />,
  swap: <path {...P} d="M5 8h13l-3-3M19 16H6l3 3" />,
  close: <path {...P} d="M6 6l12 12M18 6 6 18" />,
  more: (
    <>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  bolt: <path {...P} d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />,
  ext: <path {...P} d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" />,
};

export function Icon({ n, size = 20, cls }: { n: string; size?: number; cls?: string }) {
  return (
    <svg class={cls} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[n] ?? null}
    </svg>
  );
}


export function Coin({ base, size = 40, rank }: { base: string; size?: number; rank?: number }) {
  const urls = iconUrls(base);
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [base]);
  return (
    <span class="pa-coin" style={{ width: `${size}px`, height: `${size}px` }}>
      {i < urls.length ? (
        <img src={urls[i]} alt="" width={size} height={size} loading="lazy" decoding="async" referrerpolicy="no-referrer" onError={() => setI(i + 1)} />
      ) : (
        <span class="pa-mono" style={{ background: tintOf(base), fontSize: `${Math.round(size * 0.34)}px` }}>
          {base.slice(0, base.length > 4 ? 2 : 3)}
        </span>
      )}
      {rank ? <span class={`pa-rank r${rank}`}>{rank}</span> : null}
    </span>
  );
}


export function RoundBtn({ n, label, onClick, cls }: { n: string; label: string; onClick: () => void; cls?: string }) {
  return (
    <button class={`pa-round ${cls ?? ""}`} aria-label={label} title={label} onClick={onClick}>
      <Icon n={n} size={20} />
    </button>
  );
}

export function Spin({ size = 16 }: { size?: number }) {
  return <span class="pa-spin" style={{ width: `${size}px`, height: `${size}px` }} aria-label="Loading" />;
}

export function Sheet({
  title,
  onClose,
  onBack,
  onDone,
  doneDisabled,
  children,
  tall,
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  onDone?: () => void;
  doneDisabled?: boolean;
  children: ComponentChildren;
  tall?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div class="pa-scrim" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div class={`pa-sheet${tall ? " tall" : ""}`} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref} onKeyDown={(e) => e.key === "Escape" && (e.stopPropagation(), onClose())}>
        <div class="pa-sheet-h">
          {onBack ? <RoundBtn n="back" label="Back" onClick={onBack} /> : <RoundBtn n="x" label="Close" onClick={onClose} />}
          <div class="t">{title}</div>
          {onDone ? (
            <button class="pa-round done" aria-label="Apply" disabled={doneDisabled} onClick={onDone}>
              <Icon n="check" size={20} />
            </button>
          ) : (
            <span class="pa-round ghost" />
          )}
        </div>
        <div class="pa-sheet-b">{children}</div>
      </div>
    </div>
  );
}

export function Group({ children, cls }: { children: ComponentChildren; cls?: string }) {
  return <div class={`pa-group ${cls ?? ""}`}>{children}</div>;
}

export function Row({
  k,
  sub,
  v,
  vsub,
  vcls,
  onClick,
  chevron,
  info,
}: {
  k: ComponentChildren;
  sub?: ComponentChildren;
  v?: ComponentChildren;
  vsub?: ComponentChildren;
  vcls?: string;
  onClick?: () => void;
  chevron?: "right" | "down" | "plus";
  info?: () => void;
}) {
  const body = (
    <>
      <span class="l">
        <span class="k">
          {k}
          {info && (
            <span
              class="pa-i"
              role="button"
              tabIndex={0}
              aria-label="More info"
              onClick={(e) => (e.stopPropagation(), info())}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.stopPropagation(), info())}
            >
              <Icon n="info" size={15} />
            </span>
          )}
        </span>
        {sub !== undefined && <span class="s">{sub}</span>}
      </span>
      <span class={`r ${vcls ?? ""}`}>
        {v !== undefined && <span class="v">{v}</span>}
        {vsub !== undefined && <span class="vs">{vsub}</span>}
      </span>
      {chevron && <Icon n={chevron} size={18} cls="chev" />}
    </>
  );
  return onClick ? (
    <button class="pa-row" onClick={onClick}>
      {body}
    </button>
  ) : (
    <div class="pa-row">{body}</div>
  );
}

export function Keypad({ onKey }: { onKey: (k: string) => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const origin = (e.composedPath?.()[0] ?? e.target) as HTMLElement;
      if (origin?.closest?.("input, textarea, select, [contenteditable]") || e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[0-9]$/.test(e.key) || e.key === "." || e.key === ",") onKey(e.key === "," ? "." : e.key);
      else if (e.key === "Backspace") onKey("del");
    };
    window.addEventListener("keydown", h, true);
    return () => window.removeEventListener("keydown", h, true);
  }, [onKey]);
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"];
  return (
    <div class="pa-keypad">
      {keys.map((k) => (
        <button key={k} aria-label={k === "del" ? "Delete" : k} onClick={() => onKey(k)}>
          {k === "del" ? <Icon n="back" size={22} /> : k}
        </button>
      ))}
    </div>
  );
}

export function applyKey(cur: string, k: string, dp = 2): string {
  if (k === "del") return cur.slice(0, -1);
  if (k === ".") return cur.includes(".") || dp === 0 ? cur : (cur || "0") + ".";
  const i = cur.indexOf(".");
  if (i >= 0 && cur.length - i - 1 >= dp) return cur;
  if (cur.replace(".", "").length >= 12) return cur;
  if (cur === "0") return k;
  return cur + k;
}

export function Banner({ toast, onDismiss }: { toast: Toast | null; onDismiss: () => void }) {
  if (!toast) return null;
  return (
    <div class={`pa-banner ${toast.kind}`} role={toast.kind === "err" ? "alert" : "status"}>
      <span class="ic">{toast.kind === "progress" ? <Spin size={18} /> : toast.kind === "ok" ? <Icon n="check" size={16} /> : <Icon n="x" size={16} />}</span>
      <span class="tx">
        <b>{toast.title}</b>
        {toast.text && <span>{toast.text}</span>}
        {toast.kind === "err" && (
          <button class="ok" onClick={onDismiss}>
            OK
          </button>
        )}
      </span>
      {toast.kind === "ok" && (
        <button class="x" aria-label="Dismiss" onClick={onDismiss}>
          <Icon n="x" size={14} />
        </button>
      )}
    </div>
  );
}

export function Slider({ min, max, value, onChange, label, marks }: { min: number; max: number; value: number; onChange: (v: number) => void; label: string; marks?: number[] }) {
  const span = Math.max(1e-9, max - min);
  const pct = Math.max(0, Math.min(100, ((value - min) / span) * 100));
  return (
    <div class="pa-slider">
      <div class="track" />
      <div class="fill" style={{ width: `${pct}%` }} />
      {marks?.map((m) => (
        <span key={m} class={`mk${value >= m ? " on" : ""}`} style={{ left: `${((m - min) / span) * 100}%` }} />
      ))}
      <span class="knob" style={{ left: `${pct}%` }} />
      <input type="range" min={min} max={max} step={1} value={value} aria-label={label} onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))} />
    </div>
  );
}

export function pref(key: string, value?: string): string | null {
  try {
    if (value === undefined) return localStorage.getItem(`strike-everywhere:ui:${key}`);
    localStorage.setItem(`strike-everywhere:ui:${key}`, value);
  } catch {
  }
  return value ?? null;
}
