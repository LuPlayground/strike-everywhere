import { useEffect, useState } from "preact/hooks";
import {
  fillDirection,
  formatPct,
  formatPrice,
  formatUsd,
  type Account,
  type ClosedPositionRow,
  type FillRow,
  type FundingRow,
  type OrderHistoryEntry,
  type Page,
  type PortfolioSummary,
  type StrikeEverywhere,
  type TwapStrategy,
  type Vault,
} from "@strike-everywhere/core";
import { Spinner, fmtSize, fmtTime, pageHidden } from "./parts";

const num = (v: unknown): number | null => (v === null || v === undefined || v === "" || !Number.isFinite(Number(v)) ? null : Number(v));
const usd = (v: number | null, sign = false) => (v === null ? "—" : formatUsd(v, { sign }));
const pnlCls = (v: number | null) => (v === null || v === 0 ? "" : v > 0 ? "pos" : "neg");
const rate = (r: number | null) => (r === null ? "—" : `${(r * 100).toFixed(3)}%`);

function Stat({ k, v, cls, hint }: { k: string; v: string; cls?: string; hint?: string }) {
  return (
    <div>
      <div class={`k${hint ? " dotted" : ""}`} title={hint}>{k}</div>
      <div class={`num ${cls ?? ""}`}>{v}</div>
    </div>
  );
}


function dedupeById<T extends { id: number | string }>(rows: T[]): T[] {
  const seen = new Set<number | string>();
  return rows.filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
}

export function TwapList({ twaps, busy, onCancel }: { twaps: TwapStrategy[]; busy: Set<string>; onCancel: (t: TwapStrategy) => void }) {
  if (!twaps.length) return <div class="empty">No active TWAP orders</div>;
  return (
    <>
      {twaps.map((t) => {
        const total = t.totalSize ?? 0;
        const done = total > 0 && t.filledSize !== null ? Math.min(1, t.filledSize / total) : 0;
        const ends = t.createdAt && t.durationSec ? t.createdAt + t.durationSec * 1000 : 0;
        const left = ends ? Math.max(0, ends - Date.now()) : 0;
        const cancelling = t.status === "cancelling";
        return (
          <div class="row" key={t.id}>
            <div class="row-h">
              {t.symbol || "—"}
              <span class={`badge ${t.side === "buy" ? "long" : "short"}`}>{t.side === "buy" ? "Buy" : "Sell"} · TWAP</span>
              <button class="mini" disabled={cancelling || busy.has(`twap:${t.id}`)} onClick={() => onCancel(t)}>
                {busy.has(`twap:${t.id}`) ? <Spinner /> : cancelling ? "Cancelling" : "Cancel"}
              </button>
            </div>
            <div class="prog" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(done * 100)}>
              <span style={{ width: `${done * 100}%` }} />
            </div>
            <div class="row-g">
              <Stat k="Filled" v={`${fmtSize(t.filledSize)} / ${fmtSize(t.totalSize)}`} />
              <Stat k="Slices" v={t.slicesFired === null ? "—" : `${t.slicesFired}${t.nominalSlices ? ` / ${t.nominalSlices}` : ""}`} />
              <Stat k="Time left" v={ends ? (left > 0 ? `${Math.ceil(left / 60_000)} min` : "ending") : "—"} />
            </div>
            {t.lastError && <div class="t muted">{t.lastError}</div>}
          </div>
        );
      })}
    </>
  );
}


type HistKind = "fills" | "funding" | "closed" | "orders";
const HIST: Array<[HistKind, string]> = [
  ["fills", "Fills"],
  ["funding", "Funding"],
  ["closed", "Closed"],
  ["orders", "Orders"],
];

interface HistState {
  items: any[];
  next: number | null;
  loading: boolean;
  error: string;
  loaded: boolean;
}

export function HistoryPanel({ client, ticks }: { client: StrikeEverywhere; ticks: Record<string, number> }) {
  const [kind, setKind] = useState<HistKind>("fills");
  const [state, setState] = useState<Partial<Record<HistKind, HistState>>>({});
  const cur = state[kind];

  const load = async (k: HistKind, more: boolean) => {
    const prev = state[k];
    const cursor = more ? prev?.next ?? null : null;
    setState((s) => ({ ...s, [k]: { ...(s[k] ?? { items: [], next: null, loaded: false }), loading: true, error: "" } }));
    try {
      const a = client.account;
      const page: Page<any> =
        k === "fills" ? await a.fillsPage({ fromId: cursor }) : k === "funding" ? await a.fundingPage({ fromId: cursor }) : k === "closed" ? await a.closedPositionsPage({ endTime: cursor }) : await a.orderHistoryPage({ fromOrderId: cursor });
      setState((s) => ({ ...s, [k]: { items: dedupeById([...(more ? s[k]?.items ?? [] : []), ...page.items]), next: page.next, loading: false, error: "", loaded: true } }));
    } catch (e: any) {
      setState((s) => ({ ...s, [k]: { items: s[k]?.items ?? [], next: s[k]?.next ?? null, loading: false, loaded: true, error: e?.message || "Couldn't load history" } }));
    }
  };

  useEffect(() => {
    if (!state[kind]) void load(kind, false);
  }, [kind]);

  return (
    <>
      <div class="chips" role="tablist" aria-label="History">
        {HIST.map(([k, label]) => (
          <button key={k} role="tab" aria-selected={kind === k} class={kind === k ? "on" : ""} onClick={() => setKind(k)}>
            {label}
          </button>
        ))}
      </div>
      {cur?.error && <div class="warn">Strike: {cur.error}</div>}
      {cur?.loaded && !cur.items.length && !cur.error && <div class="empty">{kind === "fills" || kind === "orders" ? "Your trades will appear here after your first order." : "Nothing here yet"}</div>}
      {cur?.items.map((it) =>
        kind === "fills" ? <FillItem key={it.id} f={it} tick={ticks[it.symbol]} /> : kind === "funding" ? <FundingItem key={it.id} f={it} /> : kind === "closed" ? <ClosedItem key={it.id} p={it} /> : <OrderItem key={it.id} o={it} tick={ticks[it.symbol]} />,
      )}
      {(!cur || cur.loading) && <div class="empty"><Spinner /></div>}
      {cur && !cur.loading && cur.next !== null && (
        <button class="mini more" onClick={() => load(kind, true)}>
          Load more
        </button>
      )}
    </>
  );
}

function Hist({ sym, badge, long, right, rightCls, sub }: { sym: string; badge: string; long: boolean | null; right: string; rightCls?: string; sub: string }) {
  return (
    <div class="hrow">
      <div class="row-h">
        {sym || "—"}
        {badge && <span class={`badge ${long === null ? "" : long ? "long" : "short"}`}>{badge}</span>}
        <span class={`num r ${rightCls ?? ""}`}>{right}</span>
      </div>
      <div class="t muted num">{sub}</div>
    </div>
  );
}

function FillItem({ f, tick }: { f: FillRow; tick?: number }) {
  const pnl = f.realizedPnl;
  return (
    <Hist
      sym={f.symbol}
      badge={fillDirection(f.side, pnl)}
      long={f.side ? f.side === "buy" : null}
      right={`${fmtSize(f.size)} @ ${f.price === null ? "—" : formatPrice(f.price, tick)}`}
      sub={[`Fee ${usd(f.fee)}`, pnl ? `PnL ${usd(pnl, true)}` : "", f.autoClose ? f.autoClose.replace(/_/g, " ") : "", fmtTime(f.time)].filter(Boolean).join(" · ")}
    />
  );
}

function FundingItem({ f }: { f: FundingRow }) {
  const side = f.positionSide.toLowerCase();
  return (
    <Hist
      sym={f.symbol}
      badge={f.positionSide}
      long={side === "long" ? true : side === "short" ? false : null}
      right={usd(f.amount, true)}
      rightCls={pnlCls(f.amount)}
      sub={`Rate ${f.rate === null ? "—" : `${(f.rate * 100).toFixed(4)}%`} · Size ${fmtSize(f.positionSize)} · ${fmtTime(f.time)}`}
    />
  );
}

function ClosedItem({ p }: { p: ClosedPositionRow }) {
  const mins = p.openTime && p.closeTime ? Math.max(0, Math.round((p.closeTime - p.openTime) / 60_000)) : null;
  const held = mins === null ? "" : mins >= 1440 ? `${Math.floor(mins / 1440)}d ${Math.floor((mins % 1440) / 60)}h` : mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
  return (
    <Hist
      sym={p.symbol}
      badge={p.marginMode ? p.marginMode[0].toUpperCase() + p.marginMode.slice(1) : ""}
      long={null}
      right={p.realizedPnl === null ? "PnL —" : usd(p.realizedPnl, true)}
      rightCls={pnlCls(p.realizedPnl)}
      sub={`Closed ${fmtTime(p.closeTime)}${held ? ` · held ${held}` : ""}`}
    />
  );
}

function OrderItem({ o, tick }: { o: OrderHistoryEntry; tick?: number }) {
  const price = num(o.price);
  const stop = num(o.stop_price);
  return (
    <Hist
      sym={o.symbol}
      badge={`${o.side === "buy" ? "Buy" : "Sell"} · ${String(o.type ?? "").replace(/_/g, " ")}`}
      long={o.side === "buy"}
      right={String(o.status ?? "—")}
      rightCls={o.status === "rejected" ? "neg" : ""}
      sub={[
        o.reduce_only ? `closes ${o.side === "buy" ? "Short" : "Long"}` : "",
        `${fmtSize(num(o.filled))} / ${fmtSize(num(o.size))}`,
        price ? `@ ${formatPrice(price, tick)}` : stop ? `trigger ${formatPrice(stop, tick)}` : "market",
        fmtTime(Number(o.create_timestamp)),
      ]
        .filter(Boolean)
        .join(" · ")}
    />
  );
}


function marginRisk(a: Account | null): { ratio: number | null; level: "ok" | "warn" | "danger"; label: string } {
  const mm = num(a?.maintenance_margin) ?? 0;
  const mb = num(a?.margin_balance);
  if (mb === null) return { ratio: null, level: "ok", label: "" };
  if (mb <= 0) return mm > 0 ? { ratio: null, level: "danger", label: "At risk" } : { ratio: 0, level: "ok", label: "Healthy" };
  const r = mm / mb;
  return { ratio: r, level: r >= 0.9 ? "danger" : r >= 0.7 ? "warn" : "ok", label: r >= 0.9 ? "Reduce-only" : r >= 0.7 ? "Margin call" : "Healthy" };
}

export function AccountMetrics({ client, account }: { client: StrikeEverywhere; account: Account | null }) {
  const [p, setP] = useState<PortfolioSummary | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () => client.account.portfolio().then((x) => alive && setP(x)).catch(() => {});
    load();
    const t = setInterval(() => !pageHidden() && load(), 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client]);
  const risk = marginRisk(account);
  const upnl = num(account?.unrealized_pnl);
  return (
    <>
      <div class="risk">
        <span class="k dotted" title="Maintenance margin ÷ equity. Strike issues a margin call at 70%, restricts to reduce-only at 90% and liquidates at 100%.">
          Margin ratio
        </span>
        <span class="meter">
          <span class={`lv-${risk.level}`} style={{ width: `${Math.min(100, (risk.ratio ?? (risk.level === "danger" ? 1 : 0)) * 100)}%` }} />
        </span>
        <span class={`num ${risk.level === "ok" ? "" : "neg"}`}>{risk.ratio === null ? "—" : `${(risk.ratio * 100).toFixed(1)}%`}</span>
        <span class={`badge ${risk.level === "ok" ? "long" : "short"}`}>{risk.label || "—"}</span>
      </div>
      <div class="row-g mgrid">
        <Stat k="Equity" v={usd(num(account?.margin_balance))} />
        <Stat k="Available" v={usd(num(account?.available_balance))} />
        <Stat k="Balance" v={usd(num(account?.wallet_balance))} />
        <Stat k="Unrealized PnL" v={usd(upnl, true)} cls={pnlCls(upnl)} />
        <Stat k="All-time PnL" v={usd(p?.realizedPnl ?? null, true)} cls={pnlCls(p?.realizedPnl ?? null)} hint="Realized PnL since the account opened (Strike portfolio)" />
        <Stat k="Volume" v={p?.volume == null ? "—" : formatUsd(p.volume, { decimals: 0 })} />
        <Stat
          k="Fee tier"
          v={p?.feeTier == null ? "—" : `${p.feeTier} · ${rate(p.takerRate)}`}
          hint={p?.feeTier == null ? undefined : `Strike fee tier ${p.feeTier}: taker ${rate(p.takerRate)}, maker ${rate(p.makerRate)}`}
        />
        <Stat k="Fee discount" v={p?.referralDiscountPct == null ? "—" : `${p.referralDiscountPct}%`} hint="Referral fee discount on Strike's trading fees" />
      </div>
    </>
  );
}

export function Vaults({ client }: { client: StrikeEverywhere }) {
  const [list, setList] = useState<Vault[] | null | "err">(null);
  useEffect(() => {
    let alive = true;
    client.market
      .vaults(20)
      .then((v) => alive && setList(v.filter((x) => x.status === "active" || !x.status).sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0)).slice(0, 4)))
      .catch(() => alive && setList("err"));
    return () => {
      alive = false;
    };
  }, [client]);
  return (
    <div class="vaults">
      <div class="row-h">
        Strike vaults
        <a class="linkbtn r" href={client.appUrl("/vaults")} target="_blank" rel="noopener noreferrer">All vaults ↗</a>
      </div>
      {list === null && <div class="empty"><Spinner /></div>}
      {list === "err" && <div class="t muted">Vaults aren't available right now.</div>}
      {Array.isArray(list) &&
        list.map((v) => (
          <a key={v.id} class="vault" href={client.vaultUrl(v.id)} target="_blank" rel="noopener noreferrer" title={`Open ${v.name} on Strike`}>
            <span class="vn">{v.name}</span>
            <span class="num">{v.tvl === null ? "—" : `$${v.tvl.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}`}</span>
            <span class={`num ${pnlCls(v.aprPct)}`}>{v.aprPct === null ? "—" : `${formatPct(v.aprPct, 1)} APR`}</span>
          </a>
        ))}
      {Array.isArray(list) && <div class="t muted">Read-only. Deposits into vaults happen in Strike's app.</div>}
    </div>
  );
}
