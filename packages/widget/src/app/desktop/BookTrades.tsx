import { useEffect, useState } from "preact/hooks";
import type { BookView, PublicTrade } from "@strike-everywhere/core";
import { pageHidden } from "../../parts";
import { qtyText, timeText } from "../markets";
import type { PerpsState } from "../state";
import { Spin } from "../ui";

const ROWS = 11;
const fmtP = (v: number, tick?: number) => {
  const d = tick ? Math.max(0, (tick.toString().split(".")[1] ?? "").length) : v >= 1000 ? 1 : 4;
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

function Book({ book, base, tick, onPrice }: { book: BookView | null | undefined; base: string; tick?: number; onPrice: (p: number) => void }) {
  if (book === undefined)
    return (
      <div class="pd-center">
        <Spin />
      </div>
    );
  if (book === null) return <div class="pd-center muted">Order book unavailable right now.</div>;
  const asks = book.asks.slice(0, ROWS);
  const bids = book.bids.slice(0, ROWS);
  const cum = (lv: typeof asks) => lv.reduce<number[]>((a, [, q]) => (a.push((a[a.length - 1] ?? 0) + q), a), []);
  const ca = cum(asks);
  const cb = cum(bids);
  const max = Math.max(ca[ca.length - 1] ?? 0, cb[cb.length - 1] ?? 0) || 1;
  const spreadPct = Number.isFinite(book.spread) && Number.isFinite(book.mid) && book.mid > 0 ? (book.spread / book.mid) * 100 : NaN;
  return (
    <div class="pd-ob">
      <div class="pd-ob-h">
        <span>Price</span>
        <span>Size ({base})</span>
        <span>Total ({base})</span>
      </div>
      <div class="pd-ob-side asks">
        {asks.length ? (
          asks
            .map((lv, i) => ({ lv, total: ca[i] }))
            .reverse()
            .map(({ lv: [p, q], total }) => (
              <button key={p} class="lv" onClick={() => onPrice(p)} title="Use this price for a limit order">
                <span class="bar" style={{ width: `${(total / max) * 100}%` }} />
                <span class="p neg">{fmtP(p, tick)}</span>
                <span>{qtyText(q)}</span>
                <span>{qtyText(total)}</span>
              </button>
            ))
        ) : (
          <div class="pd-ob-empty">No sellers right now</div>
        )}
      </div>
      <div class="pd-spread">
        <span>Spread</span>
        <span class="num">{Number.isFinite(book.spread) ? fmtP(book.spread, tick) : "—"}</span>
        <span class="num">{Number.isFinite(spreadPct) ? `${spreadPct.toFixed(3)}%` : ""}</span>
      </div>
      <div class="pd-ob-side bids">
        {bids.length ? (
          bids.map(([p, q], i) => (
            <button key={p} class="lv" onClick={() => onPrice(p)} title="Use this price for a limit order">
              <span class="bar" style={{ width: `${(cb[i] / max) * 100}%` }} />
              <span class="p pos">{fmtP(p, tick)}</span>
              <span>{qtyText(q)}</span>
              <span>{qtyText(cb[i])}</span>
            </button>
          ))
        ) : (
          <div class="pd-ob-empty">No buyers right now</div>
        )}
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
