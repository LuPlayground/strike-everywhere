import { StrikeHttp } from "./http.js";
import { CardanoWallet } from "./cardano/wallet.js";
import { previewTransaction, type TxPreview } from "./cardano/txPreview.js";
import { bytesToHex, hexToBytes, utf8 } from "./bytes.js";

export interface PreparedWithdrawal {
  withdrawId: string;
  usdValue: number;
  fee: number;
  messageToSign: string;
  messageHex: string;
  funding?: {
    unsignedTx: string;
    validatorAddress: string;
    lovelace: bigint;
    networkFee: bigint;
    preview: TxPreview;
  };
}

export const MIN_WITHDRAW_USD = 5;

export class WithdrawalSafetyError extends Error {}

const ALLOWED_BODY_KEYS = new Set([0, 1, 2, 3, 7, 8, 14, 15]);
const MAX_FUNDING = 5_000_000n;
const MAX_NETWORK_FEE = 3_000_000n;

export function normalizeWithdrawMessage(raw: string): { text: string; hex: string } {
  const s = String(raw ?? "");
  if (s.length >= 32 && s.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(s)) {
    const bytes = hexToBytes(s);
    let text: string;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      text = s;
    }
    return { text, hex: s.toLowerCase() };
  }
  return { text: s, hex: bytesToHex(utf8(s)) };
}

export function checkFundingTx(unsignedTx: string, opts: { walletAddress: string; validatorAddress: string }): { preview: TxPreview; lovelace: bigint } {
  let preview: TxPreview;
  try {
    preview = previewTransaction(unsignedTx);
  } catch (e: any) {
    throw new WithdrawalSafetyError(`Couldn't read Strike's funding transaction (${e?.message || e}). Not signing.`);
  }
  const extra = preview.bodyKeys.filter((k) => !ALLOWED_BODY_KEYS.has(k));
  if (extra.length) throw new WithdrawalSafetyError(`Funding transaction contains unexpected fields (${extra.join(", ")}). Not signing.`);
  if (!preview.isValid) throw new WithdrawalSafetyError("Funding transaction is marked invalid. Not signing.");
  if (preview.fee > MAX_NETWORK_FEE) throw new WithdrawalSafetyError(`Network fee of ${Number(preview.fee) / 1e6} ADA is too high. Not signing.`);
  const leaving = preview.outputs.filter((o) => o.address !== opts.walletAddress);
  if (!leaving.length) throw new WithdrawalSafetyError("Funding transaction pays nothing to Strike's validator. Not signing.");
  for (const o of leaving) {
    if (o.address !== opts.validatorAddress) throw new WithdrawalSafetyError(`Funding transaction pays an unexpected address (${o.address.slice(0, 20)}…). Not signing.`);
    if (o.assetPolicies > 0) throw new WithdrawalSafetyError("Funding transaction would move native tokens. Not signing.");
  }
  const lovelace = leaving.reduce((s, o) => s + o.lovelace, 0n);
  if (lovelace > MAX_FUNDING) throw new WithdrawalSafetyError(`Funding transaction sends ${Number(lovelace) / 1e6} ADA to the validator (expected about 1–2). Not signing.`);
  return { preview, lovelace };
}

export class Withdrawals {
  constructor(private readonly http: StrikeHttp) {}

  async prepareAda(usdValue: number, walletAddress?: string): Promise<PreparedWithdrawal> {
    if (!Number.isFinite(usdValue) || !(usdValue >= MIN_WITHDRAW_USD)) throw new Error(`Minimum withdrawal is $${MIN_WITHDRAW_USD}.`);
    let q: { withdraw_id: string; fee: string; message_to_sign: string; tx_cbor?: string; validator_address?: string };
    try {
      q = await this.http.request("POST", "/v2/withdraw/quote", { body: { usd_value: usdValue.toFixed(2), blockchain: "cardano", asset: "ADA" } });
    } catch (e: any) {
      if (/single-withdrawal limit/i.test(e?.message ?? "")) throw new Error("That's above Strike's limit for a single withdrawal. Try a smaller amount.");
      if (/rate limit/i.test(e?.message ?? "")) throw new Error("Strike's withdrawal limit for this hour or day is reached. Try again later or a smaller amount.");
      throw e;
    }
    const msg = normalizeWithdrawMessage(q.message_to_sign);
    const out: PreparedWithdrawal = { withdrawId: q.withdraw_id, usdValue, fee: Number(q.fee), messageToSign: msg.text, messageHex: msg.hex };
    if (q.tx_cbor) {
      if (!walletAddress) throw new Error("Reconnect your wallet to withdraw.");
      if (!q.validator_address) throw new WithdrawalSafetyError("Strike sent a funding transaction without its validator address. Not signing.");
      const { preview, lovelace } = checkFundingTx(q.tx_cbor, { walletAddress, validatorAddress: q.validator_address });
      out.funding = { unsignedTx: q.tx_cbor, validatorAddress: q.validator_address, lovelace, networkFee: preview.fee, preview };
    }
    return Object.freeze(out);
  }

  async signAndSubmit(wallet: CardanoWallet, prepared: PreparedWithdrawal): Promise<{ status: string; requestId: string }> {
    const walletSignature = await wallet.signHex(prepared.messageHex);
    const body: Record<string, string> = { withdraw_id: prepared.withdrawId, wallet_signature: walletSignature };
    if (prepared.funding) {
      checkFundingTx(prepared.funding.unsignedTx, { walletAddress: wallet.address, validatorAddress: prepared.funding.validatorAddress });
      body.signed_tx_cbor = await wallet.signTransaction(prepared.funding.unsignedTx);
    }
    const r = await this.http.request<{ request_id: string; status: string }>("POST", "/v2/withdraw", { body });
    return { status: r.status, requestId: r.request_id };
  }
}
