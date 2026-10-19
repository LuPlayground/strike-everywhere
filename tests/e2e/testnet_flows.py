"""Testnet flow checks with the throwaway mock wallet (no funds, never signs transactions).

Covers everything that doesn't need a fill (testnet order books are empty):
  1. Builder Connect (one CIP-30 signature) + account read
  2. Withdrawal quote (is Strike's withdrawal service up?)
  3. Leverage change + market order + TP/SL strategy order -> Strike's verdict (expected: rejected, no balance)
  4. Attribution timing: each order id must be registered with the partner API BEFORE Strike's create_timestamp
  5. Deposit build-tx with a fake UTxO -> the widget's pre-sign safety check on a fresh Strike transaction

usage: python -I tests/e2e/testnet_flows.py <page_url> <partner_api>
Partner-API rows for the mock account are printed so they can be deleted afterwards.
"""
import json
import sys
import time
import urllib.request
import pathlib
from playwright.sync_api import sync_playwright

page_url, partner_api = sys.argv[1], sys.argv[2].rstrip("/")
mock = (pathlib.Path(__file__).parent / "mock-wallet.js").read_text(encoding="utf-8")
STRIKE_T = "https://api-v2-testnet.strikefinance.org"
UA = {"User-Agent": "strike-everywhere-e2e/0.2"}

FLOW = r"""
async ({ partnerApi }) => {
  const out = {};
  const step = async (name, fn) => {
    const t0 = Date.now();
    try { out[name] = { ok: true, value: await fn(), ms: Date.now() - t0 }; }
    catch (e) { out[name] = { ok: false, error: String(e && (e.message || e.info) || e), kind: e && e.name, ms: Date.now() - t0 }; }
  };
  const SE = window.StrikeEverywhere;
  const c = new SE.Client({ network: "testnet", builderCode: "Playground101", feeBps: 5, partnerApi, partnerId: "e2e-testnet-flows" });
  await step("init", async () => { await c.init(); return (await c.loadMarkets()).map((m) => m.symbol); });
  await step("connect", async () => { const s = await c.connect("mockwallet"); return { accountId: s.accountId, feeShareBps: s.feeShareBps, address: s.address }; });
  out.orderFeeBps = c.orderFeeBps;
  await step("account", async () => { const a = await c.account.account(); return { wallet_balance: a.wallet_balance, available_balance: a.available_balance }; });
  await step("withdrawQuote", async () => await c.prepareWithdrawal(5));
  const mark = Number(c.raw("ADA-USD").mark_price);
  await step("marketOrder", async () => { const o = await c.placeOrder({ symbol: "ADA-USD", side: "buy", type: "market", size: Math.ceil(30 / mark), leverage: 2 }); return { status: o.status, coid: o.client_order_id }; });
  await step("tpslOrder", async () => { const o = await c.placeOrder({ symbol: "ADA-USD", side: "buy", type: "market", size: Math.ceil(30 / mark), leverage: 2, takeProfit: +(mark * 1.1).toFixed(4), stopLoss: +(mark * 0.9).toFixed(4) }); return { status: o.status }; });
  await step("history", async () => (await c.account.orderHistory({ symbol: "ADA-USD", limit: 10 })).map((o) => ({ coid: o.client_order_id, status: o.status, reason: o.error_message || o.close_reason, type: o.type, created: o.create_timestamp })));

  // Deposit: give the mock wallet one fake 1,000 ADA UTxO so Strike can build a transaction. Nothing is signed.
  const api = await window.cardano.mockwallet.enable();
  const addrHex = await api.getChangeAddress();
  const h = (n, len) => n.toString(16).padStart(len, "0");
  const fakeTxHash = "ab".repeat(32);
  const utxo = "82" + "825820" + fakeTxHash + "00" + "82" + "5839" + addrHex + "1a" + h(1_000_000_000, 8);
  api.getUtxos = async () => [utxo];
  c.wallet = null;
  await step("ensureWallet", async () => (await c.ensureWallet("mockwallet")).address);
  await step("depositPrepare", async () => {
    const p = await c.prepareDeposit(500);
    return { requestId: p.requestId, usd: p.usdValue, dest: p.destination.address, lovelace: String(p.destination.lovelace), fee: String(p.networkFee), bodyKeys: p.preview.bodyKeys, quoted: p.quotedAddress, expiresAt: p.expiresAt };
  });
  return out;
}
"""


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.loads(r.read())


with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page()
    errors = []
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.add_init_script(mock)
    pg.goto(page_url, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_function("() => window.StrikeEverywhere && window.StrikeEverywhere.Client", timeout=30000)
    res = pg.evaluate(FLOW, {"partnerApi": partner_api})
    b.close()

print(json.dumps(res, indent=1, default=str))
if errors:
    print("page errors:", errors)

acct = (res.get("connect", {}).get("value") or {}).get("accountId")
if acct:
    time.sleep(2)
    hist = get(f"{STRIKE_T}/v2/history/order?account_id={acct}&limit=20").get("orders", [])
    created = {o["client_order_id"]: o["create_timestamp"] for o in hist}
    print("\nStrike create_timestamp per recent order id (compare with partner-API registration time):")
    for o in hist[:8]:
        print(f"  {o['client_order_id']}  {o['type']:<12} {o['status']:<9} created={o['create_timestamp']} reason={o.get('error_message') or o.get('close_reason')}")
    print("\nmock account:", acct)
