export const appCss =  `:host([variant="app"]) {
  width: var(--se-width, 100%);
  height: var(--se-height, 100%);
  min-width: 320px;
  min-height: 560px;
  max-width: none;
}
:host([variant="app"]) .se-mount { height: 100%; min-height: inherit; }
.pa {
  --pa-bg: #0e0e0f;
  --pa-card: #1b1b1d;
  --pa-card-2: #242427;
  --pa-sheet: #19191b;
  --pa-line: rgba(255,255,255,.07);
  --pa-line-2: rgba(255,255,255,.12);
  --pa-text: #f4f4f5;
  --pa-soft: #d4d4d8;
  --pa-muted: #9b9ba3;
  --pa-faint: #6b6b73;
  --pa-accent: #4efab0;
  --pa-accent-rgb: 78,250,176;
  --pa-accent-ink: #04120c;
  --pa-neg: #ff5770;
  --pa-neg-rgb: 255,87,112;
  --pa-gold: #ffb719;
  --pa-font: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  position: relative;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--pa-bg);
  color: var(--pa-text);
  font: 400 15px/1.4 var(--pa-font);
  letter-spacing: -0.005em;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.pa .num { font-family: var(--pa-font); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.pa .pos { color: var(--pa-accent); }
.pa .neg { color: var(--pa-neg); }
.pa .muted { color: var(--pa-muted); }
.pa .pa-accent { color: var(--pa-accent); }

:where(.pa) button { font: inherit; color: inherit; cursor: pointer; }
:where(.pa) button:disabled { cursor: not-allowed; }
.pa a { color: inherit; }
.pa :focus-visible { outline: 2px solid rgba(var(--pa-accent-rgb), .7); outline-offset: 2px; }

.pa input:focus-visible { outline: none; }
.pa-search:focus-within { box-shadow: inset 0 0 0 1.5px rgba(var(--pa-accent-rgb), .45); }

.pa-mobile { position: relative; flex: 1; min-height: 0; display: flex; }
.pa-stage { flex: 1; min-width: 0; display: flex; animation: pa-in .2s ease-out; }
@keyframes pa-in { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }
.pa-screen { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; min-height: 0; }
.pa-top { flex: none; display: flex; align-items: center; gap: 12px; padding: 12px 16px 8px; min-height: 64px; }
.pa-top .sp { flex: 1; }
.pa-title { font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 8px; min-width: 0; }
.pa-title.two { flex-direction: column; align-items: flex-start; gap: 0; line-height: 1.25; }
.pa-title.two b { font-size: 17px; font-weight: 600; }
.pa-title.two > span { font-size: 15px; color: var(--pa-muted); }
.pa-side { display: inline-flex; align-items: center; gap: 4px; font-size: 17px; font-weight: 600; padding: 0; }
.pa-chip-test { font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 999px; background: rgba(255,183,25,.14); color: var(--pa-gold); letter-spacing: 0; white-space: nowrap; }
.pa-round { flex: none; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); color: var(--pa-text); transition: background .15s; }
.pa-round:hover { background: #2e2e32; }
.pa-round.ghost { background: none; pointer-events: none; }
.pa-round.done { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-round.done:disabled { opacity: .4; }
.pa-scroll { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 0 16px; scrollbar-width: none; overscroll-behavior: contain; }
.pa-scroll::-webkit-scrollbar { display: none; }
.pa-bottom-pad { height: 104px; }
.pa-bottom-pad.sm { height: 24px; }
.pa-equity { font-size: 46px; font-weight: 700; letter-spacing: -0.03em; margin: 2px 0 2px; }
.pa-equity-sub { font-size: 15px; margin-bottom: 14px; }
.pa-equity + .pa-card { margin-top: 18px; }
.pa-card { background: var(--pa-card); border-radius: 22px; padding: 18px 20px; margin: 0 0 14px; position: relative; }
.pa-card.funds { padding: 14px 20px 18px; }
.pa-card.funds .pa-row { padding: 6px 0 12px; }
.pa-card.funds .pa-row .k { font-size: 16px; font-weight: 500; }
.pa-two { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pa-hint { margin-top: 12px; font-size: 13px; color: var(--pa-muted); line-height: 1.45; }
.pa-card.gs { padding: 18px 110px 18px 20px; }
.pa-card.gs .eyebrow { font-size: 13px; font-weight: 600; letter-spacing: .06em; color: var(--pa-muted); }
.pa-card.gs .t { font-size: 19px; line-height: 1.3; margin: 6px 0 12px; font-weight: 500; }
.pa-card.gs .link { color: var(--pa-accent); font-size: 16px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 0; }
.pa-card.gs .x { position: absolute; top: 14px; right: 14px; width: 26px; height: 26px; display: grid; place-items: center; color: var(--pa-muted); border-radius: 50%; }
.pa-card.gs .art { position: absolute; right: 20px; bottom: 30px; }
.pa-h2 { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin: 26px 0 12px; display: flex; align-items: center; gap: 4px; padding: 0; text-align: left; }
.pa-h2.sm { font-size: 18px; margin: 20px 0 10px; }
.pa-h2.link svg { color: var(--pa-muted); }
.pa-chips { display: grid; gap: 8px; margin: 0 -16px; padding: 0 16px; overflow-x: auto; scrollbar-width: none; }
.pa-chips::-webkit-scrollbar { display: none; }
.pa-chiprow { display: flex; gap: 8px; }
.pa-chip { flex: none; display: inline-flex; align-items: center; gap: 7px; height: 40px; padding: 0 14px; border-radius: 999px; background: var(--pa-card); font-size: 16px; font-weight: 500; white-space: nowrap; }
.pa-chip svg { color: var(--pa-accent); }
.pa-chip:hover { background: var(--pa-card-2); }
.pa-chip.sm { height: 34px; font-size: 14px; padding: 0 12px; gap: 5px; }
.pa-chip.sm svg { color: var(--pa-muted); }
.pa-chip.on { background: rgba(var(--pa-accent-rgb), .14); color: var(--pa-accent); }
.pa-group { background: var(--pa-card); border-radius: 22px; padding: 4px 18px; margin-bottom: 14px; }
.pa-group.mk { padding: 8px 18px; }
.pa-row { display: flex; align-items: center; gap: 10px; width: 100%; padding: 15px 0; text-align: left; border-bottom: 1px solid var(--pa-line); background: none; }
.pa-group > .pa-row:last-child, .pa-group > :last-child .pa-row { border-bottom: 0; }
.pa-row .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-row .k { font-size: 16px; display: inline-flex; align-items: center; gap: 6px; }
.pa-row .s { font-size: 14px; color: var(--pa-muted); overflow: hidden; text-overflow: ellipsis; }
.pa-row .r { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.pa-row .v { font-size: 16px; }
.pa-row .vs { font-size: 13px; color: var(--pa-muted); }
.pa-row .chev { color: var(--pa-muted); flex: none; }
.pa-row.opt .ck { width: 22px; flex: none; color: var(--pa-accent); display: grid; place-items: center; }
.pa-i { display: inline-grid; place-items: center; color: var(--pa-muted); cursor: pointer; }
.pa-i:hover { color: var(--pa-text); }
.pa-lines .pa-row { padding: 18px 0; }
.pa-lines .pa-row .k { font-size: 15px; color: var(--pa-muted); }
.pa-lines .pa-row .s { font-size: 17px; color: var(--pa-text); }

.pa-coin { position: relative; flex: none; display: inline-block; border-radius: 50%; }
.pa-coin img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; background: #222; }
.pa-mono { width: 100%; height: 100%; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: #04120c; letter-spacing: 0; }
.pa-rank { position: absolute; right: -3px; bottom: -3px; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; font-size: 10.5px; font-weight: 700; color: #1a1300; border: 2px solid var(--pa-card); }
.pa-rank.r1 { background: #f5c542; } .pa-rank.r2 { background: #c8ccd4; } .pa-rank.r3 { background: #e3935a; }
.pa-lev { display: inline-block; font-size: 12.5px; font-weight: 600; padding: 1px 6px; border-radius: 6px; background: var(--pa-card-2); color: var(--pa-soft); vertical-align: 2px; margin-left: 4px; }

.pa-mrow { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 0; text-align: left; }
.pa-mrow .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-mrow .l b { font-size: 17px; font-weight: 600; white-space: nowrap; }
.pa-mrow .s { font-size: 15px; color: var(--pa-muted); }
.pa-mrow .r { text-align: right; display: flex; flex-direction: column; gap: 2px; }
.pa-mrow .r b { font-size: 17px; font-weight: 500; }
.pa-mrow .r span { font-size: 15px; }
.pa-mrow.list { padding: 10px 0; }
.pa-num { width: 22px; flex: none; text-align: center; font-size: 15px; color: var(--pa-muted); }
.pa-num.medal { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 700; color: #1a1300; }
.pa-num.medal.r1 { background: #f5c542; } .pa-num.medal.r2 { background: #c8ccd4; } .pa-num.medal.r3 { background: #e3935a; }
.pa-empty-row, .pa-empty { padding: 26px 0; text-align: center; color: var(--pa-muted); font-size: 15px; }
.pa-pos { display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 0; text-align: left; border-bottom: 1px solid var(--pa-line); }
.pa-group > .pa-pos:last-child { border-bottom: 0; }
.pa-pos .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-pos .l b { font-size: 16px; font-weight: 600; }
.pa-pos .s { font-size: 14px; color: var(--pa-muted); }
.pa-pos .r { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; font-size: 14px; }
.pa-pos .r b { font-size: 16px; font-weight: 500; }
.pa-pos .chev { color: var(--pa-muted); }

.pa-search { display: flex; align-items: center; gap: 10px; height: 46px; padding: 0 16px; border-radius: 999px; background: var(--pa-card-2); color: var(--pa-muted); margin: 2px 0 12px; }
.pa-search input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 16px; }
.pa-search input::placeholder { color: var(--pa-muted); }
.pa-search button { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: #3a3a3f; color: var(--pa-text); }
.pa-filter { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; margin: 0 -16px 8px; padding: 0 16px; }
.pa-filter::-webkit-scrollbar { display: none; }
.pa-thead { display: flex; align-items: center; gap: 12px; padding: 10px 0 4px; font-size: 15px; color: var(--pa-muted); }
.pa-thead .n { width: 22px; text-align: center; }
.pa-thead .m { flex: 1; padding-left: 52px; }
.pa-thead .p { display: inline-flex; align-items: center; gap: 4px; color: var(--pa-muted); padding: 0; }

.pa-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; font-size: 16px; font-weight: 600; background: var(--pa-card-2); color: var(--pa-text); text-decoration: none; transition: filter .15s, background .15s, opacity .15s; white-space: nowrap; }
.pa-btn:hover:not(:disabled) { filter: brightness(1.12); }
.pa-btn:disabled { opacity: .4; }
.pa-btn.dark { background: #26262a; }
.pa-btn.dark.on { background: rgba(var(--pa-accent-rgb), .16); color: var(--pa-accent); }
.pa-btn.primary, .pa-btn.long { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-btn.short { background: var(--pa-neg); color: #fff; }
.pa-btn.caution { background: var(--pa-gold); color: #1b1200; }
.pa-btn.wide { width: 100%; margin-top: 6px; }
.pa-btn.big { width: 100%; height: 54px; font-size: 17px; }
.pa-btn.xs { height: 32px; font-size: 13.5px; padding: 0 12px; }
a.pa-btn.wide { margin: 8px 0 0; }
.pa-dock { position: absolute; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 14px 16px 18px; background: linear-gradient(to top, var(--pa-bg) 62%, rgba(14,14,15,0)); z-index: 5; }
.pa-dock .pa-btn { height: 54px; font-size: 18px; }
.pa-dock.single { position: static; grid-template-columns: 1fr; background: none; padding: 10px 16px 18px; }
.pa-foot-link { display: flex; align-items: center; gap: 6px; padding: 10px 0 0; font-size: 14px; color: var(--pa-muted); text-align: left; }
.pa-foot-link:first-of-type { padding-top: 22px; }
.pa-powered { padding: 18px 0 0; font-size: 12.5px; color: var(--pa-faint); }
.pa-powered b { color: var(--pa-muted); font-weight: 600; }

.pa-coinhead { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.pa-coinhead .nm { font-size: 22px; font-weight: 600; }
.pa-price { font-size: 38px; font-weight: 700; letter-spacing: -0.025em; margin-top: 4px; }
.pa-chg { font-size: 16px; font-weight: 500; margin: 2px 0 10px; }
.pa-chg .muted { font-weight: 400; }
.pa-line { position: relative; margin: 0 -16px; color: var(--pa-accent); touch-action: pan-y; user-select: none; }
.pa-line.dn { color: var(--pa-neg); }
.pa-line svg { display: block; }
.pa-line .pulse { opacity: .25; animation: pa-pulse 1.6s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes pa-pulse { 0% { transform: scale(.4); opacity: .5; } 100% { transform: scale(1.4); opacity: 0; } }
.pa-line .xh { stroke: rgba(255,255,255,.35); stroke-dasharray: 3 4; }
.pa-line-msg { position: absolute; inset: 0; display: grid; place-items: center; color: var(--pa-muted); font-size: 14px; }
.pa-candles { margin: 0 -16px; }
.pa-candles .chart { border: 0; }
.pa-ranges { display: flex; align-items: center; justify-content: space-between; margin: 10px 0 4px; }
.pa-ranges button { height: 30px; min-width: 40px; padding: 0 10px; border-radius: 999px; font-size: 14px; font-weight: 600; color: var(--pa-muted); display: inline-flex; align-items: center; gap: 5px; }
.pa-ranges button.on { background: var(--pa-text); color: #0b0b0c; }
.pa-ranges .pa-livedot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.pa-ranges .ic { min-width: 30px; padding: 0 6px; }

.pa-screen.trade { overflow: hidden; }
.pa-amount { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 0 16px 10px; }
.pa-amount-top { flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: center; }
.pa-big { font-weight: 300; letter-spacing: -0.04em; line-height: 1.02; white-space: nowrap; overflow: hidden; }
.pa-big.xxxl { font-size: 84px; } .pa-big.xxl { font-size: 66px; } .pa-big.xl { font-size: 50px; }
.pa-big.zero { color: var(--pa-soft); }
.pa-review .pa-big { margin: 28px 0 26px; }
.pa-levline { display: inline-flex; align-items: center; gap: 6px; font-size: 20px; padding: 6px 0 0; align-self: flex-start; }
.pa-levline.sub { font-size: 16px; color: var(--pa-muted); padding-top: 4px; }
.pa-err { color: var(--pa-neg); font-size: 16px; margin-top: 8px; }
.pa-err.sm { font-size: 13.5px; line-height: 1.4; margin: 10px 2px 0; }
.pa-note { color: var(--pa-muted); font-size: 14px; margin-top: 8px; display: flex; align-items: center; gap: 6px; }
.pa-balance { display: flex; align-items: center; justify-content: space-between; padding: 12px 2px; font-size: 16px; color: var(--pa-soft); text-align: left; }
.pa-balance b { font-weight: 600; color: var(--pa-text); }
.pa-pcts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.pa-pcts.four { grid-template-columns: repeat(4, 1fr); margin: 4px 0 14px; }
.pa-pcts .pa-btn { height: 52px; font-size: 17px; font-weight: 500; }
.pa-keypad { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 8px; }
.pa-keypad button { height: 64px; font-size: 28px; font-weight: 400; border-radius: 16px; display: grid; place-items: center; }
.pa-keypad button:active { background: var(--pa-card); }
@media (max-height: 700px) { .pa-keypad button { height: 52px; font-size: 24px; } .pa-big.xxxl { font-size: 68px; } }

.pa-review { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.pa-review .pa-scroll { padding-bottom: 8px; }
.pa-warn { display: flex; gap: 8px; align-items: flex-start; margin: 10px 0 0; padding: 12px 14px; border-radius: 16px; background: rgba(var(--pa-neg-rgb), .1); color: #ffb3bf; font-size: 14px; line-height: 1.45; }
.pa-warn svg { flex: none; margin-top: 1px; }

.pa-scrim { position: absolute; inset: 0; z-index: 40; background: rgba(0,0,0,.55); display: flex; align-items: flex-end; justify-content: center; animation: pa-fade .18s ease-out; }
@keyframes pa-fade { from { opacity: 0; } }
.pa-sheet { width: 100%; max-width: 520px; max-height: 88%; display: flex; flex-direction: column; background: var(--pa-sheet); border-radius: 32px 32px 0 0; padding: 14px 16px 22px; animation: pa-up .22s cubic-bezier(.2,.8,.2,1); outline: none; }
.pa-sheet.tall { max-height: 92%; }
@keyframes pa-up { from { transform: translateY(40px); opacity: .4; } }
.pa-sheet-h { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.pa-sheet-h .t { flex: 1; text-align: center; font-size: 18px; font-weight: 600; }
.pa-sheet-b { overflow-y: auto; min-height: 0; scrollbar-width: none; }
.pa-sheet-b::-webkit-scrollbar { display: none; }
.pa-sheet .pa-group { background: var(--pa-card-2); }
.pa-sheet .pa-group .pa-row { border-color: rgba(255,255,255,.06); }
.pa-p { color: var(--pa-muted); font-size: 15px; line-height: 1.45; margin: 4px 2px 14px; }
.pa-p.c { text-align: center; }
.pa-p.sm { font-size: 13px; margin-top: 10px; }
.pa-levbig { text-align: center; font-size: 44px; font-weight: 600; margin: 10px 0 18px; }
.pa-levmarks { display: flex; justify-content: space-between; gap: 4px; margin: 10px 0 18px; }
.pa-levmarks button { flex: 1; height: 30px; border-radius: 999px; font-size: 13px; color: var(--pa-muted); background: var(--pa-card-2); }
.pa-levmarks button.on { background: rgba(var(--pa-accent-rgb), .16); color: var(--pa-accent); }
.pa-slider { position: relative; height: 28px; margin: 0 4px; }
.pa-slider .track { position: absolute; left: 0; right: 0; top: 12px; height: 5px; border-radius: 3px; background: #333338; }
.pa-slider .fill { position: absolute; left: 0; top: 12px; height: 5px; border-radius: 3px; background: var(--pa-accent); }
.pa-slider .mk { position: absolute; top: 12px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: #55555c; }
.pa-slider .mk.on { background: rgba(4,18,12,.55); }
.pa-slider .knob { position: absolute; top: 4px; width: 21px; height: 21px; margin-left: -10.5px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 4px rgba(var(--pa-accent-rgb), .9), 0 2px 8px rgba(0,0,0,.4); pointer-events: none; }
.pa-slider input { position: absolute; inset: 0; width: 100%; opacity: 0; margin: 0; cursor: pointer; }
.pa-slider.off { opacity: .4; }
.pa-slider.off input { cursor: not-allowed; }
.pa-radio { flex: none; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #4a4a50; }
.pa-radio.on { border: 6px solid var(--pa-accent); }
.pa-field { display: flex; flex-direction: column; gap: 6px; padding: 14px 18px; border-radius: 20px; background: var(--pa-card-2); margin-bottom: 12px; border: 1.5px solid transparent; text-align: left; width: 100%; }
.pa-field.focus, .pa-field:focus-within { border-color: rgba(var(--pa-accent-rgb), .45); }
.pa-field .lbl { font-size: 14px; color: var(--pa-muted); }
.pa-field .lbl.big { font-size: 16px; color: var(--pa-text); }
.pa-field.toggle { flex-direction: row; align-items: center; justify-content: space-between; }
.pa-field.toggle .v { display: inline-flex; align-items: center; gap: 6px; color: var(--pa-soft); }
.pa-field .in { display: flex; align-items: center; gap: 4px; font-size: 18px; }
.pa-field input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 18px; font-variant-numeric: tabular-nums; }
.pa-field input::placeholder { color: var(--pa-faint); }
.pa-field .clr { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: #3a3a3f; flex: none; }
.pa-field .hint { font-size: 13px; color: var(--pa-muted); }
.pa-alert { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px 4px 2px; }
.pa-alert .ic { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-neg); color: #fff; margin-bottom: 8px; }
.pa-alert b { font-size: 20px; font-weight: 600; }
.pa-alert > span:not(.ic) { color: var(--pa-muted); font-size: 16px; margin-bottom: 10px; }
.pa-prose { color: var(--pa-soft); font-size: 15px; line-height: 1.55; }
.pa-prose p { margin: 0 0 12px; }
.pa-prose b { color: var(--pa-text); }
.pa-prose a { color: var(--pa-accent); }

.pa-banner { position: absolute; z-index: 70; top: 10px; left: 50%; transform: translateX(-50%); width: min(420px, calc(100% - 24px)); display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 24px; background: #232326; box-shadow: 0 16px 40px rgba(0,0,0,.55); animation: pa-drop .25s cubic-bezier(.2,.8,.2,1); }
@keyframes pa-drop { from { transform: translate(-50%, -16px); opacity: 0; } }
.pa-banner .ic { flex: none; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; }
.pa-banner.ok .ic { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-banner.err .ic { background: #ff7a45; color: #fff; }
.pa-banner.progress .ic { color: var(--pa-accent); }
.pa-banner .tx { flex: 1; display: flex; flex-direction: column; gap: 2px; font-size: 15px; line-height: 1.35; min-width: 0; }
.pa-banner .tx b { font-weight: 500; }
.pa-banner .tx span { color: var(--pa-soft); }
.pa-banner .ok { align-self: flex-start; margin-top: 8px; color: var(--pa-accent); font-weight: 600; padding: 2px 0; }
.pa-banner .x { color: var(--pa-muted); padding: 2px; }
.pa-spin { display: inline-block; border-radius: 50%; border: 2px solid rgba(255,255,255,.18); border-top-color: currentColor; animation: pa-rot .8s linear infinite; vertical-align: -3px; }
@keyframes pa-rot { to { transform: rotate(360deg); } }

.pa-month { font-size: 20px; font-weight: 600; margin: 10px 0 6px; }
.pa-act { display: flex; align-items: center; gap: 12px; padding: 12px 0; }
.pa-act .glyph { width: 38px; height: 38px; flex: none; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); color: var(--pa-soft); }
.pa-act .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-act .l b { font-weight: 500; font-size: 16px; }
.pa-act .s { font-size: 14px; color: var(--pa-muted); }
.pa-act .r { font-size: 16px; font-weight: 500; }
.pa-nothing { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 34% 0 0; color: var(--pa-muted); font-size: 16px; }
.pa-nothing .ic { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); }

.pa-dots { flex: 1; display: flex; justify-content: center; gap: 5px; }
.pa-dots span { width: 6px; height: 6px; border-radius: 3px; background: #3a3a3f; transition: width .2s; }
.pa-dots span.on { width: 20px; background: var(--pa-accent); }
.pa-ob { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; padding: 0 20px 20px; gap: 0; }
.pa-ob .sp { flex: 1; min-height: 16px; }
.pa-ob h1 { font-size: 34px; line-height: 1.12; letter-spacing: -0.025em; font-weight: 700; margin: 8px 0 10px; }
.pa-ob h1.c, .pa-ob .c { text-align: center; }
.pa-ob .lede { color: var(--pa-muted); font-size: 16px; line-height: 1.45; margin: 0 0 18px; }
.pa-ob .pt { display: flex; gap: 14px; align-items: flex-start; margin: 6px 0 12px; }
.pa-ob .pt svg { flex: none; color: var(--pa-text); margin-top: 2px; }
.pa-ob .pt b { display: block; font-size: 17px; font-weight: 600; }
.pa-ob .pt span span { color: var(--pa-muted); font-size: 15px; }
.pa-ob .pa-btn.big { margin-top: 10px; flex: none; }
.pa-ob-art { width: 100%; max-height: 220px; margin: 6px 0 10px; }
.pa-ob-facts { display: grid; gap: 10px; margin-top: 10px; }
.pa-ob-facts div { background: var(--pa-card); border-radius: 18px; padding: 14px 16px; display: flex; flex-direction: column; gap: 2px; }
.pa-ob-facts b { font-size: 17px; }
.pa-ob-facts span { color: var(--pa-muted); font-size: 14.5px; }
.pa-risks { display: grid; gap: 10px; margin: 6px 0 12px; }
.pa-risk { display: flex; gap: 14px; align-items: flex-start; padding: 16px; border-radius: 20px; background: var(--pa-card); text-align: left; border: 1.5px solid transparent; }
.pa-risk.on { border-color: rgba(var(--pa-accent-rgb), .55); }
.pa-risk > svg { flex: none; margin-top: 2px; }
.pa-risk .l { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.pa-risk .l b { font-size: 17px; font-weight: 600; }
.pa-risk .l span { color: var(--pa-muted); font-size: 14.5px; line-height: 1.4; }
.pa-risk .l .lev { color: var(--pa-accent); font-size: 13px; font-weight: 600; }
.pa-risk .pa-radio { margin-top: 18px; }

.pa .overlay { z-index: 60; background: rgba(0,0,0,.6); backdrop-filter: none; display: flex; align-items: flex-end; justify-content: center; }
.pa .sheet { width: 100%; max-width: 520px; max-height: 92%; background: var(--pa-sheet); border: 0; border-radius: 32px 32px 0 0; padding: 22px 20px 24px; gap: 14px; font: 400 14px/1.45 var(--pa-font); color: var(--pa-text); }
.pa .sheet h3 { font-size: 20px; font-weight: 600; }
.pa .sheet h3 .x { width: 36px; height: 36px; border-radius: 50%; background: var(--pa-card-2); display: grid; place-items: center; font-size: 20px; color: var(--pa-text); padding: 0; }
.pa .sheet p { font-size: 14px; color: var(--pa-muted); }
.pa .sheet .cta { min-height: 52px; border-radius: 999px; font-size: 16px; background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa .sheet .cta.ghost { background: var(--pa-card-2); color: var(--pa-text); border: 0; }
.pa .sheet .wallet { padding: 14px 16px; border-radius: 18px; background: var(--pa-card-2); font-size: 16px; }
.pa .sheet .wallet img { width: 30px; height: 30px; border-radius: 8px; }
.pa .sheet .note, .pa .sheet .warn { border-radius: 16px; padding: 12px 14px; font-size: 13.5px; }
.pa .sheet .note { background: var(--pa-card-2); }
.pa .sheet .field { height: 54px; border-radius: 16px; background: var(--pa-card-2); }
.pa .sheet .field input { font-family: var(--pa-font); font-size: 18px; }
.pa .sheet .kv { font-size: 14px; }
.pa .sheet .details { background: var(--pa-card-2); border-radius: 16px; padding: 12px 14px; gap: 8px; }
.pa .sheet .consent { border-radius: 12px; background: #111; }
.pa .sheet .step .s { width: 22px; height: 22px; }

.pa.desk { --pa-bg: #121214; font-size: 13px; }
.pd { flex: 1; min-height: 0; display: grid; gap: 8px; padding: 8px; grid-template-columns: minmax(0, 1fr) 330px; grid-template-rows: auto minmax(0, 1fr) minmax(190px, 30%) auto; grid-template-areas: "head right" "chart right" "bottom right" "foot foot"; }
.pd.with-book { grid-template-columns: minmax(0, 1fr) 290px 330px; grid-template-areas: "head book right" "chart book right" "bottom bottom right" "foot foot foot"; }
.pd.with-list.with-book { grid-template-columns: 300px minmax(0, 1fr) 290px 330px; grid-template-areas: "list head book right" "list chart book right" "list bottom bottom right" "foot foot foot foot"; }
.pd-panel { background: rgba(255,255,255,.045); border-radius: 10px; min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
.pd-list { grid-area: list; }
.pd-head { grid-area: head; flex-direction: row; align-items: center; gap: 18px; padding: 10px 16px; position: relative; overflow: visible; z-index: 6; min-height: 64px; }
.pd-stats { flex: 1; min-width: 0; display: flex; gap: 26px; overflow-x: auto; scrollbar-width: none; mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent); padding-right: 24px; }
.pd-stats::-webkit-scrollbar { display: none; }
.pd-sym { flex: none; }
.pd-chart { grid-area: chart; position: relative; }
.pd-book { grid-area: book; }
.pd-right { grid-area: right; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.pd-bottom { grid-area: bottom; }
.pd-foot { grid-area: foot; display: flex; align-items: center; gap: 14px; padding: 2px 6px 0; font-size: 12.5px; color: var(--pa-muted); }
.pd-foot .sp { flex: 1; }
.pd-foot .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--pa-accent); }
.pd-foot .dot.test { background: var(--pa-gold); }
.pd-link { color: var(--pa-muted); text-decoration: none; padding: 0; font-size: 12.5px; }
.pd-link:hover { color: var(--pa-text); }
.pd-sym { display: flex; align-items: center; gap: 10px; text-align: left; padding: 0; }
.pd-sym span { display: flex; flex-direction: column; line-height: 1.2; }
.pd-sym b { font-size: 20px; font-weight: 600; }
.pd-sym .muted { font-size: 12px; }
.pd-stat { flex: none; display: flex; flex-direction: column; gap: 2px; }
.pd-stat .k { font-size: 12px; color: var(--pa-muted); white-space: nowrap; }
.pd-stat .v { font-size: 13px; white-space: nowrap; }
.pd-pop { position: absolute; left: 8px; top: calc(100% + 6px); width: 340px; height: min(560px, 70vh); z-index: 30; box-shadow: 0 20px 50px rgba(0,0,0,.6); border-radius: 12px; background: #1a1a1d; display: flex; }
.pd-pop .pd-list { flex: 1; background: none; }
.pd-tabs { flex: none; display: flex; border-bottom: 1px solid var(--pa-line); }
.pd-tabs button { flex: 1; height: 44px; font-size: 14.5px; font-weight: 600; color: var(--pa-muted); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.pd-tabs button.on { color: var(--pa-text); border-bottom-color: var(--pa-text); }
.pd-tabs.ls button.on.long { color: var(--pa-accent); border-bottom-color: var(--pa-accent); }
.pd-tabs.ls button.on.short { color: var(--pa-neg); border-bottom-color: var(--pa-neg); }
.pd-tabs.left { justify-content: flex-start; }
.pd-tabs.left button { flex: none; padding: 0 18px; }
.pd-search { display: flex; align-items: center; gap: 8px; height: 36px; margin: 10px 10px 4px; padding: 0 12px; border-radius: 10px; background: rgba(255,255,255,.06); color: var(--pa-muted); }
.pd-search input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; }
.pd-list-h { display: flex; justify-content: space-between; padding: 8px 14px 4px; font-size: 12px; color: var(--pa-muted); }
.pd-list-b { flex: 1; min-height: 0; overflow-y: auto; padding: 0 6px 6px; scrollbar-width: thin; }
.pd-mrow { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px; border-radius: 8px; text-align: left; }
.pd-mrow:hover { background: rgba(255,255,255,.05); }
.pd-mrow.on { background: rgba(var(--pa-accent-rgb), .08); }
.pd-mrow .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.pd-mrow .l b { font-size: 14px; font-weight: 600; white-space: nowrap; }
.pd-mrow .l .muted { font-size: 12px; }
.pd-mrow .r { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; font-size: 12px; }
.pd-mrow .r b { font-size: 13.5px; font-weight: 500; }
.pd-mrow .pa-lev { font-size: 11px; padding: 0 5px; }
.pd-ivs { flex: none; display: flex; gap: 2px; padding: 8px 10px; border-bottom: 1px solid var(--pa-line); }
.pd-ivs button { height: 26px; padding: 0 9px; border-radius: 6px; font-size: 12.5px; font-weight: 600; color: var(--pa-muted); }
.pd-ivs button.on { background: rgba(255,255,255,.1); color: var(--pa-text); }
.pd-chart-box { flex: 1; min-height: 0; }
.pd-chart-box .chart { border: 0; }
.pd-center { flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center; padding: 20px; text-align: center; min-height: 100px; }
.pd-ob { flex: 1; min-height: 0; display: flex; flex-direction: column; font-size: 12.5px; }
.pd-ob-h { flex: none; display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px 4px; color: var(--pa-muted); font-size: 12px; }
.pd-ob-h span:not(:first-child), .pd-ob .lv span:not(:first-child):not(.bar) { text-align: right; }
.pd-ob-side { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.pd-ob-side.asks { justify-content: flex-end; }
.pd-ob .lv { position: relative; display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 2.5px 12px; width: 100%; text-align: left; font-variant-numeric: tabular-nums; }
.pd-ob button.lv:hover { background: rgba(255,255,255,.05); }
.pd-ob .lv .bar { position: absolute; right: 0; top: 1px; bottom: 1px; opacity: .14; pointer-events: none; }
.pd-ob .asks .bar { background: var(--pa-neg); }
.pd-ob .bids .bar { background: var(--pa-accent); }
.pd-spread { flex: none; display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 6px 12px; margin: 3px 0; background: rgba(255,255,255,.04); color: var(--pa-muted); font-size: 12px; }
.pd-spread span:not(:first-child) { text-align: right; }
.pd-ob-empty { padding: 12px; color: var(--pa-muted); text-align: center; font-size: 12px; }
.pd-trades { flex: 1; min-height: 0; overflow-y: auto; }
.pd-order { flex: 1; }
.pd-form { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 11px; padding: 14px 14px 14px; scrollbar-width: thin; }
.pd-order-foot { flex: none; display: flex; flex-direction: column; gap: 8px; padding: 10px 14px 14px; border-top: 1px solid var(--pa-line); }
.pd-kv { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 13px; }
.pd-kv.muted { color: var(--pa-muted); }
.pd-kv.muted .num { color: var(--pa-soft); }
.pd-lbl { font-size: 13px; margin-bottom: -4px; }
.pd-dd { position: relative; }
.pd-dd > button { display: inline-flex; align-items: center; gap: 4px; font-weight: 600; padding: 0; }
.pd-menu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 10; width: 220px; display: flex; flex-direction: column; padding: 6px; border-radius: 12px; background: #232326; box-shadow: 0 16px 40px rgba(0,0,0,.5); }
.pd-menu button { display: flex; flex-direction: column; align-items: flex-start; gap: 1px; padding: 8px 10px; border-radius: 8px; text-align: left; }
.pd-menu button:hover, .pd-menu button.on { background: rgba(255,255,255,.06); }
.pd-menu span { color: var(--pa-muted); font-size: 12px; }
.pd-input { display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 12px; border-radius: 12px; background: rgba(255,255,255,.06); border: 1px solid transparent; }
.pd-input:focus-within { border-color: rgba(var(--pa-accent-rgb), .45); }
.pd-input.big { height: 48px; border-radius: 16px; }
.pd-input .pre { color: var(--pa-muted); font-weight: 500; }
.pd-input input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 15px; font-variant-numeric: tabular-nums; }
.pd-input.big input { font-size: 17px; }
.pd-input .suf { color: var(--pa-soft); font-size: 12.5px; padding: 0; white-space: nowrap; }
.pd-input .suf.unit { display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 10px; border-radius: 999px; background: rgba(255,255,255,.08); font-weight: 600; color: var(--pa-text); }
.pd-sl { display: flex; align-items: center; gap: 10px; }
.pd-sl .pa-slider { flex: 1; }
.pd-box { display: flex; align-items: center; width: 64px; height: 36px; padding: 0 10px; border-radius: 12px; background: rgba(255,255,255,.06); }
.pd-box input { width: 100%; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); text-align: right; font: inherit; font-size: 13.5px; }
.pd-box span { color: var(--pa-muted); margin-left: 3px; font-size: 12px; }
.pd-hint { font-size: 12px; color: var(--pa-muted); margin-top: -6px; }
.pd-box input:disabled { cursor: not-allowed; opacity: .5; }
.pd-switch { width: 42px; height: 24px; border-radius: 12px; background: #3a3a3f; position: relative; transition: background .15s; }
.pd-switch span { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .15s; }
.pd-switch.on { background: var(--pa-accent); }
.pd-switch.on span { transform: translateX(18px); }
.pd-auto { display: flex; flex-direction: column; gap: 8px; }
.pd-auto-h { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; color: var(--pa-muted); }
.pd-chipbtn { display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 0 9px; border-radius: 999px; background: rgba(255,255,255,.08); font-size: 12px; font-weight: 600; color: var(--pa-text); }
.pd-warn { padding: 9px 11px; border-radius: 10px; background: rgba(var(--pa-neg-rgb), .1); color: #ffb3bf; font-size: 12.5px; line-height: 1.4; }
.pd-cta { width: 100%; height: 46px; border-radius: 12px; font-size: 15px; font-weight: 600; background: var(--pa-accent); color: var(--pa-accent-ink); flex: none; display: inline-flex; align-items: center; justify-content: center; }
.pd-cta.short { background: var(--pa-neg); color: #fff; }
.pd-cta.caution { background: var(--pa-gold); color: #1b1200; }
.pd-cta:disabled { opacity: .45; }
.pd-acct { flex: none; padding: 14px; gap: 9px; }
.pd-acct .pd-kv b { font-weight: 600; }
.pd-btn { height: 36px; padding: 0 14px; border-radius: 10px; background: rgba(255,255,255,.08); color: var(--pa-text); font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; }
.pd-btn:hover:not(:disabled) { background: rgba(255,255,255,.12); }
.pd-btn:disabled { opacity: .45; }
.pd-btn.primary { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pd-btn.sm { height: 28px; padding: 0 10px; font-size: 12px; border-radius: 8px; }
.pd-acct .pd-btn { width: 100%; }
.pd-addr { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--pa-muted); }
.pd-table-wrap { flex: 1; min-height: 0; overflow: auto; display: flex; flex-direction: column; }
.pd-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.pd-table th { position: sticky; top: 0; background: #19191b; text-align: left; font-weight: 500; color: var(--pa-muted); padding: 8px 12px; white-space: nowrap; }
.pd-table td { padding: 8px 12px; border-top: 1px solid var(--pa-line); white-space: nowrap; }
.pd-table td.act { text-align: right; display: flex; gap: 6px; justify-content: flex-end; }
.pd-mk { display: inline-flex; align-items: center; gap: 7px; padding: 0; }
.pd-badge { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 5px; }
.pd-badge.long { background: rgba(var(--pa-accent-rgb), .14); color: var(--pa-accent); }
.pd-badge.short { background: rgba(var(--pa-neg-rgb), .14); color: var(--pa-neg); }
.pa.desk .pa-sheet { border-radius: 24px; margin-bottom: auto; margin-top: auto; max-width: 480px; }
.pa.desk .pa-scrim { align-items: center; }
.pa.desk .overlay { align-items: center; }
.pa.desk .sheet { border-radius: 20px; max-width: 460px; }
.pa.desk .pa-banner { top: 14px; }
`;
