import { useState } from "preact/hooks";
import { TRAILING_MAX_PCT, TRAILING_MIN_PCT, isTriggered, needsLimitPrice, roundToStep, type OrderHistoryEntry, type Position } from "@strike-everywhere/core";
import { cleanDecimal } from "../parts";
import { pctText, priceText, qtyText, usdText } from "./markets";
import type { PerpsState } from "./state";
import { Group, Icon, Row, Sheet, Spin } from "./ui";

const FRACTIONS = [0.25, 0.5, 0.75, 1];

function usePos(s: PerpsState, p: Position) {
  const m = s.bySymbol[p.symbol];
  const size = Number(p.size);
  return {
    m,
    base: p.symbol.split("-")[0],
    size,
    abs: Math.abs(size),
    long: size > 0,
    entry: Number(p.entry_price),
    mark: m?.mark || Number(p.entry_price),
    tick: m?.spec.tickSize ?? 0.0001,
    lev: Math.max(1, Number(p.leverage) || 1),
    liq: Number(p.liquidation_price),
  };
}

function Fractions({ value, onChange }: { value: number; onChange: (f: number) => void }) {
  return (
    <div class="pa-pcts four">
      {FRACTIONS.map((f) => (
        <button key={f} class={`pa-btn dark${value === f ? " on" : ""}`} onClick={() => onChange(f)}>
          {f * 100}%
        </button>
      ))}
    </div>
  );
}

function PriceField({ label, value, onInput, aria, hint, mark, tick }: { label: string; value: string; onInput: (v: string) => void; aria: string; hint?: string; mark?: number; tick?: number }) {
  return (
    <label class="pa-field">
      <span class="lbl">{label}</span>
      <span class="in">
        <span class="muted">$</span>
        <input inputMode="decimal" value={value} placeholder="Enter price" aria-label={aria} onInput={(e) => onInput(cleanDecimal(e))} />
        {mark ? (
          <button class="pa-chipmini" onClick={(e) => (e.preventDefault(), onInput(roundToStep(mark, tick ?? 0.0001)))}>
            Mark
          </button>
        ) : null}
      </span>
      {hint && <span class="hint num">{hint}</span>}
    </label>
  );
}

function Busy({ busy, label, onClick, disabled, cls }: { busy: boolean; label: string; onClick: () => void; disabled?: boolean; cls?: string }) {
  return (
    <button class={`pa-btn ${cls ?? "primary"} big`} disabled={busy || disabled} onClick={onClick}>
      {busy ? <Spin size={18} /> : label}
    </button>
  );
}

export function exitOrders(s: PerpsState, symbol: string): OrderHistoryEntry[] {
  return s.orders.filter((o) => o.symbol === symbol && o.reduce_only);
}

const exitLabel = (o: OrderHistoryEntry) => {
  const t = String(o.type);
  return t.startsWith("take_profit") ? "Take profit" : t.startsWith("trailing") ? "Trailing stop" : t.startsWith("stop") ? "Stop loss" : t === "limit" ? "Limit close" : "Closing order";
};

export function TpSlSheet({ s, p, onClose }: { s: PerpsState; p: Position; onClose: () => void }) {
  const x = usePos(s, p);
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [frac, setFrac] = useState(1);
  const [working, setWorking] = useState<"mark_price" | "contract_price">("mark_price");
  const [busy, setBusy] = useState(false);
  const tpN = Number(tp) || 0;
  const slN = Number(sl) || 0;
  const pnlAt = (px: number) => (x.long ? 1 : -1) * (px - x.entry) * x.abs * frac;
  const problem =
    tpN && (x.long ? tpN <= x.mark : tpN >= x.mark)
      ? `Take profit must be ${x.long ? "above" : "below"} the current price`
      : slN && (x.long ? slN >= x.mark : slN <= x.mark)
        ? `Stop loss must be ${x.long ? "below" : "above"} the current price`
        : slN && x.liq > 0 && (x.long ? slN <= x.liq : slN >= x.liq)
          ? "Stop loss is past the liquidation price, so it would never trigger"
          : null;
  const existing = exitOrders(s, p.symbol);
  const save = async () => {
    setBusy(true);
    const ok = await s.setExits(p, { takeProfit: tpN || undefined, stopLoss: slN || undefined, fraction: frac, workingType: working });
    setBusy(false);
    if (ok) onClose();
  };
  return (
    <Sheet title="Take profit / Stop loss" onClose={() => !busy && onClose()} tall>
      <Group>
        <Row k="Entry price" v={<span class="num">{priceText(x.entry, x.tick)}</span>} />
        <Row k="Mark price" v={<span class="num">{priceText(x.mark, x.tick)}</span>} />
        {x.liq > 0 && <Row k="Liquidation price" v={<span class="num">{priceText(x.liq, x.tick)}</span>} />}
      </Group>
      <PriceField label="Take profit" value={tp} onInput={setTp} aria="Take profit price" mark={x.mark} tick={x.tick} hint={tpN ? `Est. P&L ≈ ${usdText(pnlAt(tpN), { sign: true })} (${pctText(((pnlAt(tpN) / ((x.abs * frac * x.entry) / x.lev)) || 0) * 100, 0)})` : undefined} />
      <PriceField label="Stop loss" value={sl} onInput={setSl} aria="Stop loss price" mark={x.mark} tick={x.tick} hint={slN ? `Est. P&L ≈ ${usdText(pnlAt(slN), { sign: true })}` : undefined} />
      <div class="pa-lbl-row">Size</div>
      <Fractions value={frac} onChange={setFrac} />
      <div class="pa-seg" role="radiogroup" aria-label="Trigger price">
        {(["mark_price", "contract_price"] as const).map((w) => (
          <button key={w} role="radio" aria-checked={working === w} class={working === w ? "on" : ""} onClick={() => setWorking(w)}>
            {w === "mark_price" ? "Trigger on mark" : "Trigger on last"}
          </button>
        ))}
      </div>
      {existing.length > 0 && (
        <>
          <div class="pa-lbl-row">Existing exit orders</div>
          <Group>
            {existing.map((o) => (
              <div class="pa-row" key={o.id}>
                <span class="l">
                  <span class="k">{exitLabel(o)}</span>
                  <span class="s num">
                    {qtyText(Number(o.size))} {x.base} @ {priceText(Number(o.stop_price) || Number(o.price), x.tick)}
                  </span>
                </span>
                <button class="pa-btn dark xs" onClick={() => s.cancelOrder(o)}>
                  Cancel
                </button>
              </div>
            ))}
          </Group>
        </>
      )}
      {problem && <div class="pa-warn"><Icon n="warn" size={16} />{problem}</div>}
      <p class="pa-p sm">Exits are reduce-only market orders that trigger at your price, so they can only shrink this position.</p>
      <Busy busy={busy} label="Confirm" onClick={save} disabled={!!problem || (!tpN && !slN)} />
    </Sheet>
  );
}

export function TrailSheet({ s, p, onClose }: { s: PerpsState; p: Position; onClose: () => void }) {
  const x = usePos(s, p);
  const [pct, setPct] = useState("1");
  const [activation, setActivation] = useState("");
  const [working, setWorking] = useState<"mark_price" | "contract_price">("mark_price");
  const [busy, setBusy] = useState(false);
  const n = Number(pct) || 0;
  const ok = n >= TRAILING_MIN_PCT && n <= TRAILING_MAX_PCT;
  const stopNow = x.long ? x.mark * (1 - n / 100) : x.mark * (1 + n / 100);
  const save = async () => {
    setBusy(true);
    const r = await s.trail(p, n, Number(activation) > 0 ? Number(activation) : undefined, working);
    setBusy(false);
    if (r) onClose();
  };
  return (
    <Sheet title="Trailing stop" onClose={() => !busy && onClose()} tall>
      <p class="pa-p">The stop follows the price as it moves your way and closes the position at market if it turns back by your trail distance.</p>
      <label class="pa-field">
        <span class="lbl">Trail distance</span>
        <span class="in">
          <input inputMode="decimal" value={pct} aria-label="Trail distance percent" onInput={(e) => setPct(cleanDecimal(e))} />
          <span>%</span>
        </span>
        <span class="hint num">{ok ? `If it started now: closes at ≈ ${priceText(stopNow, x.tick)}` : `Strike allows ${TRAILING_MIN_PCT}–${TRAILING_MAX_PCT}%`}</span>
      </label>
      <div class="pa-pcts four">
        {[0.5, 1, 2, 5].map((v) => (
          <button key={v} class={`pa-btn dark${n === v ? " on" : ""}`} onClick={() => setPct(String(v))}>
            {v}%
          </button>
        ))}
      </div>
      <PriceField label="Activation price (optional)" value={activation} onInput={setActivation} aria="Activation price" mark={x.mark} tick={x.tick} hint="Leave empty to start trailing right away" />
      <div class="pa-seg" role="radiogroup" aria-label="Trigger price">
        {(["mark_price", "contract_price"] as const).map((w) => (
          <button key={w} role="radio" aria-checked={working === w} class={working === w ? "on" : ""} onClick={() => setWorking(w)}>
            {w === "mark_price" ? "Follow mark" : "Follow last"}
          </button>
        ))}
      </div>
      <Busy busy={busy} label="Set trailing stop" onClick={save} disabled={!ok} />
    </Sheet>
  );
}

export function MarginSheet({ s, p, onClose }: { s: PerpsState; p: Position; onClose: () => void }) {
  const x = usePos(s, p);
  const [dir, setDir] = useState<"add" | "remove">("add");
  const [amt, setAmt] = useState("");
  const [busy, setBusy] = useState(false);
  const current = (x.abs * x.entry) / x.lev;
  const n = Number(amt) || 0;
  const save = async () => {
    setBusy(true);
    const r = await s.modifyMargin(p.symbol, n, dir);
    setBusy(false);
    if (r) onClose();
  };
  return (
    <Sheet title="Modify margin" onClose={() => !busy && onClose()}>
      <div class="pa-seg" role="radiogroup">
        {(["add", "remove"] as const).map((d) => (
          <button key={d} role="radio" aria-checked={dir === d} class={dir === d ? "on" : ""} onClick={() => setDir(d)}>
            {d === "add" ? "Add margin" : "Remove margin"}
          </button>
        ))}
      </div>
      <label class="pa-field">
        <span class="lbl">Amount</span>
        <span class="in">
          <span class="muted">$</span>
          <input inputMode="decimal" value={amt} placeholder="0.00" aria-label="Margin amount" onInput={(e) => setAmt(cleanDecimal(e))} />
          {dir === "add" && (
            <button class="pa-chipmini" onClick={(e) => (e.preventDefault(), setAmt(String(Math.floor(s.available * 100) / 100)))}>
              Max
            </button>
          )}
        </span>
      </label>
      <Group>
        <Row k="Current margin" v={<span class="num">{usdText(current)}</span>} />
        <Row k={dir === "add" ? "Available to add" : "After removing"} v={<span class="num">{dir === "add" ? usdText(s.available) : usdText(Math.max(0, current - n))}</span>} />
        {x.liq > 0 && <Row k="Liquidation price now" v={<span class="num">{priceText(x.liq, x.tick)}</span>} />}
      </Group>
      <p class="pa-p sm">Adding margin moves the liquidation price further away; removing it brings it closer. Strike checks how much can be removed.</p>
      <Busy busy={busy} label={dir === "add" ? "Add margin" : "Remove margin"} onClick={save} disabled={!(n > 0) || (dir === "add" && n > s.available)} />
    </Sheet>
  );
}

export function ReverseSheet({ s, p, onClose }: { s: PerpsState; p: Position; onClose: () => void }) {
  const x = usePos(s, p);
  const [busy, setBusy] = useState(false);
  const go = async () => {
    setBusy(true);
    const r = await s.reverse(p);
    setBusy(false);
    if (r) onClose();
  };
  return (
    <Sheet title="Reverse position" onClose={() => !busy && onClose()}>
      <div class="pa-rev">
        <span class={x.long ? "pos" : "neg"}>
          {x.long ? "Long" : "Short"} {qtyText(x.abs)} {x.base}
        </span>
        <Icon n="right" size={18} />
        <span class={x.long ? "neg" : "pos"}>
          {x.long ? "Short" : "Long"} {qtyText(x.abs)} {x.base}
        </span>
      </div>
      <p class="pa-p">One market order of {qtyText(x.abs * 2)} {x.base} on the other side closes this position and opens the opposite one at the same size and {x.lev}x. It needs margin for the new side and pays fees on the full order.</p>
      <Busy busy={busy} label={`Go ${x.long ? "Short" : "Long"}`} onClick={go} cls={x.long ? "short" : "long"} />
    </Sheet>
  );
}

export function CloseSheet({ s, p, onClose, onClosed }: { s: PerpsState; p: Position; onClose: () => void; onClosed?: () => void }) {
  const x = usePos(s, p);
  const [mode, setMode] = useState<"market" | "limit">("market");
  const [frac, setFrac] = useState(1);
  const [limitPx, setLimitPx] = useState("");
  const [busy, setBusy] = useState(false);
  const upnl = Number(p.upnl);
  const value = x.abs * x.mark;
  const close = async () => {
    setBusy(true);
    const ok = mode === "limit" ? await s.limitClose(p, Number(limitPx), frac) : await s.closePosition(p, frac);
    setBusy(false);
    if (ok) {
      onClose();
      if (frac >= 1 && mode === "market") onClosed?.();
    } else if (mode === "market") {
      setMode("limit");
      if (!limitPx && x.mark > 0) setLimitPx(roundToStep(x.mark, x.tick));
    }
  };
  return (
    <Sheet title="Close position" onClose={() => !busy && onClose()}>
      <div class="pa-seg" role="radiogroup" aria-label="Close type">
        {(["market", "limit"] as const).map((k) => (
          <button key={k} role="radio" aria-checked={mode === k} class={mode === k ? "on" : ""} onClick={() => setMode(k)}>
            {k === "market" ? "Market close" : "Limit close"}
          </button>
        ))}
      </div>
      {mode === "limit" && (
        <PriceField label="Close at price" value={limitPx} onInput={setLimitPx} aria="Limit close price" mark={x.mark} tick={x.tick} hint={Number(limitPx) > 0 ? `Est. P&L at this price ≈ ${usdText((x.long ? 1 : -1) * (Number(limitPx) - x.entry) * x.abs * frac, { sign: true })}` : undefined} />
      )}
      <Fractions value={frac} onChange={setFrac} />
      <Group>
        <Row k="You close" v={<span class="num">{`${qtyText(x.abs * frac)} ${x.base}`}</span>} vsub={<span class="num">{`≈ ${usdText(value * frac)}`}</span>} />
        {mode === "market" && <Row k="Estimated P&L" v={<span class={`num ${upnl >= 0 ? "pos" : "neg"}`}>{usdText(upnl * frac, { sign: true })}</span>} />}
        {frac < 1 && <Row k="Stays open" v={<span class="num">{`${qtyText(x.abs * (1 - frac))} ${x.base}`}</span>} />}
      </Group>
      <p class="pa-p sm">
        {mode === "market"
          ? `Closes at the market price. Strike cancels the close if there are no ${x.long ? "buyers" : "sellers"} close enough to the market price; your position then stays open (try a limit close instead).`
          : "A reduce-only limit order: it waits on the book and closes when the price reaches yours. It can only shrink this position."}
      </p>
      <Busy busy={busy} label={mode === "limit" ? (frac >= 1 ? "Place limit close" : `Limit close ${frac * 100}%`) : frac >= 1 ? "Close position" : `Close ${frac * 100}%`} onClick={close} disabled={mode === "limit" && !(Number(limitPx) > 0)} />
    </Sheet>
  );
}

export function CloseAllSheet({ s, onClose }: { s: PerpsState; onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  const go = async () => {
    setBusy(true);
    await s.closeAll();
    setBusy(false);
    onClose();
  };
  const total = s.positions.reduce((a, p) => a + Number(p.upnl), 0);
  return (
    <Sheet title="Close all positions" onClose={() => !busy && onClose()}>
      <Group>
        {s.positions.map((p) => (
          <Row key={p.id} k={`${p.symbol.split("-")[0]} ${Number(p.size) > 0 ? "Long" : "Short"}`} sub={<span class="num">{qtyText(Math.abs(Number(p.size)))}</span>} v={<span class={`num ${Number(p.upnl) >= 0 ? "pos" : "neg"}`}>{usdText(Number(p.upnl), { sign: true })}</span>} />
        ))}
      </Group>
      <p class="pa-p sm">All positions close at the market price ({usdText(total, { sign: true })} estimated P&L). Strike cancels any close it can't fill near the market price; those positions stay open.</p>
      <Busy busy={busy} label="Close all at market" onClick={go} />
    </Sheet>
  );
}

export function EditOrderSheet({ s, o, onClose }: { s: PerpsState; o: OrderHistoryEntry; onClose: () => void }) {
  const m = s.bySymbol[o.symbol];
  const tick = m?.spec.tickSize ?? 0.0001;
  const t = String(o.type) as any;
  const hasLimit = needsLimitPrice(t);
  const hasTrigger = isTriggered(t);
  const remaining = Math.max(0, Number(o.size) - (Number(o.filled) || 0));
  const [price, setPrice] = useState(hasLimit ? String(Number(o.price) || "") : "");
  const [trigger, setTrigger] = useState(hasTrigger ? String(Number(o.stop_price) || "") : "");
  const [size, setSize] = useState(String(remaining));
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    const r = await s.editOrder(o, { price: hasLimit ? Number(price) : undefined, stopPrice: hasTrigger ? Number(trigger) : undefined, size: Number(size) || remaining });
    setBusy(false);
    if (r) onClose();
  };
  const base = o.symbol.split("-")[0];
  return (
    <Sheet title="Edit order" onClose={() => !busy && onClose()}>
      <Group>
        <Row k={`${o.side === "buy" ? "Buy" : "Sell"} ${String(o.type).replace(/_/g, " ")}`} sub={o.reduce_only ? "Reduce only" : undefined} v={<span class="num">{priceText(m?.mark ?? 0, tick)}</span>} vsub="current price" />
      </Group>
      {hasTrigger && <PriceField label="Trigger price" value={trigger} onInput={setTrigger} aria="Trigger price" mark={m?.mark} tick={tick} />}
      {hasLimit && <PriceField label="Limit price" value={price} onInput={setPrice} aria="Limit price" mark={m?.mark} tick={tick} />}
      <label class="pa-field">
        <span class="lbl">Size ({base})</span>
        <span class="in">
          <input inputMode="decimal" value={size} aria-label="Order size" onInput={(e) => setSize(cleanDecimal(e))} />
        </span>
      </label>
      <p class="pa-p sm">Strike replaces the order in one step (cancel + new order). Orders linked to a TP/SL bracket or a grid bot can't be edited this way.</p>
      <Busy busy={busy} label="Save changes" onClick={save} disabled={!(Number(size) > 0) || (hasLimit && !(Number(price) > 0)) || (hasTrigger && !(Number(trigger) > 0))} />
    </Sheet>
  );
}
