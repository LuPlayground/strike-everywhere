"""End-to-end: Builder Connect through the real widget on Strike TESTNET with a mock CIP-30 wallet.

usage: python -I tests/e2e/connect_flow.py https://strike-everywhere.pages.dev/developers/ <out_dir>
(The demos use variant="app", whose connect button this script does not drive; the developers preview
uses the compact widget and never sends attribution.)
Steps: open page -> Connect Wallet -> pick Mock Wallet -> accept terms -> Sign & connect -> verify connected state.
"""
import pathlib
import sys
from playwright.sync_api import sync_playwright

url, out = sys.argv[1], pathlib.Path(sys.argv[2])
if "api=" not in url:
    url += ("&" if "?" in url else "?") + "api=http://127.0.0.1:9"
out.mkdir(parents=True, exist_ok=True)
mock = (pathlib.Path(__file__).parent / "mock-wallet.js").read_text(encoding="utf-8")

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1360, "height": 1000}, device_scale_factor=2)
    logs = []
    pg.on("console", lambda m: logs.append(f"[{m.type}] {m.text}"))
    pg.on("pageerror", lambda e: logs.append(f"[pageerror] {e}"))
    pg.on("response", lambda r: logs.append(f"[http {r.status}] {r.request.method} {r.url}") if "strikefinance" in r.url and ("/auth/" in r.url or "/v2/account" in r.url or r.status >= 400) else None)
    ws_frames = []

    def on_ws(ws):
        if "user-api" in ws.url:
            ws.on("framereceived", lambda f: ws_frames.append(("in", str(f)[:300])))
            ws.on("framesent", lambda f: ws_frames.append(("out", str(f)[:160])))

    pg.on("websocket", on_ws)
    pg.add_init_script(mock)
    pg.goto(url, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(5000)
    w = pg.locator("strike-trade[network=testnet]").first
    w.locator("button.cta").first.click()
    pg.wait_for_timeout(1500)
    pg.screenshot(path=str(out / "e2e-1-wallets.png"))
    w.locator("button.wallet", has_text="Mock Wallet").click()
    pg.wait_for_timeout(4000)
    pg.screenshot(path=str(out / "e2e-2-review.png"))
    w.locator(".sheet input[type=checkbox]").check()
    w.locator(".sheet button.cta").click()
    pg.wait_for_timeout(7000)
    pg.screenshot(path=str(out / "e2e-3-connected.png"))
    footer = w.locator(".foot").inner_text()
    connected = "Disconnect" in footer
    if connected:
        w.locator("button.tab", has_text="Account").click()
        pg.wait_for_timeout(2500)
        pg.screenshot(path=str(out / "e2e-4-account.png"))
    sheet_err = w.locator(".sheet .warn").all_inner_texts() if w.locator(".sheet").count() else []
    b.close()

print("CONNECTED" if connected else "NOT CONNECTED")
print("footer:", footer.replace("\n", " "))
if sheet_err:
    print("sheet errors:", sheet_err)
for line in logs[-25:]:
    print(line)
print("user websocket frames:")
for d, f in ws_frames[:8]:
    print(" ", d, f)
ws_ok = any('"authenticated":true' in f.replace(" ", "") for d, f in ws_frames if d == "in")
print("USER WS AUTHENTICATED" if ws_ok else "USER WS NOT AUTHENTICATED")
sys.exit(0 if connected and ws_ok else 1)
