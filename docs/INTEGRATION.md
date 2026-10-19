# Integration guide

For wallets, dApps, portfolio trackers, communities and publications that want Strike perps inside their own product.

## 1. Get a builder code (5 minutes)
1. Open **app.strikefinance.org/builder-codes**, or testnet.strikefinance.org/builder-codes for testing.
2. Connect a wallet and register a code (1–64 letters, digits, `-` or `_`) and a **max fee**. Strike allows at most 1%; we recommend 0.10%.
3. Strike requires the registering account to have made a **first deposit of at least $100** (an undocumented rule as of Oct 2026).

## 2. Embed
```html
<script src="https://strike-everywhere.pages.dev/widget/strike-everywhere.iife.js" defer></script>
<strike-trade
  builder-code="YOUR_CODE"
  fee-bps="5"
  market="ADA-USD"
  partner-id="homepage-sidebar"
  partner-api="https://strike-everywhere-api.strike-everywhere.workers.dev">
</strike-trade>
```
- The widget renders in a **Shadow DOM**, so your CSS cannot break it and its CSS cannot leak into your page.
- It sizes itself with `width` (default 380px, min 300px). Put it in a sidebar, a modal or a dedicated page.
- See the README for every attribute. Common ones:
  - `side="sell"` for hedging flows;
  - `max-leverage="3"` for conservative audiences;
  - `network="testnet"` while you integrate.

### React / frameworks
It is a standard custom element, so it works in any framework:
```tsx
useEffect(() => { import("https://strike-everywhere.pages.dev/widget/strike-everywhere.js"); }, []);
return <strike-trade builder-code="YOUR_CODE" fee-bps="5" />;
```

### SDK without the UI
`@strike-everywhere/core` exposes the same flows programmatically (`StrikeEverywhere`, `builderConnect`, `Trading`, `Deposits`, `PriceStream`, `UserStream`). See the README for an example.

## 3. Track results
Open **/dashboard/?builder=YOUR_CODE&network=mainnet**. It shows:
- connected wallets, then funded accounts, then trading accounts;
- attributed volume and builder fees: only fills in Strike's public history for orders the widget registered before Strike created them (fees are computed as notional × your bps);
- a per-site breakdown by `partner-id` and origin;
- a snippet generator.

Builder fees themselves are **credited by Strike directly to your Strike account balance** on every fill. Strike's own builder-codes page is the source of truth for what was credited; the dashboard's fee figure is an estimate from verified fills.

## Who should register their own code?
- **Your own site:** use your own code. Fees go to you.
- **A network of partner sites you coordinate:** give each a `partner-id` under your code, and settle with them off-chain using the dashboard figures.
- **Independent partners:** they register their own code and embed with it. Strike pays them directly.

## Checklist before going live on mainnet
- [ ] Builder code registered on **mainnet**, with a max fee at or above your `fee-bps`
- [ ] `network` attribute removed or set to `mainnet`
- [ ] Tested with a real wallet: connect, deposit, open, close
- [ ] Your page mentions risk and links Strike's terms (the widget does too)
- [ ] You are not targeting users in Strike's restricted regions
