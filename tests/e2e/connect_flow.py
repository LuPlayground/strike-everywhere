"""End-to-end: Builder Connect through the real widget on Strike TESTNET with a mock CIP-30 wallet.

usage: python -I tests/e2e/connect_flow.py <page_url> <out_dir>
Steps: open page -> Connect Wallet -> pick Mock Wallet -> accept terms -> Sign & connect -> verify connected state.
"""
import pathlib
import sys
from playwright.sync_api import sync_playwright

url, out = sys.argv[1], pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
mock = (pathlib.Path(__file__).parent / "mock-wallet.js").read_text(encoding="utf-8")

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1360, "height": 1000}, device_scale_factor=2)
    logs = []
    pg.on("console", lambda m: logs.append(f"[{m.type}] {m.text}"))
    pg.on("pageerror", lambda e: logs.append(f"[pageerror] {e}"))
    pg.on("response", lambda r: logs.append(f"[http {r.status}] {r.request.method} {r.url}") if "strikefinance" in r.url and ("/auth/" in r.url or "/v2/account" in r.url or r.status >= 400) else None)
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
