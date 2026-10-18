# Fee guidance

**Our recommendation:** a 5 bps (0.05%) default, never above 10 bps for retail-facing embeds.

## How builder fees work on Strike
- The **user approves a cap** (`fee_share_bps`) inside Strike's signed connect message.
- Each order sends `X-Builder-Fee-Bps`.
- Strike **rejects** any order whose fee exceeds the user's cap, the builder's registered cap, or Strike's deployment cap (100 bps).
- The builder fee is charged **on fill**, on top of Strike's own fees:

  | Fee tier | Taker | Maker |
  |---|---|---|
  | Base | 0.05% | −0.005% (rebate) |

- It is credited instantly to the builder's Strike balance.

## Why low
| Builder fee | Total taker cost on a $1,000 trade | Comparable |
|---|---|---|
| 0 bps | $0.50 | Strike direct |
| **5 bps** | **$1.00** | Phantom on Hyperliquid charges 5 bps |
| 10 bps | $1.50 | MetaMask on Hyperliquid charges 10 bps |
| 100 bps (Strike max) | $10.50 | Predatory for active traders |

Hyperliquid caps builder fees at 0.1% on perps; its biggest earners sit at 1–10 bps and win on **volume**. The widget's maths and UI show the total fee before every order, so high fees are visible to users and hurt conversion.

## Incentive integrity
A builder trading against itself pays Strike's fees *and* its own builder fee, so self-dealing is unprofitable unless fee rules change. The dashboard counts only fills Strike reports, matched to orders the widget created, and shows rejected orders separately.
