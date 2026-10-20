import { useEffect, useRef, useState } from "preact/hooks";
import type { Side } from "@strike-everywhere/core";
import { LISTS, compactUsd, pctText, priceText } from "../markets";
import type { Mkt, PerpsState } from "../state";
import { Coin, Icon, RoundBtn, Sheet } from "../ui";
import type { Nav } from "./Mobile";

type SortKey = "volume" | "price" | "change" | "name" | "leverage";
const SORTS: Array<[SortKey, string]> = [
  ["volume", "Volume"],
  ["change", "24h change"],
  ["price", "Price"],
  ["leverage", "Max leverage"],
  ["name", "Name"],
];

export function sortMarkets(list: Mkt[], key: SortKey, desc: boolean): Mkt[] {
  const v = (m: Mkt): number | string => (key === "volume" ? m.vol24 : key === "price" ? m.mark : key === "change" ? m.change : key === "leverage" ? m.strikeMaxLev : m.base);
  return [...list].sort((a, b) => {
    const x = v(a);
    const y = v(b);
    const c = typeof x === "string" ? x.localeCompare(y as string) : (x as number) - (y as number);
    return desc ? -c : c;
  });
}

export function filterMarkets(list: Mkt[], q: string, listId?: string): Mkt[] {
  const def = LISTS.find((l) => l.id === listId);
  const ql = q.trim().toLowerCase();
  return list.filter(
    (m) => (!def || def.test(m.base, { change: m.change, createdAt: m.createdAt })) && (!ql || m.base.toLowerCase().includes(ql) || m.name.toLowerCase().includes(ql) || m.symbol.toLowerCase().includes(ql)),
  );
}

export function Markets({ s, nav, list, pick, focus }: { s: PerpsState; nav: Nav; list?: string; pick?: Side; focus?: boolean }) {
  const [q, setQ] = useState("");
  const [listId, setListId] = useState(list);
  const def = LISTS.find((l) => l.id === listId);
  const [sort, setSort] = useState<SortKey>(def?.sort === "change" || def?.sort === "-change" ? "change" : "volume");
  const [desc, setDesc] = useState(def?.sort !== "-change");
  const [sortOpen, setSortOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) setTimeout(() => input.current?.focus(), 50);
  }, []);

  const rows = sortMarkets(filterMarkets(s.markets, q, listId), sort, desc);
  const byVol = sortMarkets(s.markets, "volume", true).map((m) => m.symbol);
  const go = (m: Mkt) => (pick ? nav.replace({ k: "trade", sym: m.symbol, side: pick }) : nav.push({ k: "market", sym: m.symbol }));
  const title = pick ? (pick === "buy" ? "Long which market?" : "Short which market?") : def?.label ?? "Perps";

  return (
    <div class="pa-screen">
      <div class="pa-top">
        <RoundBtn n="back" label="Back" onClick={nav.back} />
        <div class="pa-title">{title}</div>
      </div>
      <div class="pa-scroll">
        <label class="pa-search">
          <Icon n="search" size={18} />
          <input ref={input} placeholder="Search" aria-label="Search markets" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} />
          {q && (
            <button aria-label="Clear" onClick={() => setQ("")}>
              <Icon n="x" size={14} />
            </button>
          )}
        </label>
        <div class="pa-filter">
          <button class="pa-chip sm" onClick={() => setSortOpen(true)}>
            {SORTS.find((x) => x[0] === sort)?.[1]} <Icon n="down" size={14} />
          </button>
          {listId && (
            <button class="pa-chip sm on" onClick={() => setListId(undefined)}>
              {def?.label} <Icon n="x" size={12} />
            </button>
          )}
          {!listId &&
            LISTS.slice(0, 6).map((l) => (
              <button key={l.id} class="pa-chip sm" onClick={() => setListId(l.id)}>
                {l.label}
              </button>
            ))}
        </div>
        <div class="pa-thead">
          <span class="n">#</span>
          <span class="m">Perps</span>
          <button class="p" onClick={() => setDesc(!desc)} aria-label="Reverse order">
            {sort === "change" ? "24h" : sort === "volume" ? "Volume" : sort === "leverage" ? "Leverage" : sort === "name" ? "Name" : "Price"}
            <Icon n={desc ? "arrowDown" : "arrowUp"} size={13} />
          </button>
        </div>
        {rows.map((m) => {
          const rank = byVol.indexOf(m.symbol) + 1;
          return (
            <button key={m.symbol} class="pa-mrow list" onClick={() => go(m)}>
              <span class={`pa-num${rank <= 3 ? ` medal r${rank}` : ""}`}>{rank}</span>
              <Coin base={m.base} size={40} />
              <span class="l">
                <b>
                  {m.base} <span class="pa-lev">{m.strikeMaxLev}x</span>
                </b>
                <span class="s num">{compactUsd(m.vol24)} Vol</span>
              </span>
              <span class="r num">
                <b>{priceText(m.mark, m.spec.tickSize)}</b>
                <span class={m.change >= 0 ? "pos" : "neg"}>{pctText(m.change)}</span>
              </span>
            </button>
          );
        })}
        {!rows.length && <div class="pa-empty">{s.markets.length ? "No markets match" : "Loading markets…"}</div>}
        <div class="pa-bottom-pad sm" />
      </div>
      {sortOpen && (
        <Sheet title="Sort by" onClose={() => setSortOpen(false)}>
          <div class="pa-group">
            {SORTS.map(([k, label]) => (
              <button key={k} class="pa-row" onClick={() => (setSort(k), setDesc(k !== "name"), setSortOpen(false))}>
                <span class="l">
                  <span class="k">{label}</span>
                </span>
                {sort === k && <Icon n="check" size={18} cls="pa-accent" />}
              </button>
            ))}
          </div>
        </Sheet>
      )}
    </div>
  );
}
