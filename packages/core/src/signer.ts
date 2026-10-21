import * as ed from "@noble/ed25519";
import { bytesToHex, hexToBytes, sha256Hex, utf8 } from "./bytes.js";

const subtle: SubtleCrypto | undefined = globalThis.crypto?.subtle;
const subtleGenerate = subtle?.generateKey.bind(subtle);
const subtleExport = subtle?.exportKey.bind(subtle);
const subtleSign = subtle?.sign.bind(subtle);

export class ApiWalletKey {
  private constructor(
    private readonly signBytes: (message: Uint8Array) => Promise<Uint8Array>,
    public readonly publicKeyHex: string,
    public readonly cryptoKey: CryptoKey | null,
  ) {}

  get nonExtractable(): boolean {
    return this.cryptoKey !== null;
  }

  static async generate(): Promise<ApiWalletKey> {
    return (await ApiWalletKey.generateNonExtractable()) ?? ApiWalletKey.generateInMemory();
  }

  static async generateNonExtractable(): Promise<ApiWalletKey | null> {
    if (!subtleGenerate || !subtleExport) return null;
    try {
      const pair = (await subtleGenerate({ name: "Ed25519" }, false, ["sign", "verify"])) as CryptoKeyPair;
      if (pair.privateKey.extractable !== false || pair.privateKey.algorithm?.name !== "Ed25519") return null;
      const pub = bytesToHex(new Uint8Array(await subtleExport("raw", pair.publicKey)));
      return await ApiWalletKey.fromCryptoKey(pair.privateKey, pub);
    } catch {
      return null;
    }
  }

  static async generateInMemory(): Promise<ApiWalletKey> {
    const priv = ed.utils.randomPrivateKey();
    return ApiWalletKey.fromBytes(priv);
  }

  static async fromCryptoKey(privateKey: CryptoKey, publicKeyHex: string): Promise<ApiWalletKey> {
    if (!subtleSign) throw new Error("This browser can't sign with WebCrypto.");
    if (privateKey.extractable !== false) throw new Error("Refusing a trading key that can be exported.");
    const signBytes = async (m: Uint8Array) => new Uint8Array(await subtleSign({ name: "Ed25519" }, privateKey, m));
    const probe = utf8(`strike-everywhere key check ${publicKeyHex}`);
    if (!(await ed.verifyAsync(await signBytes(probe), probe, hexToBytes(publicKeyHex)))) throw new Error("Trading key doesn't match its public key.");
    return new ApiWalletKey(signBytes, publicKeyHex, privateKey);
  }

  static async fromPrivateKeyHex(hex: string): Promise<ApiWalletKey> {
    return ApiWalletKey.fromBytes(hexToBytes(hex));
  }

  private static async fromBytes(priv: Uint8Array): Promise<ApiWalletKey> {
    return new ApiWalletKey((m) => ed.signAsync(m, priv), bytesToHex(await ed.getPublicKeyAsync(priv)), null);
  }

  async sign(message: string): Promise<string> {
    return bytesToHex(await this.signBytes(utf8(message)));
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
