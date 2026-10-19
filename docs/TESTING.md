# Testing

| Layer | How | What it proves |
|---|---|---|
| Core unit tests | `npm test` (Vitest, 18 tests) | Request-signing format and Ed25519 verification; CBOR walking; witness splice keeps body bytes identical (on a **real Strike testnet deposit transaction**); transaction preview decodes the real fee (176,193 lovelace, matching Koios); bech32 round-trip; margin-tier leverage caps; liquidation and fee maths; **deposit safety checks** against the real transaction and tampered copies (wrong amount, wrong request/account in the datum, an extra treasury-donation field, an is_valid=false flag, truncated CBOR that must throw rather than hang) |
| Builder Connect E2E | `python -I tests/e2e/connect_flow.py <page> <outdir>` | Uses a **mock CIP-30 wallet** producing real COSE_Sign1/COSE_Key signatures (`tests/e2e/mock-wallet.js`) to drive the real widget against **Strike testnet**: new-account detection (404), `request-signature` 200, `verify-signature` 200, signed `/v2/account` 200, user WebSocket `session.logon` → `authenticated: true` and `userstream` subscribed, UI states (review, connected, Deposit-to-trade, Account tab). It also confirmed that the network guard rejects a testnet wallet on a mainnet widget |
| Attribution anti-spoofing test | `python -I scripts/attribution_selftest.py <partner-api>` | Against **real mainnet fills**: tries to claim a stranger's real fill (`client_order_id` from Strike's public history) for a throwaway builder label, after the fact. The Worker must not credit it, because the id was registered after Strike created the order. Result on 2026-10-19: **PASS** (0 fills, $0 credited); test rows deleted. (The first version of this test showed the opposite: claims were accepted. That hole was closed in the audit.) The positive path is covered by the mainnet run |
| Partner API smoke | `python -I scripts/api_smoke.py <partner-api>` | Health, input validation (rejects bad and empty events), stats shape; exits non-zero on failure |
| Visual | `python -I scripts/shoot.py <url> <png> [w] [h] [actions]` | Screenshots against live Strike data, compared with Strike's own UI |
| Manual wallet runs | Eternl on Preprod (spike, 2026-10-18) | Real CIP-30 connect; full ADA deposit on-chain (`39a915f8…`, confirmed); order submission with the builder-fee header |

## Not yet covered automatically
- Fills on testnet: testnet books are stale and reject limit orders (`order_price_out_of_limit`). The fill path, closing positions and seeing builder fees credited are verified on **mainnet** with a small funded wallet.
- Deposit signing with the mock wallet: it does not hold UTxOs. Real deposits were verified with Eternl.
