"""Screenshot a page (served over HTTP) with headless Edge for visual checks.

usage: python -I scripts/shoot.py <url> <out.png> [width] [height] [actions]
actions: comma-separated steps run in order: click:<css>  |  shadowclick:<host-css>::<inner-css>  |  wait:<ms>
"""
import sys
from playwright.sync_api import sync_playwright

url, out = sys.argv[1], sys.argv[2]
w = int(sys.argv[3]) if len(sys.argv) > 3 else 1280
h = int(sys.argv[4]) if len(sys.argv) > 4 else 1000
actions = sys.argv[5].split(",") if len(sys.argv) > 5 and sys.argv[5] else []

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
    logs = []
    pg.on("console", lambda m: logs.append(f"[{m.type}] {m.text}"))
    pg.on("pageerror", lambda e: logs.append(f"[pageerror] {e}"))
    pg.goto(url, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(6000)
    for a in actions:
        kind, _, arg = a.partition(":")
        if kind == "wait":
            pg.wait_for_timeout(int(arg))
        elif kind == "click":
            pg.locator(arg).first.click()
        elif kind == "shadowclick":
            host, inner = arg.split("::")
            pg.locator(host).first.locator(inner).first.click()
        pg.wait_for_timeout(700)
    pg.screenshot(path=out, full_page=True)
    b.close()
for l in logs[-30:]:
    print(l)
print("saved", out)
