import { useEffect, useState } from "preact/hooks";
import { fillDirection, type ClosedPositionRow, type FillRow, type FundingRow, type GridBot, type OrderHistoryEntry, type Position, type TwapStrategy } from "@strike-everywhere/core";
import { pageHidden } from "../../parts";
import { dateText, priceText, pctText, qtyText, timeText, usdText } from "../markets";
import { CloseAllSheet, CloseSheet, EditOrderSheet, MarginSheet, ReverseSheet, TpSlSheet, TrailSheet, exitOrders } from "../PositionTools";
import type { PerpsState } from "../state";
import { Coin, Spin } from "../ui";
import { useActivity } from "../mobile/History";

type Tab = "positions" | "orders" | "twap" | "grid" | "closed" | "ohist" | "fills" | "funding" | "transfers";
type PosTool = null | { kind: "close" | "tpsl" | "trail" | "margin" | "reverse"; p: Position } | { kind: "closeall" };

export function Bottom({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  const [tab, setTab] = useState<Tab>("positions");
  const tabs: Array<[Tab, string]> = [
    ["positions", `Positions (${s.positions.length})`],
    ["orders", `Open Orders (${s.orders.length})`],
    ["twap", "TWAP"],
    ["grid", "Grid"],
    ["closed", "Position History"],
    ["ohist", "Order History"],
    ["fills", "Trade History"],
    ["funding", "Funding History"],
    ["transfers", "Deposits & Withdrawals"],
  ];
  return (
    <div class="pd-panel pd-bottom">
      <div class="pd-tabs left scroll">
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
        ) : tab === "twap" ? (
          <Twaps s={s} />
        ) : tab === "grid" ? (
          <Grids s={s} />
        ) : tab === "closed" ? (
          <Closed s={s} />
        ) : tab === "ohist" ? (
          <OrderHist s={s} />
        ) : tab === "fills" ? (
          <Fills s={s} />
        ) : tab === "funding" ? (
          <Funding s={s} />
        ) : (
          <Transfers s={s} />
        )}
      </div>
    </div>
  );
}

function Mk({ sym, onPick }: { sym: string; onPick?: (s: string) => void }) {
  const base = sym.split("-")[0];
  const body = (
    <>
      <Coin base={base} size={20} />
      <b>{base}</b>
    </>
  );
  return onPick ? (
    <button class="pd-mk" onClick={() => onPick(sym)}>
      {body}
    </button>
  ) : (
    <span class="pd-mk">{body}</span>
  );
}

function Positions({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  const [tool, setTool] = useState<PosTool>(null);
  if (!s.positions.length) return <div class="pd-center muted">No open positions</div>;
  return (
    <>
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
            <th>Funding</th>
            <th>TP / SL</th>
            <th class="act">
              <button class="pd-btn sm" onClick={() => setTool({ kind: "closeall" })}>
                Close all
              </button>
            </th>
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
            const exits = exitOrders(s, p.symbol);
            const tp = exits.find((o) => String(o.type).startsWith("take_profit"));
            const sl = exits.find((o) => String(o.type).startsWith("stop"));
            const trail = exits.find((o) => String(o.type).startsWith("trailing"));
            return (
              <tr key={p.id}>
                <td>
                  <span class="pd-mk">
                    <button class="pd-mk" onClick={() => onPick(p.symbol)}>
                      <Coin base={base} size={20} />
                      <b>{base}</b>
                    </button>
                    <span class={`pd-badge ${size > 0 ? "long" : "short"}`}>
                      {size > 0 ? "Long" : "Short"} {p.leverage}x {p.margin_mode === "isolated" ? "Iso" : ""}
                    </span>
                  </span>
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
                <td class="num">{Number(p.accumulated_funding_fees) ? usdText(Number(p.accumulated_funding_fees), { decimals: 4 }) : "—"}</td>
                <td class="num">
                  <button class="pd-link" onClick={() => setTool({ kind: "tpsl", p })} title="Edit take profit / stop loss">
                    {tp ? priceText(Number(tp.stop_price), tick) : "—"} / {sl ? priceText(Number(sl.stop_price), tick) : "—"}
                    {trail ? " · trail" : ""} ✎
                  </button>
                </td>
                <td class="act">
                  <button class="pd-btn sm" onClick={() => setTool({ kind: "close", p })}>
                    Close
                  </button>
                  <button class="pd-btn sm" title="Trailing stop" onClick={() => setTool({ kind: "trail", p })}>
                    Trail
                  </button>
                  {p.margin_mode === "isolated" && (
                    <button class="pd-btn sm" title="Add or remove margin" onClick={() => setTool({ kind: "margin", p })}>
                      Margin
                    </button>
                  )}
                  <button class="pd-btn sm" title="Reverse position (long ↔ short)" onClick={() => setTool({ kind: "reverse", p })}>
                    Reverse
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {tool?.kind === "close" && <CloseSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "tpsl" && <TpSlSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "trail" && <TrailSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "margin" && <MarginSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "reverse" && <ReverseSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "closeall" && <CloseAllSheet s={s} onClose={() => setTool(null)} />}
    </>
  );
}

function Orders({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  const [edit, setEdit] = useState<OrderHistoryEntry | null>(null);
  if (!s.orders.length) return <div class="pd-center muted">No open orders</div>;
  return (
    <>
      <table class="pd-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Market</th>
            <th>Type</th>
            <th>Side</th>
            <th>Size</th>
            <th>Price</th>
            <th>Trigger</th>
            <th>Filled</th>
            <th class="act">
              <button class="pd-btn sm" onClick={() => s.cancelAll()}>
                Cancel all
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {s.orders.map((o) => {
            const tick = s.bySymbol[o.symbol]?.spec.tickSize;
            const editable = !/market$|^market|trailing/.test(String(o.type));
            return (
              <tr key={o.id}>
                <td class="muted num">
                  {dateText(Number(o.create_timestamp))} {timeText(Number(o.create_timestamp))}
                </td>
                <td>
                  <Mk sym={o.symbol} onPick={onPick} />
                </td>
                <td>
                  {String(o.type).replace(/_/g, " ")}
                  {o.reduce_only ? " · reduce only" : ""}
                </td>
                <td class={o.side === "buy" ? "pos" : "neg"}>{o.side === "buy" ? "Buy" : "Sell"}</td>
                <td class="num">{qtyText(Number(o.size))}</td>
                <td class="num">{Number(o.price) ? priceText(Number(o.price), tick) : "Market"}</td>
                <td class="num">{Number(o.stop_price) ? priceText(Number(o.stop_price), tick) : "—"}</td>
                <td class="num">{qtyText(Number(o.filled) || 0)}</td>
                <td class="act">
                  {editable && (
                    <button class="pd-btn sm" onClick={() => setEdit(o)}>
                      Edit
                    </button>
                  )}
                  <button class="pd-btn sm" onClick={() => s.cancelOrder(o)}>
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {edit && <EditOrderSheet s={s} o={edit} onClose={() => setEdit(null)} />}
    </>
  );
}

function useList<T>(load: () => Promise<T[]>, deps: unknown[], ms = 0): [T[] | null, () => void] {
  const [rows, setRows] = useState<T[] | null>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    let alive = true;
    const run = () => load().then((r) => alive && setRows(r)).catch(() => alive && setRows((x) => x ?? []));
    run();
    const t = ms ? setInterval(() => !pageHidden() && run(), ms) : undefined;
    return () => {
      alive = false;
      if (t) clearInterval(t);
    };
  }, [...deps, n]);
  return [rows, () => setN(n + 1)];
}

const Loading = () => (
  <div class="pd-center">
    <Spin />
  </div>
);

function Twaps({ s }: { s: PerpsState }) {
  const [rows, reload] = useList<TwapStrategy>(() => s.client.trading.twaps("all"), [s.session?.accountId], 5000);
  if (rows === null) return <Loading />;
  if (!rows.length) return <div class="pd-center muted">No TWAP orders. Start one from the order panel (Order Type → TWAP).</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Started</th>
          <th>Market</th>
          <th>Side</th>
          <th>Filled</th>
          <th>Slices</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td class="muted num">{t.createdAt ? `${dateText(t.createdAt)} ${timeText(t.createdAt)}` : "—"}</td>
            <td>
              <Mk sym={t.symbol} />
            </td>
            <td class={t.side === "buy" ? "pos" : "neg"}>{t.side === "buy" ? "Buy" : "Sell"}</td>
            <td class="num">
              {qtyText(t.filledSize ?? 0)} / {qtyText(t.totalSize ?? 0)}
            </td>
            <td class="num">
              {t.slicesFired ?? "—"}
              {t.nominalSlices ? ` / ${t.nominalSlices}` : ""}
            </td>
            <td>{t.status}</td>
            <td class="act">
              {(t.status === "active" || t.status === "running") && (
                <button class="pd-btn sm" onClick={async () => (await s.client.trading.cancelTwap(t.id).then(() => s.notify("ok", "TWAP cancelling")).catch((e) => s.notify("err", "Couldn't cancel", e?.message)), reload())}>
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Grids({ s }: { s: PerpsState }) {
  const [rows, reload] = useList<GridBot>(() => s.client.trading.grids(), [s.session?.accountId], 8000);
  if (rows === null) return <Loading />;
  if (!rows.length) return <div class="pd-center muted">No grid bots. Start one from the order panel (Order Type → Grid bot).</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Started</th>
          <th>Market</th>
          <th>Mode</th>
          <th>Range</th>
          <th>Grids</th>
          <th>Collateral</th>
          <th>Grid profit</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {rows.map((g) => {
          const tick = s.bySymbol[g.symbol]?.spec.tickSize;
          return (
            <tr key={g.id}>
              <td class="muted num">{g.createdAt ? `${dateText(g.createdAt)} ${timeText(g.createdAt)}` : "—"}</td>
              <td>
                <Mk sym={g.symbol} />
              </td>
              <td>{g.mode.toLowerCase()}</td>
              <td class="num">
                {g.lower ? priceText(g.lower, tick) : "—"} – {g.upper ? priceText(g.upper, tick) : "—"}
              </td>
              <td class="num">
                {g.grids ?? "—"} {g.levels ? `(${g.filledLevels} filled)` : ""}
              </td>
              <td class="num">{g.collateral === null ? "—" : usdText(g.collateral)}</td>
              <td class={`num ${(g.profit ?? 0) > 0 ? "pos" : (g.profit ?? 0) < 0 ? "neg" : ""}`}>{g.profit === null ? "—" : usdText(g.profit, { sign: true })}</td>
              <td>{g.status.toLowerCase()}</td>
              <td class="act">
                {(g.status === "RUNNING" || g.status === "CREATED") && (
                  <button class="pd-btn sm" onClick={async () => (await s.client.trading.stopGrid(g.id, true).then(() => s.notify("ok", "Grid bot stopping", "Its open orders are cancelled.")).catch((e) => s.notify("err", "Couldn't stop", e?.message)), reload())}>
                    Stop
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

function Closed({ s }: { s: PerpsState }) {
  const [rows] = useList<ClosedPositionRow>(() => s.client.account.closedPositionsPage({ limit: 25 }).then((p) => p.items), [s.session?.accountId, s.positions.length]);
  if (rows === null) return <Loading />;
  if (!rows.length) return <div class="pd-center muted">No closed positions yet.</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Closed</th>
          <th>Market</th>
          <th>Margin</th>
          <th>Held</th>
          <th>Realized PnL</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => {
          const mins = p.openTime && p.closeTime ? Math.max(0, Math.round((p.closeTime - p.openTime) / 60_000)) : null;
          return (
            <tr key={p.id}>
              <td class="muted num">
                {dateText(p.closeTime)} {timeText(p.closeTime)}
              </td>
              <td>
                <Mk sym={p.symbol} />
              </td>
              <td>{p.marginMode || "—"}</td>
              <td class="num">{mins === null ? "—" : mins >= 1440 ? `${Math.floor(mins / 1440)}d` : mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`}</td>
              <td class={`num ${(p.realizedPnl ?? 0) > 0 ? "pos" : (p.realizedPnl ?? 0) < 0 ? "neg" : ""}`}>{p.realizedPnl === null ? "—" : usdText(p.realizedPnl, { sign: true })}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function OrderHist({ s }: { s: PerpsState }) {
  const [rows] = useList<OrderHistoryEntry>(() => s.client.account.orderHistoryPage({ limit: 50 }).then((p) => p.items), [s.session?.accountId, s.orders.length, s.positions.length]);
  if (rows === null) return <Loading />;
  if (!rows.length) return <div class="pd-center muted">No orders yet.</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Type</th>
          <th>Side</th>
          <th>Size</th>
          <th>Filled</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((o) => (
          <tr key={o.id}>
            <td class="muted num">
              {dateText(Number(o.create_timestamp))} {timeText(Number(o.create_timestamp))}
            </td>
            <td>
              <Mk sym={o.symbol} />
            </td>
            <td>
              {String(o.type).replace(/_/g, " ")}
              {o.reduce_only ? " · reduce only" : ""}
            </td>
            <td class={o.side === "buy" ? "pos" : "neg"}>{o.side === "buy" ? "Buy" : "Sell"}</td>
            <td class="num">{qtyText(Number(o.size))}</td>
            <td class="num">{qtyText(Number(o.filled) || 0)}</td>
            <td class="num">{Number(o.price) ? priceText(Number(o.price), s.bySymbol[o.symbol]?.spec.tickSize) : Number(o.stop_price) ? `@${priceText(Number(o.stop_price), s.bySymbol[o.symbol]?.spec.tickSize)}` : "Market"}</td>
            <td class={o.status === "rejected" ? "neg" : "muted"}>{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Fills({ s }: { s: PerpsState }) {
  const [rows] = useList<FillRow>(() => s.client.account.fillsPage({ limit: 50 }).then((p) => p.items), [s.session?.accountId, s.positions.length]);
  if (rows === null) return <Loading />;
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
        {rows.map((f) => (
          <tr key={f.id}>
            <td class="muted num">
              {dateText(f.time)} {timeText(f.time)}
            </td>
            <td>
              <Mk sym={f.symbol} />
            </td>
            <td class={f.side === "buy" ? "pos" : "neg"}>{fillDirection(f.side, f.realizedPnl) || "—"}</td>
            <td class="num">{f.price === null ? "—" : priceText(f.price, s.bySymbol[f.symbol]?.spec.tickSize)}</td>
            <td class="num">{f.size === null ? "—" : qtyText(f.size)}</td>
            <td class="num">{f.fee === null ? "—" : usdText(f.fee, { decimals: 4 })}</td>
            <td class={`num ${(f.realizedPnl ?? 0) > 0 ? "pos" : (f.realizedPnl ?? 0) < 0 ? "neg" : "muted"}`}>{f.realizedPnl ? usdText(f.realizedPnl, { sign: true }) : "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Funding({ s }: { s: PerpsState }) {
  const [rows] = useList<FundingRow>(() => s.client.account.fundingPage({ limit: 50 }).then((p) => p.items), [s.session?.accountId]);
  if (rows === null) return <Loading />;
  if (!rows.length) return <div class="pd-center muted">No funding payments yet. They happen every hour while a position is open.</div>;
  return (
    <table class="pd-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Side</th>
          <th>Size</th>
          <th>Rate</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((f) => (
          <tr key={f.id}>
            <td class="muted num">
              {dateText(f.time)} {timeText(f.time)}
            </td>
            <td>
              <Mk sym={f.symbol} />
            </td>
            <td>{f.positionSide}</td>
            <td class="num">{f.positionSize === null ? "—" : qtyText(f.positionSize)}</td>
            <td class="num">{f.rate === null ? "—" : `${(f.rate * 100).toFixed(4)}%`}</td>
            <td class={`num ${(f.amount ?? 0) > 0 ? "pos" : (f.amount ?? 0) < 0 ? "neg" : ""}`}>{f.amount === null ? "—" : usdText(f.amount, { sign: true, decimals: 4 })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Transfers({ s }: { s: PerpsState }) {
  const { items, error } = useActivity(s);
  const rows = (items ?? []).filter((a) => a.id.startsWith("t"));
  if (items === null) return <Loading />;
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
