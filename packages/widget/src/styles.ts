export const FONT_HREF = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";

export const css =  `:host {

  all: initial;
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
  min-width: min(300px, 100%);
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

.info { position: relative; display: inline-flex; vertical-align: -2px; margin-left: 4px; }
.info-b { position: relative; width: 14px; height: 14px; display: grid; place-items: center; border-radius: 50%; color: var(--se-faint); }
.info-b::after { content: ""; position: absolute; inset: -7px; }
.info-b:hover, .info-b[aria-expanded="true"] { color: var(--se-text); }
.info-pop { position: absolute; z-index: 25; top: calc(100% + 6px); left: -12px; width: max-content; max-width: 250px; padding: 8px 10px; border-radius: var(--se-radius); background: var(--se-surface-2); border: 1px solid var(--se-border-strong); box-shadow: 0 10px 30px rgba(0,0,0,.55); font: 400 12px/1.45 var(--se-font); color: var(--se-text-soft); text-align: left; white-space: normal; letter-spacing: 0; cursor: auto; }
.info-pop b { color: var(--se-text); font-weight: 600; }

.helper { font-size: 12px; line-height: 1.4; color: var(--se-muted); }
.ticket > .helper { margin-top: -5px; }
.ticket > .helper.summary { margin-top: 0; color: var(--se-text-2); }
.helper .linkbtn { font-size: inherit; }
.seg-hint { font-size: 11px; color: var(--se-faint); }

.card {
  position: relative;
  background: var(--se-bg);
  border: 1px solid var(--se-border);
  border-radius: 10px;
  overflow: hidden;
}

.mkt { display: flex; align-items: center; gap: 10px; padding: 12px 14px 10px; border-bottom: 1px solid var(--se-border); }
.coin { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: 11px; color: var(--se-accent-ink); background: var(--se-accent); flex: none; }
.mkt-id { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; min-width: 0; }
.chip-test { font-size: 10.5px; font-weight: 600; line-height: 1.5; padding: 0 6px; border-radius: var(--se-radius-sm); color: var(--se-gold); background: rgba(248,147,26,.13); white-space: nowrap; }
.mkt-pick { display: flex; align-items: center; gap: 6px; font-size: 17px; font-weight: 600; letter-spacing: .01em; }
.mkt-pick svg { opacity: .75; }
.mkt-price { margin-left: auto; text-align: right; line-height: 1.2; }
.mkt-price .big { font-size: 16px; font-weight: 600; }
.mkt-price .chg { font-size: 12px; }
.stats { display: grid; grid-template-columns: 1fr 1.45fr 1fr; gap: 4px 10px; padding: 8px 14px 10px; border-bottom: 1px solid var(--se-border); }
.stat .k { font-size: 11px; color: var(--se-text-2); }
.stat .v { font-size: 12px; font-weight: 500; }
.stat .v.fund { font-size: 11.5px; white-space: nowrap; }
.spark { display: block; width: 100%; height: 56px; border-bottom: 1px solid var(--se-border); }

.views { display: flex; align-items: center; gap: 8px; padding: 0 14px; height: 30px; border-bottom: 1px solid var(--se-border); font-size: 12px; }
.vtabs, .ivs, .ptype, .chips, .durs { display: flex; gap: 2px; }
.vtabs button, .ivs button, .ptype button, .chips button, .durs button { height: 26px; min-width: 28px; padding: 0 8px; border-radius: var(--se-radius-sm); color: var(--se-text-2); font-weight: 500; }
.vtabs button:hover, .ivs button:hover, .ptype button:hover, .chips button:hover, .durs button:hover { color: var(--se-text); }
.vtabs button.on, .ivs button.on, .ptype button.on, .chips button.on, .durs button.on { background: var(--se-raised); color: var(--se-text); }
.ivs { margin-left: auto; }
.ivs button { padding: 0 6px; font-family: var(--se-mono); font-size: 11.5px; }
.chart { position: relative; border-bottom: 1px solid var(--se-border); overflow: hidden; touch-action: pan-y; user-select: none; }
.chart svg { display: block; }
.ptype { position: absolute; left: 8px; top: 5px; background: rgba(10,10,10,.85); border-radius: var(--se-radius-sm); z-index: 1; }
.ptype button { height: 20px; padding: 0 7px; font-size: 11px; }
.ohlc { position: absolute; left: 8px; right: 62px; top: 29px; font-size: 10.5px; color: var(--se-text-2); pointer-events: none; z-index: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ohlc b { color: var(--se-text); font-weight: 500; margin-right: 3px; }
.ohlc b.pos { color: var(--se-accent); } .ohlc b.neg { color: var(--se-neg); }
.chart-msg { position: absolute; inset: 0; display: grid; place-items: center; color: var(--se-muted); font-size: 12.5px; text-align: center; padding: 0 20px; }
.chart .gl { stroke: #1d1d1d; }
.chart .ax { fill: var(--se-faint); font: 10px var(--se-mono); }
.chart .cu { stroke: var(--se-accent); fill: var(--se-accent); }
.chart .cd { stroke: var(--se-neg); fill: var(--se-neg); }
.chart .vol { stroke: none; opacity: .28; }
.chart .now { stroke-dasharray: 3 3; opacity: .8; }
.chart .tag { fill: var(--se-accent-ink); stroke: none; font: 600 10px var(--se-mono); }
.chart .cd .tag { fill: #fff; }
.chart .xh line { stroke: rgba(255,255,255,.35); stroke-dasharray: 2 3; }
.chart .xh rect { fill: #3a3a3a; }
.chart .xh text { fill: #fff; font: 10px var(--se-mono); }
.book { position: relative; min-height: 120px; padding: 4px 0 6px; border-bottom: 1px solid var(--se-border); font-size: 11.5px; }
.book-cap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0 10px; padding: 2px 14px 4px; font-size: 11px; color: var(--se-faint); }
.book-cap .pos, .book-cap .neg { font-weight: 600; }
.lvl { position: relative; display: grid; grid-template-columns: 1.1fr 1fr 1fr; gap: 8px; width: 100%; height: 19px; align-items: center; padding: 0 14px; text-align: right; }
.lvl .px, .lvl.hd > span:first-child { text-align: left; }
.lvl .bar { position: absolute; right: 0; top: 1px; bottom: 1px; opacity: .13; pointer-events: none; }
.lvl.ask .bar { background: var(--se-neg); } .lvl.bid .bar { background: var(--se-accent); }
.lvl.ask .px { color: var(--se-neg); } .lvl.bid .px { color: var(--se-accent); }
.lvl:not(.hd):hover { background: var(--se-input); }
.lvl.hd { color: var(--se-faint); font-size: 11px; cursor: default; }
.lvl > span { position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.book-empty { padding: 10px 14px; color: var(--se-text-2); font-size: 12px; text-align: center; }
.spread { display: flex; justify-content: space-between; gap: 8px; padding: 3px 14px; margin: 2px 0; background: var(--se-surface); color: var(--se-text-2); font-size: 11px; }

.menu { position: absolute; z-index: 20; top: 50px; left: 10px; right: 10px; max-height: 320px; overflow: auto; background: var(--se-surface-2); border: 1px solid var(--se-border-strong); border-radius: 8px; box-shadow: 0 16px 40px rgba(0,0,0,.6); padding: 6px; }
.menu input { width: 100%; background: var(--se-input); border: 1px solid transparent; border-radius: var(--se-radius); padding: 8px 10px; margin-bottom: 6px; outline: none; }
.menu-row { display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center; width: 100%; text-align: left; padding: 7px 8px; border-radius: var(--se-radius-sm); }
.menu-row:hover, .menu-row.on { background: var(--se-input); }
.menu-row .n { font-weight: 600; }
.menu-row .t { font-size: 11px; color: var(--se-muted); }
.menu.inl { position: relative; top: auto; left: 0; right: 0; margin-top: -6px; }
.menu.inl .menu-row { grid-template-columns: 1fr; }
.confirm { display: grid; gap: 8px; padding: 9px 10px; border-radius: var(--se-radius); background: var(--se-surface-2); border: 1px solid var(--se-border-strong); font-size: 12px; line-height: 1.45; color: var(--se-text-soft); }
.confirm-a { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 6px; }
.confirm-a .mini { margin-left: 0; }

.ticket { padding: 12px 14px 14px; display: grid; gap: 10px; }
.pills { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.pill { height: 32px; border-radius: var(--se-radius); background: var(--se-raised); font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; white-space: nowrap; }
.pill-k { color: var(--se-text-2); font-weight: 500; font-size: 11.5px; }
.pill:hover:not(:disabled) { background: #2e2e2e; }
.pillx { display: flex; align-items: center; min-width: 0; border-radius: var(--se-radius); background: var(--se-raised); }
.pillx .pill, .pillx .pill:hover:not(:disabled) { flex: 1; background: none; }
.pillx:has(.pill:hover:not(:disabled)) { background: #2e2e2e; }
.pillx .pill:disabled { color: var(--se-text-soft); }
.pillx .info { margin: 0 9px 0 0; }
.levs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; padding: 0 4px 4px; }
.levs .pill { height: auto; padding: 5px 0 4px; flex-direction: column; gap: 0; line-height: 1.25; }
.levs .pill.on { background: rgba(var(--se-accent-rgb), .18); color: var(--se-accent); }
.levs .lq { font-size: 10.5px; font-weight: 500; color: var(--se-text-2); }
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
.slider-row { display: grid; grid-template-columns: 1fr 64px auto; gap: 10px; align-items: center; }
.slider-row .info { margin-left: -2px; }
.slider { position: relative; height: 18px; }
.slider input { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; margin: 0; }
.slider .track { position: absolute; left: 0; right: 0; top: 8px; height: 3px; background: #2f2f2f; border-radius: 2px; }
.slider .fill { position: absolute; left: 0; top: 8px; height: 3px; background: var(--se-accent); border-radius: 2px; }
.slider .tick { position: absolute; top: 6px; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: #3a3a3a; }
.slider .tick.on { background: var(--se-accent); }
.slider .knob { position: absolute; top: 2px; width: 14px; height: 14px; margin-left: -7px; border-radius: 50%; border: 2px solid var(--se-accent); background: var(--se-bg); pointer-events: none; }
.pct { height: 32px; border: 1px solid var(--se-border-strong); border-radius: var(--se-radius); display: flex; align-items: center; gap: 3px; padding: 0 8px; font-weight: 600; cursor: text; }
.pct:focus-within { border-color: rgba(var(--se-accent-rgb), .6); }
.pct input { flex: 1; min-width: 0; width: 100%; background: transparent; border: 0; outline: none; padding: 0; text-align: right; font: inherit; color: inherit; }
.connect-strip { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 14px; background: rgba(var(--se-accent-rgb), .07); border-bottom: 1px solid var(--se-border); font-size: 12.5px; color: var(--se-text-soft); }
.connect-strip .mini { margin-left: 0; flex: none; }
.checks { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 18px; }
.checks .helper { font-size: 11.5px; }
.linkbtn.adv { margin-left: auto; display: inline-flex; align-items: center; gap: 3px; font-size: 12px; text-decoration: none; }
.linkbtn.adv[aria-expanded="true"] svg { transform: rotate(180deg); }
.linkbtn:disabled { opacity: .55; cursor: default; }
.linkbtn.dep { margin-left: 8px; font-size: 12px; color: var(--se-accent); text-decoration: none; }
.check { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; user-select: none; }
.check .box { width: 15px; height: 15px; border: 1.5px solid #5a5a5a; border-radius: 3px; display: grid; place-items: center; }
.check.on .box { background: var(--se-accent); border-color: var(--se-accent); }
.tpsl { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.tpsl .field { height: 36px; }
.cta { min-height: 40px; padding: 5px 10px; line-height: 1.25; border-radius: var(--se-radius); background: var(--se-accent); color: var(--se-accent-ink); font-weight: 600; font-size: 14px; width: 100%; transition: filter .15s; }
.cta:hover:not(:disabled) { filter: brightness(1.06); }
.cta.short { background: var(--se-neg); color: #fff; }
.cta:disabled { opacity: .45; }
.cta.ghost { background: transparent; color: var(--se-accent); border: 1px solid rgba(var(--se-accent-rgb), .55); }
.cta.caution { background: var(--se-gold); color: #1a0f00; }
.durs { align-items: center; flex-wrap: wrap; }
.durs .lbl { color: var(--se-text-2); margin-right: auto; font-size: 12.5px; }
.durs button { height: 26px; font-size: 12px; background: var(--se-input); }
.details { display: grid; gap: 6px; padding-top: 2px; }
.warn { font-size: 12px; line-height: 1.4; padding: 8px 10px; border-radius: var(--se-radius); background: rgba(var(--se-neg-rgb), .1); color: #fda4b4; }
.note { font-size: 12px; line-height: 1.45; padding: 8px 10px; border-radius: var(--se-radius); background: rgba(var(--se-accent-rgb), .07); color: var(--se-text-soft); }
.note b, .warn b { color: var(--se-text); }

.lower { border-top: 1px solid var(--se-border); }
.lower .tabs { padding: 0 14px; gap: 16px; overflow-x: auto; scrollbar-width: none; }
.lower .tabs::-webkit-scrollbar { display: none; }
.ticket > *, .ticket .field, .ticket .durs { min-width: 0; }
@container (max-width: 360px) {
  .lower .tabs { flex-wrap: wrap; overflow: visible; column-gap: 12px; }
  .durs .lbl { flex-basis: 100%; margin-bottom: 4px; }
}
.lower .tab { flex: none; white-space: nowrap; }
.list { padding: 6px 14px 12px; display: grid; gap: 8px; min-height: 64px; }
.empty { color: var(--se-muted); text-align: center; padding: 14px 0 6px; font-size: 12.5px; }
.row { border: 1px solid var(--se-border); border-radius: 8px; padding: 9px 10px; display: grid; gap: 4px; }
.row-h { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.badge { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 4px; }
.badge.long { background: rgba(var(--se-accent-rgb), .15); color: var(--se-accent); }
.badge.short { background: rgba(var(--se-neg-rgb), .15); color: var(--se-neg); }
.row-g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 8px; font-size: 12px; }
.row-g .k { color: var(--se-text-2); font-size: 11px; }
.pos-t { min-width: 0; }
.pos-t .muted { font-weight: 500; }
.row-g.pos-g { grid-template-columns: repeat(2, 1fr); }
.pos-g .wide { grid-column: 1 / -1; }
.of { font-family: var(--se-font); font-size: 11.5px; color: var(--se-text-2); letter-spacing: 0; }
.row.flash, .field.flash { animation: flash 1.5s ease-out; }
.chart-note { position: absolute; left: 8px; right: 60px; top: 34px; font-size: 11.5px; color: var(--se-text-2); background: rgba(10,10,10,.78); padding: 4px 8px; border-radius: var(--se-radius-sm); pointer-events: none; }
@keyframes flash { 0%, 35% { background: rgba(var(--se-accent-rgb), .13); border-color: rgba(var(--se-accent-rgb), .6); } 100% { background: transparent; border-color: var(--se-border); } }
.mini { height: 26px; padding: 0 10px; border-radius: var(--se-radius-sm); background: var(--se-raised); font-weight: 600; font-size: 12px; margin-left: auto; }
.mini:hover:not(:disabled) { background: #303030; }
.mini.go { background: rgba(var(--se-accent-rgb), .18); color: var(--se-accent); }
.mini.danger { background: rgba(var(--se-neg-rgb), .2); color: #fda4b4; }
.mini.more { margin: 0 auto; }
.list-h { display: flex; align-items: center; font-size: 12px; }
.r { margin-left: auto; }
.t { font-size: 11.5px; }
.chips { flex-wrap: wrap; }
.chips button { font-size: 12px; }
.hrow { padding: 7px 0; border-bottom: 1px solid var(--se-border); display: grid; gap: 2px; font-size: 12.5px; }
.hrow .row-h { font-weight: 600; min-width: 0; }
.hrow .num.r { font-weight: 500; white-space: nowrap; }
.prog { height: 4px; border-radius: 2px; background: #2a2a2a; overflow: hidden; }
.prog span { display: block; height: 100%; background: var(--se-accent); }
.risk { display: flex; align-items: center; gap: 8px; font-size: 12.5px; }
.risk .k { color: var(--se-text-2); white-space: nowrap; }
.meter { flex: 1; min-width: 30px; height: 5px; border-radius: 3px; background: #2a2a2a; overflow: hidden; }
.meter span { display: block; height: 100%; background: var(--se-accent); }
.meter .lv-warn { background: var(--se-gold); } .meter .lv-danger { background: var(--se-neg); }
.mgrid { grid-template-columns: repeat(2, 1fr); gap: 6px 12px; }
.vaults { display: grid; gap: 4px; padding-top: 8px; border-top: 1px solid var(--se-border); }
.vaults .row-h { font-size: 12.5px; }
.vaults .linkbtn { font-size: 11.5px; font-weight: 400; }
.vault { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 10px; align-items: center; padding: 6px 8px; margin: 0 -8px; border-radius: var(--se-radius-sm); color: inherit; text-decoration: none; font-size: 12px; }
.vault:hover { background: var(--se-input); }
.vn { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.foot { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; padding: 8px 14px; border-top: 1px solid var(--se-border); font-size: 11.5px; color: var(--se-text-2); }
.foot > * { white-space: nowrap; }
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

.toast { position: fixed; z-index: 2147483000; left: 50%; transform: translateX(-50%); width: min(360px, calc(100vw - 24px)); bottom: 16px; padding: 10px 12px; border-radius: 8px; background: var(--se-surface-2); border: 1px solid var(--se-border-strong); box-shadow: 0 10px 30px rgba(0,0,0,.5); font-size: 12.5px; display: flex; gap: 8px; align-items: flex-start; animation: rise .18s ease-out; }
.ticket-msg { font-size: 12.5px; padding: 8px 10px; border-radius: var(--se-radius); line-height: 1.4; }
.ticket-msg.ok { background: rgba(var(--se-accent-rgb), .1); color: var(--se-accent); }
.ticket-msg.err { background: rgba(var(--se-neg-rgb), .12); color: #fda4b4; }
.toast.ok { border-color: rgba(var(--se-accent-rgb), .45); }
.toast.err { border-color: rgba(var(--se-neg-rgb), .5); }
.toast .x { margin-left: auto; color: var(--se-text-2); }

@container (max-width: 340px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .row-g { grid-template-columns: repeat(2, 1fr); }
  .views { padding: 0 10px; gap: 4px; }
  .vtabs button { padding: 0 6px; }
  .ivs button { padding: 0 4px; }
  .book-cap { padding: 2px 10px 4px; }
  .seg-hint .w { display: none; }
  .lower .tabs { gap: 12px; }
  .lvl { padding: 0 10px; gap: 6px; }
}
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
`;
