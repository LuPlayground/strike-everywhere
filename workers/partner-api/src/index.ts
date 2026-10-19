
export interface Env {
  DB: D1Database;
}

const STRIKE_API: Record<string, string> = {
  mainnet: "https://api.strikefinance.org",
  testnet: "https://api-v2-testnet.strikefinance.org",
};
const UA = { "User-Agent": "strike-everywhere-partner-api/0.1 (+https://github.com/LuPlayground/strike-everywhere)" };
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...CORS, ...extra } });

const str = (v: unknown, max = 120): string => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
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
      return json({ error: String(e?.message || e) }, 500);
    }
  },

  async scheduled(_evt: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(reconcileAll(env, 40));
  },
};


async function ingest(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const text = await req.text();
  if (text.length > 4000) return json({ error: "payload too large" }, 413);
  let e: any;
  try {
    e = JSON.parse(text);
  } catch {
    return json({ error: "invalid json" }, 400);
  }
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

  const stmts = [
    env.DB.prepare(
      `INSERT INTO events (ts, network, builder_code, partner_id, host_origin, type, account_id, client_order_id, symbol, side, notional, status, fee_bps, usd)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    ).bind(ts, network, builder, partner, origin, type, accountId, clientOrderId || null, str(e.symbol, 24) || null, str(e.side, 8) || null, num(e.notional), str(e.status, 16) || null, feeBps, num(e.usd)),
    env.DB.prepare(
      `INSERT INTO accounts (network, builder_code, account_id, partner_id, host_origin, first_seen, last_seen)
       VALUES (?,?,?,?,?,?,?)
       ON CONFLICT (network, builder_code, account_id) DO UPDATE SET last_seen = excluded.last_seen`,
    ).bind(network, builder, accountId, partner, origin, ts, ts),
  ];
  if (type === "order" && clientOrderId) {
    const legs: string[] = Array.isArray(e.legClientOrderIds) ? e.legClientOrderIds.map((x: unknown) => str(x, 64)).filter(Boolean).slice(0, 4) : [];
    for (const id of [clientOrderId, ...legs]) {
      stmts.push(
        env.DB.prepare(
          `INSERT OR IGNORE INTO orders (network, client_order_id, account_id, builder_code, partner_id, host_origin, fee_bps, ts)
           VALUES (?,?,?,?,?,?,?,?)`,
        ).bind(network, id, accountId, builder, partner, origin, feeBps, ts),
      );
    }
  }
  await env.DB.batch(stmts);
  if (type === "order") ctx.waitUntil(delay(4000).then(() => reconcileAccount(env, network, builder, accountId)));
  return json({ ok: true }, 202);
}


const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function reconcileAll(env: Env, limit: number): Promise<void> {
  const { results } = await env.DB.prepare(
    `SELECT network, builder_code, account_id FROM accounts ORDER BY last_reconciled ASC LIMIT ?`,
  ).bind(limit).all<{ network: string; builder_code: string; account_id: string }>();
  for (const a of results ?? []) await reconcileAccount(env, a.network, a.builder_code, a.account_id).catch(() => {});
}

async function reconcileAccount(env: Env, network: string, builder: string, accountId: string): Promise<number> {
  const base = STRIKE_API[network];
  if (!base) return 0;
  const res = await fetch(`${base}/v2/history/fill?account_id=${encodeURIComponent(accountId)}&limit=200`, { headers: UA });
  if (!res.ok) throw new Error(`strike ${res.status}`);
  const body = (await res.json()) as { fills?: any[] };
  const fills = (body.fills ?? []).filter((f) => typeof f.client_order_id === "string" && f.client_order_id);
  let added = 0;
  if (fills.length) {
    const ids = [...new Set(fills.map((f) => f.client_order_id as string))];
    const known = new Map<string, { fee_bps: number; partner_id: string; host_origin: string; builder_code: string }>();
    for (let i = 0; i < ids.length; i += 50) {
      const chunk = ids.slice(i, i + 50);
      const { results } = await env.DB.prepare(
        `SELECT client_order_id, fee_bps, partner_id, host_origin, builder_code FROM orders WHERE network = ? AND client_order_id IN (${chunk.map(() => "?").join(",")})`,
      ).bind(network, ...chunk).all<any>();
      for (const r of results ?? []) known.set(r.client_order_id, r);
    }
    const stmts = [];
    for (const f of fills) {
      const o = known.get(f.client_order_id);
      if (!o) continue;
      const price = Number(f.price);
      const size = Number(f.size);
      const notional = Math.abs(price * size);
      stmts.push(
        env.DB.prepare(
          `INSERT OR IGNORE INTO fills (network, fill_id, client_order_id, account_id, builder_code, partner_id, host_origin, symbol, side, price, size, notional, builder_fee, ts)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        ).bind(network, Number(f.id), f.client_order_id, accountId, o.builder_code, o.partner_id, o.host_origin, String(f.symbol), String(f.side), price, size, notional, (notional * o.fee_bps) / 10_000, Number(f.timestamp)),
      );
    }
    if (stmts.length) {
      const out = await env.DB.batch(stmts);
      added = out.reduce((n, r) => n + (r.meta?.changes ?? 0), 0);
    }
  }
  await env.DB.prepare(`UPDATE accounts SET last_reconciled = ? WHERE network = ? AND builder_code = ? AND account_id = ?`).bind(Date.now(), network, builder, accountId).run();
  return added;
}


async function stats(url: URL, env: Env): Promise<Response> {
  const builder = url.searchParams.get("builder") ?? "";
  const network = url.searchParams.get("network") === "testnet" ? "testnet" : "mainnet";
  const days = Math.max(1, Math.min(365, Number(url.searchParams.get("days") ?? 30) || 30));
  if (!isCode(builder)) return json({ error: "builder is required" }, 400);
  const since = Date.now() - days * 86_400_000;

  if (url.searchParams.get("refresh") === "1") {
    const { results } = await env.DB.prepare(`SELECT account_id FROM accounts WHERE network = ? AND builder_code = ? ORDER BY last_reconciled ASC LIMIT 10`).bind(network, builder).all<{ account_id: string }>();
    await Promise.all((results ?? []).map((a) => reconcileAccount(env, network, builder, a.account_id).catch(() => 0)));
  }

  const [totals, ordersAgg, deposits, byPartner, daily, recent] = await env.DB.batch([
    env.DB.prepare(
      `SELECT COUNT(*) AS wallets,
              (SELECT COUNT(DISTINCT account_id) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS traders,
              (SELECT COALESCE(SUM(notional),0) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS volume,
              (SELECT COALESCE(SUM(builder_fee),0) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS fees,
              (SELECT COUNT(*) FROM fills WHERE network = ?1 AND builder_code = ?2 AND ts >= ?3) AS fills
       FROM accounts WHERE network = ?1 AND builder_code = ?2`,
    ).bind(network, builder, since),
    env.DB.prepare(`SELECT COUNT(*) AS orders, SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected FROM events WHERE network = ? AND builder_code = ? AND type = 'order' AND ts >= ?`).bind(network, builder, since),
    env.DB.prepare(`SELECT COUNT(*) AS deposits, COUNT(DISTINCT account_id) AS funded, COALESCE(SUM(usd),0) AS usd FROM events WHERE network = ? AND builder_code = ? AND type = 'deposit' AND ts >= ?`).bind(network, builder, since),
    env.DB.prepare(
      `SELECT a.partner_id, a.host_origin,
              COUNT(*) AS wallets,
              MIN(a.first_seen) AS first_seen,
              MAX(a.last_seen) AS last_seen,
              (SELECT COUNT(DISTINCT e.account_id) FROM events e WHERE e.network = ?1 AND e.builder_code = ?2 AND e.partner_id = a.partner_id AND e.host_origin = a.host_origin AND e.type = 'deposit' AND e.ts >= ?3) AS funded,
              (SELECT COUNT(*) FROM events e WHERE e.network = ?1 AND e.builder_code = ?2 AND e.partner_id = a.partner_id AND e.host_origin = a.host_origin AND e.type = 'order' AND e.ts >= ?3) AS orders,
              (SELECT COUNT(DISTINCT f.account_id) FROM fills f WHERE f.network = ?1 AND f.builder_code = ?2 AND f.partner_id = a.partner_id AND f.host_origin = a.host_origin AND f.ts >= ?3) AS traders,
              (SELECT COALESCE(SUM(f.notional), 0) FROM fills f WHERE f.network = ?1 AND f.builder_code = ?2 AND f.partner_id = a.partner_id AND f.host_origin = a.host_origin AND f.ts >= ?3) AS volume,
              (SELECT COALESCE(SUM(f.builder_fee), 0) FROM fills f WHERE f.network = ?1 AND f.builder_code = ?2 AND f.partner_id = a.partner_id AND f.host_origin = a.host_origin AND f.ts >= ?3) AS fees
       FROM accounts a
       WHERE a.network = ?1 AND a.builder_code = ?2
       GROUP BY a.partner_id, a.host_origin ORDER BY volume DESC, wallets DESC LIMIT 50`,
    ).bind(network, builder, since),
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
  const d: any = deposits.results?.[0] ?? {};
  return json(
    {
      builder,
      network,
      days,
      generatedAt: Date.now(),
      totals: {
        integrations: (byPartner.results ?? []).length,
        activeIntegrations: (byPartner.results ?? []).filter((p: any) => Date.now() - Number(p.last_seen) < 7 * 86_400_000).length,
        connectedWallets: t.wallets ?? 0,
        fundedAccounts: d.funded ?? 0,
        tradingAccounts: t.traders ?? 0,
        volumeUsd: t.volume ?? 0,
        builderFeesUsd: t.fees ?? 0,
        fills: t.fills ?? 0,
        orders: o.orders ?? 0,
        rejectedOrders: o.rejected ?? 0,
        deposits: d.deposits ?? 0,
        depositUsd: d.usd ?? 0,
      },
      byPartner: byPartner.results ?? [],
      daily: daily.results ?? [],
      recent: (recent.results ?? []).map((r: any) => ({ ...r, account_id: r.account_id ? `${String(r.account_id).slice(0, 8)}…` : null })),
      method: "Volume and fees count only fills reported by Strike's public fill history whose client_order_id was created by the widget. Builder fee = executed notional × the order's builder-fee bps.",
    },
    200,
    { "Cache-Control": "no-store" },
  );
}
