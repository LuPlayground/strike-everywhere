import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { fundingWords, type BookView, type Side } from "@strike-everywhere/core";
import { Chart, type Interval } from "../../Chart";
import { Disclosures } from "../content";
import { compactUsd, countdown, kindOf, pctText, priceText, usdText } from "../markets";
import { filterMarkets, sortMarkets } from "../mobile/Markets";
import type { Mkt, PerpsState } from "../state";
import { Coin, Icon, Sheet } from "../ui";
import { BookTrades } from "./BookTrades";
import { DepthChart, FundingChart, MarketDetails } from "./ChartTabs";
import { Bottom } from "./Bottom";
import { AccountCard, OrderPanel } from "./OrderPanel";

const IVS: Interval[] = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];
type View = "chart" | "funding" | "depth" | "details";
const VIEWS: Array<[View, string]> = [
  ["chart", "Chart"],
  ["funding", "Funding"],
  ["depth", "Depth"],
  ["details", "Details"],
];
type Cat = "all" | "crypto" | "tradfi";

export function Desktop({ s, width }: { s: PerpsState; width: number }) {
  const [sym, setSym] = useState(s.config.market);
  const [side, setSide] = useState<Side>(s.config.side ?? "buy");
  const [iv, setIv] = useState<Interval>("15m");
  const [view, setView] = useState<View>("chart");
  const [book, setBook] = useState<BookView | null | undefined>(undefined);
  const [pick, setPick] = useState<{ p: number; n: number } | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [disc, setDisc] = useState(false);
  const [, tick] = useState(0);
  const [oi, setOi] = useState<number | null>(null);
  const showList = width >= 1380;
  const showBook = width >= 1080;

  useEffect(() => setSym(s.config.market), [s.config.market]);
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
  useEffect(() => {
    let alive = true;
    setOi(null);
    const load = () => s.client.market.openInterest(sym).then((v) => alive && setOi(v)).catch(() => {});
    load();
    const a = setInterval(load, 60_000);
    const b = setInterval(() => tick((n) => n + 1), 1000);
    return () => ((alive = false), clearInterval(a), clearInterval(b));
  }, [sym]);

  const choose = (x: string) => (setSym(x), setListOpen(false));
  const tickSize = m?.spec.tickSize;

  return (
    <div class={`pd${showList ? " with-list" : ""}${showBook ? " with-book" : ""}`}>
      {showList && <MarketList s={s} sym={sym} onPick={choose} />}
      <div class="pd-panel pd-head">
        {m ? (
          <>
            <button class="pd-sym" onClick={() => !showList && setListOpen(!listOpen)} aria-haspopup={!showList ? "listbox" : undefined}>
              <Coin base={m.base} size={30} />
              <span>
                <b>{m.base}-USD</b>
                <span class="muted">{m.name}</span>
              </span>
              {!showList && <Icon n="down" size={16} />}
            </button>
            {s.testnet && <span class="pa-net">Testnet</span>}
            <div class="pd-stats">
            <Stat k="Mark" v={priceText(m.mark, tickSize)} />
            <Stat k="Index" v={priceText(m.index, tickSize)} title="Index price: average spot price on major external exchanges" />
            <Stat k="24h Change" v={`${usdText(m.changeAbs, { sign: true, decimals: Math.abs(m.changeAbs) < 1 ? 4 : 2 })} / ${pctText(m.change)}`} cls={m.change >= 0 ? "pos" : "neg"} />
            <Stat k="24h Volume" v={compactUsd(m.vol24)} />
            <Stat k="Open Interest" v={oi === null ? "—" : compactUsd(oi * m.mark)} />
            <Stat k="Funding / Countdown" v={`${fundingWords(m.funding)}${m.nextFunding > Date.now() ? ` · ${countdown(m.nextFunding)}` : ""}`} cls={m.funding > 0 ? "neg" : m.funding < 0 ? "pos" : ""} />
            </div>
          </>
        ) : (
          <span class="muted">{s.loadError ? `Strike is unreachable right now: ${s.loadError}` : "Loading markets…"}</span>
        )}
        {listOpen && !showList && (
          <div class="pd-pop">
            <MarketList s={s} sym={sym} onPick={choose} compact />
          </div>
        )}
      </div>
      <div class="pd-panel pd-chart">
        <div class="pd-ctabs">
          <span class="tabs" role="tablist" aria-label="Chart view">
            {VIEWS.map(([v, label]) => (
              <button key={v} role="tab" aria-selected={view === v} class={view === v ? "on" : ""} onClick={() => setView(v)}>
                {label}
              </button>
            ))}
          </span>
          {view === "chart" && (
            <span class="pd-ivs flat" role="radiogroup" aria-label="Candle interval">
              {IVS.map((i) => (
                <button key={i} role="radio" aria-checked={iv === i} class={iv === i ? "on" : ""} onClick={() => setIv(i)}>
                  {i === "1d" ? "1D" : i === "1w" ? "1W" : i}
                </button>
              ))}
            </span>
          )}
        </div>
        {m && view === "chart" && <ChartFill s={s} m={m} iv={iv} />}
        {m && view === "funding" && <FundingChart s={s} sym={sym} />}
        {m && view === "depth" && <DepthChart book={book} base={m.base} tick={tickSize} />}
        {m && view === "details" && <MarketDetails s={s} m={m} />}
      </div>
      {showBook && m && <BookTrades s={s} sym={sym} base={m.base} tick={tickSize} book={book} onPrice={(p) => setPick({ p, n: Date.now() })} />}
      <div class="pd-right">
        <OrderPanel s={s} m={m} book={book} side={side} setSide={setSide} limitPick={pick} />
        <AccountCard s={s} />
      </div>
      <Bottom s={s} onPick={choose} />
      <div class="pd-foot">
        <span class={`dot${s.testnet ? " test" : ""}`} />
        <span>{s.testnet ? "Strike testnet" : "Strike mainnet"}</span>
        <span class="sp" />
        <button class="pd-link" onClick={() => setDisc(true)}>
          Disclosures
        </button>
        <a class="pd-link" href="https://www.strikefinance.org/terms" target="_blank" rel="noopener">
          Terms
        </a>
        <a class="pd-link" href={s.client.appUrl()} target="_blank" rel="noopener">
          Powered by Strike
        </a>
        <span class="muted">via {s.config.builderCode}</span>
      </div>
      {disc && (
        <Sheet title="Disclosures" onClose={() => setDisc(false)} tall>
          <Disclosures s={s} />
        </Sheet>
      )}
    </div>
  );
}

function Stat({ k, v, cls, title }: { k: string; v: string; cls?: string; title?: string }) {
  return (
    <div class="pd-stat" title={title}>
      <span class="k">{k}</span>
      <span class={`v num ${cls ?? ""}`}>{v}</span>
    </div>
  );
}

function ChartFill({ s, m, iv }: { s: PerpsState; m: Mkt; iv: Interval }) {
  const box = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(360);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => el.clientHeight && setH(Math.max(220, el.clientHeight)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div class="pd-chart-box" ref={box}>
      <Chart client={s.client} symbol={m.symbol} interval={iv} tick={m.spec.tickSize} height={h} live={{ mark: m.mark, last: m.last, index: m.index }} />
    </div>
  );
}

export function MarketList({ s, sym, onPick, compact }: { s: PerpsState; sym: string; onPick: (s: string) => void; compact?: boolean }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("all");
  const rows = sortMarkets(filterMarkets(s.markets, q), "volume", true).filter((m) => cat === "all" || (cat === "crypto" ? kindOf(m.base) === "crypto" : kindOf(m.base) !== "crypto"));
  return (
    <div class={`pd-panel pd-list${compact ? " compact" : ""}`}>
      <div class="pd-tabs">
        {(["all", "crypto", "tradfi"] as const).map((c) => (
          <button key={c} class={cat === c ? "on" : ""} onClick={() => setCat(c)}>
            {c === "all" ? "All" : c === "crypto" ? "Crypto" : "TradFi"}
          </button>
        ))}
      </div>
      <label class="pd-search">
        <Icon n="search" size={16} />
        <input placeholder="Search markets" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search markets" />
      </label>
      <div class="pd-list-h">
        <span>Market</span>
        <span>Price / 24h</span>
      </div>
      <div class="pd-list-b">
        {rows.map((m) => (
          <button key={m.symbol} class={`pd-mrow${m.symbol === sym ? " on" : ""}`} onClick={() => onPick(m.symbol)}>
            <Coin base={m.base} size={28} />
            <span class="l">
              <b>
                {m.base} <span class="pa-lev" title="Strike's maximum leverage for this market">{m.strikeMaxLev}x</span>
              </b>
              <span class="muted num">{compactUsd(m.vol24)} Vol</span>
            </span>
            <span class="r num">
              <b>{priceText(m.mark, m.spec.tickSize)}</b>
              <span class={m.change >= 0 ? "pos" : "neg"}>{pctText(m.change)}</span>
            </span>
          </button>
        ))}
        {!rows.length && <div class="pd-center muted">{s.markets.length ? "No markets match" : "Loading…"}</div>}
      </div>
    </div>
  );
}
