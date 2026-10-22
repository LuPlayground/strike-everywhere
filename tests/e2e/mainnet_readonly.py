"""Read-only mainnet check of the live site (Playwright + Microsoft Edge). No wallet, no orders.

  python tests/e2e/mainnet_readonly.py [https://strike-everywhere.pages.dev]

Loads every demo with ?network=mainnet and checks that the widget reaches Strike mainnet (markets, prices,
order book), that nothing errors, and that the demos ignore builder codes outside the allow-list.
"""
import re, sys
from playwright.sync_api import sync_playwright

SITE = (sys.argv[1] if len(sys.argv) > 1 else "https://strike-everywhere.pages.dev").rstrip("/")
NOISE = re.compile(r"favicon|ERR_BLOCKED_BY_CLIENT|Failed to load resource.*(webp|svg|png)", re.I)
PAGES = [
    ("Halo desktop", "/demo/wallet/?network=mainnet&market=ETH-USD", True),
    ("Halo mobile", "/demo/wallet/?network=mainnet&view=mobile&m=perps", True),
    ("Kairo perps", "/demo/dex/?network=mainnet&pair=ETH&tab=perps", True),
    ("Tessera", "/demo/portfolio/?network=mainnet", True),
    ("Landing", "/?network=mainnet", False),
    ("Developers", "/developers/", False),
    ("Dashboard", "/dashboard/?network=mainnet&builder=Playground101", False),
]
results = []

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    for name, path, widget in PAGES:
        pg = b.new_page(viewport={"width": 1440, "height": 900})
        errs, mainnet_calls = [], set()
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" and not NOISE.search(m.text) else None)
        pg.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
        pg.on("request", lambda r: mainnet_calls.add(re.sub(r"\?.*", "", r.url)) if "api.strikefinance.org" in r.url else None)
        pg.goto(SITE + path, wait_until="domcontentloaded")
        pg.wait_for_timeout(9000)
        info = ""
        ok = not errs
        if widget:
            st = pg.evaluate("""() => { const el = document.querySelector('strike-trade'); const r = el && el.shadowRoot; const t = r ? r.textContent : '';
                return { net: el && el.getAttribute('network'), code: el && el.getAttribute('builder-code'), unreachable: /Can't reach Strike|unreachable/.test(t),
                         loading: /Loading markets/.test(t), price: /\\$?\\d{1,3}(,\\d{3})+(\\.\\d+)?/.test(t), testnetTag: /Strike testnet/.test(t) }; }""")
            ok = ok and st["net"] == "mainnet" and not st["unreachable"] and not st["loading"] and st["price"] and not st["testnetTag"]
            info = f"network={st['net']} code={st['code']} prices={'yes' if st['price'] else 'NO'}" + (" UNREACHABLE" if st["unreachable"] else "") + (" still loading" if st["loading"] else "")
        hosts = sorted({re.sub(r"https://api\.strikefinance\.org", "", u) for u in mainnet_calls})[:6]
        if widget and not mainnet_calls:
            ok = False
        results.append((name, ok))
        print(("PASS " if ok else "FAIL ") + f"{name:14} {info} | mainnet API calls: {len(mainnet_calls)} {hosts}")
        for e in errs[:3]:
            print("      error:", e[:160])
        pg.close()

    pg = b.new_page()
    pg.goto(SITE + "/demo/wallet/?network=testnet&builder=SomeoneElse", wait_until="domcontentloaded")
    pg.wait_for_timeout(3000)
    code = pg.evaluate("() => document.querySelector('strike-trade')?.getAttribute('builder-code')")
    results.append(("allow-list", code == "Playground101"))
    print(("PASS " if code == "Playground101" else "FAIL ") + f"allow-list     ?builder=SomeoneElse -> builder-code={code}")
    b.close()

sys.exit(0 if all(ok for _, ok in results) else 1)
