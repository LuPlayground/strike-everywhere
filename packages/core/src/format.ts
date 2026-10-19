export function decimalsOf(step: number): number {
  if (!isFinite(step) || step <= 0) return 8;
  const s = step.toString();
  if (s.includes("e-")) return Number(s.split("e-")[1]);
  return (s.split(".")[1] ?? "").length;
}

export function roundToStep(value: number, step: number, mode: "floor" | "ceil" | "round" = "round"): string {
  const d = decimalsOf(step);
  const n = value / step;
  const k = mode === "floor" ? Math.floor(n + 1e-9) : mode === "ceil" ? Math.ceil(n - 1e-9) : Math.round(n);
  return (k * step).toFixed(d);
}

export function formatUsd(v: number, opts: { sign?: boolean; decimals?: number } = {}): string {
  if (!isFinite(v)) return "—";
  const d = opts.decimals ?? (Math.abs(v) >= 1000 ? 0 : 2);
  const s = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  const sign = v < 0 ? "-" : opts.sign && v > 0 ? "+" : "";
  return `${sign}$${s}`;
}

export function formatPrice(v: number, tick?: number): string {
  if (!isFinite(v)) return "—";
  const d = tick ? decimalsOf(tick) : v >= 1000 ? 2 : v >= 1 ? 4 : 5;
  return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function formatPct(v: number, decimals = 2): string {
  if (!isFinite(v)) return "—";
  return `${v > 0 ? "+" : ""}${v.toFixed(decimals)}%`;
}
