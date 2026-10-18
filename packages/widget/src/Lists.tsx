import { formatPrice, formatUsd, type OrderHistoryEntry, type Position } from "@strike-everywhere/core";
import { Spinner } from "./parts";

export function PositionsList({
  positions,
  marks,
  ticks,
  busyId,
  onClose,
}: {
  positions: Position[];
  marks: Record<string, number>;
  ticks: Record<string, number>;
  busyId: number | null;
  onClose: (p: Position) => void;
}) {
  if (!positions.length) return <div class="empty">No open positions</div>;
  return (
    <>
      {positions.map((p) => {
        const size = Number(p.size);
        const long = size > 0;
        const base = p.symbol.split("-")[0];
        const mark = marks[p.symbol] ?? Number(p.entry_price);
        const pnl = Number(p.upnl);
        const notional = Math.abs(size) * Number(p.entry_price);
        const roe = notional > 0 && p.leverage ? (pnl / (notional / p.leverage)) * 100 : 0;
        return (
          <div class="row" key={p.id}>
            <div class="row-h">
              {p.symbol}
              <span class={`badge ${long ? "long" : "short"}`}>
                {long ? "Long" : "Short"} {p.leverage}x
              </span>
              <button class="mini" disabled={busyId === p.id} onClick={() => onClose(p)}>
                {busyId === p.id ? <Spinner /> : "Close"}
              </button>
            </div>
            <div class="row-g">
              <div>
                <div class="k">Size</div>
                <div class="num">{Math.abs(size).toLocaleString()} {base}</div>
              </div>
              <div>
                <div class="k">Entry</div>
                <div class="num">{formatPrice(Number(p.entry_price), ticks[p.symbol])}</div>
              </div>
              <div>
                <div class="k">Mark</div>
                <div class="num">{formatPrice(mark, ticks[p.symbol])}</div>
              </div>
              <div>
                <div class="k">PnL (ROE)</div>
                <div class={`num ${pnl >= 0 ? "pos" : "neg"}`}>
                  {formatUsd(pnl, { sign: true })} ({roe >= 0 ? "+" : ""}
                  {roe.toFixed(1)}%)
                </div>
              </div>
              <div>
                <div class="k">Liq. Price</div>
                <div class="num">{Number(p.liquidation_price) > 0 ? formatPrice(Number(p.liquidation_price), ticks[p.symbol]) : "—"}</div>
              </div>
              <div>
                <div class="k">Margin</div>
                <div class="num">{p.margin_mode === "cross" ? "Cross" : "Isolated"}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function OrdersList({
  orders,
  ticks,
  busyId,
  onCancel,
}: {
  orders: OrderHistoryEntry[];
  ticks: Record<string, number>;
  busyId: number | null;
  onCancel: (o: OrderHistoryEntry) => void;
}) {
  if (!orders.length) return <div class="empty">No open orders</div>;
  return (
    <>
      {orders.map((o) => (
        <div class="row" key={o.id}>
          <div class="row-h">
            {o.symbol}
            <span class={`badge ${o.side === "buy" ? "long" : "short"}`}>
              {o.side === "buy" ? "Buy" : "Sell"} · {o.type.replace(/_/g, " ")}
            </span>
            <button class="mini" disabled={busyId === o.id} onClick={() => onCancel(o)}>
              {busyId === o.id ? <Spinner /> : "Cancel"}
            </button>
          </div>
          <div class="row-g">
            <div>
              <div class="k">Price</div>
              <div class="num">{Number(o.price) > 0 ? formatPrice(Number(o.price), ticks[o.symbol]) : "Market"}</div>
            </div>
            <div>
              <div class="k">Size</div>
              <div class="num">{Number(o.size).toLocaleString()}</div>
            </div>
            <div>
              <div class="k">Filled</div>
              <div class="num">{Number(o.filled).toLocaleString()}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
