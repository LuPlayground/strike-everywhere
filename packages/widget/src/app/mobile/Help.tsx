import { usdText } from "../markets";
import type { PerpsState } from "../state";
import { Group, RoundBtn, Row, Spin } from "../ui";
import { useActivity } from "./History";
import type { Nav } from "./Mobile";

export function Help({ s, nav }: { s: PerpsState; nav: Nav }) {
  const { items } = useActivity(s);
  const transfers = (items ?? []).filter((a) => a.id.startsWith("t")).slice(0, 8);
  const explorer = s.testnet ? "https://preprod.cardanoscan.io/address/" : "https://cardanoscan.io/address/";
  return (
    <div class="pa-screen">
      <div class="pa-top">
        <RoundBtn n="back" label="Back" onClick={nav.back} />
        <div class="pa-title">Deposit and withdrawal issues</div>
      </div>
      <div class="pa-scroll">
        <div class="pa-prose">
          <p>Deposits usually take a few minutes: Strike waits for Cardano confirmations before crediting. Withdrawals usually arrive within a few minutes.</p>
          <p>Your ADA is always visible on-chain. If a transfer seems stuck, check it in a Cardano explorer, then contact Strike support with the transaction.</p>
        </div>
        {s.session ? (
          <>
            <h2 class="pa-h2 sm">Funds</h2>
            <Group>
              <Row k="Account value" v={<span class="num">{usdText(s.equity)}</span>} />
              <Row k="Available to trade" v={<span class="num">{usdText(s.available)}</span>} />
              <Row k="Unrealized P&L" v={<span class={`num ${s.upnl >= 0 ? "pos" : "neg"}`}>{usdText(s.upnl, { sign: true })}</span>} />
            </Group>
            <h2 class="pa-h2 sm">Recent transfers</h2>
            {items === null ? (
              <div class="pa-empty">
                <Spin />
              </div>
            ) : transfers.length ? (
              <Group>
                {transfers.map((t) => (
                  <Row key={t.id} k={t.title} sub={t.sub} v={<span class={`num ${t.cls}`}>{t.amount}</span>} />
                ))}
              </Group>
            ) : (
              <div class="pa-empty">No deposits or withdrawals yet.</div>
            )}
            <a class="pa-btn dark wide" href={explorer + encodeURIComponent(s.session.address)} target="_blank" rel="noopener">
              View your wallet on Cardanoscan
            </a>
          </>
        ) : (
          <div class="pa-empty">Connect a wallet to see your transfers.</div>
        )}
        <a class="pa-btn dark wide" href={s.client.appUrl()} target="_blank" rel="noopener">
          Open Strike
        </a>
        <div class="pa-bottom-pad sm" />
      </div>
    </div>
  );
}
