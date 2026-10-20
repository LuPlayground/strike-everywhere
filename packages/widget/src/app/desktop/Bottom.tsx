import { useEffect, useState } from "preact/hooks";
import { fillDirection, type FillRow } from "@strike-everywhere/core";
import { priceText, qtyText, usdText, pctText, dateText, timeText } from "../markets";
import type { PerpsState } from "../state";
import { Coin, Spin } from "../ui";
import { useActivity } from "../mobile/History";

type Tab = "positions" | "orders" | "fills" | "transfers";

export function Bottom({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  const [tab, setTab] = useState<Tab>("positions");
  const tabs: Array<[Tab, string]> = [
    ["positions", `Positions (${s.positions.length})`],
    ["orders", `Open Orders (${s.orders.length})`],
    ["fills", "Trade History"],
    ["transfers", "Deposits & Withdrawals"],
  ];
  return (
    <div class="pd-panel pd-bottom">
      <div class="pd-tabs left">
        {tabs.map(([t, label]) => (
          <button key={t} class={tab === t ? "on" : ""} onClick={() => setTab(t)}>
            {label}
          </button>
        ))}
      </div>
      <div class="pd-table-wrap">
        {!s.session ? (
          <div class="pd-center">
            <span class="muted">No wallet connected</span>
            <button class="pd-btn sm" onClick={() => s.setSheet("connect")}>
              Connect wallet
            </button>
          </div>
        ) : tab === "positions" ? (
          <Positions s={s} onPick={onPick} />
        ) : tab === "orders" ? (
          <Orders s={s} onPick={onPick} />
        ) : tab === "fills" ? (
          <Fills s={s} />
        ) : (
          <Transfers s={s} />
        )}
      </div>
    </div>
  );
}

function Positions({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  const [ask, setAsk] = useState<number | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  if (!s.positions.length) return <div class="pd-center muted">No open positions</div>;
  const close = async (id: number, f: number) => {
    const p = s.positions.find((x) => x.id === id);
    if (!p) return;
    setBusy(id);
    setAsk(null);
    await s.closePosition(p, f);
    setBusy(null);
  };
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Market</th>
          <th>Size</th>
          <th>Value</th>
          <th>Entry</th>
          <th>Mark</th>
          <th>PnL (ROE)</th>
          <th>Liq. Price</th>
          <th>Margin</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {s.positions.map((p) => {
          const m = s.bySymbol[p.symbol];
          const base = p.symbol.split("-")[0];
          const size = Number(p.size);
          const mark = m?.mark || Number(p.entry_price);
          const tick = m?.spec.tickSize;
          const margin = (Math.abs(size) * Number(p.entry_price)) / Math.max(1, Number(p.leverage) || 1);
          const upnl = Number(p.upnl);
          return (
            <tr key={p.id}>
              <td>
                <button class="pd-mk" onClick={() => onPick(p.symbol)}>
                  <Coin base={base} size={20} />
                  <b>{base}</b>
                  <span class={`pd-badge ${size > 0 ? "long" : "short"}`}>
                    {size > 0 ? "Long" : "Short"} {p.leverage}x
                  </span>
                </button>
              </td>
              <td class="num">
                {qtyText(Math.abs(size))} {base}
              </td>
              <td class="num">{usdText(Math.abs(size) * mark)}</td>
              <td class="num">{priceText(Number(p.entry_price), tick)}</td>
              <td class="num">{priceText(mark, tick)}</td>
              <td class={`num ${upnl >= 0 ? "pos" : "neg"}`}>
                {usdText(upnl, { sign: true })} ({pctText(margin > 0 ? (upnl / margin) * 100 : 0, 1)})
              </td>
              <td class="num">{Number(p.liquidation_price) > 0 ? priceText(Number(p.liquidation_price), tick) : "—"}</td>
              <td class="num">{usdText(margin)}</td>
              <td class="act">
                {busy === p.id ? (
                  <Spin size={14} />
                ) : ask === p.id ? (
                  <>
                    <button class="pd-btn sm" onClick={() => setAsk(null)}>
                      Keep
                    </button>
                    <button class="pd-btn sm" onClick={() => close(p.id, 0.5)}>
                      50%
                    </button>
                    <button class="pd-btn sm primary" onClick={() => close(p.id, 1)}>
                      Close all
                    </button>
                  </>
                ) : (
                  <button class="pd-btn sm" onClick={() => setAsk(p.id)}>
                    Close
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Orders({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  if (!s.orders.length) return <div class="pd-center muted">No open orders</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Type</th>
          <th>Side</th>
          <th>Size</th>
          <th>Price</th>
          <th>Filled</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {s.orders.map((o) => {
          const base = o.symbol.split("-")[0];
          const tick = s.bySymbol[o.symbol]?.spec.tickSize;
          const px = Number(o.price) || Number(o.stop_price);
          return (
            <tr key={o.id}>
              <td class="muted num">
                {dateText(Number(o.create_timestamp))} {timeText(Number(o.create_timestamp))}
              </td>
              <td>
                <button class="pd-mk" onClick={() => onPick(o.symbol)}>
                  <Coin base={base} size={20} />
                  <b>{base}</b>
                </button>
              </td>
              <td>
                {String(o.type).replace(/_/g, " ")}
                {o.reduce_only ? " · closes" : ""}
              </td>
              <td class={o.side === "buy" ? "pos" : "neg"}>{o.side === "buy" ? "Buy" : "Sell"}</td>
              <td class="num">{qtyText(Number(o.size))}</td>
              <td class="num">{px ? priceText(px, tick) : "Market"}</td>
              <td class="num">{qtyText(Number(o.filled) || 0)}</td>
              <td class="act">
                <button class="pd-btn sm" onClick={() => s.cancelOrder(o)}>
                  Cancel
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Fills({ s }: { s: PerpsState }) {
  const [rows, setRows] = useState<FillRow[] | null>(null);
  useEffect(() => {
    let alive = true;
    s.client.account
      .fillsPage({ limit: 50 })
      .then((p) => alive && setRows(p.items))
      .catch(() => alive && setRows([]));
    return () => {
      alive = false;
    };
  }, [s.session?.accountId, s.positions.length]);
  if (rows === null)
    return (
      <div class="pd-center">
        <Spin />
      </div>
    );
  if (!rows.length) return <div class="pd-center muted">Your trades will appear here after your first order.</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Direction</th>
          <th>Price</th>
          <th>Size</th>
          <th>Fee</th>
          <th>Closed PnL</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((f) => {
          const base = f.symbol.split("-")[0];
          const dir = fillDirection(f.side, f.realizedPnl);
          return (
            <tr key={f.id}>
              <td class="muted num">
                {dateText(f.time)} {timeText(f.time)}
              </td>
              <td>
                <span class="pd-mk">
                  <Coin base={base} size={20} />
                  <b>{base}</b>
                </span>
              </td>
              <td class={f.side === "buy" ? "pos" : "neg"}>{dir || "—"}</td>
              <td class="num">{f.price === null ? "—" : priceText(f.price, s.bySymbol[f.symbol]?.spec.tickSize)}</td>
              <td class="num">{f.size === null ? "—" : qtyText(f.size)}</td>
              <td class="num">{f.fee === null ? "—" : usdText(f.fee, { decimals: 4 })}</td>
              <td class={`num ${(f.realizedPnl ?? 0) > 0 ? "pos" : (f.realizedPnl ?? 0) < 0 ? "neg" : "muted"}`}>{f.realizedPnl ? usdText(f.realizedPnl, { sign: true }) : "—"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Transfers({ s }: { s: PerpsState }) {
  const { items, error } = useActivity(s);
  const rows = (items ?? []).filter((a) => a.id.startsWith("t"));
  if (items === null)
    return (
      <div class="pd-center">
        <Spin />
      </div>
    );
  if (error) return <div class="pd-center muted">{error}</div>;
  if (!rows.length) return <div class="pd-center muted">No deposits or withdrawals yet.</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Activity</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => (
          <tr key={a.id}>
            <td class="muted num">
              {dateText(a.time)} {timeText(a.time)}
            </td>
            <td>{a.title}</td>
            <td class="muted">{/Pending/.test(a.sub) ? "Pending" : /Failed/.test(a.sub) ? "Failed" : "Completed"}</td>
            <td class={`num ${a.cls}`}>{a.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
