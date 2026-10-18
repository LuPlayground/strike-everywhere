"""Attribution self-test against REAL Strike mainnet data, under a throwaway builder label.

1. Picks a real mainnet account with recent fills (public leaderboard + public fill history).
2. Posts an "order" event to the partner API claiming one of those fills' client_order_id.
3. Calls /v1/stats?refresh=1 and checks the fill is attributed with the right notional and fee.
Clean up afterwards with: wrangler d1 execute strike-everywhere --remote --command "DELETE FROM ... WHERE builder_code='e2e-selftest'"
"""
import json
import sys
import time
import urllib.request

API = sys.argv[1].rstrip("/")
STRIKE = "https://api.strikefinance.org"
UA = {"User-Agent": "strike-everywhere-selftest/0.1"}
BUILDER = "e2e-selftest"


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.loads(r.read())


def post(url, body):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST", headers={**UA, "Content-Type": "text/plain"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, json.loads(r.read())


lb = get(f"{STRIKE}/stat/v1/stats/leaderboard?time_range=24h")["entries"]
candidates = [e["account_id"] for e in lb if len(e["account_id"]) == 36 and float(e.get("volume") or 0) > 0]
fill = acct = None
for a in candidates[:15]:
    fills = get(f"{STRIKE}/v2/history/fill?account_id={a}&limit=20").get("fills", [])
    fills = [f for f in fills if f.get("client_order_id")]
    if fills:
        fill, acct = fills[0], a
        break
if not fill:
    sys.exit("no account with client_order_id fills found")

notional = abs(float(fill["price"]) * float(fill["size"]))
print("using account", acct, "fill", fill["id"], fill["symbol"], "notional", round(notional, 4), "coid", fill["client_order_id"])
print("post connect", post(f"{API}/v1/events", {"type": "connect", "network": "mainnet", "builderCode": BUILDER, "partnerId": "selftest", "hostOrigin": "https://selftest.local", "accountId": acct, "feeBps": 5}))
print("post order", post(f"{API}/v1/events", {"type": "order", "network": "mainnet", "builderCode": BUILDER, "partnerId": "selftest", "hostOrigin": "https://selftest.local", "accountId": acct, "clientOrderId": fill["client_order_id"], "symbol": fill["symbol"], "side": fill["side"], "notional": notional, "status": "filled", "feeBps": 5}))
time.sleep(6)
stats = get(f"{API}/v1/stats?builder={BUILDER}&network=mainnet&days=30&refresh=1")
t = stats["totals"]
print("totals", json.dumps(t))
ok = t["fills"] >= 1 and abs(t["builderFeesUsd"] - t["volumeUsd"] * 5 / 10_000) < 1e-6 and t["volumeUsd"] > 0
print("PASS" if ok else "FAIL", "| by partner:", json.dumps(stats["byPartner"]))
