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
- The **key is created in the browser** and its public half is bound to the user's account and the builder code by Strike's `verify-signature`. The private half is never sent anywhere.
- **Browser-held, non-extractable.** Where the browser supports it (current Chrome, Edge, Firefox and Safari), the key is a WebCrypto Ed25519 key created with `extractable: false`. Details and reasoning are in [Protecting the trading key](#protecting-the-trading-key).
- **Memory by default.** With `persist="memory"`, nothing is written anywhere, so reloading means reconnecting (one signature).
- **Opt-in reloads.** With `persist="session"`, the session survives reloads in that tab only:
  - `sessionStorage` holds the session details and a random key id;
  - IndexedDB holds the browser-held key handle, which stays non-extractable when stored;
  - no secret is ever written, and a raw key left by an older version is deleted on sight;
  - an older browser's in-memory fallback key is never stored.
- **Lifetime.** The widget ends the session after **30 minutes without user activity** or **12 hours** at most, whichever comes first. Strike issues builder API wallets with `api_wallet_expired_at = 9999-12-31`, which never expires, so we impose our own limits.
- **Rotation.** Strike revokes earlier API wallets for the same account and builder code on every Builder Connect, so reconnecting retires the old key.
- **Disconnect** clears the key from memory and storage.

## Protecting the trading key

### Why it matters
When a user connects, their wallet signs once to tell Strike "this key may trade for me". After that, the key signs every order with no wallet pop-up. That's what makes trading inside another app smooth, and it's also why the key is worth protecting.

- **What the key can't do:** withdraw. Withdrawals need the user's own wallet signature and only pay back to that wallet.
- **What it can do:** place and cancel orders with the user's Strike balance. Someone holding it could open reckless leveraged trades, or trade against their own orders on a quiet market to move value to their own account.
- **How long it lasts:** Strike's keys don't expire by themselves. A key only stops working when the same wallet connects again.

So the real danger isn't a withdrawal. It's someone quietly copying the key and trading with it later, from their own machine, for as long as the user doesn't reconnect.

### The two ways a key can be abused

| | What happens | Before | Now |
|---|---|---|---|
| **Steal and keep** | A script in the page (a malicious extension, an XSS, a compromised third-party script on the host site) reads the key and sends it somewhere | Possible: the key was a value in the page, and with `persist="session"` it sat in `sessionStorage` | **Blocked.** The browser never reveals the secret, so there is nothing to copy |
| **Use while open** | Bad code in the open page asks the key to sign orders | Possible | Still possible while the page is open (see limits), and now cut off after 30 idle minutes |

### What we do
1. **The browser holds the key** (`packages/core/src/signer.ts`).
   - It's created with `crypto.subtle.generateKey({ name: "Ed25519" }, false, ["sign", "verify"])`. The page gets a handle that can sign, but no script, ours included, can export the secret.
   - Strike receives exactly the same Ed25519 signatures as before, so nothing changes on Strike's side.
   - The WebCrypto functions are captured when the SDK loads, so a script that swaps out `crypto.subtle` later can't intercept them.
   - Every key is checked before use: it must be non-extractable, and a test signature must verify against its public key.
2. **Nothing secret is stored** (`packages/core/src/session.ts`).
   - Reload persistence keeps only the session details, a random id and the browser-held handle, which IndexedDB stores without making it extractable.
   - A new tab doesn't pick the session up.
   - Leftover handles from closed tabs are purged once they go stale.
3. **Short sessions** (`packages/core/src/client.ts`).
   - The key is forgotten after 30 minutes without real activity (clicks, taps, keys, scrolling or mouse movement) and after 12 hours at most.
   - Only genuine input counts: events a script fakes (`isTrusted === false`) can't keep a session alive.
   - The check also runs right before every signed request, so a session that ran out while the laptop slept can't sign one more order.
   - Coming back takes one wallet signature, which also makes Strike retire the old key.
4. **Older browsers.** If WebCrypto Ed25519 isn't available, the widget falls back to an in-memory key. That key is never written to storage and follows the same idle and lifetime limits.

For integrators, the SDK takes `idleTimeoutMs` (default 30 minutes, `0` turns it off) and `sessionTtlMs` (default 12 hours).

### Tested
- `packages/core/test/keysafety.test.ts` checks that:
  - the key can't be exported in any format;
  - its signatures verify, and an exportable or mismatched key is refused;
  - nothing secret reaches storage, and a pre-upgrade raw key is wiped;
  - the fallback key is never persisted;
  - idle and lifetime limits end the session, a signed request after going idle is refused, and the reason is reported.
- A headless Edge run against Strike's testnet (mock wallet, no funds) confirmed that:
  - Strike accepts signed requests from the browser-held key;
  - `exportKey` is refused (`InvalidAccessError`);
  - the same key survives a reload through IndexedDB, and a new tab doesn't inherit it;
  - real mouse movement keeps a session alive, while fake events don't, and the session then ends with storage cleared.

### What this can't stop
- **Code inside the open page can still use the key.** An extension allowed to read and change every site, or a hostile host page, runs in the same page as the widget. While the page is open, it can ask the key to sign or drive the widget itself. No in-page protection can fully prevent that, and encrypting the key wouldn't help, because the password would have to live in the same page.
- **Code that runs before the widget loads** and rewrites browser APIs could interfere with key creation.

What protects users in these cases:
- withdrawals still need their own wallet's approval;
- the idle timeout limits how long a key is usable;
- connect only on sites you trust, and only install extensions you trust.

### What would make it stronger
- **Isolated mode (roadmap).** The key and the order form would live in a frame served from our own origin, so the host page's scripts can't reach either. Safety checks for unusual orders (price far from the market, unusually large size, bursts of orders) would live inside that frame, where page scripts can't bypass them.
- **Server-side key expiry or revocation.** Strike's keys don't expire on their own today. An expiry time, or an endpoint to revoke a key, would let a lost key stop working by itself, even if the user never reconnects.

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
1. **A malicious host page can use an in-page key while the page is open.** The widget runs inside the host's page, so a hostile host (or an extension with access to every site) could have the key **sign trades** while the page is open, though it **can't withdraw funds** and, with the browser-held key, **can't copy the key** to use later. Users should only connect on sites they trust, just as with any dApp. See [Protecting the trading key](#protecting-the-trading-key).
   - *Roadmap:* an isolated mode served from a dedicated origin, so the key never touches the host's JavaScript context.
2. **CIP-30 wallets show Strike's consent text, not the widget's.** The message users sign is Strike's own. It names the builder, the fee cap and the API key, and says the user is *"entrusting your API wallet private key to this builder"*. The widget also shows that text before and while signing.
3. **The liquidation price shown before an order is an estimate.** It treats the position as isolated. In Strike's default cross margin the real price is usually further away. After a fill, the widget shows Strike's own `liquidation_price`.
4. **Attribution data is public by nature.** Strike exposes fills by account id publicly, and the partner API only stores what is needed to match them.
5. **What the dashboard can and can't prove.**
   - *Verified against Strike:* volume, fills and active traders count only fills from Strike's public history for orders the widget **registered before Strike created them**, from the same account. Order ids are random and only become public once the order exists, so nobody can claim someone else's fills after the fact (`scripts/attribution_selftest.py` checks this against real mainnet fills). Funded accounts and deposit value come from Strike's public transaction history.
   - *Not verifiable:* "connected wallets" and the integration labels are reported by the widget, so anyone can inflate them for a builder code. The builder-fee amount is computed as notional × the fee bps the widget sent, because Strike's public history doesn't expose builder fees; Strike's own builder page is the source of truth for fees actually credited.
   - Registration waits at most 1.5 s for the partner API before the order is sent; if the API is slow or down, trading continues and that order simply isn't attributed.
6. **`persist="session"` keeps the key usable across reloads.** Nothing secret is stored, but the browser-held key handle stays in that origin's IndexedDB until the session ends (30 idle minutes, 12 h at most). Scripts on the same site could *use* it during that window, though not copy it. Prefer the default `memory` mode on pages that load third-party scripts.

## Reporting
Please report security issues privately via a GitHub security advisory on this repository.
