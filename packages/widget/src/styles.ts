export const FONT_HREF = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";

export const css =  `:host {
  --se-bg: #0a0a0a;
  --se-surface: #141414;
  --se-surface-2: #1a1a1a;
  --se-raised: #252525;
  --se-border: #252525;
  --se-border-strong: #363636;
  --se-text: #ffffff;
  --se-text-soft: #d0d0d0;
  --se-text-2: #b8b8b8;
  --se-muted: rgba(255,255,255,0.6);
  --se-faint: rgba(255,255,255,0.4);
  --se-input: rgba(255,255,255,0.08);
  --se-input-hover: rgba(255,255,255,0.12);
  --se-accent: #4efab0;
  --se-accent-rgb: 78,250,176;
  --se-accent-ink: #04120c;
  --se-neg: #f43f5e;
  --se-neg-rgb: 244,63,94;
  --se-gold: #f8931a;
  --se-radius: 6px;
  --se-radius-sm: 4px;
  --se-font: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --se-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  display: block;
  width: var(--se-width, 380px);
  max-width: 100%;
  min-width: 300px;
  color: var(--se-text);
  font: 400 13px/1.45 var(--se-font);
  -webkit-font-smoothing: antialiased;
  container-type: inline-size;
}
* { box-sizing: border-box; }
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; border: 0; background: none; padding: 0; }
button:disabled { cursor: not-allowed; }
:focus-visible { outline: 2px solid rgba(var(--se-accent-rgb), .7); outline-offset: 1px; }
.num { font-family: var(--se-mono); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.pos { color: var(--se-accent); }
.neg { color: var(--se-neg); }
.muted { color: var(--se-muted); }
.soft { color: var(--se-text-2); }
.dotted { border-bottom: 1px dashed rgba(255,255,255,.35); padding-bottom: 1px; cursor: help; }

.card {
  position: relative;
  background: var(--se-bg);
  border: 1px solid var(--se-border);
  border-radius: 10px;
  overflow: hidden;
}

.mkt { display: flex; align-items: center; gap: 10px; padding: 12px 14px 10px; border-bottom: 1px solid var(--se-border); }
.coin { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: 11px; color: var(--se-accent-ink); background: var(--se-accent); flex: none; }
.mkt-pick { display: flex; align-items: center; gap: 6px; font-size: 17px; font-weight: 600; letter-spacing: .01em; }
.mkt-pick svg { opacity: .75; }
.mkt-price { margin-left: auto; text-align: right; line-height: 1.2; }
.mkt-price .big { font-size: 16px; font-weight: 600; }
.mkt-price .chg { font-size: 12px; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px 10px; padding: 8px 14px 10px; border-bottom: 1px solid var(--se-border); }
.stat .k { font-size: 11px; color: var(--se-text-2); }
.stat .v { font-size: 12px; font-weight: 500; }
.spark { display: block; width: 100%; height: 56px; border-bottom: 1px solid var(--se-border); }

.menu { position: absolute; z-index: 20; top: 50px; left: 10px; right: 10px; max-height: 320px; overflow: auto; background: var(--se-surface-2); border: 1px solid var(--se-border-strong); border-radius: 8px; box-shadow: 0 16px 40px rgba(0,0,0,.6); padding: 6px; }
.menu input { width: 100%; background: var(--se-input); border: 1px solid transparent; border-radius: var(--se-radius); padding: 8px 10px; margin-bottom: 6px; outline: none; }
.menu-row { display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center; width: 100%; text-align: left; padding: 7px 8px; border-radius: var(--se-radius-sm); }
.menu-row:hover, .menu-row.on { background: var(--se-input); }
.menu-row .n { font-weight: 600; }
.menu-row .t { font-size: 11px; color: var(--se-muted); }

.ticket { padding: 12px 14px 14px; display: grid; gap: 10px; }
.pills { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.pill { height: 32px; border-radius: var(--se-radius); background: var(--se-raised); font-weight: 600; font-size: 13px; display: grid; place-items: center; }
.pill:hover:not(:disabled) { background: #2e2e2e; }
.pill.static { cursor: default; }
.tabs { display: flex; gap: 18px; border-bottom: 1px solid var(--se-border); }
.tab { padding: 6px 0 8px; color: var(--se-text-2); font-weight: 500; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab.on { color: var(--se-text); border-bottom-color: var(--se-accent); }
.seg { display: grid; grid-template-columns: 1fr 1fr; background: var(--se-raised); border-radius: var(--se-radius); padding: 2px; }
.seg button { height: 32px; border-radius: 5px; font-weight: 600; color: var(--se-text); }
.seg .long.on { background: rgba(var(--se-accent-rgb), .22); color: var(--se-accent); }
.seg .short.on { background: rgba(var(--se-neg-rgb), .22); color: var(--se-neg); }
.kv { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; font-size: 12.5px; }
.kv .k { color: var(--se-text-2); }
.kv .v { color: var(--se-text); font-weight: 500; text-align: right; }
.field { display: flex; align-items: center; height: 40px; background: var(--se-input); border-radius: var(--se-radius); padding: 0 10px; border: 1px solid transparent; }
.field:focus-within { border-color: rgba(var(--se-accent-rgb), .55); }
.field label { color: var(--se-text-2); margin-right: 8px; white-space: nowrap; }
.field input { flex: 1; min-width: 0; background: none; border: 0; outline: none; text-align: right; font-family: var(--se-mono); font-size: 14px; }
.field .unit { margin-left: 8px; font-weight: 600; color: var(--se-text-soft); }
.field input::placeholder { color: rgba(255,255,255,.35); }
.slider-row { display: grid; grid-template-columns: 1fr 64px; gap: 10px; align-items: center; }
.slider { position: relative; height: 18px; }
.slider input { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; margin: 0; }
.slider .track { position: absolute; left: 0; right: 0; top: 8px; height: 3px; background: #2f2f2f; border-radius: 2px; }
.slider .fill { position: absolute; left: 0; top: 8px; height: 3px; background: var(--se-accent); border-radius: 2px; }
.slider .tick { position: absolute; top: 6px; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: #3a3a3a; }
.slider .tick.on { background: var(--se-accent); }
.slider .knob { position: absolute; top: 2px; width: 14px; height: 14px; margin-left: -7px; border-radius: 50%; border: 2px solid var(--se-accent); background: var(--se-bg); pointer-events: none; }
.pct { height: 32px; border: 1px solid var(--se-border-strong); border-radius: var(--se-radius); display: grid; place-items: center; font-weight: 600; }
.checks { display: flex; gap: 18px; }
.check { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; user-select: none; }
.check .box { width: 15px; height: 15px; border: 1.5px solid #5a5a5a; border-radius: 3px; display: grid; place-items: center; }
.check.on .box { background: var(--se-accent); border-color: var(--se-accent); }
.tpsl { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.tpsl .field { height: 36px; }
.cta { height: 40px; border-radius: var(--se-radius); background: var(--se-accent); color: var(--se-accent-ink); font-weight: 600; font-size: 14px; width: 100%; transition: filter .15s; }
.cta:hover:not(:disabled) { filter: brightness(1.06); }
.cta.short { background: var(--se-neg); color: #fff; }
.cta:disabled { opacity: .45; }
.cta.ghost { background: transparent; color: var(--se-accent); border: 1px solid rgba(var(--se-accent-rgb), .55); }
.details { display: grid; gap: 6px; padding-top: 2px; }
.warn { font-size: 12px; line-height: 1.4; padding: 8px 10px; border-radius: var(--se-radius); background: rgba(var(--se-neg-rgb), .1); color: #fda4b4; }
.note { font-size: 12px; line-height: 1.45; padding: 8px 10px; border-radius: var(--se-radius); background: rgba(var(--se-accent-rgb), .07); color: var(--se-text-soft); }
.note b, .warn b { color: var(--se-text); }

.lower { border-top: 1px solid var(--se-border); }
.lower .tabs { padding: 0 14px; }
.list { padding: 6px 14px 12px; display: grid; gap: 8px; min-height: 64px; }
.empty { color: var(--se-muted); text-align: center; padding: 14px 0 6px; font-size: 12.5px; }
.row { border: 1px solid var(--se-border); border-radius: 8px; padding: 9px 10px; display: grid; gap: 4px; }
.row-h { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.badge { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 4px; }
.badge.long { background: rgba(var(--se-accent-rgb), .15); color: var(--se-accent); }
.badge.short { background: rgba(var(--se-neg-rgb), .15); color: var(--se-neg); }
.row-g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 8px; font-size: 12px; }
.row-g .k { color: var(--se-text-2); font-size: 11px; }
.mini { height: 26px; padding: 0 10px; border-radius: var(--se-radius-sm); background: var(--se-raised); font-weight: 600; font-size: 12px; margin-left: auto; }
.mini:hover:not(:disabled) { background: #303030; }

.foot { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border-top: 1px solid var(--se-border); font-size: 11.5px; color: var(--se-text-2); }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--se-accent); box-shadow: 0 0 0 3px rgba(var(--se-accent-rgb), .15); }
.dot.test { background: var(--se-gold); box-shadow: 0 0 0 3px rgba(248,147,26,.15); }
.foot .brand { margin-left: auto; }
.foot .brand b { color: var(--se-text); font-weight: 600; }
.foot a { color: inherit; text-decoration: none; }
.foot a:hover { color: var(--se-text); }
.acct { display: inline-flex; align-items: center; gap: 6px; }
.linkbtn { color: var(--se-text-2); text-decoration: underline; text-underline-offset: 2px; }
.linkbtn:hover { color: var(--se-text); }

.overlay { position: absolute; inset: 0; z-index: 30; background: rgba(0,0,0,.72); backdrop-filter: blur(3px); display: grid; align-items: end; }
.sheet { background: var(--se-surface); border-top: 1px solid var(--se-border-strong); border-radius: 12px 12px 0 0; padding: 16px 16px 18px; display: grid; gap: 12px; max-height: 100%; overflow: auto; animation: rise .18s ease-out; }
@keyframes rise { from { transform: translateY(14px); opacity: .4; } to { transform: none; opacity: 1; } }
.sheet h3 { margin: 0; font-size: 16px; font-weight: 600; display: flex; align-items: center; }
.sheet h3 .x { margin-left: auto; color: var(--se-text-2); font-size: 18px; line-height: 1; padding: 2px 4px; }
.sheet p { margin: 0; color: var(--se-text-2); font-size: 12.5px; line-height: 1.5; }
.wallets { display: grid; gap: 6px; }
.wallet { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: var(--se-input); font-weight: 600; text-align: left; }
.wallet:hover { background: var(--se-input-hover); }
.wallet img { width: 22px; height: 22px; border-radius: 5px; }
.steps { display: grid; gap: 8px; }
.step { display: flex; gap: 10px; align-items: center; font-size: 12.5px; color: var(--se-text-2); }
.step .s { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid #4a4a4a; display: grid; place-items: center; font-size: 10px; flex: none; }
.step.done { color: var(--se-text); }
.step.done .s { background: var(--se-accent); border-color: var(--se-accent); color: var(--se-accent-ink); }
.step.active { color: var(--se-text); }
.step.active .s { border-color: var(--se-accent); }
.spin { width: 12px; height: 12px; border: 2px solid rgba(var(--se-accent-rgb), .25); border-top-color: var(--se-accent); border-radius: 50%; animation: spin .8s linear infinite; display: inline-block; vertical-align: -2px; }
@keyframes spin { to { transform: rotate(360deg); } }
.consent { font-family: var(--se-mono); font-size: 11px; white-space: pre-wrap; background: var(--se-bg); border: 1px solid var(--se-border); border-radius: 6px; padding: 8px; color: var(--se-text-2); max-height: 120px; overflow: auto; }
.addr { font-family: var(--se-mono); font-size: 11.5px; word-break: break-all; color: var(--se-text-soft); }

.toast { position: absolute; z-index: 40; left: 10px; right: 10px; bottom: 44px; padding: 10px 12px; border-radius: 8px; background: var(--se-surface-2); border: 1px solid var(--se-border-strong); box-shadow: 0 10px 30px rgba(0,0,0,.5); font-size: 12.5px; display: flex; gap: 8px; align-items: flex-start; animation: rise .18s ease-out; }
.toast.ok { border-color: rgba(var(--se-accent-rgb), .45); }
.toast.err { border-color: rgba(var(--se-neg-rgb), .5); }
.toast .x { margin-left: auto; color: var(--se-text-2); }

@container (max-width: 340px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .row-g { grid-template-columns: repeat(2, 1fr); }
}
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
`;
