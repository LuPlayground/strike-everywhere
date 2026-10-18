# Security model

Strike Everywhere puts trading inside other people's websites. That makes the trust boundaries the most important design decision. This file states them plainly, including the limits.

## What each party can do

| Party | Can | Cannot |
|---|---|---|
| **User's wallet** (Lace, Eternl, …) | Sign Strike's connect message once; sign each deposit transaction; sign withdrawals on Strike | — |
| **API wallet key** (Ed25519, created in the browser by Builder Connect) | Place and cancel orders, set leverage, read the account, build deposits | Withdraw anywhere except the user's own wallet, and only with the user's wallet signature (Strike `withdraw` API). It cannot change the builder fee cap the user signed |
| **Host site** (the page embedding the widget) | Choose the builder code, fee (≤ the cap the user signs), market and leverage ceiling | Charge more than the cap; move funds out of Strike |
| **Strike Everywhere servers** (partner API) | Store attribution events (account ids, client order ids, partner labels) | Trade, sign or move anything. They never see keys or signatures |
| **Strike** | Matches, custodies, settles | — |

## Key handling
- The **key is generated in the browser** (`@noble/ed25519`) and its public half is bound to the user's account and the builder code by Strike's `verify-signature`. It is never sent anywhere else.
- **Memory by default.** With `persist="memory"`, the key exists only in the page's memory, so reloading means reconnecting (one signature).
- **Opt-in session persistence.** `persist="session"` stores the key in that tab's `sessionStorage` with a **widget-enforced 12-hour expiry**, because Strike issues builder API wallets with `api_wallet_expired_at = 9999-12-31`, which effectively never expires.
- **Rotation.** Strike revokes earlier API wallets for the same account and builder code on every Builder Connect, so reconnecting rotates the key.
- **Disconnect** clears the key from memory and storage.

## Deposit safety
The widget never asks the user to sign a deposit until it has decoded Strike's unsigned Cardano transaction (`cardano/txPreview.ts`) and confirmed that:
- **exactly one output** leaves the user's wallet;
- that output carries **exactly the requested lovelace**;
- **no native tokens** move;
- any change returns to the user's own address.

If any check fails, the widget refuses (`DepositSafetyError`). Wallet witnesses are spliced in **without re-encoding the transaction body** (`spliceWitnessSet`), so the transaction id the user signs is the one that is submitted. This is covered by tests against a real Strike testnet deposit transaction.

> Observation: on testnet, Strike's `build-tx` output address differs from the `deposit_address` in the quote. The widget therefore shows the **actual destination** decoded from the transaction, not the quoted one, and we have asked Strike which address is canonical.

## Orders
- Every order carries a client order id generated in the browser and the builder fee header `X-Builder-Fee-Bps`. **Strike rejects any order whose fee exceeds the cap the user signed** (or the builder's registered cap).
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

## Reporting
Please report security issues privately via a GitHub security advisory on this repository.
