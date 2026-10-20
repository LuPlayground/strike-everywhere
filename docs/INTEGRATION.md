# Integration guide

For wallets, dApps, portfolio trackers, communities and publications that want Strike perps inside their own product.

## 1. Get a builder code (5 minutes)
1. Open **app.strikefinance.org/builder-codes**, or testnet.strikefinance.org/builder-codes for testing.
2. Connect a wallet and register a code (1–64 letters, digits, `-` or `_`) and a **max fee**. Strike allows at most 1%; we recommend 0.10%.
3. Strike requires the account registering a builder code to hold at least **$100** (deposited in Strike; on testnet, test funds work). Undocumented as of Oct 2026.

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

### Full app layout (wallets and full-screen hosts)
`variant="app"` turns the ticket into a complete perps app for hosts that can give it a whole screen, like a wallet:
```html
<strike-trade variant="app" builder-code="YOUR_CODE" fee-bps="5" closable
  style="display:block; height:100%"></strike-trade>
```
- Under 900 px wide it's a mobile flow: Perps home (balance, positions, lists, top markets), market pages with a live chart, an amount keypad with leverage, order type and auto close (TP/SL), Review → Confirm, positions with partial close, and history.
- From 900 px it's a desktop trading view: market list, chart, order book and trades, order panel, positions / orders / trade history / transfers.
- Force one with `layout="mobile"` or `layout="desktop"`. Give it a height (`height` attribute or CSS); it fills its box.
- `closable` shows a × on the mobile home screen; it fires a `strike-close` event for the host to handle (e.g. go back to the wallet).
- It fires `strike-session` (`detail: { connected, address, accountId }`) whenever the connection changes, so the host's own header can reflect it.
- `screen="market"` or `screen="trade"` opens straight on the `market` attribute's market.
- The amount users enter is the **margin**; the position is margin × leverage (as in most wallet perps apps). It uses the Inter typeface; the classic ticket keeps Strike's IBM Plex.

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

## Optional: stack Strike's referral program
Strike's [referral program](https://docs.strikefinance.org/perpetuals/referrals) pays the referrer **20–40% of Strike's trading fees** from referred traders (tier grows with their combined lifetime volume: $0 / $250k / $1M / $5M / $20M), and gives those traders a **4–8% fee discount**. Rewards are claimable from $10 and credited to your Strike balance.

Add `referral-code="YOUR_REFERRAL_CODE"` to the tag and the widget passes it in the Builder Connect request, so a partner can earn the builder fee **and** referral rewards on the same users, while those users trade cheaper than on Strike directly.

Caveats:
- Strike lets you create a referral code only after **$10,000 of your own trading volume**.
- Builder Connect accepts `referral_code` (verified on testnet: Strike shows "Referral attribution" in the consent text and rejects codes that don't exist with a 400; the widget then connects without it and offers an "Apply on Strike" link). Whether it applies to accounts that already exist, and how rewards show up, is not yet verified.

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
