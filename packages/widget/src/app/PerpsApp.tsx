import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { ConnectSheet } from "../ConnectSheet";
import { AddFunds, Withdraw } from "./Funds";
import { Desktop } from "./desktop/Desktop";
import { Panel } from "./desktop/Panel";
import { Mobile, type Screen } from "./mobile/Mobile";
import { usePerps, type AppConfig } from "./state";
import { Banner, revealSheet } from "./ui";

export function PerpsApp({ config, host, screen }: { config: AppConfig; host: HTMLElement; screen?: string }) {
  const s = usePerps(config);
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(() => host.clientWidth || 400);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => el.clientWidth && setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth || w);
    return () => ro.disconnect();
  }, []);
  const layout = config.layout === "auto" ? (w >= 900 ? "desktop" : "mobile") : config.layout;

  useEffect(() => {
    host.dispatchEvent(new CustomEvent("strike-session", { bubbles: true, composed: true, detail: s.session ? { connected: true, address: s.session.address, accountId: s.session.accountId } : { connected: false } }));
  }, [s.session?.accountId]);

  useEffect(() => (s.sheet === "connect" ? revealSheet(() => box.current?.querySelector(".sheet")) : undefined), [s.sheet]);

  const onClose = config.closable ? () => host.dispatchEvent(new CustomEvent("strike-close", { bubbles: true, composed: true })) : undefined;
  const start: Screen | undefined = screen === "market" ? { k: "market", sym: config.market } : screen === "trade" ? { k: "trade", sym: config.market, side: config.side ?? "buy" } : undefined;

  return (
    <div class={`pa${layout === "desktop" || layout === "panel" ? " desk" : ""}`} ref={box}>
      <Banner toast={s.toast} onDismiss={s.dismissToast} />
      {layout === "mobile" ? <Mobile s={s} onClose={onClose} start={start} /> : layout === "panel" ? <Panel s={s} /> : <Desktop s={s} width={w} />}
      {s.sheet === "connect" && <ConnectSheet client={s.client} onClose={() => s.setSheet(null)} onConnected={s.onConnected} />}
      {s.sheet === "deposit" && (
        <AddFunds
          client={s.client}
          adaPrice={s.bySymbol["ADA-USD"]?.mark ?? 0}
          isNewAccount={s.isNewAccount}
          startBalance={Number(s.account?.wallet_balance ?? 0)}
          onClose={() => s.setSheet(null)}
          onCredited={() => (s.refresh(), s.notify("ok", "Deposit credited", "Your Perps balance is updated."))}
        />
      )}
      {s.sheet === "withdraw" && (
        <Withdraw
          client={s.client}
          available={s.available}
          adaPrice={s.bySymbol["ADA-USD"]?.mark ?? 0}
          startBalance={Number(s.account?.wallet_balance ?? 0)}
          onClose={() => s.setSheet(null)}
          onDone={() => (s.refresh(), s.notify("ok", "Withdrawal processed", "The ADA is on its way to your wallet."))}
        />
      )}
    </div>
  );
}
