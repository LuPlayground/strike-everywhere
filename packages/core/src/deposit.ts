import { StrikeHttp } from "./http.js";
import { CardanoWallet } from "./cardano/wallet.js";
import { previewTransaction, type TxPreview } from "./cardano/txPreview.js";

export interface DepositQuote {
  request_id: string;
  quote: { usd_value: string; exchange_rate: string; asset_amount: string; expiration_at: number; confirmations: number };
  deposit_address: string;
  confirmations_required: number;
}

export interface PreparedDeposit {
  requestId: string;
  lovelace: bigint;
  usdValue: number;
  exchangeRate: number;
  confirmationsRequired: number;
  unsignedTx: string;
  preview: TxPreview;
  destination: { address: string; lovelace: bigint };
  networkFee: bigint;
  quotedAddress: string;
}

export class DepositSafetyError extends Error {}

export class Deposits {
  constructor(private readonly http: StrikeHttp) {}

  async prepareAda(wallet: CardanoWallet, lovelace: bigint): Promise<PreparedDeposit> {
    const quote = await this.http.request<DepositQuote>("POST", "/v2/deposit/quote", {
      body: { blockchain: "cardano", asset_symbol: "ADA", asset_amount: lovelace.toString() },
    });
    const utxos = await wallet.utxos();
    if (!utxos.length) throw new Error("Your wallet has no spendable ADA.");
    const built = await this.http.request<{ unsigned_tx: string; format: string }>("POST", "/v2/deposit/build-tx", {
      body: { request_id: quote.request_id, user_address: wallet.address, utxos },
    });
    if (built.format !== "cardano_cbor") throw new DepositSafetyError(`Unexpected transaction format: ${built.format}`);

    const preview = previewTransaction(built.unsigned_tx);
    const leaving = preview.outputs.filter((o) => o.address !== wallet.address);
    if (leaving.length !== 1) throw new DepositSafetyError(`Expected one deposit output, found ${leaving.length}. Not signing.`);
    const dest = leaving[0];
    if (dest.lovelace !== lovelace) {
      throw new DepositSafetyError(`Transaction sends ${dest.lovelace} lovelace but ${lovelace} was requested. Not signing.`);
    }
    if (dest.assetPolicies > 0) throw new DepositSafetyError("Transaction would move native tokens. Not signing.");

    return {
      requestId: quote.request_id,
      lovelace,
      usdValue: Number(quote.quote.usd_value),
      exchangeRate: Number(quote.quote.exchange_rate),
      confirmationsRequired: quote.confirmations_required,
      unsignedTx: built.unsigned_tx,
      preview,
      destination: { address: dest.address, lovelace: dest.lovelace },
      networkFee: preview.fee,
      quotedAddress: quote.deposit_address,
    };
  }

  async signAndSubmit(wallet: CardanoWallet, prepared: PreparedDeposit): Promise<{ txHash: string }> {
    const signed = await wallet.signTransaction(prepared.unsignedTx);
    const txHash = await wallet.submit(signed);
    await this.http.request("POST", "/v2/deposit", { body: { request_id: prepared.requestId, tx_hash: txHash } });
    return { txHash };
  }
}
