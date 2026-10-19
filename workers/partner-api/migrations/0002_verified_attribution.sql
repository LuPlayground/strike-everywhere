ALTER TABLE accounts ADD COLUMN fail_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE accounts ADD COLUMN funded_at INTEGER;
ALTER TABLE accounts ADD COLUMN deposit_usd REAL NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS accounts_reconcile ON accounts (last_reconciled);
CREATE INDEX IF NOT EXISTS events_partner ON events (network, builder_code, partner_id, host_origin, ts);
CREATE INDEX IF NOT EXISTS events_account ON events (network, builder_code, account_id);
CREATE INDEX IF NOT EXISTS orders_account ON orders (network, account_id);
CREATE INDEX IF NOT EXISTS fills_partner ON fills (network, builder_code, partner_id, host_origin, ts);
