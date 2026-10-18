import { StrikeHttp } from "./http.js";
import { CardanoWallet } from "./cardano/wallet.js";

export interface PreparedWithdrawal {
  withdrawId: string;
  usdValue: number;
  fee: number;
  messageToSign: string;
}

export const MIN_WITHDRAW_USD = 5;

export class Withdrawals {
  constructor(private readonly http: StrikeHttp) {}

  async prepareAda(usdValue: number): Promise<PreparedWithdrawal> {
    if (!(usdValue >= MIN_WITHDRAW_USD)) throw new Error(`Minimum withdrawal is $${MIN_WITHDRAW_USD}.`);
    const q = await this.http.request<{ withdraw_id: string; fee: string; message_to_sign: string }>("POST", "/v2/withdraw/quote", {
      body: { usd_value: usdValue.toFixed(2), blockchain: "cardano", asset: "ADA" },
    });
    return { withdrawId: q.withdraw_id, usdValue, fee: Number(q.fee), messageToSign: q.message_to_sign };
  }

  async signAndSubmit(wallet: CardanoWallet, prepared: PreparedWithdrawal): Promise<{ status: string; requestId: string }> {
    const walletSignature = await wallet.signMessage(prepared.messageToSign);
    const r = await this.http.request<{ request_id: string; status: string }>("POST", "/v2/withdraw", {
      body: { withdraw_id: prepared.withdrawId, wallet_signature: walletSignature },
    });
    return { status: r.status, requestId: r.request_id };
  }
}
