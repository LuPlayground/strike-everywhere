import { useEffect, useState } from "preact/hooks";
import { fillDirection, type FillRow, type TransactionRow } from "@strike-everywhere/core";
import { dateText, qtyText, usdText } from "../markets";
import type { PerpsState } from "../state";
import { Coin, Icon, RoundBtn, Spin } from "../ui";
import type { Nav } from "./Mobile";

export interface Activity {
  id: string;
  time: number;
  icon: { coin?: string; glyph?: string };
  title: string;
  sub: string;
  amount: string;
  cls: string;
}

export function toActivity(tx: TransactionRow[], fills: FillRow[]): Activity[] {
  const out: Activity[] = [];
  for (const t of tx) {
    const ty = t.type.toLowerCase();
    if (ty !== "deposit" && ty !== "withdraw" && ty !== "withdrawal") continue;
    const dep = ty === "deposit";
    const pending = /pending|processing|submitted/i.test(t.status) && !/settled|completed/i.test(t.status);
    out.push({
      id: `t${t.id}`,
      time: t.time,
      icon: { glyph: dep ? "arrowDown" : "arrowUp" },
      title: `${dep ? "Deposited" : "Withdrew"}${t.asset ? ` ${t.asset}` : dep ? " ADA" : ""}`,
      sub: `Perps · ${dateText(t.time)}${pending ? " · Pending" : /fail|reject/i.test(t.status) ? " · Failed" : ""}`,
      amount: usdText(dep ? Math.abs(t.amount) : -Math.abs(t.amount), { sign: true }),
      cls: dep ? "pos" : "",
    });
  }
  for (const f of fills) {
    const base = f.symbol.split("-")[0];
    const dir = fillDirection(f.side, f.realizedPnl);
    const pnl = f.realizedPnl ?? 0;
    out.push({
      id: `f${f.id}`,
      time: f.time,
      icon: { coin: base },
      title: `${dir || "Trade"} ${f.size !== null ? qtyText(f.size) : ""} ${base}`.replace(/\s+/g, " ").trim(),
      sub: `${f.price !== null ? `at $${f.price.toLocaleString("en-US", { maximumFractionDigits: 6 })}` : "Perps"} · ${dateText(f.time)}${f.autoClose ? ` · ${f.autoClose.replace(/_/g, " ")}` : ""}`,
      amount: pnl ? usdText(pnl, { sign: true }) : f.size !== null && f.price !== null ? usdText(f.size * f.price) : "",
      cls: pnl > 0 ? "pos" : pnl < 0 ? "neg" : "muted",
    });
  }
  return out.sort((a, b) => b.time - a.time);
}

export function useActivity(s: PerpsState) {
  const [items, setItems] = useState<Activity[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!s.session) return;
    let alive = true;
    Promise.all([s.client.account.transactions(s.session.accountId, 200).catch(() => null), s.client.account.fillsPage({ limit: 100 }).catch(() => null)]).then(([tx, fp]) => {
      if (!alive) return;
      if (!tx && !fp) setError("Couldn't load your activity from Strike.");
      setItems(toActivity(tx ?? [], fp?.items ?? []));
    });
    return () => {
      alive = false;
    };
  }, [s.session?.accountId]);
  return { items, error };
}

export function History({ s, nav }: { s: PerpsState; nav: Nav }) {
  const { items, error } = useActivity(s);
  const groups: Array<[string, Activity[]]> = [];
  for (const it of items ?? []) {
    const label = new Date(it.time).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const g = groups[groups.length - 1];
    if (g && g[0] === label) g[1].push(it);
    else groups.push([label, [it]]);
  }
  return (
    <div class="pa-screen">
      <div class="pa-top">
        <RoundBtn n="back" label="Back" onClick={nav.back} />
        <div class="pa-title">History</div>
      </div>
      <div class="pa-scroll">
        {!s.session && <div class="pa-empty">Connect a wallet to see your activity.</div>}
        {s.session && items === null && (
          <div class="pa-empty">
            <Spin />
          </div>
        )}
        {error && <div class="pa-warn">{error}</div>}
        {items && !items.length && !error && (
          <div class="pa-nothing">
            <span class="ic">
              <Icon n="x" size={18} />
            </span>
            No Activity Found
          </div>
        )}
        {groups.map(([label, list]) => (
          <div key={label}>
            <div class="pa-month">{label}</div>
            {list.map((a) => (
              <div class="pa-act" key={a.id}>
                {a.icon.coin ? (
                  <Coin base={a.icon.coin} size={38} />
                ) : (
                  <span class="glyph">
                    <Icon n={a.icon.glyph!} size={18} />
                  </span>
                )}
                <span class="l">
                  <b>{a.title}</b>
                  <span class="s">{a.sub}</span>
                </span>
                <span class={`r num ${a.cls}`}>{a.amount}</span>
              </div>
            ))}
          </div>
        ))}
        <div class="pa-bottom-pad sm" />
      </div>
    </div>
  );
}
