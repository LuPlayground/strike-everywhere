import { bytesToHex, hexToBytes } from "../bytes.js";
import { addressBytesToBech32 } from "./address.js";
import { CborTag, CborValue, decode } from "./cbor.js";

export type AssetBag = Map<string, bigint>;

export interface TxOutputPreview {
  address: string;
  lovelace: bigint;
  assetPolicies: number;
  assets: AssetBag;
  hasDatum: boolean;
  inlineDatum?: CborValue;
}

export interface TxInputRef {
  txHash: string;
  index: number;
}

export interface TxPreview {
  outputs: TxOutputPreview[];
  fee: bigint;
  inputCount: number;
  inputs: TxInputRef[];
  ttl?: number;
  bodyKeys: number[];
  isValid: boolean;
}

const toBig = (v: CborValue): bigint => (typeof v === "bigint" ? v : BigInt(v as number));

function readAssets(multi: CborValue): AssetBag {
  const bag: AssetBag = new Map();
  if (!(multi instanceof Map)) return bag;
  for (const [policy, names] of multi) {
    if (!(names instanceof Map)) continue;
    for (const [name, qty] of names) {
      const key = `${bytesToHex(policy as Uint8Array)}.${bytesToHex(name as Uint8Array)}`;
      bag.set(key, (bag.get(key) ?? 0n) + toBig(qty));
    }
  }
  return bag;
}

export function readValue(v: CborValue): { lovelace: bigint; assetPolicies: number; assets: AssetBag } {
  if (Array.isArray(v)) {
    const multi = v[1];
    return { lovelace: toBig(v[0]), assetPolicies: multi instanceof Map ? multi.size : 0, assets: readAssets(multi) };
  }
  return { lovelace: toBig(v), assetPolicies: 0, assets: new Map() };
}

function readInlineDatum(opt: CborValue): CborValue | undefined {
  if (!Array.isArray(opt) || opt[0] !== 1) return undefined;
  const wrapped = opt[1];
  const bytes = wrapped instanceof CborTag ? wrapped.value : wrapped;
  if (!(bytes instanceof Uint8Array)) return undefined;
  try {
    return decode(bytes)[0];
  } catch {
    return undefined;
  }
}

export function readOutput(o: CborValue): TxOutputPreview {
  if (o instanceof Map) {
    const v = readValue(o.get(1) as CborValue);
    return { address: addressBytesToBech32(o.get(0) as Uint8Array), ...v, hasDatum: o.has(2), inlineDatum: o.has(2) ? readInlineDatum(o.get(2) as CborValue) : undefined };
  }
  const arr = o as CborValue[];
  const v = readValue(arr[1]);
  return { address: addressBytesToBech32(arr[0] as Uint8Array), ...v, hasDatum: arr.length > 2 };
}

const unwrapSet = (v: CborValue): CborValue[] => (v instanceof CborTag ? (v.value as CborValue[]) : (v as CborValue[]));

const readInput = (i: CborValue): TxInputRef => {
  const [h, idx] = i as [Uint8Array, number];
  return { txHash: bytesToHex(h), index: Number(idx) };
};

export function previewTransaction(txHex: string): TxPreview {
  const [tx] = decode(hexToBytes(txHex));
  const arr = tx as CborValue[];
  if (!Array.isArray(arr) || !(arr[0] instanceof Map)) throw new Error("Not a Cardano transaction.");
  const body = arr[0] as Map<CborValue, CborValue>;
  const outputs = (body.get(1) as CborValue[]).map(readOutput);
  const inputs = unwrapSet(body.get(0) as CborValue).map(readInput);
  return {
    outputs,
    fee: toBig(body.get(2) as CborValue),
    inputCount: inputs.length,
    inputs,
    ttl: body.has(3) ? Number(body.get(3)) : undefined,
    bodyKeys: [...body.keys()].map(Number),
    isValid: arr.length < 3 || arr[2] === true,
  };
}

export function byteStringsIn(v: CborValue, out: Uint8Array[] = []): Uint8Array[] {
  if (v instanceof Uint8Array) out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => byteStringsIn(x, out));
  else if (v instanceof Map) v.forEach((x, k) => (byteStringsIn(k, out), byteStringsIn(x, out)));
  else if (v instanceof CborTag) byteStringsIn(v.value, out);
  return out;
}

export const lovelaceToAda = (l: bigint): number => Number(l) / 1_000_000;
