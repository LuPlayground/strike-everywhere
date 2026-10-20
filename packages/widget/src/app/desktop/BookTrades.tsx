import { useEffect, useState } from "preact/hooks";
import type { BookView, PublicTrade } from "@strike-everywhere/core";
import { pageHidden } from "../../parts";
import { qtyText, timeText } from "../markets";
import type { PerpsState } from "../state";
import { Spin } from "../ui";

const ROWS = 11;
const fmtP = (v: number, tick?: number) => {
  const t = tick?.toString() ?? "";
  const d = tick ? Math.min(8, t.includes("e-") ? Number(t.split("e-")[1]) : (t.split(".")[1] ?? "").length) : v >= 1000 ? 1 : 4;
  return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
};

export function BookTrades({ s, sym, base, tick, book, onPrice }: { s: PerpsState; sym: string; base: string; tick?: number; book: BookView | null | undefined; onPrice: (p: number) => void }) {
  const [tab, setTab] = useState<"book" | "trades">("book");
  return (
    <div class="pd-panel pd-book">
      <div class="pd-tabs">
        <button class={tab === "book" ? "on" : ""} onClick={() => setTab("book")}>
          Order Book
        </button>
        <button class={tab === "trades" ? "on" : ""} onClick={() => setTab("trades")}>
          Trades
        </button>
      </div>
      {tab === "book" ? <Book book={book} base={base} tick={tick} onPrice={onPrice} /> : <Trades s={s} sym={sym} base={base} tick={tick} />}
    </div>
  );
}

type Lv = [number, number];
export function groupLevels(levels: Lv[], g: number, side: "bid" | "ask"): Lv[] {
  if (!(g > 0)) return levels;
  const out: Lv[] = [];
  for (const [p, q] of levels) {
    const b = side === "ask" ? Math.ceil(p / g - 1e-9) * g : Math.floor(p / g + 1e-9) * g;
    const last = out[out.length - 1];
    if (last && Math.abs(last[0] - b) < g / 2) last[1] += q;
    else out.push([b, q]);
  }
  return out;
}

type BookShow = "both" | "bids" | "asks";

function Book({ book, base, tick, onPrice }: { book: BookView | null | undefined; base: string; tick?: number; onPrice: (p: number) => void }) {
  const [mult, setMult] = useState(1);
  const [show, setShow] = useState<BookShow>("both");
  const [usd, setUsd] = useState(false);
  useEffect(() => setMult(1), [base]);
  if (book === undefined)
    return (
      <div class="pd-center">
        <Spin />
      </div>
    );
  if (book === null) return <div class="pd-center muted">Order book unavailable right now.</div>;
  const step = (k: number) => Number(((tick ?? 0) * k).toPrecision(12));
  const g = tick && tick > 0 ? step(mult) : 0;
  const n = show === "both" ? ROWS : ROWS * 2 + 1;
  const asks = groupLevels(book.asks.map(([p, q]) => [p, q] as Lv), g, "ask").slice(0, n);
  const bids = groupLevels(book.bids.map(([p, q]) => [p, q] as Lv), g, "bid").slice(0, n);
  const amt = ([p, q]: Lv) => (usd ? p * q : q);
  const cum = (lv: Lv[]) => lv.reduce<number[]>((a, l) => (a.push((a[a.length - 1] ?? 0) + amt(l)), a), []);
  const ca = cum(asks);
  const cb = cum(bids);
  const max = Math.max(ca[ca.length - 1] ?? 0, cb[cb.length - 1] ?? 0) || 1;
  const spreadPct = Number.isFinite(book.spread) && Number.isFinite(book.mid) && book.mid > 0 ? (book.spread / book.mid) * 100 : NaN;
  const fmtA = (v: number) => (usd ? (v >= 1000 ? `$${Math.round(v).toLocaleString("en-US")}` : `$${v.toFixed(2)}`) : qtyText(v));
  const gp = g > 0 ? g : undefined;
  const bidSum = book.bids.reduce((a, [p, q]) => a + p * q, 0);
  const askSum = book.asks.reduce((a, [p, q]) => a + p * q, 0);
  const bPct = bidSum + askSum > 0 ? (bidSum / (bidSum + askSum)) * 100 : 50;
  const unit = usd ? "USD" : base;
  return (
    <div class="pd-ob">
      <div class="pd-ob-tools">
        <span class="views" role="radiogroup" aria-label="Book sides">
          {(["both", "bids", "asks"] as const).map((v) => (
            <button key={v} role="radio" aria-checked={show === v} aria-label={v === "both" ? "Buyers and sellers" : v === "bids" ? "Buyers only" : "Sellers only"} title={v === "both" ? "Buyers and sellers" : v === "bids" ? "Buyers only" : "Sellers only"} class={`v-${v}${show === v ? " on" : ""}`} onClick={() => setShow(v)}>
              <i />
              <i />
            </button>
          ))}
        </span>
        <span class="sp" />
        <select class="pd-sel" aria-label="Size unit" value={usd ? "usd" : "base"} onChange={(e) => setUsd((e.target as HTMLSelectElement).value === "usd")}>
          <option value="base">{base}</option>
          <option value="usd">USD</option>
        </select>
        {tick && tick > 0 && (
          <select class="pd-sel" aria-label="Price grouping" value={String(mult)} onChange={(e) => setMult(Number((e.target as HTMLSelectElement).value))}>
            {[1, 10, 100, 1000].map((k) => (
              <option key={k} value={String(k)}>
                {fmtP(step(k), step(k))}
              </option>
            ))}
          </select>
        )}
      </div>
      <div class="pd-ob-h">
        <span>Price</span>
        <span>Size ({unit})</span>
        <span>Total ({unit})</span>
      </div>
      {show !== "bids" && (
        <div class="pd-ob-side asks">
          {asks.length ? (
            asks
              .map((lv, i) => ({ lv, total: ca[i] }))
              .reverse()
              .map(({ lv, total }) => (
                <button key={lv[0]} class="lv" onClick={() => onPrice(lv[0])} title="Use this price for a limit order">
                  <span class="bar" style={{ width: `${(total / max) * 100}%` }} />
                  <span class="p neg">{fmtP(lv[0], gp ?? tick)}</span>
                  <span>{fmtA(amt(lv))}</span>
                  <span>{fmtA(total)}</span>
                </button>
              ))
          ) : (
            <div class="pd-ob-empty">No sellers right now</div>
          )}
        </div>
      )}
      <div class="pd-spread">
        <span>Spread</span>
        <span class="num">{Number.isFinite(book.spread) ? fmtP(book.spread, tick) : "—"}</span>
        <span class="num">{Number.isFinite(spreadPct) ? `${spreadPct.toFixed(3)}%` : ""}</span>
      </div>
      {show !== "asks" && (
        <div class="pd-ob-side bids">
          {bids.length ? (
            bids.map((lv, i) => (
              <button key={lv[0]} class="lv" onClick={() => onPrice(lv[0])} title="Use this price for a limit order">
                <span class="bar" style={{ width: `${(cb[i] / max) * 100}%` }} />
                <span class="p pos">{fmtP(lv[0], gp ?? tick)}</span>
                <span>{fmtA(amt(lv))}</span>
                <span>{fmtA(cb[i])}</span>
              </button>
            ))
          ) : (
            <div class="pd-ob-empty">No buyers right now</div>
          )}
        </div>
      )}
      <div class="pd-bs" title="Share of the order book's value on each side">
        <span class="b num">B {bPct.toFixed(1)}%</span>
        <span class="bar">
          <i style={{ width: `${bPct}%` }} />
        </span>
        <span class="s num">{(100 - bPct).toFixed(1)}% S</span>
      </div>
    </div>
  );
}

function Trades({ s, sym, base, tick }: { s: PerpsState; sym: string; base: string; tick?: number }) {
  const [rows, setRows] = useState<PublicTrade[] | null>(null);
  useEffect(() => {
    let alive = true;
    setRows(null);
    const load = () => s.client.market.trades(sym, 40).then((t) => alive && setRows(t)).catch(() => alive && setRows((r) => r ?? []));
    load();
    const t = setInterval(() => !pageHidden() && load(), 4000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [sym]);
  if (rows === null)
    return (
      <div class="pd-center">
        <Spin />
      </div>
    );
  if (!rows.length) return <div class="pd-center muted">No recent trades.</div>;
  return (
    <div class="pd-ob">
      <div class="pd-ob-h">
        <span>Price</span>
        <span>Size ({base})</span>
        <span>Time</span>
      </div>
      <div class="pd-trades">
        {rows.map((t) => (
          <div key={t.id} class="lv">
            <span class={`p ${t.side === "buy" ? "pos" : "neg"}`}>{fmtP(t.price, tick)}</span>
            <span>{qtyText(t.size)}</span>
            <span class="muted">{timeText(t.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
