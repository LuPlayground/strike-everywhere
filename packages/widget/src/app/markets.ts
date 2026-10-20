
const CRYPTO = new Set(["ADA", "BNB", "BTC", "ETH", "HYPE", "NEAR", "NIGHT", "PUMP", "SOL", "XRP", "ZEC", "DOGE", "SUI", "AVAX", "LINK", "LTC", "TRX", "SNEK"]);
const BLUE_CHIPS = new Set(["BTC", "ETH", "SOL", "BNB", "XRP"]);
const CARDANO = new Set(["ADA", "NIGHT", "SNEK"]);
const COMMODITIES = new Set(["XAU", "XAG", "WTI", "BRENT", "NATGAS", "COPPER"]);
const INDICES = new Set(["NAS100", "SP500", "US30", "DJI", "SPX", "NDX"]);

export type Kind = "crypto" | "stock" | "index" | "commodity";

export function kindOf(base: string): Kind {
  const b = base.toUpperCase();
  if (CRYPTO.has(b)) return "crypto";
  if (COMMODITIES.has(b)) return "commodity";
  if (INDICES.has(b)) return "index";
  return "stock";
}

export interface ListDef {
  id: string;
  label: string;
  icon: string;
  test: (base: string, ctx: { change: number; createdAt: number }) => boolean;
  sort?: "change" | "-change" | "new";
}

const DAY = 86_400_000;
export const LISTS: ListDef[] = [
  { id: "blue", label: "Blue Chips", icon: "bulb", test: (b) => BLUE_CHIPS.has(b) },
  { id: "cardano", label: "Cardano", icon: "ada", test: (b) => CARDANO.has(b) },
  { id: "stocks", label: "Equities", icon: "building", test: (b) => kindOf(b) === "stock" },
  { id: "indices", label: "Indices", icon: "chart", test: (b) => kindOf(b) === "index" },
  { id: "commodities", label: "Commodities", icon: "cube", test: (b) => kindOf(b) === "commodity" },
  { id: "crypto", label: "Crypto", icon: "coins", test: (b) => kindOf(b) === "crypto" },
  { id: "gainers", label: "Gainers", icon: "up", test: (_b, c) => c.change > 0, sort: "change" },
  { id: "losers", label: "Losers", icon: "down", test: (_b, c) => c.change < 0, sort: "-change" },
  { id: "new", label: "New", icon: "sparkle", test: (_b, c) => c.createdAt > 0 && Date.now() - c.createdAt < 60 * DAY, sort: "new" },
];

export function displayName(name: string, base: string): string {
  const n = (name || "").replace(/\s*\/\s*USD.*$/i, "").trim();
  return n || base;
}

const ICON_HOST = "https://app.strikefinance.org/images/";
export function iconUrls(base: string): string[] {
  const b = encodeURIComponent(base.toLowerCase());
  return [`${ICON_HOST}${b}.webp`, `${ICON_HOST}${b}.svg`];
}

const TINTS = ["#4efab0", "#7aa2ff", "#f8931a", "#c084fc", "#38bdf8", "#facc15", "#fb7185"];
export function tintOf(base: string): string {
  return TINTS[[...base].reduce((n, c) => n + c.charCodeAt(0), 0) % TINTS.length];
}

export function compactUsd(v: number): string {
  if (!Number.isFinite(v) || v <= 0) return "$0";
  return "$" + v.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: v >= 1000 ? 1 : 0 });
}

export function priceText(v: number, tick?: number): string {
  if (!Number.isFinite(v) || v <= 0) return "—";
  const d = tick ? Math.max(0, Math.min(8, decimals(tick))) : v >= 1000 ? 2 : v >= 1 ? 4 : 5;
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function decimals(step: number): number {
  const s = step.toString();
  if (s.includes("e-")) return Number(s.split("e-")[1]);
  return (s.split(".")[1] ?? "").length;
}

export function qtyText(v: number): string {
  if (!Number.isFinite(v)) return "—";
  const a = Math.abs(v);
  return v.toLocaleString("en-US", a >= 1000 ? { maximumFractionDigits: 0 } : a >= 1 ? { maximumFractionDigits: 4 } : { maximumSignificantDigits: 4 });
}

export function usdText(v: number, opts: { sign?: boolean; decimals?: number } = {}): string {
  if (!Number.isFinite(v)) return "—";
  const d = opts.decimals ?? 2;
  const s = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  return `${v < 0 ? "-" : opts.sign && v > 0 ? "+" : ""}$${s}`;
}

export function pctText(v: number, decimalsN = 2): string {
  if (!Number.isFinite(v)) return "—";
  return `${v > 0 ? "+" : ""}${v.toFixed(decimalsN)}%`;
}

export function dateText(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function timeText(ms: number): string {
  return new Date(ms).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

export function countdown(to: number): string {
  const s = Math.max(0, Math.floor((to - Date.now()) / 1000));
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${String(m % 60).padStart(2, "0")}m` : `${m}m ${String(s % 60).padStart(2, "0")}s`;
}
