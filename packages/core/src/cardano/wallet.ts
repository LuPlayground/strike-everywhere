import { bytesToHex, hexToBytes, utf8 } from "../bytes.js";
import type { NetworkConfig } from "../config.js";
import { addressHexToBech32 } from "./address.js";
import { decode, spliceWitnessSet, type CborValue } from "./cbor.js";

export interface Cip30Api {
  getNetworkId(): Promise<number>;
  getChangeAddress(): Promise<string>;
  getUsedAddresses?(): Promise<string[]>;
  getUtxos(amount?: string): Promise<string[] | null | undefined>;
  getBalance(): Promise<string>;
  signData(address: string, payloadHex: string): Promise<{ signature: string; key: string }>;
  signTx(txHex: string, partialSign?: boolean): Promise<string>;
  submitTx(txHex: string): Promise<string>;
}

interface Cip30Provider {
  name?: string;
  icon?: string;
  apiVersion?: string;
  enable(): Promise<Cip30Api>;
  isEnabled?(): Promise<boolean>;
}

export interface WalletInfo {
  id: string;
  name: string;
  icon?: string;
}

const IGNORED_KEYS = new Set(["_events", "_eventsCount", "_maxListeners", "enable", "isEnabled"]);

const KNOWN_NAMES: Record<string, string> = { nufi: "NuFi", vespr: "VESPR", gerowallet: "GeroWallet", typhoncip30: "Typhon" };

export function walletDisplayName(name: string): string {
  if (!name || /[A-Z]/.test(name)) return name;
  return KNOWN_NAMES[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
}

export function detectWallets(win: any = globalThis): WalletInfo[] {
  const root = win?.cardano;
  if (!root || typeof root !== "object") return [];
  const seen = new Set<Cip30Provider>();
  const out: WalletInfo[] = [];
  for (const id of Object.keys(root)) {
    if (IGNORED_KEYS.has(id)) continue;
    const p = root[id] as Cip30Provider;
    if (!p || typeof p.enable !== "function" || seen.has(p)) continue;
    seen.add(p);
    out.push({ id, name: walletDisplayName(p.name || id), icon: p.icon });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export function walletErrorMessage(e: unknown): string {
  const err = e as { code?: number; info?: string; message?: string } | null;
  const text = String(err?.info || err?.message || e || "");
  if (/\blocked?\b/i.test(text)) return "Your wallet is locked. Unlock it and try again.";
  if (/declin|reject|cancel|denied|user (closed|abort)/i.test(text)) return "Declined in your wallet.";
  if (/hardware|ledger|trezor|device/i.test(text)) return "Your hardware wallet couldn't sign. Connect and unlock it, open the Cardano app, and try again.";
  switch (err?.code) {
    case -3:
      return "Your wallet refused the request. Unlock it and allow this site in its connected-dApps settings.";
    case -4:
      return "Your wallet account changed. Disconnect and connect again.";
    case 1:
      return "Your wallet couldn't produce the signature (e.g. a hardware wallet that's locked or busy). Try again.";
    case 2:
      return /address/i.test(text) ? "This address can't sign messages. Use a regular wallet account." : "Declined in your wallet.";
    case 3:
      return "Declined in your wallet.";
  }
  return text || "Your wallet returned an error.";
}

export class WalletNetworkMismatchError extends Error {
  constructor(public expected: number, public actual: number) {
    super(
      expected === 1
        ? "Your wallet is on a test network. Switch it to Cardano Mainnet."
        : "Your wallet is on Mainnet. Switch it to the Preprod test network.",
    );
  }
}

export class CardanoWallet {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly api: Cip30Api,
    public readonly addressHex: string,
    public readonly address: string,
  ) {}

  static async enable(walletId: string, net: NetworkConfig, win: any = globalThis): Promise<CardanoWallet> {
    const provider: Cip30Provider | undefined = win?.cardano?.[walletId];
    if (!provider?.enable) throw new Error(`Wallet "${walletId}" is not installed in this browser.`);
    const api = await provider.enable();
    const networkId = await api.getNetworkId();
    if (networkId !== net.cardanoNetworkId) throw new WalletNetworkMismatchError(net.cardanoNetworkId, networkId);
    const addressHex = await api.getChangeAddress();
    return new CardanoWallet(walletId, provider.name || walletId, api, addressHex, addressHexToBech32(addressHex));
  }

  async signMessage(message: string): Promise<string> {
    return this.signHex(bytesToHex(utf8(message)));
  }

  async signHex(payloadHex: string): Promise<string> {
    const { signature, key } = await this.api.signData(this.addressHex, payloadHex);
    return `${signature}:${key}`;
  }

  async balanceLovelace(): Promise<bigint> {
    const [v] = decode(hexToBytes(await this.api.getBalance()));
    const coin: CborValue = Array.isArray(v) ? v[0] : v;
    return typeof coin === "bigint" ? coin : BigInt(coin as number);
  }

  async utxos(): Promise<string[]> {
    return (await this.api.getUtxos()) ?? [];
  }

  async signTransaction(unsignedTxHex: string): Promise<string> {
    const witnessSetHex = await this.api.signTx(unsignedTxHex, true);
    return bytesToHex(spliceWitnessSet(hexToBytes(unsignedTxHex), hexToBytes(witnessSetHex)));
  }

  async submit(signedTxHex: string): Promise<string> {
    return this.api.submitTx(signedTxHex);
  }
}
