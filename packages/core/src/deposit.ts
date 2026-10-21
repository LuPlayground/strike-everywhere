import { bytesToHex, utf8 } from "./bytes.js";
import { StrikeHttp } from "./http.js";
import { CardanoWallet } from "./cardano/wallet.js";
import { bech32ToAddressHex } from "./cardano/address.js";
import { byteStringsIn, previewTransaction, type TxPreview } from "./cardano/txPreview.js";

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
  forwardingCost: bigint;
  networkFee: bigint;
  quotedAddress: string;
  expiresAt?: number;
  accountId?: string;
}

export class DepositSafetyError extends Error {}

export class DepositRegistrationError extends Error {
  constructor(public readonly requestId: string, public readonly txHash: string, cause: string) {
    super(`Your deposit is on-chain (tx ${txHash.slice(0, 12)}…). Strike usually credits it from the chain on its own; registering it directly failed (${cause}). Don't send it again. You can retry registering.`);
    this.name = "DepositRegistrationError";
  }
}

const ALLOWED_BODY_KEYS = new Set([0, 1, 2, 3, 7, 8, 14, 15]);
const MAX_NETWORK_FEE = 3_000_000n;
export const MAX_FORWARDING_COST = 2_000_000n;

function paymentKeyHash(address: string): string | null {
  const hex = bech32ToAddressHex(address);
  const type = parseInt(hex[0], 16);
  if (type > 7 || type % 2 !== 0) return null;
  return hex.slice(2, 58);
}

export function checkDepositTx(unsignedTx: string, opts: { walletAddress: string; lovelace: bigint; requestId: string; accountId?: string }): { preview: TxPreview; dest: TxPreview["outputs"][number]; forwardingCost: bigint } {
  let preview: TxPreview;
  try {
    preview = previewTransaction(unsignedTx);
  } catch (e: any) {
    throw new DepositSafetyError(`Couldn't read the transaction (${e?.message || e}). Not signing.`);
  }
  const extra = preview.bodyKeys.filter((k) => !ALLOWED_BODY_KEYS.has(k));
  if (extra.length) throw new DepositSafetyError(`Transaction contains unexpected fields (${extra.join(", ")}). Not signing.`);
  if (!preview.isValid) throw new DepositSafetyError("Transaction is marked invalid. Not signing.");
  if (preview.fee > MAX_NETWORK_FEE) throw new DepositSafetyError(`Network fee of ${Number(preview.fee) / 1e6} ADA is too high. Not signing.`);

  const leaving = preview.outputs.filter((o) => o.address !== opts.walletAddress);
  if (leaving.length !== 1) throw new DepositSafetyError(`Expected one deposit output, found ${leaving.length}. Not signing.`);
  const dest = leaving[0];
  const forwardingCost = dest.lovelace - opts.lovelace;
  if (forwardingCost < 0n || forwardingCost > MAX_FORWARDING_COST) {
    throw new DepositSafetyError(`Transaction sends ${dest.lovelace} lovelace but ${opts.lovelace} was requested (plus at most ${MAX_FORWARDING_COST} for Strike's forwarding). Not signing.`);
  }
  if (dest.assetPolicies > 0) throw new DepositSafetyError("Transaction would move native tokens. Not signing.");

  if (dest.inlineDatum === undefined) throw new DepositSafetyError("Deposit output has no readable datum. Not signing.");
  const fields = new Set(byteStringsIn(dest.inlineDatum).map(bytesToHex));
  const pkh = paymentKeyHash(opts.walletAddress);
  const must: Array<[string, string]> = [[bytesToHex(utf8(opts.requestId)), "this deposit request"]];
  if (pkh) must.push([pkh, "your wallet"]);
  if (opts.accountId) must.push([bytesToHex(utf8(opts.accountId)), "your Strike account"]);
  for (const [hex, what] of must) {
    if (!fields.has(hex)) throw new DepositSafetyError(`Deposit datum doesn't reference ${what}. Not signing.`);
  }
  return { preview, dest, forwardingCost };
}

export class Deposits {
  constructor(private readonly http: StrikeHttp) {}

  async prepareAda(wallet: CardanoWallet, lovelace: bigint, accountId?: string): Promise<PreparedDeposit> {
    const quote = await this.http.request<DepositQuote>("POST", "/v2/deposit/quote", {
      body: { blockchain: "cardano", asset_symbol: "ADA", asset_amount: lovelace.toString() },
    });
    const utxos = await wallet.utxos();
    if (!utxos.length) throw new Error("Your wallet has no spendable ADA.");
    const built = await this.http.request<{ unsigned_tx: string; format: string }>("POST", "/v2/deposit/build-tx", {
      body: { request_id: quote.request_id, user_address: wallet.address, utxos },
    });
    if (built.format !== "cardano_cbor") throw new DepositSafetyError(`Unexpected transaction format: ${built.format}`);

    const { preview, dest, forwardingCost } = checkDepositTx(built.unsigned_tx, { walletAddress: wallet.address, lovelace, requestId: quote.request_id, accountId });
    const exp = Number(quote.quote?.expiration_at);
    return Object.freeze({
      requestId: quote.request_id,
      lovelace,
      usdValue: Number(quote.quote.usd_value),
      exchangeRate: Number(quote.quote.exchange_rate),
      confirmationsRequired: quote.confirmations_required,
      unsignedTx: built.unsigned_tx,
      preview,
      destination: { address: dest.address, lovelace: dest.lovelace },
      forwardingCost,
      networkFee: preview.fee,
      quotedAddress: quote.deposit_address,
      expiresAt: Number.isFinite(exp) && exp > 0 ? (exp < 1e12 ? exp * 1000 : exp) : undefined,
      accountId,
    });
  }

  async signAndSubmit(wallet: CardanoWallet, prepared: PreparedDeposit): Promise<{ txHash: string }> {
    if (prepared.expiresAt && Date.now() > prepared.expiresAt - 15_000) throw new DepositSafetyError("This quote has expired. Review the deposit again.");
    checkDepositTx(prepared.unsignedTx, { walletAddress: wallet.address, lovelace: prepared.lovelace, requestId: prepared.requestId, accountId: prepared.accountId });
    const signed = await wallet.signTransaction(prepared.unsignedTx);
    const txHash = await wallet.submit(signed);
    await this.register(prepared.requestId, txHash);
    return { txHash };
  }

  async register(requestId: string, txHash: string, attempts = 4): Promise<void> {
    let last: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await this.http.request("POST", "/v2/deposit", { body: { request_id: requestId, tx_hash: txHash } });
        return;
      } catch (e) {
        last = e;
        if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1500 * 2 ** i));
      }
    }
    throw new DepositRegistrationError(requestId, txHash, last?.message || String(last));
  }
}
