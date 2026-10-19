import { useEffect, useState } from "preact/hooks";
import { DepositRegistrationError, DepositSafetyError, NEW_ACCOUNT_MIN_DEPOSIT_USD, StrikeEverywhere, walletErrorMessage, formatUsd, lovelaceToAda, shortAddress, type PreparedDeposit } from "@strike-everywhere/core";
import { KV, Spinner, Step, decimalInput } from "./parts";

type Phase = "amount" | "preparing" | "review" | "signing" | "registering" | "crediting" | "done";

export function DepositSheet({
  client,
  adaPrice,
  isNewAccount,
  startBalance,
  onClose,
  onCredited,
}: {
  client: StrikeEverywhere;
  adaPrice: number;
  isNewAccount: boolean;
  startBalance: number;
  onClose: () => void;
  onCredited: () => void;
}) {
  const minUsd = isNewAccount ? NEW_ACCOUNT_MIN_DEPOSIT_USD : 5;
  const suggested = adaPrice > 0 ? Math.ceil(((isNewAccount ? NEW_ACCOUNT_MIN_DEPOSIT_USD * 1.05 : 25) / adaPrice) / 5) * 5 : 0;
  const [ada, setAda] = useState(suggested ? String(suggested) : "");
  const [phase, setPhase] = useState<Phase>("amount");
  const [prepared, setPrepared] = useState<PreparedDeposit | null>(null);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const usd = Number(ada || 0) * adaPrice;

  const explorer = client.net.network === "mainnet" ? "https://cardanoscan.io/transaction/" : "https://preprod.cardanoscan.io/transaction/";

  const review = async () => {
    setError("");
    setPhase("preparing");
    try {
      if (!client.wallet) throw new Error("Reconnect your wallet to deposit.");
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
      const msg = String(e?.info || e?.message || e);
      setError(e instanceof DepositSafetyError ? `Safety check failed: ${msg}` : walletErrorMessage(e));
      setPhase("review");
    }
  };

  const retryRegister = async () => {
    if (!prepared || !txHash) return;
    setError("");
    try {
      await client.retryDepositRegistration(prepared.requestId, txHash);
      setPhase("crediting");
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  };

  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (phase !== "crediting") return;
    const slowTimer = setTimeout(() => setSlow(true), 15 * 60_000);
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
    return () => (clearInterval(t), clearTimeout(slowTimer));
  }, [phase]);

  return (
    <div class="overlay" onClick={(e) => e.target === e.currentTarget && phase === "amount" && onClose()}>
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Deposit ADA">
        <h3>
          Deposit ADA
          <button class="x" onClick={onClose} aria-label="Close" disabled={phase === "signing" || phase === "registering"}>×</button>
        </h3>

        {(phase === "amount" || phase === "preparing") && (
          <>
            <div class="field">
              <label for="se-dep-amt">Amount</label>
              <input id="se-dep-amt" inputMode="decimal" value={ada} placeholder="0" onInput={(e) => setAda(decimalInput((e.target as HTMLInputElement).value))} />
              <span class="unit">ADA</span>
            </div>
            <KV k="Value" v={<span class="num">≈ {formatUsd(usd)}</span>} />
            <p>
              Your ADA is converted to USD margin on Strike.{" "}
              {isNewAccount ? <>Strike asks for at least <b>{formatUsd(NEW_ACCOUNT_MIN_DEPOSIT_USD, { decimals: 0 })}</b> on a new account's first deposit; after that the minimum is $5.</> : <>Minimum deposit $5.</>}
            </p>
            <button class="cta" disabled={!(usd >= minUsd) || phase === "preparing"} onClick={review}>
              {phase === "preparing" ? <><Spinner /> Building transaction…</> : usd >= minUsd ? "Review deposit" : `Minimum ${formatUsd(minUsd, { decimals: 0 })}`}
            </button>
          </>
        )}

        {prepared && phase !== "amount" && phase !== "preparing" && (
          <>
            <div class="details">
              <KV k="You send" v={<span class="num">{lovelaceToAda(prepared.lovelace).toLocaleString("en-US")} ADA</span>} />
              <KV k="To (Strike)" v={<span class="addr">{shortAddress(prepared.destination.address, 14, 8)}</span>} hint={prepared.destination.address} />
              <KV k="Credited as" v={<span class="num">≈ {formatUsd(prepared.usdValue)}</span>} />
              <KV k="Network fee" v={<span class="num">{lovelaceToAda(prepared.networkFee).toFixed(3)} ADA</span>} />
              <KV k="Confirmations" v={prepared.confirmationsRequired} />
            </div>
            <div class="note">
              <b>Checked before signing:</b> exactly {lovelaceToAda(prepared.lovelace)} ADA leaves your wallet in one output, no tokens move, the change returns to you, and the deposit is tagged for your Strike account and this request.
            </div>
            <div class="steps">
              <Step n={1} state={phase === "review" ? "todo" : phase === "signing" ? "active" : "done"}>Sign in your wallet</Step>
              <Step n={2} state={phase === "crediting" ? "active" : phase === "done" ? "done" : "todo"}>
                {txHash ? (
                  <>Confirming on Cardano · <a class="linkbtn" target="_blank" rel="noopener" href={explorer + txHash}>view tx</a></>
                ) : (
                  "Confirming on Cardano"
                )}
              </Step>
              <Step n={3} state={phase === "done" ? "done" : "todo"}>Credited to your Strike balance</Step>
            </div>
            {phase === "review" && <button class="cta" onClick={sign}>Sign deposit</button>}
            {phase === "registering" && <button class="cta" onClick={retryRegister}>Retry registering with Strike</button>}
            {phase === "crediting" && !slow && <p>This usually takes 3–6 minutes. You can close this; the balance updates on its own.</p>}
            {phase === "crediting" && slow && (
              <div class="warn">
                <b>Strike hasn't credited this deposit yet.</b> Your transaction is on-chain; crediting is handled by Strike. If it doesn't appear soon, contact Strike support with this transaction:{" "}
                <a class="linkbtn" target="_blank" rel="noopener" href={explorer + txHash}>{txHash.slice(0, 16)}…</a>
              </div>
            )}
            {phase === "done" && <button class="cta" onClick={onClose}>Start trading</button>}
          </>
        )}
        {error && <div class="warn">{error}</div>}
      </div>
    </div>
  );
}
