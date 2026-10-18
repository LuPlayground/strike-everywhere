import * as ed from "@noble/ed25519";
import { bytesToHex, hexToBytes, sha256Hex, utf8 } from "./bytes.js";

export class ApiWalletKey {
  private constructor(private readonly priv: Uint8Array, public readonly publicKeyHex: string) {}

  static async generate(): Promise<ApiWalletKey> {
    const priv = ed.utils.randomPrivateKey();
    return new ApiWalletKey(priv, bytesToHex(await ed.getPublicKeyAsync(priv)));
  }

  static async fromPrivateKeyHex(hex: string): Promise<ApiWalletKey> {
    const priv = hexToBytes(hex);
    return new ApiWalletKey(priv, bytesToHex(await ed.getPublicKeyAsync(priv)));
  }

  exportPrivateKeyHex(): string {
    return bytesToHex(this.priv);
  }

  async sign(message: string): Promise<string> {
    return bytesToHex(await ed.signAsync(utf8(message), this.priv));
  }
}

export interface SignedHeaders {
  "X-API-Wallet-Public-Key": string;
  "X-API-Wallet-Signature": string;
  "X-API-Wallet-Timestamp": string;
  "X-API-Wallet-Nonce": string;
}

export async function canonicalRequestMessage(method: string, pathWithQuery: string, timestampSec: number, nonce: string, body: string): Promise<string> {
  return `${method.toUpperCase()}:${pathWithQuery}:${timestampSec}:${nonce}:${await sha256Hex(body)}`;
}

export async function signRequest(key: ApiWalletKey, method: string, pathWithQuery: string, body: string, timestampSec: number, nonce: string): Promise<SignedHeaders> {
  const msg = await canonicalRequestMessage(method, pathWithQuery, timestampSec, nonce, body);
  return {
    "X-API-Wallet-Public-Key": key.publicKeyHex,
    "X-API-Wallet-Signature": await key.sign(msg),
    "X-API-Wallet-Timestamp": String(timestampSec),
    "X-API-Wallet-Nonce": nonce,
  };
}

export async function signLogon(key: ApiWalletKey, timestampMs: number): Promise<string> {
  return key.sign(`session.logon:${timestampMs}:${key.publicKeyHex}`);
}
