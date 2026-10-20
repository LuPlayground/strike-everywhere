# Security model

Strike On puts trading inside other people's websites. That makes the trust boundaries the most important design decision. This file states them plainly, including the limits.

## What each party can do

| Party | Can | Cannot |
|---|---|---|
| **User's wallet** (Lace, Eternl, …) | Sign Strike's connect message once; sign each deposit transaction; sign withdrawals on Strike | — |
| **API wallet key** (Ed25519, created in the browser by Builder Connect) | Place and cancel orders, set leverage, read the account, build deposits | Withdraw anywhere except the user's own wallet, and only with the user's wallet signature (Strike `withdraw` API). It cannot change the builder fee cap the user signed |
| **Host site** (the page embedding the widget) | Choose the builder code, fee (≤ the cap the user signs), market and leverage ceiling | Charge more than the cap; move funds out of Strike |
| **Strike On servers** (partner API) | Store attribution events (account ids, client order ids, partner labels) | Trade, sign or move anything. They never see keys or signatures |
| **Strike** | Matches, custodies, settles | — |

## Key handling
- The **key is generated in the browser** (`@noble/ed25519`) and its public half is bound to the user's account and the builder code by Strike's `verify-signature`. It is never sent anywhere else.
- **Memory by default.** With `persist="memory"`, the key exists only in the page's memory, so reloading means reconnecting (one signature).
- **Opt-in session persistence.** `persist="session"` stores the key in that tab's `sessionStorage` with a **widget-enforced 12-hour expiry**, because Strike issues builder API wallets with `api_wallet_expired_at = 9999-12-31`, which effectively never expires.
- **Rotation.** Strike revokes earlier API wallets for the same account and builder code on every Builder Connect, so reconnecting rotates the key.
- **Disconnect** clears the key from memory and storage.

## Deposit safety
The widget never asks the user to sign a deposit until it has decoded Strike's unsigned Cardano transaction (`cardano/txPreview.ts`, `checkDepositTx` in `deposit.ts`) and confirmed that:
- the body contains **only the fields a plain transfer needs** (inputs, outputs, fee, validity interval, aux-data hash, required signers, network id). Certificates, reward withdrawals, minting, collateral, governance votes/proposals and treasury donations are refused, since they could move value without showing up as an output;
- the transaction is **not marked invalid** (which would forfeit collateral) and the **network fee is at most 3 ADA**;
- **exactly one output** leaves the user's wallet, carrying **exactly the requested lovelace** and **no native tokens**; any change returns to the user's own address;
- the deposit output's **datum names this deposit request, the user's wallet key and the user's Strike account**, so the deposit can only be credited to them.

The same checks run again on the exact bytes right before `signTx`, and an expired quote is refused. If any check fails, the widget refuses (`DepositSafetyError`). Wallet witnesses are spliced in **without re-encoding the transaction body** (`spliceWitnessSet`), so the transaction id the user signs is the one that is submitted. If the on-chain transaction succeeds but registering it with Strike fails, the widget retries and then offers "retry registration" (never a second signature). Malformed or truncated CBOR throws instead of hanging. All of this is covered by tests against a real Strike testnet deposit transaction and tampered variants of it.

> Observation: on testnet, Strike's `build-tx` output address differs from the `deposit_address` in the quote. The widget therefore shows the **actual destination** decoded from the transaction, not the quoted one, and we have asked Strike which address is canonical.

## Orders
- Every order carries a client order id generated in the browser and the builder fee header `X-Builder-Fee-Bps`. **Strike rejects any order whose fee exceeds the cap the user signed** (or the builder's registered cap). The widget also never sends more than the approved cap: if a page raises its fee, a restored session is dropped and the user sees and signs the new cap.
- If Strike refuses the requested leverage, the order is **not sent** (unless an open position already uses that leverage or less), so the margin and liquidation estimate the user saw stay true.
- Orders are accepted asynchronously (201 "pending"). The widget waits for Strike's final status and shows rejections in plain language.
- **Safety defaults:**
  - leverage starts at 3x;
  - each site sets a ceiling (`max-leverage`, default 10x);
  - a warning appears when the estimated liquidation price is within 10% of entry;
  - every fee (Strike's and the builder's) is shown before confirming.

## Known limitations (be explicit)
1. **A malicious host page can misuse an in-page key.** The widget runs inside the host's page, so a hostile host could read or intercept the API key and **place trades**, though it **cannot withdraw funds**. Users should only connect on sites they trust, just as with any dApp.
   - *Roadmap:* an iframe-isolated mode served from a dedicated origin, so the key never touches the host's JavaScript context.
2. **CIP-30 wallets show Strike's consent text, not the widget's.** The message users sign is Strike's own. It names the builder, the fee cap and the API key, and says the user is *"entrusting your API wallet private key to this builder"*. The widget also shows that text before and while signing.
3. **The liquidation price shown before an order is an estimate.** It treats the position as isolated. In Strike's default cross margin the real price is usually further away. After a fill, the widget shows Strike's own `liquidation_price`.
4. **Attribution data is public by nature.** Strike exposes fills by account id publicly, and the partner API only stores what is needed to match them.
5. **What the dashboard can and can't prove.**
   - *Verified against Strike:* volume, fills and active traders count only fills from Strike's public history for orders the widget **registered before Strike created them**, from the same account. Order ids are random and only become public once the order exists, so nobody can claim someone else's fills after the fact (`scripts/attribution_selftest.py` checks this against real mainnet fills). Funded accounts and deposit value come from Strike's public transaction history.
   - *Not verifiable:* "connected wallets" and the integration labels are reported by the widget, so anyone can inflate them for a builder code. The builder-fee amount is computed as notional × the fee bps the widget sent, because Strike's public history doesn't expose builder fees; Strike's own builder page is the source of truth for fees actually credited.
   - Registration waits at most 1.5 s for the partner API before the order is sent; if the API is slow or down, trading continues and that order simply isn't attributed.
6. **`persist="session"` widens exposure.** The key then sits in the host origin's `sessionStorage` for up to 12 h, readable by any script (or XSS) on that origin. Prefer the default `memory` mode on pages that load third-party scripts.

## Reporting
Please report security issues privately via a GitHub security advisory on this repository.
