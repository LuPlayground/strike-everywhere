import { useState } from "preact/hooks";
import { NEW_ACCOUNT_MIN_DEPOSIT_USD } from "@strike-everywhere/core";
import type { PerpsState } from "../state";
import { Icon, RoundBtn, pref } from "../ui";
import type { Nav } from "./Mobile";

const RISKS = [
  { id: "high", icon: "bolt", title: "High risk tolerance", text: "Big swings are fine with me, and I accept I could lose all of the funds I add.", lev: 10 },
  { id: "medium", icon: "chart", title: "Medium risk tolerance", text: "Some swings are fine, and I accept I could lose a large part of the funds I add.", lev: 5 },
  { id: "low", icon: "shield", title: "Low risk tolerance", text: "I prefer small swings and want liquidation to stay far away.", lev: 2 },
];

export function Onboarding({ s, nav, onLearn }: { s: PerpsState; nav: Nav; onLearn: (t: string) => void }) {
  const [step, setStep] = useState(0);
  const [risk, setRisk] = useState("");
  const maxLev = Math.max(1, ...s.markets.map((m) => m.maxLev), 1);
  const minOrder = Math.min(...s.markets.map((m) => m.spec.minNotional).filter((v) => v > 0), 10);
  const finish = () => {
    const r = RISKS.find((x) => x.id === risk);
    if (r) pref("default-leverage", String(Math.min(r.lev, maxLev)));
    pref("onboarded", "1");
    nav.back();
    if (!s.session) s.setSheet("connect");
  };
  return (
    <div class="pa-screen onboard">
      <div class="pa-top">
        <RoundBtn n={step ? "back" : "x"} label={step ? "Back" : "Close"} onClick={() => (step ? setStep(step - 1) : nav.back())} />
        <div class="pa-dots" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} class={i === step ? "on" : ""} />
          ))}
        </div>
        <span class="pa-round ghost" />
      </div>
      {step === 0 && (
        <div class="pa-ob">
          <SeesawArt />
          <h1>Trade future prices with Perps</h1>
          <p class="lede">Perps let you trade on whether a price goes up ("long") or down ("short"), on Strike's markets.</p>
          <div class="pt">
            <Icon n="wallet" size={22} />
            <span>
              <b>Start small</b>
              <span>Orders from ${minOrder.toFixed(0)}. Only the funds you add to Perps are at risk.</span>
            </span>
          </div>
          <div class="pt">
            <Icon n="chart" size={22} />
            <span>
              <b>Add up to {maxLev}x leverage</b>
              <span>Choose a risk level that's right for you</span>
            </span>
          </div>
          <div class="sp" />
          <button class="pa-btn primary big" onClick={() => setStep(1)}>
            Continue
          </button>
          <button class="pa-btn dark big" onClick={() => onLearn("basics")}>
            Learn more
          </button>
        </div>
      )}
      {step === 1 && (
        <div class="pa-ob">
          <h1 class="c">How Perps work</h1>
          <p class="lede c">Four words cover most of it.</p>
          <div class="pa-ob-facts">
            <div>
              <b class="pos">Long</b>
              <span>Profit when the price goes up</span>
            </div>
            <div>
              <b class="neg">Short</b>
              <span>Profit when the price goes down</span>
            </div>
            <div>
              <b>Leverage</b>
              <span>Multiplies gains and losses</span>
            </div>
            <div>
              <b>Liquidation</b>
              <span>If the price moves too far against you, Strike closes some or all of the position and you can lose its margin</span>
            </div>
          </div>
          <div class="sp" />
          <button class="pa-btn primary big" onClick={() => setStep(2)}>
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div class="pa-ob">
          <h1 class="c">Pick your starting risk</h1>
          <p class="lede c">This sets your starting leverage. You can change it on every trade.</p>
          <div class="pa-risks" role="radiogroup">
            {RISKS.map((r) => (
              <button key={r.id} role="radio" aria-checked={risk === r.id} class={`pa-risk${risk === r.id ? " on" : ""}`} onClick={() => setRisk(r.id)}>
                <Icon n={r.icon} size={20} />
                <span class="l">
                  <b>{r.title}</b>
                  <span>{r.text}</span>
                  <span class="lev">Starts at {Math.min(r.lev, maxLev)}x</span>
                </span>
                <span class={`pa-radio${risk === r.id ? " on" : ""}`} />
              </button>
            ))}
          </div>
          {!s.session && (
            <p class="pa-p sm c">Next you'll connect a Cardano wallet. New Strike accounts start with a ${NEW_ACCOUNT_MIN_DEPOSIT_USD} first deposit.</p>
          )}
          <button class="pa-btn primary big" disabled={!risk} onClick={finish}>
            Start Trading
          </button>
        </div>
      )}
    </div>
  );
}

function SeesawArt() {
  return (
    <svg class="pa-ob-art" viewBox="0 0 320 170" aria-hidden="true">
      <g transform="rotate(-9 160 110)">
        <rect x="30" y="100" width="260" height="14" rx="7" fill="var(--pa-accent)" />
        <rect x="30" y="100" width="130" height="14" rx="7" fill="var(--pa-neg)" />
      </g>
      <path d="M160 108 L132 160 H188 Z" fill="#9aa0ff" />
      <circle cx="160" cy="138" r="7" fill="#0b0b0f" />
      <rect x="214" y="30" width="86" height="36" rx="10" fill="var(--pa-accent)" />
      <text x="257" y="54" text-anchor="middle" font-size="18" font-weight="700" fill="#04120c">Long</text>
      <rect x="22" y="76" width="86" height="36" rx="10" fill="var(--pa-neg)" />
      <text x="65" y="100" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">Short</text>
      <path d="M150 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#ffd36e" />
      <path d="M100 140l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#9aa0ff" />
      <path d="M232 118l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#9aa0ff" />
    </svg>
  );
}
