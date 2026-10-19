import { formatUsd } from "./format.js";
import type { Side } from "./types.js";

export type TicketType = "market" | "limit" | "stop" | "stop_limit" | "twap";

export function fmtBase(n: number): string {
  return Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 8 }) : "—";
}

export function movePct(from: number, to: number): string {
  if (!(from > 0) || !Number.isFinite(to)) return "";
  const d = ((to - from) / from) * 100;
  const a = Math.abs(d);
  const s = a < 10 ? a.toFixed(1) : a.toFixed(0);
  return `${Number(s) === 0 ? "" : d < 0 ? "−" : "+"}${s}%`;
}

export function positionText(size: number, base: string): string {
  if (!size) return "";
  return `${size > 0 ? "Long" : "Short"} ${fmtBase(Math.abs(size))} ${base}`;
}

export function positionAfter(position: number, side: Side, size: number, reduceOnly = false): number {
  const next = position + (side === "buy" ? size : -size);
  if (reduceOnly && Math.sign(next) !== Math.sign(position)) return 0;
  return Math.abs(next) < 1e-12 ? 0 : next;
}

export function fillDirection(side: Side | "", realizedPnl: number | null | undefined): string {
  if (side !== "buy" && side !== "sell") return "";
  const close = !!realizedPnl;
  return side === "buy" ? (close ? "Close Short" : "Open Long") : close ? "Close Long" : "Open Short";
}

export function flipNote(p: { position: number; side: Side; size: number; base: string; reduceOnly?: boolean; step?: number }): string | null {
  if (!p.position || p.reduceOnly || !(p.size > 0)) return null;
  const long = p.position > 0;
  if (long === (p.side === "buy")) return null;
  const held = Math.abs(p.position);
  const eps = (p.step ?? 0) / 2 || held * 1e-9;
  const name = long ? "Long" : "Short";
  const q = (n: number) => `${fmtBase(n)} ${p.base}`;
  if (p.size < held - eps) return `This reduces your ${name} ${q(held)} to ${q(held - p.size)}.`;
  if (p.size <= held + eps) return `This closes your ${name} ${q(held)}.`;
  return `This closes your ${name} ${q(held)} and opens a ${long ? "Short" : "Long"} of ${q(p.size - held)}. To just exit, use Close in Positions.`;
}

export function sizeLine(p: { usd: number; size: number; price: number; leverage: number; base: string; step?: number }): string | null {
  if (!(p.size > 0) || !(p.price > 0)) return null;
  const notional = p.size * p.price;
  let s = `= ${fmtBase(p.size)} ${p.base} ≈ ${formatUsd(notional)} · uses ${formatUsd(notional / Math.max(1, p.leverage))} of your balance`;
  if (p.step && p.step > 0 && Math.abs(notional - p.usd) > 0.01) s += ` (rounded to Strike's ${fmtBase(p.step)} ${p.base} step)`;
  return s;
}

export function orderSummary(p: {
  side: Side;
  leverage: number;
  base: string;
  size: number;
  notional: number;
  margin: number;
  entry: number;
  liqPrice?: number | null;
  fmtPrice?: (n: number) => string;
  resting?: boolean;
  when?: string;
  reduceOnly?: boolean;
}): string {
  const long = p.side === "buy";
  const verb = p.resting ? (long ? "you'll buy" : "you'll sell") : long ? "you're buying" : "you're selling";
  const what = `~${fmtBase(p.size)} ${p.base} (~${formatUsd(p.notional)})${p.when ?? ""}`;
  if (p.reduceOnly) return `Reduce-only: ${verb} ${what}. It can only shrink your ${long ? "Short" : "Long"}, never open a new position.`;
  const margin = formatUsd(p.margin);
  let s = `${p.leverage}x ${long ? "Long" : "Short"}: ${verb} ${what} using ${margin} of your balance. You gain if ${p.base} ${long ? "rises" : "falls"}.`;
  const liq = p.liqPrice ?? 0;
  if (liq > 0 && p.entry > 0) {
    const fmt = p.fmtPrice ?? ((n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    s += ` You'd be liquidated (losing that ${margin}) if ${p.base} ${long ? "falls" : "rises"} to ~$${fmt(liq)} (${movePct(p.entry, liq)}).`;
  }
  return s;
}

export function ctaLabel(p: { side: Side; base: string; type: TicketType; price?: string; trigger?: string; notional?: number }): string {
  const dir = `${p.side === "buy" ? "Long" : "Short"} ${p.base}`;
  const parts = [p.type === "twap" ? `TWAP ${dir}` : dir];
  if (p.type === "limit" && p.price) parts.push(`Limit @ ${p.price}`);
  if (p.type === "stop" && p.trigger) parts.push(`Stop @ ${p.trigger}`);
  if (p.type === "stop_limit" && p.trigger) parts.push(`Stop @ ${p.trigger}${p.price ? ` → Limit ${p.price}` : ""}`);
  if (p.notional && p.notional > 0) parts.push(formatUsd(p.notional));
  return parts.join(" · ");
}

export function fundingWords(rate: number): string {
  if (!Number.isFinite(rate) || rate === 0) return "None now";
  const pct = (Math.abs(rate) * 100).toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return `${rate > 0 ? "Longs" : "Shorts"} pay ${pct}%/h`;
}

export function closePrompt(p: { size: number; base: string; mark: number; upnl: number }): string {
  const value = p.mark > 0 ? ` (~${formatUsd(Math.abs(p.size) * p.mark)})` : "";
  const pnl = Number.isFinite(p.upnl) ? ` Est. profit/loss ${formatUsd(p.upnl, { sign: true })} before fees.` : "";
  return `Close ${positionText(p.size, p.base)} at market${value}?${pnl}`;
}
