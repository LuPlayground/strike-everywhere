import { useState } from "preact/hooks";
import type { Side } from "@strike-everywhere/core";
import { MIN_WITHDRAW_USD, NEW_ACCOUNT_MIN_DEPOSIT_USD } from "@strike-everywhere/core";
import { LISTS, compactUsd, pctText, priceText, qtyText, usdText } from "../markets";
import type { PerpsState } from "../state";
import { Coin, Group, Icon, RoundBtn, Row, pref } from "../ui";
import type { Nav } from "./Mobile";

export function Home({ s, nav, onClose, onLearn, onDisclosures }: { s: PerpsState; nav: Nav; onClose?: () => void; onLearn: (topic: string) => void; onDisclosures: () => void }) {
  const [gsHidden, setGsHidden] = useState(pref("getstarted-hidden") === "1");
  const top = [...s.markets].sort((a, b) => b.vol24 - a.vol24).slice(0, 5);
  const startTrade = (side: Side) => nav.push({ k: "markets", pick: side });

  return (
    <div class="pa-screen">
      <div class="pa-top">
        {onClose ? <RoundBtn n="x" label="Close Perps" onClick={onClose} /> : null}
        <div class="pa-title">
          Perps
          {s.testnet && <span class="pa-chip-test">Testnet</span>}
        </div>
        <span class="sp" />
        {s.session && <RoundBtn n="clock" label="History" onClick={() => nav.push({ k: "history" })} />}
        <RoundBtn n="search" label="Search markets" onClick={() => nav.push({ k: "markets", focus: true })} />
      </div>

      <div class="pa-scroll">
        <div class="pa-equity num">{usdText(s.session ? s.equity : 0)}</div>
        {s.session && s.upnl !== 0 && (
          <div class={`pa-equity-sub num ${s.upnl > 0 ? "pos" : "neg"}`}>
            {usdText(s.upnl, { sign: true })} unrealized
          </div>
        )}

        <div class="pa-card funds">
          <Row k="Available funds" info={() => onLearn("funds")} v={<span class="num">{usdText(s.session ? s.available : 0)}</span>} />
          {s.session ? (
            <div class="pa-two">
              <button class="pa-btn dark" onClick={() => s.openFunds("deposit")}>
                Add
              </button>
              <button class="pa-btn dark" disabled={s.available < MIN_WITHDRAW_USD} title={s.available < MIN_WITHDRAW_USD ? `Minimum withdrawal ${usdText(MIN_WITHDRAW_USD, { decimals: 0 })}` : undefined} onClick={() => s.openFunds("withdraw")}>
                Withdraw
              </button>
            </div>
          ) : (
            <button class="pa-btn dark wide" onClick={() => s.setSheet("connect")}>
              Connect wallet
            </button>
          )}
          {s.session && s.accountLoaded && s.isNewAccount && (
            <div class="pa-hint">
              New to Strike: your first deposit needs to be at least {usdText(NEW_ACCOUNT_MIN_DEPOSIT_USD, { decimals: 0 })} of ADA (Strike's rule). After that, from $5.
            </div>
          )}
        </div>

        {s.positions.length > 0 && (
          <>
            <h2 class="pa-h2">Your Positions</h2>
            <Group>
              {s.positions.map((p) => {
                const m = s.bySymbol[p.symbol];
                const size = Number(p.size);
                const base = p.symbol.split("-")[0];
                const upnl = Number(p.upnl);
                const value = Math.abs(size) * (m?.mark || Number(p.entry_price));
                return (
                  <button key={p.id} class="pa-pos" onClick={() => nav.push({ k: "position", id: p.id })}>
                    <Coin base={base} size={36} />
                    <span class="l">
                      <b>
                        {base} <span class={size > 0 ? "pos" : "neg"}>{size > 0 ? "Long" : "Short"}</span> <span class="pa-lev">{p.leverage}x</span>
                      </b>
                      <span class="s num">
                        {qtyText(Math.abs(size))} {base}
                      </span>
                    </span>
                    <span class="r num">
                      <b>{usdText(value)}</b>
                      <span class={upnl >= 0 ? "pos" : "neg"}>{usdText(upnl, { sign: true })}</span>
                    </span>
                    <Icon n="right" size={18} cls="chev" />
                  </button>
                );
              })}
            </Group>
          </>
        )}

        {!gsHidden && !s.positions.length && (
          <div class="pa-card gs">
            <button class="x" aria-label="Dismiss" onClick={() => (pref("getstarted-hidden", "1"), setGsHidden(true))}>
              <Icon n="x" size={14} />
            </button>
            <div class="eyebrow">GET STARTED</div>
            <div class="t">New to Perps? Learn the basics in a minute</div>
            <button class="link" onClick={() => nav.push({ k: "onboard" })}>
              Learn More <Icon n="right" size={14} />
            </button>
            <GetStartedArt />
          </div>
        )}

        <button class="pa-h2 link" onClick={() => nav.push({ k: "markets" })}>
          Lists <Icon n="right" size={18} />
        </button>
        <div class="pa-chips">
          {[LISTS.slice(0, Math.ceil(LISTS.length / 2)), LISTS.slice(Math.ceil(LISTS.length / 2))].map((row, i) => (
            <div class="pa-chiprow" key={i}>
              {row.map((l) => (
                <button key={l.id} class="pa-chip" onClick={() => nav.push({ k: "markets", list: l.id })}>
                  <Icon n={l.icon} size={17} />
                  {l.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <button class="pa-h2 link" onClick={() => nav.push({ k: "markets" })}>
          Explore Perps <Icon n="right" size={18} />
        </button>
        <Group cls="mk">
          {top.length ? (
            top.map((m, i) => (
              <button key={m.symbol} class="pa-mrow" onClick={() => nav.push({ k: "market", sym: m.symbol })}>
                <Coin base={m.base} size={40} rank={i < 3 ? i + 1 : undefined} />
                <span class="l">
                  <b>
                    {m.base} <span class="pa-lev">{m.strikeMaxLev}x</span>
                  </b>
                  <span class="s num">{compactUsd(m.vol24)} Vol</span>
                </span>
                <span class="r num">
                  <b>{priceText(m.mark, m.spec.tickSize)}</b>
                  <span class={m.change >= 0 ? "pos" : "neg"}>{pctText(m.change)}</span>
                </span>
              </button>
            ))
          ) : (
            <div class="pa-empty-row">{s.loadError ? `Strike is unreachable right now: ${s.loadError}` : "Loading markets…"}</div>
          )}
        </Group>

        <h2 class="pa-h2">Learn</h2>
        <Group>
          <Row k="How Perps work" sub="Long, short and leverage in 1 minute" onClick={() => onLearn("basics")} chevron="right" />
          <Row k="Leverage and liquidation" sub="How far the price can move against you" onClick={() => onLearn("leverage")} chevron="right" />
          <Row k="Perps FAQ" sub="Fees, funding, deposits" onClick={() => onLearn("faq")} chevron="right" />
        </Group>

        <button class="pa-foot-link" onClick={() => nav.push({ k: "help" })}>
          <Icon n="info" size={15} /> Having issues with a deposit or withdrawal?
        </button>
        <button class="pa-foot-link" onClick={onDisclosures}>
          <Icon n="info" size={15} /> View Disclosures
        </button>
        <div class="pa-powered">
          Trades execute on <b>Strike</b> · via {s.config.builderCode}
        </div>
        <div class="pa-bottom-pad" />
      </div>

      <div class="pa-dock">
        <button class="pa-btn long" onClick={() => startTrade("buy")}>
          Long
        </button>
        <button class="pa-btn short" onClick={() => startTrade("sell")}>
          Short
        </button>
      </div>
    </div>
  );
}

function GetStartedArt() {
  return (
    <svg class="art" width="76" height="64" viewBox="0 0 76 64" aria-hidden="true">
      <path d="M6 50 C 18 50, 20 26, 32 26 S 46 44, 56 30 S 66 12, 70 10" fill="none" stroke="var(--pa-accent)" stroke-width="5" stroke-linecap="round" />
      <circle cx="70" cy="10" r="5" fill="var(--pa-accent)" />
      <path d="M58 46l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4z" fill="#ffd36e" />
    </svg>
  );
}
