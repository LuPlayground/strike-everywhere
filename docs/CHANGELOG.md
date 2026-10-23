# Changelog

## Before the hackathon window (19–20 Oct 2026)
- Research: Strike's API, Builder Connect and design system; competitor builder programs.
- Testnet spikes with a real Eternl wallet: connect, signed requests, full ADA deposit on-chain, orders with the builder fee header.
- `@strike-everywhere/core` SDK with unit tests.
- `<strike-trade>` widget styled after Strike's UI.
- Partner API (Cloudflare Worker + D1) with fill reconciliation.
- Dashboard, two demo host sites, landing page.
- E2E tests: mock CIP-30 wallet against Strike testnet; attribution self-test against mainnet fills.

## During the window (21–23 Oct 2026)
- Mainnet run with real wallets: builder code StrikeOn registered, trader connected, deposited, opened and closed an ETH-USD position, builder fee credited to the cent, withdrawal back to the same wallet. Transactions are listed on the judges page.
- Builder deposits now credit: the deposit check allows Strike's 2 ADA forwarding fee.
- Trading key kept in a non-extractable browser key, with sign-out after 30 idle minutes.
- Pinned widget releases (v0.1.1 to v0.1.9) with SRI hashes; our pages can't be framed by other sites.
- Fixes from real-wallet testing: late order confirmations no longer shown as failures, deposit amounts leave room for fees and change, isolated margin display, TWAP minimums, grid bot ids, clearer errors.
- New traders can make a first deposit from $5, like any deposit. Only registering a builder code needs $100 (v0.1.9).
- Positions and open orders in the panel layout, a leverage attribute, and a network-badge option.
- Developers page with a live configurator, judges page with test paths and proof, docs menu and pitch deck PDF.
- Tests: read-only mainnet page test and end-to-end connect on the developers preview.
