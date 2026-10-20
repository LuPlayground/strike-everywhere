import type { ComponentChildren } from "preact";
import { NEW_ACCOUNT_MIN_DEPOSIT_USD } from "@strike-everywhere/core";
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
            <p>If the price moves far enough against you, the position is <b>liquidated</b> and you lose that margin. You can never lose more than the funds in your Perps balance.</p>
            <p>Perps never expire: you close whenever you want, or set an Auto Close (take profit / stop loss).</p>
          </>
        ),
      };
    case "leverage":
      return {
        title: "Leverage and liquidation",
        body: (
          <>
            <p>Higher leverage means a smaller move wipes out your margin. Roughly, at 2x a 50% move against you liquidates; at 10x about 10%; at 20x about 5%.</p>
            <p>The leverage screen shows the estimated liquidation price and how far away it is before you open. Strike's actual price can differ slightly (fees, funding, and in cross margin your whole balance backs the position).</p>
            <p>Starting out? 2–3x keeps liquidation far away.</p>
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
      return { title: "Mark price", body: <p>Strike's fair price for the market, based on the index and its order book. Liquidations, Auto Close and unrealized P&L use it, so a single odd trade can't trigger them.</p> };
    case "index":
      return { title: "Index price", body: <p>The average spot price on major external exchanges. Strike keeps the perp close to it through funding.</p> };
    case "funds":
      return {
        title: "Available funds",
        body: (
          <>
            <p>Your Perps balance on Strike that isn't being used as margin. Add funds by depositing ADA from your wallet; Strike converts it to USD margin.</p>
            <p>New Strike accounts need a first deposit of at least ${NEW_ACCOUNT_MIN_DEPOSIT_USD}; later deposits from $5. Withdrawals go back to the same wallet.</p>
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
              <b>What are the fees?</b> Strike's trading fee ({taker}%) plus this app's builder fee ({fee}%), on the position size when it opens and closes. Funding applies hourly while a position is open.
            </p>
            <p>
              <b>How long do deposits take?</b> Usually 3–6 minutes: Strike waits for Cardano confirmations.
            </p>
            <p>
              <b>Can I lose more than I put in?</b> No. The most you can lose is the margin in your positions.
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
