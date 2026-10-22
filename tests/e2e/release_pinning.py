"""Checks the published widget release from another site's point of view (needs Playwright + Microsoft Edge).

  python tests/e2e/release_pinning.py [https://strike-everywhere.pages.dev]

1. The pinned snippet (version + SRI from /widget/release.json) loads and renders on a third-party origin.
2. The same snippet with a tampered hash is refused by the browser.
3. Our pages refuse to be framed (frame-ancestors 'none').
"""
import functools, http.server, json, os, sys, tempfile, threading, urllib.request
from playwright.sync_api import sync_playwright

SITE = (sys.argv[1] if len(sys.argv) > 1 else "https://strike-everywhere.pages.dev").rstrip("/")
rel = json.load(urllib.request.urlopen(urllib.request.Request(SITE + "/widget/release.json", headers={"User-Agent": "strike-everywhere-e2e"})))
src, sri = SITE + rel["iife"]["path"], rel["iife"]["integrity"]
bad = sri[:7] + ("A" if sri[7] != "A" else "B") + sri[8:]

tag = '<strike-trade builder-code="Playground101" fee-bps="5" market="ETH-USD" network="testnet"></strike-trade>'
pages = {
    "good.html": f'<!doctype html><meta charset="utf-8"><script src="{src}" integrity="{sri}" crossorigin="anonymous" defer></script>{tag}',
    "bad.html": f'<!doctype html><meta charset="utf-8"><script src="{src}" integrity="{bad}" crossorigin="anonymous" defer></script>{tag}',
    "frame.html": f'<!doctype html><meta charset="utf-8"><iframe src="{SITE}/demo/wallet/" width="800" height="600"></iframe>',
}
root = tempfile.mkdtemp()
for name, html in pages.items():
    open(os.path.join(root, name), "w", encoding="utf-8").write(html)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=root))
threading.Thread(target=srv.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{srv.server_address[1]}"
results = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

    page.goto(base + "/good.html")
    page.wait_for_timeout(6000)
    rendered = page.evaluate("() => !!customElements.get('strike-trade') && !!document.querySelector('strike-trade').shadowRoot?.textContent.trim()")
    results.append((f"pinned v{rel['version']} loads and renders", rendered))

    errors.clear()
    page.goto(base + "/bad.html")
    page.wait_for_timeout(4000)
    defined = page.evaluate("() => !!customElements.get('strike-trade')")
    results.append(("tampered hash is refused", not defined and any("integrity" in e for e in errors)))

    errors.clear()
    page.goto(base + "/frame.html")
    page.wait_for_timeout(5000)
    results.append(("demo refuses to be framed", any("frame-ancestors" in e or "X-Frame-Options" in e for e in errors)))
    browser.close()

srv.shutdown()
for name, passed in results:
    print(("PASS " if passed else "FAIL ") + name)
sys.exit(0 if all(p for _, p in results) else 1)
