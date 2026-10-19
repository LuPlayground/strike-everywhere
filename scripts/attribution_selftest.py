"""Anti-spoofing test for attribution, against REAL Strike mainnet data, under a throwaway builder label.

Tries the attack the audit found: take a real trader's fill from Strike's public history and claim its
client_order_id for our builder after the fact. The partner API must NOT credit it, because the id was
registered after Strike created the order.

The positive path (register, then place, then credited) needs a real mainnet order and is covered by the
mainnet test run in docs/DEMO_SCRIPT.md.

usage: python -I scripts/attribution_selftest.py https://strike-everywhere-api.strike-everywhere.workers.dev
Clean up afterwards (removes only the throwaway label's rows):
  npx wrangler d1 execute strike-everywhere --remote --command "DELETE FROM events WHERE builder_code='e2e-spooftest'; DELETE FROM orders WHERE builder_code='e2e-spooftest'; DELETE FROM fills WHERE builder_code='e2e-spooftest'; DELETE FROM accounts WHERE builder_code='e2e-spooftest';"
"""
import json
import sys
import time
import urllib.request

API = sys.argv[1].rstrip("/")
STRIKE = "https://api.strikefinance.org"
UA = {"User-Agent": "strike-everywhere-selftest/0.2"}
BUILDER = "e2e-spooftest"


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.loads(r.read())


def post(url, body):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST", headers={**UA, "Content-Type": "text/plain"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status


lb = get(f"{STRIKE}/stat/v1/stats/leaderboard?time_range=24h")["entries"]
candidates = [e["account_id"] for e in lb if len(e["account_id"]) == 36 and float(e.get("volume") or 0) > 0]
fill = acct = None
for a in candidates[:15]:
    fills = [f for f in get(f"{STRIKE}/v2/history/fill?account_id={a}&limit=20").get("fills", []) if f.get("client_order_id")]
    if fills:
        fill, acct = fills[0], a
        break
if not fill:
    sys.exit("no account with client_order_id fills found")

common = {"network": "mainnet", "builderCode": BUILDER, "partnerId": "spooftest", "hostOrigin": "https://spoof.local", "accountId": acct, "feeBps": 100}
print("claiming fill", fill["id"], fill["symbol"], "coid", fill["client_order_id"], "of account", acct[:8] + "...")
print("post intent", post(f"{API}/v1/events", {**common, "type": "order", "status": "intent", "clientOrderId": fill["client_order_id"]}))
print("post order", post(f"{API}/v1/events", {**common, "type": "order", "status": "filled", "clientOrderId": fill["client_order_id"], "symbol": fill["symbol"], "side": fill["side"]}))
time.sleep(6)
t = get(f"{API}/v1/stats?builder={BUILDER}&network=mainnet&days=30&refresh=1")["totals"]
print("totals", json.dumps(t))
ok = t["fills"] == 0 and t["volumeUsd"] == 0 and t["builderFeesUsd"] == 0
print("PASS: after-the-fact claim was not credited" if ok else "FAIL: spoofed fill was credited")
sys.exit(0 if ok else 1)
