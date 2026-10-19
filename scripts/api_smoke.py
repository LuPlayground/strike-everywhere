"""Smoke-test the deployed partner API. usage: python -I scripts/api_smoke.py <base_url> [builder] [network]"""
import json
import sys
import urllib.error
import urllib.parse
import urllib.request

base = sys.argv[1].rstrip("/")
builder = sys.argv[2] if len(sys.argv) > 2 else "Playground101"
network = sys.argv[3] if len(sys.argv) > 3 else "testnet"
UA = {"User-Agent": "strike-everywhere-smoke/0.1"}


def parse(raw):
    try:
        return json.loads(raw or b"null")
    except ValueError:
        return raw.decode(errors="replace")[:200]


def call(method, path, body=None, ctype="text/plain"):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(base + path, data=data, method=method, headers={**UA, "Content-Type": ctype})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, parse(r.read())
    except urllib.error.HTTPError as e:
        return e.code, parse(e.read())


failures = []
health = call("GET", "/v1/health")
print("health", health)
if health[0] != 200:
    failures.append("health")
bad = call("POST", "/v1/events", {"type": "connect", "network": network, "builderCode": builder, "accountId": "not-a-uuid"})
print("bad event (expect 400)", bad)
if bad[0] != 400:
    failures.append("bad event accepted")
null_body = call("POST", "/v1/events", None)
print("empty body (expect 400)", null_body)
if null_body[0] != 400:
    failures.append("empty body")
status, stats = call("GET", f"/v1/stats?{urllib.parse.urlencode({'builder': builder, 'network': network, 'days': 30})}")
print("stats", status, json.dumps(stats.get("totals") if isinstance(stats, dict) else stats))
if status != 200:
    failures.append("stats")
print("FAIL: " + ", ".join(failures) if failures else "PASS")
sys.exit(1 if failures else 0)
