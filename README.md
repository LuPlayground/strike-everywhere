# Strike Everywhere

**Strike perps, anywhere Cardano lives.** One HTML tag puts a Strike trade ticket inside any Cardano wallet, dApp or community site.
- Users connect the wallet they already have with **one signature**, deposit ADA and trade.
- The host site earns **Strike builder fees** on every fill.
- A **partner dashboard** shows what each site brought in: volume, fees, funded and trading accounts verified against Strike's public history.

```html
<script src="https://strike-everywhere.pages.dev/widget/strike-everywhere.iife.js" defer></script>
<strike-trade builder-code="YOUR_CODE" fee-bps="5" market="ADA-USD"></strike-trade>
```

| | |
|---|---|
| Live landing + demos | https://strike-everywhere.pages.dev |
| Demo host: community newsletter | https://strike-everywhere.pages.dev/demo/blog/ |
| Demo host: portfolio tracker (hedge ADA) | https://strike-everywhere.pages.dev/demo/portfolio/ |
| Partner dashboard | https://strike-everywhere.pages.dev/dashboard/ |
| Partner API | https://strike-everywhere-api.strike-everywhere.workers.dev/v1/health |

> Demos default to **Strike testnet**. Add `?network=mainnet&builder=YOUR_CODE` to run them on mainnet.

---

## Why

Strike already has a builder program that is more generous than Hyperliquid's:
- fees of up to **1%** per fill;
- one-signature account creation for Cardano, Ethereum and Solana wallets;
- an API that accepts calls straight from the browser.

Yet no third-party project uses it. Integrating means implementing:
- Ed25519 request signing;
- CIP-30 COSE signatures;
- a three-step Cardano deposit, including adding wallet signatures to a transaction Strike builds;
- two WebSocket protocols;
- margin-tier maths.

On Hyperliquid, front ends that embed trading, especially wallets, became the largest source of builder volume. Phantom alone has done over $50B of perp volume through builder codes. **Strike Everywhere packages Strike's own infrastructure so any Cardano app can switch it on in an afternoon and earn from it.**

## What's in the repo

| Path | What it is |
|---|---|
| `packages/core` | `@strike-everywhere/core`, a browser SDK. It covers Builder Connect (Cardano CIP-30), signed REST, market data, trading, ADA deposits with pre-sign safety checks, the price and user WebSockets, and margin-tier risk maths. It has a unit test suite. |
| `packages/widget` | `<strike-trade>`, a web component (Preact, Shadow DOM) styled after Strike's own trading UI. It builds to **one script, ~52 KB gzipped**. |
| `workers/partner-api` | A Cloudflare Worker + D1 that receives attribution events and **reconciles them against Strike's public fill and transaction history**: a fill counts only if the widget registered its `client_order_id` before Strike created the order. |
| `apps/dashboard` | The partner dashboard: wallets → funded → trading accounts, verified volume, builder fees, per-site breakdown, recent activity, and an embed-snippet generator. |
| `apps/developers` | The integration page: configurator, live preview in a sample app, HTML / React / wallet-extension snippets. |
| `apps/demo-blog`, `apps/demo-portfolio`, `apps/demo-wallet` | Fictional hosts running the same one-tag widget: a newsletter, a portfolio tracker (hedge), and a concept wallet with a Perps tab. |
| `apps/landing` | Landing page. |
| `docs/` | Integration, security model, fees, architecture, build log. |

## How it uses Strike

Every call goes directly from the user's browser to Strike. Strike's API allows CORS from any origin, including the `X-API-Wallet-*` and `X-Builder-Fee-Bps` headers.

| Step | Strike endpoint |
|---|---|
| Onboard (one signature) | `POST /auth/builder/request-signature` → wallet `signData` (CIP-30, `"{coseSign1}:{coseKey}"`) → `POST /auth/builder/verify-signature` |
| Detect new users | `GET /v2/account?blockchain_address=` (404 = new account, so the first deposit must be at least $100) |
| Markets & prices | `GET /v2/markets`, `/price/v2/ticker/24hr`, `/price/v2/premiumIndex`, `/price/v2/klines`; WebSocket `!markprice@arr`, `!miniticker@arr` |
| Account | `GET /v2/account`, `/v2/positions`, `/v2/openOrders`, `/v2/history/order`; user WebSocket `session.logon` + `userstream` |
| Trade | `POST /v2/leverage`, `POST /v2/order` / `POST /v2/order/strategy` (TP/SL) with header **`X-Builder-Fee-Bps`**, `DELETE /v2/order/cancel` |
| Deposit ADA | `POST /v2/deposit/quote` → `POST /v2/deposit/build-tx` (with CIP-30 UTxOs) → wallet `signTx` → witness splice → `submitTx` → `POST /v2/deposit` |
| Attribution | `GET /v2/history/fill`, `/v2/history/order` (create time), `/v2/history/transaction` (settled deposits), all public by `account_id` |

## Quick start

```bash
npm install
npm test                      # core SDK unit tests
npm run build                 # SDK + widget bundle
npm run site                  # assemble ./site (landing, widget, demos, dashboard)
npm run deploy:site           # Cloudflare Pages
npm run deploy:api            # Cloudflare Worker (partner API)
```

### Widget attributes

| Attribute | Default | Meaning |
|---|---|---|
| `builder-code` | **required** | Your Strike builder code (register at app.strikefinance.org/builder-codes) |
| `fee-bps` | `5` | Builder fee per order (0.05%). Capped by `max-fee-bps` |
| `max-fee-bps` | = `fee-bps` | Cap the user approves in Strike's signed connect message (Strike's hard cap is 100) |
| `market` | `ADA-USD` | Initial market (all Strike perps are selectable) |
| `network` | `mainnet` | `mainnet` or `testnet` |
| `side` | `buy` | Initial side, e.g. `sell` for a hedging context |
| `max-leverage` | `10` | Site-level leverage ceiling (Strike's margin tiers also apply) |
| `partner-id` | — | Sub-attribution label shown in the dashboard |
| `partner-api` | — | Attribution endpoint (omit to disable) |
| `referral-code` | — | Strike referral code passed at connect (must belong to the builder owner) |
| `persist` | `memory` | `session` keeps the trading key in this tab's sessionStorage until it expires (12 h) |
| `width` | `380px` | Widget width |

### Features

- **Market views**: a compact sparkline by default, plus a **Chart** (SVG candles + volume; 15m / 1h / 4h / 1D; Mark / Last / Index; crosshair with OHLC) and a live **Book** (depth stream synced to REST snapshots; click a price to use it).
- **Order types**: Market, Limit, TP/SL, **Stop Market**, **Stop Limit** (mark-price triggers, checked against the live mark) and **TWAP** (5 min – 24 h, optional limit, randomize).
- **Market-order slippage estimate** from the live book, with a warning above 0.5% and an extra confirm above 2%.
- **Cross / isolated margin** toggle per market, applied and confirmed asynchronously like leverage.
- Lower panel: positions, open orders with **Cancel all**, active **TWAPs** with progress, **History** (fills, funding, closed positions with realized PnL, order history) and **Account** (margin ratio with Strike's risk levels, equity, all-time PnL and volume, fee tier) with a read-only list of **Strike vaults**.

### SDK only

```ts
import { StrikeEverywhere } from "@strike-everywhere/core";
const se = new StrikeEverywhere({ network: "mainnet", builderCode: "YOUR_CODE", feeBps: 5 });
await se.init();
await se.loadMarkets();
await se.connect("eternl");                         // one CIP-30 signature
const order = await se.placeOrder({ symbol: "ADA-USD", side: "buy", type: "market", size: 50, leverage: 2 });
```

## Security model (short)

- **Trading keys never leave the browser.** No server holds them.
- **The key cannot take funds.** Strike's builder API wallet can trade but cannot withdraw anywhere except the user's own wallet, and only with the user's wallet signature.
- **Deposits are verified before signing.** The widget decodes Strike's unsigned transaction and refuses to ask for a signature unless exactly the requested ADA leaves the wallet in one output, no tokens move, nothing else (certificates, withdrawals, governance actions, collateral) is in the transaction, and the datum credits this user's Strike account.
- **Keys are limited to the session.** Strike issues keys that never expire (`9999-12-31`), so the widget enforces its own lifetime, and reconnecting rotates the key.
- **Known limit:** a malicious *host page* could misuse the in-memory key to place trades, but not to withdraw.

Full details: [`docs/SECURITY.md`](docs/SECURITY.md).

## Development timeline (disclosure)

The foundation was built **before** the hackathon window, on 19–20 Oct 2026:
- research, testnet spikes, the core SDK, the widget, the partner API, the dashboard and the demo sites.

The rules allow existing projects that add meaningful functionality during the event. Work done during the 21–23 Oct window is listed in [`docs/CHANGELOG.md`](docs/CHANGELOG.md):
- mainnet integration and verification
- refinements
- the demo video

The git history shows all dates.

## Disclaimer

An independent project built on Strike's public Builder API. Not affiliated with or endorsed by Strike Finance. Perpetual futures are leveraged and risky, and Strike is unavailable in restricted regions (see strikefinance.org/restricted).

MIT licensed.
