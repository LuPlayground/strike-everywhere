import type { ComponentChildren } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  DepositRegistrationError,
  DepositSafetyError,
  MIN_DEPOSIT_USD,
  MIN_WITHDRAW_USD,
  StrikeEverywhere,
  WithdrawalSafetyError,
  DEPOSIT_EXTRA_ADA,
  lovelaceToAda,
  maxDepositAda,
  shortAddress,
  walletErrorMessage,
  type PreparedDeposit,
  type PreparedWithdrawal,
} from "@strike-everywhere/core";
import { cleanDecimal } from "../parts";
import { usdText } from "./markets";
import { Group, Icon, Row, Sheet, Spin } from "./ui";

type StepState = "todo" | "active" | "done" | "error";

function Steps({ steps }: { steps: Array<{ label: ComponentChildren; sub?: ComponentChildren; state: StepState }> }) {
  return (
    <div class="pa-steps">
      {steps.map((s, i) => (
        <div key={i} class={`pa-step ${s.state}`}>
          <span class="pa-sdot">{s.state === "done" ? <Icon n="check" size={14} /> : s.state === "active" ? <Spin size={14} /> : s.state === "error" ? <Icon n="x" size={12} /> : i + 1}</span>
          <span class="tx">
            <b>{s.label}</b>
            {s.sub && <span>{s.sub}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function WalletWait({ client, lines }: { client: StrikeEverywhere; lines: string[] }) {
  const info = useMemo(() => StrikeEverywhere.wallets().find((w) => w.id === client.wallet?.id), [client.wallet?.id]);
  const name = info?.name ?? client.wallet?.name ?? "your wallet";
  return (
    <div class="pa-wait" role="status">
      <span class="ring">{info?.icon ? <img src={info.icon} alt="" /> : <Icon n="wallet" size={26} />}</span>
      <b>Check {name}</b>
      <span>Approve the request in the {name} window to continue. If you don't see it, click the {name} icon in your browser's toolbar.</span>
      {lines.length > 0 && (
        <ol>
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

function SafetyCard({ children }: { children: ComponentChildren }) {
  return (
    <div class="pa-safe">
      <Icon n="shield" size={18} />
      <span>{children}</span>
    </div>
  );
}

function BigInput({ value, onInput, unit, label, sub }: { value: string; onInput: (v: string) => void; unit: string; label: string; sub?: ComponentChildren }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);
  return (
    <label class="pa-bigin">
      <span class="pa-bigrow">
        {unit === "$" && <span class="u">$</span>}
        <input inputMode="decimal" placeholder="0" value={value} aria-label={label} onInput={(e) => onInput(cleanDecimal(e))} ref={ref} style={{ width: `${Math.max(1, value.length) * 0.62 + 0.3}em` }} />
        {unit !== "$" && <span class="u">{unit}</span>}
      </span>
      {sub && <span class="sub">{sub}</span>}
    </label>
  );
}

const explorerTx = (client: StrikeEverywhere) => (client.net.network === "mainnet" ? "https://cardanoscan.io/transaction/" : "https://preprod.cardanoscan.io/transaction/");


type DepPhase = "amount" | "preparing" | "review" | "signing" | "registering" | "crediting" | "done";

export function AddFunds({ client, adaPrice, startBalance, onClose, onCredited }: { client: StrikeEverywhere; adaPrice: number; startBalance: number; onClose: () => void; onCredited: () => void }) {
  const minUsd = MIN_DEPOSIT_USD;
  const suggest = (usd: number) => (adaPrice > 0 ? String(Math.ceil(usd / adaPrice / 5) * 5) : "");
  const [ada, setAda] = useState("");
  const [phase, setPhase] = useState<DepPhase>("amount");
  const [prepared, setPrepared] = useState<PreparedDeposit | null>(null);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [walletAda, setWalletAda] = useState<number | null>(null);
  const [slow, setSlow] = useState(false);
  const usd = (Number(ada) || 0) * adaPrice;

  useEffect(() => {
    client.wallet
      ?.balanceLovelace()
      .then((l) => setWalletAda(Number(l) / 1e6))
      .catch(() => {});
  }, [client.wallet?.id]);

  const review = async () => {
    setError("");
    setPhase("preparing");
    try {
      if (!client.wallet) throw new Error("Reconnect your wallet to add funds.");
      setPrepared(await client.prepareDeposit(Number(ada)));
      setPhase("review");
    } catch (e: any) {
      setError(e instanceof DepositSafetyError ? `Safety check failed: ${e.message}` : e?.message || String(e));
      setPhase("amount");
    }
  };
  const sign = async () => {
    if (!prepared) return;
    setError("");
    setPhase("signing");
    try {
      const { txHash } = await client.confirmDeposit(prepared);
      setTxHash(txHash);
      setPhase("crediting");
    } catch (e: any) {
      if (e instanceof DepositRegistrationError) {
        setTxHash(e.txHash);
        setError(e.message);
        setPhase("registering");
        return;
      }
      setError(e instanceof DepositSafetyError ? `Safety check failed: ${String(e?.message)}` : walletErrorMessage(e));
      setPhase("review");
    }
  };
  const retry = async () => {
    if (!prepared || !txHash) return;
    setError("");
    try {
      await client.retryDepositRegistration(prepared.requestId, txHash);
      setPhase("crediting");
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  };
  useEffect(() => {
    if (phase !== "crediting") return;
    const slowT = setTimeout(() => setSlow(true), 15 * 60_000);
    const t = setInterval(async () => {
      try {
        const a = await client.account.account();
        if (Number(a.wallet_balance) > startBalance + Math.max(0.5, (prepared?.usdValue ?? 0) * 0.5)) {
          setPhase("done");
          onCredited();
        }
      } catch {
      }
    }, 8000);
    return () => (clearInterval(t), clearTimeout(slowT));
  }, [phase]);

  const busy = phase === "signing" || phase === "registering";
  const presets = [25, 50, 100, 250];
  const maxAda = walletAda !== null ? maxDepositAda(walletAda) : null;
  const tooMuch = maxAda !== null && Number(ada) > maxAda;
  return (
    <Sheet title="Add funds" onClose={() => !busy && onClose()} tall>
      {(phase === "amount" || phase === "preparing") && (
        <>
          <BigInput value={ada} onInput={setAda} unit="ADA" label="Amount of ADA to add" sub={<span class="num">≈ {usdText(usd)}{walletAda !== null ? ` · ${walletAda.toLocaleString("en-US", { maximumFractionDigits: 2 })} ADA in your wallet` : ""}</span>} />
          <div class="pa-pcts four">
            {presets.map((v) => (
              <button key={v} class="pa-btn dark" onClick={() => setAda(suggest(v))}>
                ${v}
              </button>
            ))}
          </div>
          <p class="pa-p sm">
            Your ADA goes to Strike and is credited as USD margin.{" "}
            Minimum {usdText(minUsd, { decimals: 0 })}.
          </p>
          {error && <div class="pa-warn"><Icon n="warn" size={16} />{error}</div>}
          {maxAda !== null && adaPrice > 0 && maxAda * adaPrice < minUsd && (
            <div class="pa-warn note"><Icon n="info" size={16} />Your wallet needs about {Math.ceil(minUsd / adaPrice + DEPOSIT_EXTRA_ADA)} ADA to add the {usdText(minUsd, { decimals: 0 })} minimum (the amount plus Strike's 2 ADA forwarding, the fee and change). It holds {walletAda?.toLocaleString("en-US", { maximumFractionDigits: 2 })} ADA.</div>
          )}
          {tooMuch && walletAda !== null && Number(ada) <= walletAda && (
            <div class="pa-warn note"><Icon n="info" size={16} />You can add up to {maxAda} ADA. The rest of your wallet covers Strike's 2 ADA forwarding, the network fee and the change that stays with you.</div>
          )}
          <button class="pa-btn primary big" disabled={!(usd >= minUsd) || phase === "preparing" || tooMuch} onClick={review}>
            {phase === "preparing" ? <><Spin size={16} /> Building transaction…</> : walletAda !== null && Number(ada) > walletAda ? "More than your wallet holds" : tooMuch ? `Up to ${maxAda} ADA after fees` : usd >= minUsd ? "Review" : `Minimum ${usdText(minUsd, { decimals: 0 })}`}
          </button>
        </>
      )}

      {prepared && phase !== "amount" && phase !== "preparing" && (
        <>
          {phase === "review" && (
            <>
              <div class="pa-amount-sum">
                <b class="num">{lovelaceToAda(prepared.lovelace).toLocaleString("en-US")} ADA</b>
                <span class="num">Strike quotes ≈ {usdText(prepared.usdValue)} · Strike sets the final credit</span>
              </div>
              <Group>
                <Row k="To" v={<span class="num">Strike · {shortAddress(prepared.destination.address, 8, 6)}</span>} />
                {prepared.forwardingCost > 0n && <Row k="Strike forwarding" sub="Strike's deposit hop to its vault" v={<span class="num">{lovelaceToAda(prepared.forwardingCost).toFixed(2)} ADA</span>} />}
                <Row k="Network fee" v={<span class="num">{lovelaceToAda(prepared.networkFee).toFixed(3)} ADA</span>} />
                <Row k="Cardano confirmations" v={String(prepared.confirmationsRequired)} />
              </Group>
              <SafetyCard>
                <b>Checked before you sign:</b> exactly {lovelaceToAda(prepared.destination.lovelace)} ADA leaves your wallet in one output{prepared.forwardingCost > 0n ? ` (${lovelaceToAda(prepared.lovelace)} to deposit plus ${lovelaceToAda(prepared.forwardingCost)} for Strike's forwarding)` : ""}, no tokens move, your change comes back to you, and the deposit is tagged for your Strike account.
              </SafetyCard>
              {error && <div class="pa-warn"><Icon n="warn" size={16} />{error}</div>}
              <button class="pa-btn primary big" onClick={sign}>
                Confirm in wallet
              </button>
              <button class="pa-foot-link c" onClick={() => (setPrepared(null), setPhase("amount"))}>
                Change amount
              </button>
            </>
          )}
          {phase === "signing" && <WalletWait client={client} lines={["Sign the deposit transaction"]} />}
          {(phase === "registering" || phase === "crediting" || phase === "done") && (
            <>
              <div class="pa-amount-sum">
                <b class="num">{lovelaceToAda(prepared.lovelace).toLocaleString("en-US")} ADA</b>
                <span class="num">≈ {usdText(prepared.usdValue)}</span>
              </div>
              <Steps
                steps={[
                  { label: "Signed in your wallet", state: "done" },
                  {
                    label: "Registered with Strike",
                    sub: phase === "registering" ? "Your ADA is on-chain; Strike hasn't confirmed the request yet." : undefined,
                    state: phase === "registering" ? "error" : "done",
                  },
                  {
                    label: "Confirming on Cardano",
                    sub: txHash ? (
                      <a href={explorerTx(client) + txHash} target="_blank" rel="noopener">
                        View transaction ↗
                      </a>
                    ) : undefined,
                    state: phase === "crediting" ? "active" : phase === "done" ? "done" : "todo",
                  },
                  { label: "Credited to your Perps balance", state: phase === "done" ? "done" : "todo" },
                ]}
              />
              {phase === "registering" && (
                <>
                  {error && <div class="pa-warn"><Icon n="warn" size={16} />{error}</div>}
                  <button class="pa-btn primary big" onClick={retry}>
                    Retry registering with Strike
                  </button>
                </>
              )}
              {phase === "crediting" && !slow && <p class="pa-p sm c">This usually takes a few minutes. You can close this; your balance updates on its own.</p>}
              {phase === "crediting" && slow && (
                <div class="pa-warn">
                  <Icon n="warn" size={16} />
                  Strike hasn't credited this deposit yet. Your ADA is on-chain; crediting is handled by Strike. If it doesn't show up soon, contact Strike support with the transaction above.
                </div>
              )}
              {phase === "done" ? (
                <button class="pa-btn primary big" onClick={onClose}>
                  Start trading
                </button>
              ) : (
                phase === "crediting" && (
                  <button class="pa-btn dark big" onClick={onClose}>
                    Close
                  </button>
                )
              )}
            </>
          )}
        </>
      )}
    </Sheet>
  );
}


type WdPhase = "amount" | "quoting" | "review" | "signing" | "pending" | "done";

export function Withdraw({ client, available, adaPrice, startBalance, onClose, onDone }: { client: StrikeEverywhere; available: number; adaPrice: number; startBalance: number; onClose: () => void; onDone: () => void }) {
  const [usd, setUsd] = useState("");
  const [phase, setPhase] = useState<WdPhase>("amount");
  const [prepared, setPrepared] = useState<PreparedWithdrawal | null>(null);
  const [error, setError] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [limits, setLimits] = useState<{ maxUsd: number | null; minUsd: number | null }>({ maxUsd: null, minUsd: null });
  useEffect(() => {
    client.withdrawLimits().then(setLimits).catch(() => {});
  }, [client]);
  const amount = Number(usd) || 0;
  const max = Math.floor((limits.maxUsd !== null ? Math.min(limits.maxUsd, available) : available) * 100) / 100;
  const minUsd = Math.max(MIN_WITHDRAW_USD, limits.minUsd ?? 0);
  const receiveAda = adaPrice > 0 ? Math.max(0, amount - 1) / adaPrice : 0;

  const quote = async () => {
    setError("");
    setPhase("quoting");
    try {
      if (!client.wallet) throw new Error("Reconnect your wallet to withdraw.");
      setPrepared(await client.prepareWithdrawal(amount));
      setPhase("review");
    } catch (e: any) {
      setError(e instanceof WithdrawalSafetyError ? `Safety check failed: ${e.message}` : e?.message || String(e));
      setPhase("amount");
    }
  };
  const sign = async () => {
    if (!prepared) return;
    setError("");
    setPhase("signing");
    try {
      await client.confirmWithdrawal(prepared);
      setPhase("pending");
    } catch (e: any) {
      setError(e instanceof WithdrawalSafetyError ? `Safety check failed: ${e.message}` : walletErrorMessage(e));
      setPhase("review");
    }
  };
  useEffect(() => {
    if (phase !== "pending") return;
    const t = setInterval(async () => {
      try {
        const a = await client.account.account();
        if (Number(a.wallet_balance) < startBalance - amount * 0.5) {
          setPhase("done");
          onDone();
        }
      } catch {
      }
    }, 6000);
    return () => clearInterval(t);
  }, [phase]);

  const receiveText = prepared ? (prepared.asset === "USDM" ? `≈ ${usdText(Math.max(0, prepared.usdValue - prepared.fee))} in USDM` : `≈ ${receiveAda.toFixed(2)} ADA`) : `≈ ${receiveAda.toFixed(2)} ADA`;
  return (
    <Sheet title="Withdraw" onClose={() => phase !== "signing" && onClose()} tall>
      {(phase === "amount" || phase === "quoting") && (
        <>
          <BigInput value={usd} onInput={setUsd} unit="$" label="Amount to withdraw in USD" sub={<span class="num">{amount > 0 ? `You receive ${receiveText}` : `Available ${usdText(available)}`}</span>} />
          <div class="pa-pcts four">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <button key={f} class="pa-btn dark" disabled={max < minUsd} onClick={() => setUsd(String(Math.floor(max * f * 100) / 100))}>
                {f === 1 ? "Max" : `${f * 100}%`}
              </button>
            ))}
          </div>
          <Group>
            <Row k="Available" v={<span class="num">{usdText(available)}</span>} />
            <Row k="Strike fee" v={<span class="num">$1.00</span>} />
            {client.session && <Row k="To your wallet" v={<span class="num">{shortAddress(client.session.address, 8, 6)}</span>} />}
          </Group>
          <p class="pa-p sm">Paid out in ADA (or USDM where Strike only supports it) to the wallet you connected. Minimum {usdText(minUsd, { decimals: 0 })}.</p>
          {error && <div class="pa-warn"><Icon n="warn" size={16} />{error}</div>}
          <button class="pa-btn primary big" disabled={!(amount >= minUsd && amount <= max) || phase === "quoting"} onClick={quote}>
            {phase === "quoting" ? <><Spin size={16} /> Getting quote…</> : amount > max ? "More than you can withdraw now" : amount >= minUsd ? "Review" : `Minimum ${usdText(minUsd, { decimals: 0 })}`}
          </button>
        </>
      )}
      {prepared && phase === "review" && (
        <>
          <div class="pa-amount-sum">
            <b class="num">{receiveText.replace("≈ ", "")}</b>
            <span class="num">from {usdText(prepared.usdValue)} on Strike</span>
          </div>
          <Group>
            <Row k="To your wallet" v={<span class="num">{shortAddress(client.session?.address ?? "", 8, 6)}</span>} />
            <Row k="Strike fee" v={<span class="num">{usdText(prepared.fee)}</span>} />
            {prepared.funding && <Row k="Funding transaction" sub="Strike's Cardano payout needs a small deposit to its validator" v={<span class="num">{lovelaceToAda(prepared.funding.lovelace).toFixed(2)} ADA</span>} vsub={<span class="num">+{lovelaceToAda(prepared.funding.networkFee).toFixed(3)} ADA fee</span>} />}
          </Group>
          <button class="pa-foot-link c" onClick={() => setShowMsg(!showMsg)}>
            {showMsg ? "Hide" : "View"} the message you'll sign
          </button>
          {showMsg && <pre class="pa-msg">{prepared.messageToSign}</pre>}
          {error && <div class="pa-warn"><Icon n="warn" size={16} />{error}</div>}
          <button class="pa-btn primary big" onClick={sign}>
            Confirm in wallet
          </button>
          <button class="pa-foot-link c" onClick={() => (setPrepared(null), setError(""), setPhase("amount"))}>
            Change amount
          </button>
        </>
      )}
      {prepared && phase === "signing" && <WalletWait client={client} lines={prepared.funding ? ["Sign Strike's withdrawal message", `Approve the ${lovelaceToAda(prepared.funding.lovelace).toFixed(2)} ADA funding transaction`] : ["Sign Strike's withdrawal message"]} />}
      {prepared && (phase === "pending" || phase === "done") && (
        <>
          <div class="pa-amount-sum">
            <b class="num">{receiveText.replace("≈ ", "")}</b>
            <span class="num">to {shortAddress(client.session?.address ?? "", 8, 6)}</span>
          </div>
          <Steps
            steps={[
              { label: "Signed in your wallet", state: "done" },
              { label: "Strike processes the withdrawal", sub: phase === "pending" ? "Usually a minute or two. Large withdrawals can be queued for review." : undefined, state: phase === "pending" ? "active" : "done" },
              { label: phase === "done" ? "Payout on its way to your wallet" : "Payout to your wallet", sub: phase === "done" ? "Strike has taken it from your Perps balance; it lands in your wallet within minutes." : undefined, state: phase === "done" ? "done" : "todo" },
            ]}
          />
          <button class={`pa-btn ${phase === "done" ? "primary" : "dark"} big`} onClick={onClose}>
            {phase === "done" ? "Done" : "Close"}
          </button>
        </>
      )}
    </Sheet>
  );
}
