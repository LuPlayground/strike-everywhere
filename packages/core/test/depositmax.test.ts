import { describe, expect, it } from "vitest";
import { Deposits, maxDepositAda } from "../src/deposit.js";
import { StrikeHttp } from "../src/http.js";
import { NETWORKS } from "../src/config.js";
import { ApiWalletKey } from "../src/signer.js";
import type { CardanoWallet } from "../src/cardano/wallet.js";

describe("deposit amount limits", () => {
  it("leaves room for Strike's forwarding, the fee and change", () => {
    expect(maxDepositAda(24.738002)).toBe(21.23);
    expect(maxDepositAda(24.738002)).toBeLessThan(24);
    expect(maxDepositAda(540)).toBe(536.5);
    expect(maxDepositAda(2)).toBe(0);
  });

  it("explains Strike's 'failed to build transaction' instead of passing it through", async () => {
    const f = (async (u: string) => {
      const path = new URL(u).pathname;
      if (path === "/v2/deposit/quote") return new Response(JSON.stringify({ request_id: "r1", quote: { usd_value: "5", exchange_rate: "0.2", asset_amount: "24000000", expiration_at: 0, confirmations: 6 }, confirmations_required: 6 }));
      return new Response(JSON.stringify({ error: "failed to build transaction" }), { status: 400 });
    }) as unknown as typeof fetch;
    const http = new StrikeHttp(NETWORKS.mainnet, f);
    http.key = await ApiWalletKey.generate();
    const wallet = { address: "addr1x", utxos: async () => ["00"] } as unknown as CardanoWallet;
    await expect(new Deposits(http).prepareAda(wallet, 24_000_000n)).rejects.toThrow(/2 ADA for Strike's forwarding.*smaller amount/);
  });
});
