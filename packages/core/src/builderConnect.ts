import { StrikeHttp } from "./http.js";
import { ApiWalletKey } from "./signer.js";

export type Chain = "cardano" | "ethereum" | "solana";

export interface BuilderSession {
  accountId: string;
  builderCode: string;
  feeShareBps: number;
  apiWalletId: number;
  apiWalletPublicKey: string;
  apiWalletExpiresAt: string;
  address: string;
  chain: Chain;
  connectedAt: number;
}

export interface ConnectParams {
  http: StrikeHttp;
  address: string;
  chain: Chain;
  builderCode: string;
  feeShareBps: number;
  referralCode?: string;
  signMessage: (message: string) => Promise<string>;
  onMessage?: (message: string) => void;
}

export function checkConsentMessage(message: string, apiPublicKeyHex: string): void {
  if (typeof message !== "string" || !message.trim()) throw new Error("Strike sent an empty message to sign. Not signing.");
  if (message.length > 4096) throw new Error("Strike's message to sign is unexpectedly long. Not signing.");
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F‪-‮⁦-⁩]/.test(message)) {
    throw new Error("Strike's message to sign contains hidden control characters. Not signing.");
  }
  if (!message.toLowerCase().includes(apiPublicKeyHex.toLowerCase())) {
    console.warn("[strike-everywhere] Strike's consent message doesn't name the API key being bound.");
  }
}

export async function builderConnect(p: ConnectParams): Promise<{ session: BuilderSession; key: ApiWalletKey }> {
  const key = await ApiWalletKey.generate();
  const requestSignature = (withReferral: boolean) =>
    p.http.request<{ nonce: string; message_to_sign: string }>("POST", "/auth/builder/request-signature", {
      auth: false,
      body: {
        address: p.address,
        chain: p.chain,
        code: p.builderCode,
        fee_share_bps: p.feeShareBps,
        public_key: key.publicKeyHex,
        ...(withReferral && p.referralCode ? { referral_code: p.referralCode } : {}),
      },
    });
  let challenge: { nonce: string; message_to_sign: string };
  try {
    challenge = await requestSignature(true);
  } catch (e: any) {
    if (!p.referralCode || e?.status !== 400) throw e;
    challenge = await requestSignature(false);
  }
  checkConsentMessage(challenge.message_to_sign, key.publicKeyHex);
  p.onMessage?.(challenge.message_to_sign);
  const walletSignature = await p.signMessage(challenge.message_to_sign);
  let r: any;
  try {
    r = await p.http.request<any>("POST", "/auth/builder/verify-signature", {
      auth: false,
      body: { address: p.address, chain: p.chain, nonce: challenge.nonce, wallet_signature: walletSignature },
    });
  } catch (e: any) {
    if (/expir|nonce|challenge/i.test(e?.message ?? "")) throw new Error("The signature request expired (Strike allows a few minutes). Click Sign & connect to get a new one.");
    throw e;
  }
  if (r.api_wallet_public_key && r.api_wallet_public_key !== key.publicKeyHex) {
    throw new Error("Strike returned a different API key than the one generated. Aborting.");
  }
  return {
    key,
    session: {
      accountId: r.account_id,
      builderCode: r.builder_code ?? p.builderCode,
      feeShareBps: r.fee_share_bps ?? r.max_fee_bps ?? p.feeShareBps,
      apiWalletId: r.api_wallet_id,
      apiWalletPublicKey: key.publicKeyHex,
      apiWalletExpiresAt: r.api_wallet_expired_at,
      address: p.address,
      chain: p.chain,
      connectedAt: Date.now(),
    },
  };
}
