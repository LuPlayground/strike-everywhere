# Architecture

```
Host page (any origin)
 └─ <script strike-everywhere.iife.js>  ──►  <strike-trade> (Shadow DOM, Preact)
      │                                         │
      │  CIP-30 (Lace / Eternl / …)              │  @strike-everywhere/core (in the browser)
      │   signData  ── connect consent ─────────►│   ApiWalletKey (Ed25519, @noble/ed25519)
      │   signTx    ── deposits ────────────────►│   StrikeHttp: signed REST  ─────────────►  api.strikefinance.org
      │   submitTx                               │   PriceStream / UserStream (WS) ─────────►  /ws/price, /ws/user-api
      │                                          │   Deposits: quote → build-tx → preview/check → signTx → splice → submit
      │                                          │   Trading: leverage, order/strategy (X-Builder-Fee-Bps), cancel, close
      │                                          └─► beacon (text/plain, fire-and-forget) ─┐
      │                                                                                     ▼
      │                                           Partner API (Cloudflare Worker + D1)
      │                                             POST /v1/events   connect | order | deposit
      │                                             cron (10 min) + on-demand:  GET  api.strikefinance.org/v2/history/fill?account_id=…
      │                                             match fills by client_order_id → fills table (notional, builder_fee)
      │                                             GET /v1/stats  → dashboard
      ▼
 Dashboard (static) ── GET /v1/stats ──► Partner API
```

## Design choices
- **Direct-to-Strike from the browser.** Strike serves `Access-Control-Allow-Origin: *` and allows the `X-Api-Wallet-*` and `X-Builder-Fee-Bps` headers (verified 2026-10-18). There is no proxy and no server-side key, so the threat surface is the user's browser and the host page.
- **Shadow DOM web component.** It works in any stack and is style-isolated. The fonts (IBM Plex) are declared once in the light DOM.
- **Strike's design language.** The CSS custom properties mirror Strike's app (mint `#4EFAB0`, rose `#F43F5E`, `#0a0a0a` surfaces, IBM Plex Sans) and the ticket structure (Cross / leverage / One-Way, Market/Limit tabs, Long/Short segment, slider, detail rows), so users recognise Strike anywhere.
- **Mark price everywhere.** References, fee previews, liquidation estimates, sparkline and 24h change all use the mark price. Thin books (e.g. testnet) can have a stale last trade; Strike's limit-price band is also evaluated against the mark.
- **Asynchronous orders.** `POST /v2/order` returns 201 "pending". The SDK polls `/v2/history/order` by `client_order_id` until a terminal status, and maps rejection codes to human messages.
- **Byte-preserving witness splice.** A minimal CBOR walker inserts wallet witnesses without re-encoding the body. This avoids shipping a ~1 MB WASM serialization library.
- **Verifiable attribution.** The partner API never trusts client-reported volume. It counts only fills from Strike's public fill history whose `client_order_id` the widget generated, including TP/SL legs.

## Strike API quirks handled
| Quirk | Handling |
|---|---|
| Builder guide shows `"BUY"`/`"LIMIT"`; the API only accepts lowercase | Lowercase enums |
| The docs' mainnet user WebSocket host does not connect | `wss://api.strikefinance.org/ws/user-api` |
| `/v2/openOrders` is PascalCase; history is snake_case | `normalizeOrder` |
| Builder API wallets never expire | Widget-enforced session lifetime |
| New accounts need a first deposit of at least $100 (undocumented) | Detected via `GET /v2/account?blockchain_address=` (404) and explained before connecting and depositing |
| Reference repo field `max_fee_bps` | Docs field `fee_share_bps` |
| Cloudflare blocks default script user agents | The Worker sends a descriptive User-Agent |

## Bundle
- `strike-everywhere.iife.js`: ~110 KB minified, **~38 KB gzipped**. It includes Preact, the SDK, Ed25519 and bech32.
- `strike-everywhere.js`: ESM build for bundlers.
