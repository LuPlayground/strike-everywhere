import { useEffect, useState } from "preact/hooks";
import { MIN_WITHDRAW_USD, StrikeEverywhere, WithdrawalSafetyError, formatUsd, walletErrorMessage, lovelaceToAda, shortAddress, type PreparedWithdrawal } from "@strike-everywhere/core";
import { KV, Spinner, Step, decimalInput } from "./parts";

type Phase = "amount" | "quoting" | "review" | "signing" | "pending" | "done";

export function WithdrawSheet({
  client,
  available,
  adaPrice,
  startBalance,
  onClose,
  onDone,
}: {
  client: StrikeEverywhere;
  available: number;
  adaPrice: number;
  startBalance: number;
  onClose: () => void;
  onDone: () => void;
}) {
  const [usd, setUsd] = useState("");
  const [phase, setPhase] = useState<Phase>("amount");
  const [prepared, setPrepared] = useState<PreparedWithdrawal | null>(null);
  const [error, setError] = useState("");
  const amount = Number(usd) || 0;
  const [limits, setLimits] = useState<{ maxUsd: number | null; minUsd: number | null }>({ maxUsd: null, minUsd: null });
  useEffect(() => {
    client.withdrawLimits().then(setLimits).catch(() => {});
  }, [client]);
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
      const msg = String(e?.info || e?.message || e);
      setError(e instanceof WithdrawalSafetyError ? `Safety check failed: ${msg}` : walletErrorMessage(e));
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

  return (
    <div class="overlay" onClick={(e) => e.target === e.currentTarget && phase === "amount" && onClose()}>
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Withdraw">
        <h3>
          Withdraw to your wallet
          <button class="x" onClick={onClose} aria-label="Close" disabled={phase === "signing"}>×</button>
        </h3>
        {(phase === "amount" || phase === "quoting") && (
          <>
            <p>Paid out in ADA (or USDM where Strike only supports it) to the wallet you connected. Minimum {formatUsd(minUsd, { decimals: 0 })}.</p>
            <div class="field">
              <label for="se-wd-amt">Amount</label>
              <input id="se-wd-amt" inputMode="decimal" value={usd} placeholder="0.00" onInput={(e) => setUsd(decimalInput((e.target as HTMLInputElement).value))} />
              <button class="unit linkbtn" style={{ textDecoration: "none" }} onClick={() => setUsd(String(max))}>Max</button>
            </div>
            <KV k="Available" v={<span class="num">{formatUsd(available)}</span>} />
            <KV k="Fee" v={<span class="num">$1.00</span>} hint="Strike's flat withdrawal fee" />
            <KV k="You receive (est.)" v={<span class="num">≈ {receiveAda.toFixed(2)} ADA</span>} />
            {client.session && <KV k="To" v={<span class="addr">{shortAddress(client.session.address, 12, 6)}</span>} hint="Strike locks the destination to the wallet you connected with" />}
            <button class="cta" disabled={!(amount >= minUsd && amount <= max) || phase === "quoting"} onClick={quote}>
              {phase === "quoting" ? <><Spinner /> Getting quote…</> : amount > max ? "Exceeds what you can withdraw now" : amount >= minUsd ? "Review withdrawal" : `Minimum ${formatUsd(minUsd, { decimals: 0 })}`}
            </button>
          </>
        )}
        {prepared && phase !== "amount" && phase !== "quoting" && (
          <>
            <p>
              Your wallet will sign Strike's withdrawal message{prepared.funding ? " and a small funding transaction" : ""}. The trading key alone cannot withdraw, so every withdrawal needs your signature.
            </p>
            <KV
              k="You receive"
              v={<span class="num">{prepared.asset === "USDM" ? `≈ ${formatUsd(Math.max(0, prepared.usdValue - prepared.fee))} in USDM` : `≈ ${receiveAda.toFixed(2)} ADA`}</span>}
              hint={prepared.asset === "USDM" ? "Strike pays Cardano withdrawals out in USDM (a USD stablecoin) on this network" : "Paid out in ADA at Strike's rate"}
            />
            <div class="consent">{prepared.messageToSign}</div>
            {prepared.funding && (
              <>
                <div class="details">
                  <KV k="Validator min-UTxO" v={<span class="num">{lovelaceToAda(prepared.funding.lovelace).toFixed(2)} ADA</span>} hint="Strike's Cardano withdrawals ask you to fund the validator's minimum UTxO before it pays out" />
                  <KV k="Network fee" v={<span class="num">{lovelaceToAda(prepared.funding.networkFee).toFixed(3)} ADA</span>} />
                  <KV k="To (Strike validator)" v={<span class="addr">{shortAddress(prepared.funding.validatorAddress, 14, 8)}</span>} hint={prepared.funding.validatorAddress} />
                </div>
                <div class="note">
                  <b>Checked before signing:</b> the funding transaction only pays {lovelaceToAda(prepared.funding.lovelace).toFixed(2)} ADA to Strike's quoted validator, moves no tokens and contains nothing else. Your wallet will ask twice: the message, then the transaction.
                </div>
              </>
            )}
            <div class="steps">
              <Step n={1} state={phase === "review" ? "todo" : phase === "signing" ? "active" : "done"}>{prepared.funding ? "Sign the message and funding transaction" : "Sign in your wallet"}</Step>
              <Step n={2} state={phase === "pending" ? "active" : phase === "done" ? "done" : "todo"}>Strike processes the withdrawal</Step>
              <Step n={3} state={phase === "done" ? "done" : "todo"}>ADA arrives in your wallet</Step>
            </div>
            {phase === "review" && <button class="cta" onClick={sign}>Sign withdrawal</button>}
            {phase === "review" && (
              <button class="linkbtn" style={{ justifySelf: "center", fontSize: "12px" }} onClick={() => (setPrepared(null), setError(""), setPhase("amount"))}>
                Change amount (gets a fresh quote)
              </button>
            )}
            {phase === "pending" && <p>Submitted. Large withdrawals can be queued for review by Strike.</p>}
            {phase === "done" && <button class="cta" onClick={onClose}>Done</button>}
          </>
        )}
        {error && <div class="warn">{error}</div>}
      </div>
    </div>
  );
}
