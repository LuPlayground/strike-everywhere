# Testing

| Layer | How | What it proves |
|---|---|---|
| Core unit tests | `npm test` (Vitest, 13 tests) | Request-signing format and Ed25519 verification; CBOR walking; witness splice keeps body bytes identical (on a **real Strike testnet deposit transaction**); transaction preview decodes the real fee (176,193 lovelace, matching Koios); bech32 round-trip; margin-tier leverage caps; liquidation and fee maths |
| Builder Connect E2E | `python -I tests/e2e/connect_flow.py <page> <outdir>` | Uses a **mock CIP-30 wallet** producing real COSE_Sign1/COSE_Key signatures (`tests/e2e/mock-wallet.js`) to drive the real widget against **Strike testnet**: new-account detection (404), `request-signature` 200, `verify-signature` 200, signed `/v2/account` 200, UI states (review, connected, Deposit-to-trade, Account tab). It also confirmed that the network guard rejects a testnet wallet on a mainnet widget |
| Attribution self-test | `python -I scripts/attribution_selftest.py <partner-api>` | Against **real mainnet fills**: posts an order event claiming a real fill's `client_order_id` under a throwaway builder label; the Worker reconciles with Strike's public fill history and reports the exact notional and 5 bps fee. Result on 2026-10-19: **PASS** ($20,000.03 volume → $10.00 fee). Test rows deleted afterwards |
| Partner API smoke | `python -I scripts/api_smoke.py <partner-api>` | Health, input validation (rejects bad events), stats shape |
| Visual | `python -I scripts/shoot.py <url> <png> [w] [h] [actions]` | Screenshots against live Strike data, compared with Strike's own UI |
| Manual wallet runs | Eternl on Preprod (spike, 2026-10-18) | Real CIP-30 connect; full ADA deposit on-chain (`39a915f8…`, confirmed); order submission with the builder-fee header |

## Not yet covered automatically
- Fills on testnet: testnet books are stale and reject limit orders (`order_price_out_of_limit`). The fill path, closing positions and seeing builder fees credited are verified on **mainnet** with a small funded wallet.
- Deposit signing with the mock wallet: it does not hold UTxOs. Real deposits were verified with Eternl.
