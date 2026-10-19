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

export async function builderConnect(p: ConnectParams): Promise<{ session: BuilderSession; key: ApiWalletKey }> {
  const key = await ApiWalletKey.generate();
  const challenge = await p.http.request<{ nonce: string; message_to_sign: string }>("POST", "/auth/builder/request-signature", {
    auth: false,
    body: {
      address: p.address,
      chain: p.chain,
      code: p.builderCode,
      fee_share_bps: p.feeShareBps,
      public_key: key.publicKeyHex,
      ...(p.referralCode ? { referral_code: p.referralCode } : {}),
    },
  });
  p.onMessage?.(challenge.message_to_sign);
  const walletSignature = await p.signMessage(challenge.message_to_sign);
  let r: any;
  try {
    r = await p.http.request<any>("POST", "/auth/builder/verify-signature", {
      auth: false,
      body: { address: p.address, chain: p.chain, nonce: challenge.nonce, wallet_signature: walletSignature },
    });
  } catch (e: any) {
    if (/expir|nonce|challenge/i.test(e?.message ?? "")) throw new Error("The signature request expired (Strike allows about 3 minutes). Click Sign & connect to get a new one.");
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
