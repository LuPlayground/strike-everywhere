import { formatPrice, type BookLevel, type BookView } from "@strike-everywhere/core";
import { fmtSize } from "./parts";

export function Book({ book, depth, tick, base, onPick }: { book: BookView | null | undefined; depth: number; tick?: number; base: string; onPick: (price: number) => void }) {
  if (!book) return <div class="book"><div class="chart-msg">{book === null ? "Order book unavailable right now…" : "Loading order book…"}</div></div>;
  const cum = (levels: BookLevel[]) => {
    let t = 0;
    return levels.slice(0, depth).map(([p, q]) => [p, q, (t += q)] as const);
  };
  const asks = cum(book.asks);
  const bids = cum(book.bids);
  const max = Math.max(asks[asks.length - 1]?.[2] ?? 0, bids[bids.length - 1]?.[2] ?? 0) || 1;
  const row = (side: "ask" | "bid") => ([p, q, t]: readonly [number, number, number]) => (
    <button key={p} class={`lvl ${side}`} onClick={() => onPick(p)} title="Use this price for a limit order">
      <span class="bar" style={{ width: `${(t / max) * 100}%` }} />
      <span class="num px">{formatPrice(p, tick)}</span>
      <span class="num">{fmtSize(q)}</span>
      <span class="num">{fmtSize(t)}</span>
    </button>
  );
  return (
    <div class="book" role="group" aria-label="Order book">
      <div class="lvl hd">
        <span>Price</span>
        <span>Size ({base})</span>
        <span>Total</span>
      </div>
      {[...asks].reverse().map(row("ask"))}
      <div class="spread num">
        <span>
          Spread {formatPrice(book.spread, tick)} ({((book.spread / book.mid) * 100).toFixed(3)}%)
        </span>
        <span>Mid {formatPrice(book.mid, tick ? Number((tick / 10).toPrecision(1)) : undefined)}</span>
      </div>
      {bids.map(row("bid"))}
    </div>
  );
}
