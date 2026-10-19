
export interface Env {
  DB: D1Database;
}

const STRIKE_API: Record<string, string> = {
  mainnet: "https://api.strikefinance.org",
  testnet: "https://api-v2-testnet.strikefinance.org",
};
const UA = { "User-Agent": "strike-everywhere-partner-api/0.2 (+https://github.com/LuPlayground/strike-everywhere)" };
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const CLOCK_SKEW_MS = 1000;
const CRON_BATCH = 12;
const MAX_USD = 1e8;
const SETTLED = new Set(["settled", "completed", "confirmed", "credited", "success", "succeeded"]);

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...CORS, ...extra } });

const str = (v: unknown, max = 120): string => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const usd = (v: unknown): number | null => {
  const n = num(v);
  return n === null ? null : Math.max(0, Math.min(MAX_USD, n));
};
const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
const isCode = (v: string) => /^[A-Za-z0-9_-]{1,64}$/.test(v);

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    try {
      if (url.pathname === "/v1/health") return json({ ok: true, ts: Date.now() });
      if (url.pathname === "/v1/events" && req.method === "POST") return await ingest(req, env, ctx);
      if (url.pathname === "/v1/stats" && req.method === "GET") return await stats(url, env);
      return json({ error: "not found" }, 404);
    } catch (e: any) {
      console.error("request failed", url.pathname, e?.stack || e);
      return json({ error: "internal error" }, 500);
    }
  },

  async scheduled(_evt: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(reconcileAll(env, CRON_BATCH));
  },
};


async function ingest(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (Number(req.headers.get("content-length") ?? 0) > 4000) return json({ error: "payload too large" }, 413);
  const text = await req.text();
  if (text.length > 4000) return json({ error: "payload too large" }, 413);
  let e: any;
  try {
    e = JSON.parse(text);
  } catch {
    return json({ error: "invalid json" }, 400);
  }
  if (!e || typeof e !== "object" || Array.isArray(e)) return json({ error: "invalid event" }, 400);
  const network = e.network === "testnet" ? "testnet" : e.network === "mainnet" ? "mainnet" : "";
  const builder = str(e.builderCode, 64);
  const type = str(e.type, 16);
  const accountId = str(e.accountId, 40);
  if (!network || !isCode(builder) || !["connect", "order", "deposit"].includes(type) || !isUuid(accountId)) {
    return json({ error: "invalid event" }, 400);
  }
  const ts = Date.now();
  const partner = str(e.partnerId, 64);
  const origin = str(e.hostOrigin, 120);
  const feeBps = Math.max(0, Math.min(100, Math.round(num(e.feeBps) ?? 0)));
  const clientOrderId = str(e.clientOrderId, 64);
  const status = str(e.status, 16);
  if (type === "order" && !isUuid(clientOrderId)) return json({ error: "invalid client order id" }, 400);

  const stmts: D1PreparedStatement[] = [
    env.DB.prepare(
      `INSERT INTO accounts (network, builder_code, account_id, partner_id, host_origin, first_seen, last_seen)
       VALUES (?,?,?,?,?,?,?)
       ON CONFLICT (network, builder_code, account_id) DO UPDATE SET last_seen = excluded.last_seen`,
    ).bind(network, builder, accountId, partner, origin, ts, ts),
  ];
  if (type === "order") {
    const legs: string[] = Array.isArray(e.legClientOrderIds) ? e.legClientOrderIds.map((x: unknown) => str(x, 64)).filter(isUuid).slice(0, 4) : [];
    for (const id of [clientOrderId, ...legs]) {
      stmts.push(
        env.DB.prepare(
          `INSERT OR IGNORE INTO orders (network, client_order_id, account_id, builder_code, partner_id, host_origin, fee_bps, ts)
           VALUES (?,?,?,?,?,?,?,?)`,
        ).bind(network, id, accountId, builder, partner, origin, feeBps, ts),
      );
    }
  }
  if (status !== "intent") {
    stmts.push(
      env.DB.prepare(
        `INSERT INTO events (ts, network, builder_code, partner_id, host_origin, type, account_id, client_order_id, symbol, side, notional, status, fee_bps, usd)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      ).bind(ts, network, builder, partner, origin, type, accountId, clientOrderId || null, str(e.symbol, 24) || null, str(e.side, 8) || null, usd(e.notional), status || null, feeBps, usd(e.usd)),
    );
  }
  await env.DB.batch(stmts);
  if (type === "order" && status !== "intent") ctx.waitUntil(delay(4000).then(() => reconcileIfStale(env, network, builder, accountId, 15_000)));
  return json({ ok: true }, 202);
}


const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function reconcileIfStale(env: Env, network: string, builder: string, accountId: string, maxAgeMs: number): Promise<void> {
  const row = await env.DB.prepare(`SELECT last_reconciled FROM accounts WHERE network = ? AND builder_code = ? AND account_id = ?`).bind(network, builder, accountId).first<{ last_reconciled: number }>();
  if (row && Date.now() - Number(row.last_reconciled) < maxAgeMs) return;
  await reconcileAccount(env, network, builder, accountId).catch(() => 0);
}

async function reconcileAll(env: Env, limit: number): Promise<void> {
  const { results } = await env.DB.prepare(
    `SELECT a.network, a.builder_code, a.account_id FROM accounts a
     WHERE a.fail_count < 5 OR a.last_reconciled < ?1
     ORDER BY EXISTS (SELECT 1 FROM orders o WHERE o.network = a.network AND o.account_id = a.account_id) DESC, a.last_reconciled ASC
     LIMIT ?2`,
  ).bind(Date.now() - 86_400_000, limit).all<{ network: string; builder_code: string; account_id: string }>();
  for (const a of results ?? []) await reconcileAccount(env, a.network, a.builder_code, a.account_id).catch(() => 0);
}

async function strikeGet(base: string, path: string): Promise<any> {
  const res = await fetch(`${base}${path}`, { headers: UA });
  if (!res.ok) throw new Error(`strike ${res.status} ${path.split("?")[0]}`);
  return res.json();
}

async function reconcileAccount(env: Env, network: string, builder: string, accountId: string): Promise<number> {
  const base = STRIKE_API[network];
  if (!base) return 0;
  let ok = false;
  try {
    const q = `account_id=${encodeURIComponent(accountId)}`;
    const [fillsBody, txBody] = await Promise.all([strikeGet(base, `/v2/history/fill?${q}&limit=1000`), strikeGet(base, `/v2/history/transaction?${q}&limit=200`)]);

    const deposits = (txBody?.transactions ?? []).filter((t: any) => t?.type === "deposit" && SETTLED.has(String(t.status).toLowerCase()));
    const depositUsd = deposits.reduce((s: number, t: any) => s + (Number.isFinite(Number(t.amount)) ? Number(t.amount) : 0), 0);
    const fundedAt = deposits.length ? Math.min(...deposits.map((t: any) => Number(t.timestamp) || Date.now())) : null;

    const fills = (fillsBody?.fills ?? []).filter((f: any) => typeof f?.client_order_id === "string" && isUuid(f.client_order_id));
    let added = 0;
    const stmts: D1PreparedStatement[] = [
      env.DB.prepare(`UPDATE accounts SET funded_at = ?, deposit_usd = ? WHERE network = ? AND builder_code = ? AND account_id = ?`).bind(fundedAt, depositUsd, network, builder, accountId),
    ];
    if (fills.length) {
      const ids = [...new Set(fills.map((f: any) => f.client_order_id as string))];
      const known = new Map<string, { fee_bps: number; partner_id: string; host_origin: string; builder_code: string; ts: number }>();
      for (let i = 0; i < ids.length; i += 90) {
        const chunk = ids.slice(i, i + 90);
        const { results } = await env.DB.prepare(
          `SELECT client_order_id, fee_bps, partner_id, host_origin, builder_code, ts FROM orders
           WHERE network = ? AND account_id = ? AND client_order_id IN (${chunk.map(() => "?").join(",")})`,
        ).bind(network, accountId, ...chunk).all<any>();
        for (const r of results ?? []) known.set(r.client_order_id, r);
      }
      if (known.size) {
        const ordersBody = await strikeGet(base, `/v2/history/order?${q}&limit=1000`);
        const created = new Map<string, number>();
        for (const o of ordersBody?.orders ?? []) if (o?.client_order_id) created.set(o.client_order_id, Number(o.create_timestamp));
        for (const f of fills) {
          const o = known.get(f.client_order_id);
          if (!o) continue;
          const createdAt = created.get(f.client_order_id);
          if (!(createdAt && Number(o.ts) <= createdAt + CLOCK_SKEW_MS)) continue;
          const price = Number(f.price);
          const size = Number(f.size);
          const fillId = Number(f.id);
          const ts = Number(f.timestamp);
          if (![price, size, fillId, ts].every(Number.isFinite)) continue;
          const notional = Math.abs(price * size);
          stmts.push(
            env.DB.prepare(
              `INSERT OR IGNORE INTO fills (network, fill_id, client_order_id, account_id, builder_code, partner_id, host_origin, symbol, side, price, size, notional, builder_fee, ts)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            ).bind(network, fillId, f.client_order_id, accountId, o.builder_code, o.partner_id, o.host_origin, String(f.symbol), String(f.side), price, size, notional, (notional * o.fee_bps) / 10_000, ts),
          );
        }
      }
    }
    const out = await env.DB.batch(stmts);
    added = out.slice(1).reduce((n, r) => n + (r.meta?.changes ?? 0), 0);
    ok = true;
    return added;
  } finally {
    await env.DB.prepare(
      `UPDATE accounts SET last_reconciled = ?, fail_count = CASE WHEN ? THEN 0 ELSE fail_count + 1 END WHERE network = ? AND builder_code = ? AND account_id = ?`,
    ).bind(Date.now(), ok ? 1 : 0, network, builder, accountId).run().catch(() => undefined);
  }
}


async function stats(url: URL, env: Env): Promise<Response> {
  const builder = url.searchParams.get("builder") ?? "";
  const network = url.searchParams.get("network") === "testnet" ? "testnet" : "mainnet";
  const days = Math.max(1, Math.min(365, Math.round(Number(url.searchParams.get("days") ?? 30)) || 30));
  if (!isCode(builder)) return json({ error: "builder is required" }, 400);
  const since = Date.now() - days * 86_400_000;

  if (url.searchParams.get("refresh") === "1") {
    const { results } = await env.DB.prepare(
      `SELECT account_id FROM accounts WHERE network = ? AND builder_code = ? AND last_reconciled < ? ORDER BY last_reconciled ASC LIMIT 5`,
    ).bind(network, builder, Date.now() - 60_000).all<{ account_id: string }>();
    await Promise.all((results ?? []).map((a) => reconcileAccount(env, network, builder, a.account_id).catch(() => 0)));
  }

  const activeAccounts = `SELECT DISTINCT account_id FROM events WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3`;
  const [totals, ordersAgg, byPartner, integrations, daily, recent] = await env.DB.batch([
    env.DB.prepare(
      `SELECT (SELECT COUNT(*) FROM (${activeAccounts})) AS wallets,
              (SELECT COUNT(*) FROM accounts a WHERE a.network = ?1 AND a.builder_code = ?2 AND a.funded_at IS NOT NULL AND a.account_id IN (${activeAccounts})) AS funded,
              (SELECT COALESCE(SUM(a.deposit_usd),0) FROM accounts a WHERE a.network = ?1 AND a.builder_code = ?2 AND a.funded_at IS NOT NULL AND a.account_id IN (${activeAccounts})) AS deposit_usd,
              (SELECT COUNT(DISTINCT account_id) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS traders,
              (SELECT COALESCE(SUM(notional),0) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS volume,
              (SELECT COALESCE(SUM(builder_fee),0) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS fees,
              (SELECT COUNT(*) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS fills,
              (SELECT COUNT(*) FROM events WHERE network = ?1 AND builder_code = ?2 AND type = 'deposit' AND ts >= ?3) AS deposits_reported`,
    ).bind(network, builder, since),
    env.DB.prepare(`SELECT COUNT(*) AS orders, SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected FROM events WHERE network = ? AND builder_code = ? AND type = 'order' AND COALESCE(status, '') <> 'twap' AND ts >= ?`).bind(network, builder, since),
    env.DB.prepare(
      `SELECT e.partner_id, e.host_origin,
              COUNT(DISTINCT e.account_id) AS wallets,
              MIN(e.ts) AS first_seen,
              MAX(e.ts) AS last_seen,
              (SELECT COUNT(DISTINCT x.account_id) FROM events x JOIN accounts a ON a.network = x.network AND a.builder_code = x.builder_code AND a.account_id = x.account_id
                WHERE x.network = ?1 AND x.builder_code = ?2 AND x.partner_id = e.partner_id AND x.host_origin = e.host_origin AND x.ts >= ?3 AND a.funded_at IS NOT NULL) AS funded,
              SUM(CASE WHEN e.type = 'order' AND COALESCE(e.status, '') <> 'twap' THEN 1 ELSE 0 END) AS orders,
              (SELECT COUNT(DISTINCT f.account_id) FROM fills f WHERE f.network = ?1 AND f.builder_code = ?2 AND f.partner_id = e.partner_id AND f.host_origin = e.host_origin AND f.ts >= ?3) AS traders,
              (SELECT COALESCE(SUM(f.notional), 0) FROM fills f WHERE f.network = ?1 AND f.builder_code = ?2 AND f.partner_id = e.partner_id AND f.host_origin = e.host_origin AND f.ts >= ?3) AS volume,
              (SELECT COALESCE(SUM(f.builder_fee), 0) FROM fills f WHERE f.network = ?1 AND f.builder_code = ?2 AND f.partner_id = e.partner_id AND f.host_origin = e.host_origin AND f.ts >= ?3) AS fees
       FROM events e
       WHERE e.network = ?1 AND e.builder_code = ?2 AND e.ts >= ?3
       GROUP BY e.partner_id, e.host_origin ORDER BY volume DESC, wallets DESC LIMIT 50`,
    ).bind(network, builder, since),
    env.DB.prepare(
      `SELECT COUNT(*) AS n, SUM(CASE WHEN last_seen >= ?4 THEN 1 ELSE 0 END) AS active FROM (
         SELECT MAX(ts) AS last_seen FROM events WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3 GROUP BY partner_id, host_origin)`,
    ).bind(network, builder, since, Date.now() - 7 * 86_400_000),
    env.DB.prepare(
      `SELECT date(ts / 1000, 'unixepoch') AS day, SUM(notional) AS volume, SUM(builder_fee) AS fees, COUNT(*) AS fills
       FROM fills WHERE network = ? AND builder_code = ? AND ts >= ? GROUP BY day ORDER BY day`,
    ).bind(network, builder, since),
    env.DB.prepare(
      `SELECT ts, type, partner_id, host_origin, account_id, symbol, side, notional, status, usd FROM events
       WHERE network = ? AND builder_code = ? ORDER BY ts DESC LIMIT 25`,
    ).bind(network, builder),
  ]);

  const t: any = totals.results?.[0] ?? {};
  const o: any = ordersAgg.results?.[0] ?? {};
  const i: any = integrations.results?.[0] ?? {};
  const n = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);
  return json(
    {
      builder,
      network,
      days,
      generatedAt: Date.now(),
      totals: {
        integrations: n(i.n),
        activeIntegrations: n(i.active),
        connectedWallets: n(t.wallets),
        fundedAccounts: n(t.funded),
        tradingAccounts: n(t.traders),
        volumeUsd: n(t.volume),
        builderFeesUsd: n(t.fees),
        fills: n(t.fills),
        orders: n(o.orders),
        rejectedOrders: n(o.rejected),
        deposits: n(t.deposits_reported),
        depositUsd: n(t.deposit_usd),
      },
      byPartner: byPartner.results ?? [],
      daily: daily.results ?? [],
      recent: (recent.results ?? []).map((r: any) => ({ ...r, account_id: r.account_id ? `${String(r.account_id).slice(0, 8)}…` : null })),
      method:
        "Volume and fees count only fills in Strike's public fill history for orders the widget registered before Strike created them (same account). Funded accounts and deposit value come from Strike's public transaction history. Connected wallets and integration labels are reported by the widget. Builder fee = executed notional × the order's builder-fee bps.",
    },
    200,
    { "Cache-Control": "no-store" },
  );
}
