import { useEffect, useState } from "preact/hooks";
import { type BookView, type Side } from "@strike-everywhere/core";
import { Chart, type Interval } from "../../Chart";
import { Disclosures } from "../content";
import { pctText, priceText, usdText } from "../markets";
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
          <span class="muted">{s.loadError ? `Strike is unreachable right now: ${s.loadError}` : "Loading markets…"}</span>
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
