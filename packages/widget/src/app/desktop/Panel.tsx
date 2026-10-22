import { useEffect, useState } from "preact/hooks";
import { positionMargin, type BookView, type OrderHistoryEntry, type Position, type Side } from "@strike-everywhere/core";
import { Chart, type Interval } from "../../Chart";
import { Disclosures } from "../content";
import { pctText, priceText, qtyText, usdText } from "../markets";
import { CloseSheet, EditOrderSheet, MarginSheet, ReverseSheet, TpSlSheet, TrailSheet, exitOrders } from "../PositionTools";
import type { PerpsState } from "../state";
import { Coin, Icon, Sheet } from "../ui";
import { MarketList } from "./Desktop";
import { AccountCard, OrderPanel } from "./OrderPanel";

const IVS: Interval[] = ["15m", "1h", "4h", "1d"];

export function Panel({ s }: { s: PerpsState }) {
  const [sym, setSym] = useState(s.config.market);
  const [side, setSide] = useState<Side>(s.config.side ?? "buy");
  const [iv, setIv] = useState<Interval>("1h");
  const [book, setBook] = useState<BookView | null | undefined>(undefined);
  const [listOpen, setListOpen] = useState(false);
  const [disc, setDisc] = useState(false);

  useEffect(() => setSym(s.config.market), [s.config.market]);
  useEffect(() => setSide(s.config.side ?? "buy"), [s.config.side, s.config.amount]);
  useEffect(() => {
    if (s.markets.length && !s.bySymbol[sym]) setSym(s.markets[0].symbol);
  }, [s.markets.length, sym]);
  const m = s.bySymbol[sym];

  useEffect(() => {
    setBook(undefined);
    if (!m) return;
    const feed = s.client.orderBook(sym);
    let t: ReturnType<typeof setTimeout> | undefined;
    const off = feed.onUpdate(() => {
      if (!t) t = setTimeout(() => ((t = undefined), setBook(feed.view(200))), 250);
    });
    const giveUp = setTimeout(() => setBook((b) => (b === undefined ? null : b)), 10_000);
    return () => (off(), clearTimeout(t), clearTimeout(giveUp), feed.close());
  }, [sym, !!m]);

  const choose = (x: string) => (setSym(x), setListOpen(false));

  return (
    <div class="pd pp">
      <div class="pd-panel pd-head pp-head">
        {m ? (
          <>
            <button class="pd-sym" onClick={() => setListOpen(!listOpen)} aria-haspopup="listbox" aria-expanded={listOpen}>
              <Coin base={m.base} size={32} />
              <span>
                <b>{m.base}-USD</b>
                <span class="muted">{m.name}</span>
              </span>
              <Icon n="down" size={16} />
            </button>
            <span class="sp" />
            <span class="pp-px">
              <b class="num">{priceText(m.mark, m.spec.tickSize)}</b>
              <span class={`num ${m.change >= 0 ? "pos" : "neg"}`}>
                {usdText(m.changeAbs, { sign: true, decimals: Math.abs(m.changeAbs) < 1 ? 4 : 2 })} ({pctText(m.change)})
              </span>
            </span>
          </>
        ) : (
          <span class="muted">{s.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…"}</span>
        )}
        {listOpen && (
          <div class="pd-pop">
            <MarketList s={s} sym={sym} onPick={choose} compact />
          </div>
        )}
      </div>
      {s.config.chart !== false && (
      <div class="pd-panel pp-chart">
        <div class="pd-ivs" role="radiogroup" aria-label="Candle interval">
          {IVS.map((i) => (
            <button key={i} role="radio" aria-checked={iv === i} class={iv === i ? "on" : ""} onClick={() => setIv(i)}>
              {i === "1d" ? "1D" : i}
            </button>
          ))}
        </div>
        {m && <Chart client={s.client} symbol={m.symbol} interval={iv} tick={m.spec.tickSize} height={170} live={{ mark: m.mark, last: m.last, index: m.index }} />}
      </div>
      )}
      <div class="pd-right pp-right">
        <OrderPanel s={s} m={m} book={book} side={side} setSide={setSide} limitPick={null} />
        {s.session && <PanelTrades s={s} onPick={setSym} />}
        <AccountCard s={s} />
      </div>
      <div class="pd-foot">
        <span class="pa-net">{s.testnet ? "Strike testnet" : "Strike mainnet"}</span>
        <span class="sp" />
        <button class="pd-link" onClick={() => setDisc(true)}>
          Disclosures
        </button>
        <a class="pd-link" href={s.client.appUrl()} target="_blank" rel="noopener">
          Powered by Strike
        </a>
      </div>
      {disc && (
        <Sheet title="Disclosures" onClose={() => setDisc(false)} tall>
          <Disclosures s={s} />
        </Sheet>
      )}
    </div>
  );
}

type Tool = null | { kind: "close" | "tpsl" | "trail" | "margin" | "reverse"; p: Position } | { kind: "edit"; o: OrderHistoryEntry };

function PanelTrades({ s, onPick }: { s: PerpsState; onPick: (sym: string) => void }) {
  const [tab, setTab] = useState<"positions" | "orders">("positions");
  const [tool, setTool] = useState<Tool>(null);
  return (
    <div class="pd-panel pp-trades">
      <div class="pd-tabs left">
        <button class={tab === "positions" ? "on" : ""} onClick={() => setTab("positions")}>
          Positions ({s.positions.length})
        </button>
        <button class={tab === "orders" ? "on" : ""} onClick={() => setTab("orders")}>
          Open Orders ({s.orders.length})
        </button>
      </div>
      {tab === "positions" ? (
        s.positions.length ? (
          s.positions.map((p) => {
            const m = s.bySymbol[p.symbol];
            const base = p.symbol.split("-")[0];
            const size = Number(p.size);
            const mark = m?.mark || Number(p.entry_price);
            const tick = m?.spec.tickSize;
            const margin = positionMargin(p);
            const upnl = Number(p.upnl);
            const exits = exitOrders(s, p.symbol);
            const tp = exits.find((o) => String(o.type).startsWith("take_profit"));
            const sl = exits.find((o) => String(o.type).startsWith("stop"));
            const trail = exits.find((o) => String(o.type).startsWith("trailing"));
            return (
              <div class="pp-item" key={p.id}>
                <div class="pp-line">
                  <button class="pd-mk" onClick={() => onPick(p.symbol)}>
                    <Coin base={base} size={20} />
                    <b>{base}</b>
                  </button>
                  <span class={`pd-badge ${size > 0 ? "long" : "short"}`}>
                    {size > 0 ? "Long" : "Short"} {p.leverage}x{p.margin_mode === "isolated" ? " Iso" : ""}
                  </span>
                  <span class="sp" />
                  <b class={`num ${upnl >= 0 ? "pos" : "neg"}`}>
                    {usdText(upnl, { sign: true })} ({pctText(margin > 0 ? (upnl / margin) * 100 : 0, 1)})
                  </b>
                </div>
                <div class="pd-kv muted">
                  <span>Size</span>
                  <span class="num">
                    {qtyText(Math.abs(size))} {base} · {usdText(Math.abs(size) * mark)}
                  </span>
                </div>
                <div class="pd-kv muted">
                  <span>Entry · Liq.</span>
                  <span class="num">
                    {priceText(Number(p.entry_price), tick)} · {Number(p.liquidation_price) > 0 ? priceText(Number(p.liquidation_price), tick) : "—"}
                  </span>
                </div>
                <div class="pd-kv muted">
                  <span>TP / SL</span>
                  <button class="pd-link num" onClick={() => setTool({ kind: "tpsl", p })} title="Edit take profit / stop loss">
                    {tp ? priceText(Number(tp.stop_price), tick) : "—"} / {sl ? priceText(Number(sl.stop_price), tick) : "—"}
                    {trail ? " · trail" : ""} ✎
                  </button>
                </div>
                <div class="pp-acts">
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
                </div>
              </div>
            );
          })
        ) : (
          <div class="pp-empty muted">No open positions</div>
        )
      ) : s.orders.length ? (
        s.orders.map((o) => {
          const tick = s.bySymbol[o.symbol]?.spec.tickSize;
          const editable = !/market$|^market|trailing/.test(String(o.type));
          const px = Number(o.price) ? priceText(Number(o.price), tick) : Number(o.stop_price) ? priceText(Number(o.stop_price), tick) : "Market";
          return (
            <div class="pp-item" key={o.id}>
              <div class="pp-line">
                <button class="pd-mk" onClick={() => onPick(o.symbol)}>
                  <Coin base={o.symbol.split("-")[0]} size={20} />
                  <b>{o.symbol.split("-")[0]}</b>
                </button>
                <span class={o.side === "buy" ? "pos" : "neg"}>{o.side === "buy" ? "Buy" : "Sell"}</span>
                <span class="sp" />
                <span class="num">
                  {qtyText(Number(o.size))} @ {px}
                </span>
              </div>
              <div class="pd-kv muted">
                <span>
                  {String(o.type).replace(/_/g, " ")}
                  {o.reduce_only ? " · reduce only" : ""}
                </span>
                <span class="pp-acts">
                  {editable && (
                    <button class="pd-btn sm" onClick={() => setTool({ kind: "edit", o })}>
                      Edit
                    </button>
                  )}
                  <button class="pd-btn sm" onClick={() => s.cancelOrder(o)}>
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div class="pp-empty muted">No open orders</div>
      )}
      {tool?.kind === "close" && <CloseSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "tpsl" && <TpSlSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "trail" && <TrailSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "margin" && <MarginSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "reverse" && <ReverseSheet s={s} p={tool.p} onClose={() => setTool(null)} />}
      {tool?.kind === "edit" && <EditOrderSheet s={s} o={tool.o} onClose={() => setTool(null)} />}
    </div>
  );
}
