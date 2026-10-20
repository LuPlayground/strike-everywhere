"""Capture demo preview images for the landing page.
usage: python -I scripts/make_previews.py <base_url> <out_dir>
Writes dex.jpg, portfolio.jpg, wallet.jpg, dashboard.jpg (1600x940, JPEG q84)."""
import pathlib
import sys
from playwright.sync_api import sync_playwright
from PIL import Image

base, out = sys.argv[1].rstrip("/"), pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
pages = {
    "wallet": "/demo/wallet/",
    "portfolio": "/demo/portfolio/?network=mainnet",
    "dex": "/demo/dex/",
    "dashboard": "/dashboard/?builder=Playground101&network=testnet",
}
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    for name, path in pages.items():
        pg = b.new_page(viewport={"width": 1440, "height": 846}, device_scale_factor=1.25)
        pg.goto(base + path, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(7000)
        png = out / f"{name}.png"
        pg.screenshot(path=str(png))
        im = Image.open(png).convert("RGB").resize((1600, 940), Image.LANCZOS)
        im.save(out / f"{name}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
        png.unlink()
        pg.close()
        print("saved", name)
    b.close()
