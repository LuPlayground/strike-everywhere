import { bytesToHex, concatBytes } from "../bytes.js";

interface Head {
  major: number;
  info: number;
  len: number;
  hdr: number;
  big?: bigint;
}

export function readHead(b: Uint8Array, i: number): Head {
  if (!(i >= 0 && i < b.length)) throw new Error(`CBOR: unexpected end at ${i}`);
  const ib = b[i];
  const major = ib >> 5;
  const info = ib & 31;
  if (info < 24) return { major, info, len: info, hdr: 1 };
  const need = info === 24 ? 2 : info === 25 ? 3 : info === 26 ? 5 : info === 27 ? 9 : 1;
  if (i + need > b.length) throw new Error(`CBOR: truncated head at ${i}`);
  if (info === 24) return { major, info, len: b[i + 1], hdr: 2 };
  if (info === 25) return { major, info, len: (b[i + 1] << 8) | b[i + 2], hdr: 3 };
  if (info === 26) return { major, info, len: ((b[i + 1] << 24) >>> 0) + (b[i + 2] << 16) + (b[i + 3] << 8) + b[i + 4], hdr: 5 };
  if (info === 27) {
    let v = 0n;
    for (let k = 1; k <= 8; k++) v = (v << 8n) | BigInt(b[i + k]);
    return { major, info, len: v <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(v) : -2, hdr: 9, big: v };
  }
  if (info === 31) return { major, info, len: -1, hdr: 1 };
  throw new Error(`CBOR: reserved additional info ${info} at ${i}`);
}

export function skipItem(b: Uint8Array, i: number): number {
  const end = skipItemRaw(b, i);
  if (end > b.length) throw new Error(`CBOR: item at ${i} runs past the end`);
  return end;
}

function skipItemRaw(b: Uint8Array, i: number): number {
  const h = readHead(b, i);
  if (h.len === -2) throw new Error(`CBOR: length too large at ${i}`);
  let p = i + h.hdr;
  switch (h.major) {
    case 0:
    case 1:
      return p;
    case 2:
    case 3:
      if (h.len === -1) {
        while (b[p] !== 0xff) p = skipItem(b, p);
        return p + 1;
      }
      return p + h.len;
    case 4:
      if (h.len === -1) {
        while (b[p] !== 0xff) p = skipItem(b, p);
        return p + 1;
      }
      for (let k = 0; k < h.len; k++) p = skipItem(b, p);
      return p;
    case 5:
      if (h.len === -1) {
        while (b[p] !== 0xff) p = skipPair(b, p);
        return p + 1;
      }
      for (let k = 0; k < h.len * 2; k++) p = skipItem(b, p);
      return p;
    case 6:
      return skipItem(b, p);
    default:
      return p;
  }
}

function skipPair(b: Uint8Array, p: number): number {
  return skipItem(b, skipItem(b, p));
}

export function encodeHead(major: number, len: number): Uint8Array {
  if (len < 24) return new Uint8Array([(major << 5) | len]);
  if (len < 0x100) return new Uint8Array([(major << 5) | 24, len]);
  if (len < 0x10000) return new Uint8Array([(major << 5) | 25, len >> 8, len & 0xff]);
  return new Uint8Array([(major << 5) | 26, (len >>> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff]);
}

export function childSpans(b: Uint8Array, i: number): Array<[number, number]> {
  const h = readHead(b, i);
  if (h.major !== 4 && h.major !== 5) throw new Error("CBOR: expected array or map");
  let p = i + h.hdr;
  const out: Array<[number, number]> = [];
  const total = h.len === -1 ? Infinity : h.major === 5 ? h.len * 2 : h.len;
  for (let k = 0; k < total; k++) {
    if (h.len === -1 && b[p] === 0xff) break;
    const e = skipItem(b, p);
    out.push([p, e]);
    p = e;
  }
  return out;
}


export class CborTag {
  constructor(public tag: number, public value: CborValue) {}
}
export type CborValue =
  | number
  | bigint
  | string
  | boolean
  | null
  | undefined
  | Uint8Array
  | CborValue[]
  | Map<CborValue, CborValue>
  | CborTag;

export function decode(b: Uint8Array, i = 0): [CborValue, number] {
  const h = readHead(b, i);
  let p = i + h.hdr;
  if ((h.major === 2 || h.major === 3) && h.len >= 0 && p + h.len > b.length) throw new Error(`CBOR: truncated string at ${i}`);
  if ((h.major === 4 || h.major === 5) && (h.len === -2 || h.len > b.length - p)) throw new Error(`CBOR: bad container length at ${i}`);
  const intVal = (): number | bigint => (h.len === -2 && h.big !== undefined ? h.big : h.len);
  switch (h.major) {
    case 0:
      return [intVal(), p];
    case 1: {
      const v = intVal();
      return [typeof v === "bigint" ? -1n - v : -1 - v, p];
    }
    case 2:
    case 3: {
      let bytes: Uint8Array;
      if (h.len === -1) {
        const chunks: Uint8Array[] = [];
        while (b[p] !== 0xff) {
          const [chunk, next] = decode(b, p);
          chunks.push(typeof chunk === "string" ? new TextEncoder().encode(chunk) : (chunk as Uint8Array));
          p = next;
        }
        bytes = concatBytes(...chunks);
        p += 1;
      } else {
        bytes = b.slice(p, p + h.len);
        p += h.len;
      }
      return [h.major === 3 ? new TextDecoder().decode(bytes) : bytes, p];
    }
    case 4: {
      const arr: CborValue[] = [];
      const n = h.len === -1 ? Infinity : h.len;
      for (let k = 0; k < n; k++) {
        if (h.len === -1 && b[p] === 0xff) {
          p += 1;
          break;
        }
        const [v, next] = decode(b, p);
        arr.push(v);
        p = next;
      }
      return [arr, p];
    }
    case 5: {
      const map = new Map<CborValue, CborValue>();
      const n = h.len === -1 ? Infinity : h.len;
      for (let k = 0; k < n; k++) {
        if (h.len === -1 && b[p] === 0xff) {
          p += 1;
          break;
        }
        const [key, afterKey] = decode(b, p);
        const [val, afterVal] = decode(b, afterKey);
        map.set(key, val);
        p = afterVal;
      }
      return [map, p];
    }
    case 6: {
      const [v, next] = decode(b, p);
      return [new CborTag(h.len, v), next];
    }
    default:
      if (h.info === 20) return [false, p];
      if (h.info === 21) return [true, p];
      if (h.info === 22) return [null, p];
      if (h.info === 23) return [undefined, p];
      return [h.len, p];
  }
}


function setItems(b: Uint8Array, start: number): { tagBytes: Uint8Array; items: Uint8Array[] } {
  const h = readHead(b, start);
  let tagBytes: Uint8Array = new Uint8Array(0);
  let arrStart = start;
  if (h.major === 6) {
    tagBytes = b.slice(start, start + h.hdr);
    arrStart = start + h.hdr;
  }
  return { tagBytes, items: childSpans(b, arrStart).map(([s, e]) => b.slice(s, e)) };
}

export function mergeWitnessSets(existing: Uint8Array, incoming: Uint8Array): Uint8Array {
  const entries = (b: Uint8Array) => {
    const spans = childSpans(b, 0);
    const m = new Map<string, { key: Uint8Array; b: Uint8Array; vs: number; ve: number }>();
    for (let k = 0; k < spans.length; k += 2) {
      const [ks, ke] = spans[k];
      const [vs, ve] = spans[k + 1];
      m.set(bytesToHex(b.slice(ks, ke)), { key: b.slice(ks, ke), b, vs, ve });
    }
    return m;
  };
  const a = entries(existing);
  const out = new Map<string, { key: Uint8Array; raw: Uint8Array }>();
  for (const [k, v] of a) out.set(k, { key: v.key, raw: v.b.slice(v.vs, v.ve) });
  for (const [k, v] of entries(incoming)) {
    const prev = a.get(k);
    if (!prev) {
      out.set(k, { key: v.key, raw: v.b.slice(v.vs, v.ve) });
      continue;
    }
    const x = setItems(prev.b, prev.vs);
    const y = setItems(v.b, v.vs);
    const seen = new Set<string>();
    const merged: Uint8Array[] = [];
    for (const it of [...x.items, ...y.items]) {
      const hx = bytesToHex(it);
      if (!seen.has(hx)) {
        seen.add(hx);
        merged.push(it);
      }
    }
    const tag = x.tagBytes.length ? x.tagBytes : y.tagBytes;
    out.set(k, { key: prev.key, raw: concatBytes(tag, encodeHead(4, merged.length), ...merged) });
  }
  const parts: Uint8Array[] = [encodeHead(5, out.size)];
  for (const v of out.values()) parts.push(v.key, v.raw);
  return concatBytes(...parts);
}

export function spliceWitnessSet(tx: Uint8Array, walletWitnessSet: Uint8Array): Uint8Array {
  const outer = readHead(tx, 0);
  if (outer.major !== 4) throw new Error("CBOR: transaction is not an array");
  const bodyStart = outer.hdr;
  const bodyEnd = skipItem(tx, bodyStart);
  const wsEnd = skipItem(tx, bodyEnd);
  const existing = tx.slice(bodyEnd, wsEnd);
  const isEmpty = existing.length === 1 && existing[0] === 0xa0;
  const merged = isEmpty ? walletWitnessSet : mergeWitnessSets(existing, walletWitnessSet);
  return concatBytes(tx.slice(0, bodyEnd), merged, tx.slice(wsEnd));
}

export function txBodyBytes(tx: Uint8Array): Uint8Array {
  const outer = readHead(tx, 0);
  const start = outer.hdr;
  return tx.slice(start, skipItem(tx, start));
}
