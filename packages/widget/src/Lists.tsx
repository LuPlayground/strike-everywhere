import { fmtBase, formatPrice, formatUsd, movePct, type OrderHistoryEntry, type Position } from "@strike-everywhere/core";
import { Confirm, Spinner, fmtSize } from "./parts";

export function PositionsList({
  positions,
  marks,
  ticks,
  busy,
  flash,
  note,
  confirming,
  onAsk,
  onClose,
  closeText,
}: {
  positions: Position[];
  marks: Record<string, number>;
  ticks: Record<string, number>;
  busy: Set<string>;
  flash?: string;
  note?: { id: number; kind: "ok" | "err"; text: string } | null;
  confirming: number | null;
  onAsk: (p: Position | null) => void;
  onClose: (p: Position) => void;
  closeText: (p: Position) => string;
}) {
  if (!positions.length) return <div class="empty">No open positions yet. Open a Long or Short above; it will appear here with live profit/loss.</div>;
  return (
    <>
      {positions.map((p) => {
        const size = Number(p.size);
        const long = size > 0;
        const base = p.symbol.split("-")[0];
        const tick = ticks[p.symbol];
        const mark = marks[p.symbol] ?? Number(p.entry_price);
        const pnl = Number(p.upnl);
        const notional = Math.abs(size) * Number(p.entry_price);
        const margin = notional > 0 && p.leverage ? notional / p.leverage : 0;
        const roe = margin > 0 ? (pnl / margin) * 100 : 0;
        const liq = Number(p.liquidation_price);
        const id = `pos:${p.id}`;
        return (
          <div class={`row${flash === p.symbol ? " flash" : ""}`} key={p.id}>
            <div class="row-h">
              <span class={`badge ${long ? "long" : "short"}`}>{long ? "Long" : "Short"}</span>
              <span class="pos-t">
                <span class="num">{fmtBase(Math.abs(size))}</span> {base} <span class="muted">(~{formatUsd(Math.abs(size) * mark)}){Number(p.leverage) > 0 ? ` · ${p.leverage}x` : ""}</span>
              </span>
              <button class="mini" disabled={busy.has(id)} aria-expanded={confirming === p.id} onClick={() => onAsk(confirming === p.id ? null : p)}>
                {busy.has(id) ? <Spinner /> : "Close"}
              </button>
            </div>
            {note && note.id === p.id && <div class={`ticket-msg ${note.kind}`} role="status">{note.text}</div>}
            {confirming === p.id && !busy.has(id) && (
              <Confirm
                actions={
                  <>
                    <button class="mini" onClick={() => onAsk(null)}>Keep</button>
                    <button class="mini danger" onClick={() => onClose(p)}>Close at market</button>
                  </>
                }
              >
                {closeText(p)}
              </Confirm>
            )}
            <div class="row-g pos-g">
              <div class="wide">
                <div class="k">Profit/Loss</div>
                <div class={`num ${pnl >= 0 ? "pos" : "neg"}`}>
                  {formatUsd(pnl, { sign: true })} · {roe >= 0 ? "+" : ""}
                  {roe.toFixed(1)}% <span class="of">of margin</span>
                </div>
              </div>
              <div>
                <div class="k">Entry</div>
                <div class="num">{formatPrice(Number(p.entry_price), tick)}</div>
              </div>
              <div>
                <div class="k">Mark</div>
                <div class="num">{formatPrice(mark, tick)}</div>
              </div>
              <div>
                <div class="k">Liq. price</div>
                <div class="num">{liq > 0 ? <>{formatPrice(liq, tick)} <span class="of">({movePct(mark, liq)} away)</span></> : "—"}</div>
              </div>
              <div>
                <div class="k">Margin</div>
                <div class="num">
                  {margin > 0 ? `${formatUsd(margin)} · ` : ""}
                  <span class="of">{p.margin_mode === "cross" ? "Cross" : "Isolated"}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function sideMeaning(o: Pick<OrderHistoryEntry, "side" | "reduce_only">): string {
  if (o.reduce_only) return o.side === "buy" ? "Buy: closes (part of) a Short" : "Sell: closes (part of) a Long";
  return o.side === "buy" ? "Buy: opens or adds to a Long (or reduces a Short)" : "Sell: opens or adds to a Short (or reduces a Long)";
}

export function OrdersList({
  orders,
  ticks,
  busy,
  onCancel,
}: {
  orders: OrderHistoryEntry[];
  ticks: Record<string, number>;
  busy: Set<string>;
  onCancel: (o: OrderHistoryEntry) => void;
}) {
  if (!orders.length) return <div class="empty">Limit and stop orders that are waiting to fill show here.</div>;
  return (
    <>
      {orders.map((o) => (
        <div class="row" key={o.id}>
          <div class="row-h">
            {o.symbol}
            <span class={`badge ${o.side === "buy" ? "long" : "short"}`} title={sideMeaning(o)}>
              {o.side === "buy" ? "Buy" : "Sell"} · {String(o.type ?? "").replace(/_/g, " ")}
            </span>
            {o.reduce_only && <span class="t muted">closes {o.side === "buy" ? "Short" : "Long"}</span>}
            <button class="mini" disabled={busy.has(`ord:${o.id}`)} onClick={() => onCancel(o)}>
              {busy.has(`ord:${o.id}`) ? <Spinner /> : "Cancel"}
            </button>
          </div>
          <div class="row-g">
            <div>
              <div class="k">Price</div>
              <div class="num">{Number(o.stop_price) > 0
                  ? `Trigger ${formatPrice(Number(o.stop_price), ticks[o.symbol])}${Number(o.price) > 0 ? ` · ${formatPrice(Number(o.price), ticks[o.symbol])}` : ""}`
                  : Number(o.price) > 0
                    ? formatPrice(Number(o.price), ticks[o.symbol])
                    : "Market"}</div>
            </div>
            <div>
              <div class="k">Size</div>
              <div class="num">{fmtSize(Number(o.size))}</div>
            </div>
            <div>
              <div class="k">Filled</div>
              <div class="num">{fmtSize(Number(o.filled))}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
