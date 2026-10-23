import type { ComponentChildren } from "preact";
import { MIN_DEPOSIT_USD } from "@strike-everywhere/core";
import type { PerpsState } from "./state";

export function learnTopic(topic: string, s: PerpsState): { title: string; body: ComponentChildren } {
  const fee = (s.client.orderFeeBps / 100).toFixed(2);
  const taker = (s.takerRate * 100).toFixed(3);
  switch (topic) {
    case "basics":
      return {
        title: "How Perps work",
        body: (
          <>
            <p>
              A perpetual future ("perp") lets you trade where a price goes next without buying the asset. Go <b class="pos">Long</b> if you think it rises, <b class="neg">Short</b> if you think it falls.
            </p>
            <p>
              You put in <b>margin</b> (the amount you enter). <b>Leverage</b> multiplies it into a bigger position: $10 at 3x controls a $30 position, so gains and losses are 3x too.
            </p>
            <p>
              If the price moves too far against you, Strike <b>liquidates</b> the position: it closes some or all of it at market, and you can lose the margin behind it plus a liquidation fee. Only the funds you add to your Perps balance are at risk; what stays in your wallet isn't.
            </p>
            <p>Perps don't expire: you close whenever you want, or set an Auto Close (take profit / stop loss) when you open.</p>
          </>
        ),
      };
    case "leverage":
      return {
        title: "Leverage and liquidation",
        body: (
          <>
            <p>Higher leverage means a smaller move wipes out your margin. For a position backed only by its own margin, roughly: at 2x a 50% move against you liquidates it, at 10x about 10%, at 20x about 5%.</p>
            <p>
              The leverage screen shows that estimate before you open. Strike's actual liquidation price (shown on the position once it's open) is usually further away: Strike uses cross margin by default, where your whole Perps balance backs your positions. That also means a big loss can use all of that balance.
            </p>
            <p>Each market has its own maximum leverage on Strike, and larger positions get lower limits. Starting out? 2–3x keeps liquidation far away.</p>
          </>
        ),
      };
    case "funding":
      return {
        title: "Funding",
        body: (
          <>
            <p>Every hour, one side pays the other to keep the perp price close to the real market (the index). When funding is positive, longs pay shorts; when negative, shorts pay longs.</p>
            <p>It's a small % of your position size and only applies while a position is open.</p>
          </>
        ),
      };
    case "mark":
      return { title: "Mark price", body: <p>Strike's reference price for the market. Strike uses it for unrealized P&L and liquidations, and the Auto Close orders this app places trigger on it, so a single odd trade can't set them off.</p> };
    case "index":
      return { title: "Index price", body: <p>The average spot price on major external exchanges. Strike keeps the perp close to it through funding.</p> };
    case "funds":
      return {
        title: "Available funds",
        body: (
          <>
            <p>Your Perps balance on Strike that isn't being used as margin. Add funds by depositing ADA from your wallet; Strike converts it to USD margin.</p>
            <p>Deposits start at ${MIN_DEPOSIT_USD}. Withdrawals (from $5) go back to the same wallet.</p>
          </>
        ),
      };
    default:
      return {
        title: "Perps FAQ",
        body: (
          <>
            <p>
              <b>Where do my funds go?</b> Deposits go to Strike Finance, the exchange that runs these markets. This app never holds your funds; your wallet signs every deposit and withdrawal.
            </p>
            <p>
              <b>What are the fees?</b> Strike's trading fee ({taker}% for orders that fill at once; limit orders that wait on the book pay Strike's lower maker fee) plus this app's builder fee ({fee}%), on the position size when it opens and when it closes. Funding applies hourly while a position is open.
            </p>
            <p>
              <b>How long do deposits take?</b> Usually a few minutes: Strike waits for Cardano confirmations before crediting.
            </p>
            <p>
              <b>How much can I lose?</b> Only what's in your Perps balance; funds in your wallet aren't touched. With Strike's default cross margin, your whole Perps balance backs your positions, so big losses can use all of it.
            </p>
          </>
        ),
      };
  }
}

export function Disclosures({ s }: { s: PerpsState }) {
  const app = s.client.appUrl();
  return (
    <div class="pa-prose">
      <p>
        Perpetual futures are leveraged and risky. Prices can move quickly, and a position can be liquidated, losing all of the margin in it. Only trade with funds you can afford to lose.
      </p>
      <p>
        Trades, deposits and withdrawals execute on{" "}
        <a href={app} target="_blank" rel="noopener">
          Strike Finance
        </a>{" "}
        through its public builder API. This app is an independent integration (builder code <b>{s.config.builderCode}</b>) and charges a {(s.client.orderFeeBps / 100).toFixed(2)}% builder fee per trade on top of Strike's fees. It isn't Strike, and never holds your funds.
      </p>
      <p>
        Strike's{" "}
        <a href="https://www.strikefinance.org/terms" target="_blank" rel="noopener">
          Terms
        </a>{" "}
        apply, and Strike isn't available in{" "}
        <a href="https://www.strikefinance.org/restricted" target="_blank" rel="noopener">
          restricted regions
        </a>
        .
      </p>
      {s.testnet && <p>You're on Strike's testnet: balances are test funds with no value.</p>}
    </div>
  );
}
