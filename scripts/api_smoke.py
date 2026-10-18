"""Smoke-test the deployed partner API. usage: python -I scripts/api_smoke.py <base_url> [builder] [network]"""
import json
import sys
import urllib.request

base = sys.argv[1].rstrip("/")
builder = sys.argv[2] if len(sys.argv) > 2 else "Playground101"
network = sys.argv[3] if len(sys.argv) > 3 else "testnet"
UA = {"User-Agent": "strike-everywhere-smoke/0.1"}


def call(method, path, body=None, ctype="text/plain"):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(base + path, data=data, method=method, headers={**UA, "Content-Type": ctype})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, json.loads(r.read() or b"null")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"null")


print("health", call("GET", "/v1/health"))
print("bad event", call("POST", "/v1/events", {"type": "connect", "network": network, "builderCode": builder, "accountId": "not-a-uuid"}))
status, stats = call("GET", f"/v1/stats?builder={builder}&network={network}&days=30")
print("stats", status, json.dumps(stats.get("totals") if isinstance(stats, dict) else stats))
