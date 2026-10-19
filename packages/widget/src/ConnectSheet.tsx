import { useEffect, useState } from "preact/hooks";
import { StrikeEverywhere, WalletNetworkMismatchError, formatUsd, walletErrorMessage, shortAddress, type OnboardingCheck, type WalletInfo } from "@strike-everywhere/core";
import { Spinner, Step } from "./parts";

const INSTALL_LINKS = [
  { name: "Lace", href: "https://www.lace.io/" },
  { name: "Eternl", href: "https://eternl.io/" },
];

export function ConnectSheet({ client, onClose, onConnected }: { client: StrikeEverywhere; onClose: () => void; onConnected: () => void }) {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [picked, setPicked] = useState<WalletInfo | null>(null);
  const [check, setCheck] = useState<OnboardingCheck | null>(null);
  const [phase, setPhase] = useState<"pick" | "checking" | "review" | "signing" | "done">("pick");
  const [consent, setConsent] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const scan = () => setWallets(StrikeEverywhere.wallets());
    scan();
    const t1 = setTimeout(scan, 400);
    const t2 = setTimeout(scan, 1500);
    return () => (clearTimeout(t1), clearTimeout(t2));
  }, []);

  const pick = async (w: WalletInfo) => {
    setPicked(w);
    setError("");
    setPhase("checking");
    try {
      setCheck(await client.checkOnboarding(w.id));
      setPhase("review");
    } catch (e: any) {
      setError(e instanceof WalletNetworkMismatchError ? e.message : walletErrorMessage(e) || "Could not open the wallet.");
      setPhase("pick");
    }
  };

  const sign = async () => {
    if (!picked) return;
    setError("");
    setPhase("signing");
    try {
      await client.connect(picked.id, { onMessage: setConsent });
      setPhase("done");
      setTimeout(onConnected, 600);
    } catch (e: any) {
      setError(walletErrorMessage(e));
      setPhase("review");
    }
  };

  const feePct = (client.feeBps / 100).toFixed(2);
  const maxPct = (client.maxFeeBps / 100).toFixed(2);

  return (
    <div class="overlay" onClick={(e) => e.target === e.currentTarget && phase !== "signing" && onClose()}>
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Connect wallet">
        <h3>
          {phase === "pick" ? "Connect a Cardano wallet" : picked?.name}
          <button class="x" onClick={onClose} aria-label="Close" disabled={phase === "signing"}>×</button>
        </h3>

        {phase === "pick" && (
          <>
            {wallets.length ? (
              <div class="wallets">
                {wallets.map((w) => (
                  <button key={w.id} class="wallet" onClick={() => pick(w)}>
                    {w.icon ? <img src={w.icon} alt="" /> : <span class="coin">{w.name.slice(0, 2)}</span>}
                    {w.name}
                  </button>
                ))}
              </div>
            ) : (
              <p>
                No Cardano wallet found in this browser. Install{" "}
                {INSTALL_LINKS.map((l, i) => (
                  <span key={l.name}>
                    {i ? " or " : ""}
                    <a href={l.href} target="_blank" rel="noopener" class="linkbtn">{l.name}</a>
                  </span>
                ))}{" "}
                and reload.
              </p>
            )}
            <p>Strike perps run on Strike's exchange; this widget never holds your funds. Your wallet signs once to create a trading key that cannot withdraw.</p>
          </>
        )}

        {phase === "checking" && (
          <p>
            <Spinner /> Checking your wallet and Strike account…
          </p>
        )}

        {(phase === "review" || phase === "signing" || phase === "done") && check && (
          <>
            <div class="addr">{shortAddress(check.address, 18, 10)}</div>
            {check.hasStrikeAccount === null ? (
              <div class="note">
                <b>Strike couldn't look up this wallet right now.</b> You can still connect. If it's new to Strike, its first deposit needs to be at least {formatUsd(check.minFirstDepositUsd, { decimals: 0 })} (Strike's rule).
              </div>
            ) : check.hasStrikeAccount ? (
              <div class="note">
                <b>Existing Strike account found.</b> Your balance and positions carry over.
              </div>
            ) : (
              <div class={check.canAffordFirstDeposit ? "note" : "warn"}>
                <b>New to Strike.</b> Signing creates your Strike account. Strike asks for a first deposit of at least <b>{formatUsd(check.minFirstDepositUsd, { decimals: 0 })}</b> (later deposits from $5). This wallet holds ≈ {formatUsd(check.walletUsd)} ({check.walletAda.toFixed(1)} ADA).
                {!check.canAffordFirstDeposit && " You can connect now and deposit later."}
              </div>
            )}
            <div class="note">
              This site charges a <b>{feePct}%</b> builder fee per trade on top of Strike's fees. You approve a cap of <b>{maxPct}%</b>; it can never charge more.
            </div>
            {consent && <div class="consent">{consent}</div>}
            <label class="check" style={{ alignItems: "flex-start" }}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree((e.target as HTMLInputElement).checked)} style={{ marginTop: "2px" }} />
              <span class="soft" style={{ fontWeight: 400, fontSize: "12px" }}>
                I accept Strike's{" "}
                <a class="linkbtn" href="https://www.strikefinance.org/terms" target="_blank" rel="noopener">Terms</a> and confirm I am not in a{" "}
                <a class="linkbtn" href="https://www.strikefinance.org/restricted" target="_blank" rel="noopener">restricted region</a>.
              </span>
            </label>
            <div class="steps">
              <Step n={1} state="done">Wallet connected</Step>
              <Step n={2} state={phase === "signing" ? "active" : phase === "done" ? "done" : "todo"}>Sign Strike's connect message</Step>
              <Step n={3} state={phase === "done" ? "done" : "todo"}>Trading key created for this site</Step>
            </div>
            <button class="cta" disabled={!agree || phase !== "review"} onClick={sign}>
              {phase === "signing" ? "Waiting for wallet…" : phase === "done" ? "Connected" : "Sign & connect"}
            </button>
          </>
        )}
        {error && <div class="warn">{error}</div>}
      </div>
    </div>
  );
}
