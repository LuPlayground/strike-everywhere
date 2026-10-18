import { hexToBytes } from "../bytes.js";
import { addressBytesToBech32 } from "./address.js";
import { CborTag, CborValue, decode } from "./cbor.js";

export interface TxOutputPreview {
  address: string;
  lovelace: bigint;
  assetPolicies: number;
  hasDatum: boolean;
}

export interface TxPreview {
  outputs: TxOutputPreview[];
  fee: bigint;
  inputCount: number;
  ttl?: number;
}

const toBig = (v: CborValue): bigint => (typeof v === "bigint" ? v : BigInt(v as number));

function readValue(v: CborValue): { lovelace: bigint; assetPolicies: number } {
  if (Array.isArray(v)) {
    const multi = v[1];
    return { lovelace: toBig(v[0]), assetPolicies: multi instanceof Map ? multi.size : 0 };
  }
  return { lovelace: toBig(v), assetPolicies: 0 };
}

function readOutput(o: CborValue): TxOutputPreview {
  if (o instanceof Map) {
    const { lovelace, assetPolicies } = readValue(o.get(1) as CborValue);
    return { address: addressBytesToBech32(o.get(0) as Uint8Array), lovelace, assetPolicies, hasDatum: o.has(2) };
  }
  const arr = o as CborValue[];
  const { lovelace, assetPolicies } = readValue(arr[1]);
  return { address: addressBytesToBech32(arr[0] as Uint8Array), lovelace, assetPolicies, hasDatum: arr.length > 2 };
}

const unwrapSet = (v: CborValue): CborValue[] => (v instanceof CborTag ? (v.value as CborValue[]) : (v as CborValue[]));

export function previewTransaction(txHex: string): TxPreview {
  const [tx] = decode(hexToBytes(txHex));
  const body = (tx as CborValue[])[0] as Map<CborValue, CborValue>;
  const outputs = (body.get(1) as CborValue[]).map(readOutput);
  return {
    outputs,
    fee: toBig(body.get(2) as CborValue),
    inputCount: unwrapSet(body.get(0) as CborValue).length,
    ttl: body.has(3) ? Number(body.get(3)) : undefined,
  };
}

export const lovelaceToAda = (l: bigint): number => Number(l) / 1_000_000;
