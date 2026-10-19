
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  network TEXT NOT NULL,
  builder_code TEXT NOT NULL,
  partner_id TEXT NOT NULL DEFAULT '',
  host_origin TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL,            -- connect | order | deposit
  account_id TEXT,
  client_order_id TEXT,
  symbol TEXT,
  side TEXT,
  notional REAL,
  status TEXT,
  fee_bps INTEGER,
  usd REAL
);
CREATE INDEX IF NOT EXISTS events_builder ON events (network, builder_code, ts);

CREATE TABLE IF NOT EXISTS accounts (
  network TEXT NOT NULL,
  builder_code TEXT NOT NULL,
  account_id TEXT NOT NULL,
  partner_id TEXT NOT NULL DEFAULT '',
  host_origin TEXT NOT NULL DEFAULT '',
  first_seen INTEGER NOT NULL,
  last_seen INTEGER NOT NULL,
  last_reconciled INTEGER NOT NULL DEFAULT 0,
  fail_count INTEGER NOT NULL DEFAULT 0,
  funded_at INTEGER,
  deposit_usd REAL NOT NULL DEFAULT 0,
  PRIMARY KEY (network, builder_code, account_id)
);
CREATE INDEX IF NOT EXISTS accounts_reconcile ON accounts (last_reconciled);
CREATE INDEX IF NOT EXISTS events_partner ON events (network, builder_code, partner_id, host_origin, ts);
CREATE INDEX IF NOT EXISTS events_account ON events (network, builder_code, account_id);

CREATE TABLE IF NOT EXISTS orders (
  network TEXT NOT NULL,
  client_order_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  builder_code TEXT NOT NULL,
  partner_id TEXT NOT NULL DEFAULT '',
  host_origin TEXT NOT NULL DEFAULT '',
  fee_bps INTEGER NOT NULL,
  ts INTEGER NOT NULL,
  PRIMARY KEY (network, client_order_id)
);
CREATE INDEX IF NOT EXISTS orders_account ON orders (network, account_id);

CREATE TABLE IF NOT EXISTS fills (
  network TEXT NOT NULL,
  fill_id INTEGER NOT NULL,
  client_order_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  builder_code TEXT NOT NULL,
  partner_id TEXT NOT NULL DEFAULT '',
  host_origin TEXT NOT NULL DEFAULT '',
  symbol TEXT NOT NULL,
  side TEXT NOT NULL,
  price REAL NOT NULL,
  size REAL NOT NULL,
  notional REAL NOT NULL,
  builder_fee REAL NOT NULL,
  ts INTEGER NOT NULL,
  PRIMARY KEY (network, fill_id)
);
CREATE INDEX IF NOT EXISTS fills_builder ON fills (network, builder_code, ts);
CREATE INDEX IF NOT EXISTS fills_partner ON fills (network, builder_code, partner_id, host_origin, ts);
