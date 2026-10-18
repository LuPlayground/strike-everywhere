import { describe, expect, it } from "vitest";
import { bytesToHex, concatBytes, hexToBytes } from "../src/bytes.js";
import { decode, readHead, skipItem, spliceWitnessSet, txBodyBytes } from "../src/cardano/cbor.js";
import { previewTransaction } from "../src/cardano/txPreview.js";
import { addressHexToBech32, bech32ToAddressHex } from "../src/cardano/address.js";

const UNSIGNED_TX =
  "84a600d9010281825820df528e680b2fa6f7e0f133f32ec3058154941a67c1e4f2d1495690542d48ec73010182a30058390037a512f8f1bf8462dfcd4b541bcaf5450875ccdc2bca4a50b3adccf2314378a0eea93f9a5f08722fd429a76016fa9bf96e5a40fc0660fbcf011a02faf080028201d8185877d8799f582465323465663763382d623031312d346437372d626563312d393336383339656136313136582430316131353066302d653162342d373066662d613038662d303035393535656261386161581c794e1bcebcc2924f76a268fe316c8c5c860e1bf21a30fe1f0d9a23001b000001a1513116b0ff82583900794e1bcebcc2924f76a268fe316c8c5c860e1bf21a30fe1f0d9a2300c0ff34e6017364a5c32142823c88991503e80fcefd1560b317f0cd661b00000002331fa97e021a0002b041031a08258c86081a082585060ed9010281581c794e1bcebcc2924f76a268fe316c8c5c860e1bf21a30fe1f0d9a2300a0f5f6";

const USER_ADDR = "addr_test1qpu5ux7whnpfynmk5f50uvtv33wgvrsm7gdrplslpkdzxqxqlu6wvqtnvjjuxg2zsg7g3xg4q05qlnhaz4stx9lse4nqqsvhtq";

const fakeWitnessSet = () =>
  concatBytes(hexToBytes("a10081825820"), new Uint8Array(32).fill(7), hexToBytes("5840"), new Uint8Array(64).fill(9));

describe("CBOR walker", () => {
  it("parses the transaction as a 4-element array", () => {
    const tx = hexToBytes(UNSIGNED_TX);
    const h = readHead(tx, 0);
    expect(h.major).toBe(4);
    expect(h.len).toBe(4);
    let p = h.hdr;
    for (let i = 0; i < 4; i++) p = skipItem(tx, p);
    expect(p).toBe(tx.length);
  });
});

describe("spliceWitnessSet", () => {
  it("keeps body bytes identical and replaces the empty witness set", () => {
    const tx = hexToBytes(UNSIGNED_TX);
    const ws = fakeWitnessSet();
    expect(ws.length).toBe(104);
    const signed = spliceWitnessSet(tx, ws);
    expect(bytesToHex(txBodyBytes(signed))).toBe(bytesToHex(txBodyBytes(tx)));
    expect(signed.length).toBe(tx.length - 1 + ws.length);
    const [decoded] = decode(signed);
    const arr = decoded as any[];
    expect(arr).toHaveLength(4);
    const wsMap = arr[1] as Map<any, any>;
    expect(wsMap.get(0)).toHaveLength(1);
    expect(arr[2]).toBe(true);
    expect(arr[3]).toBe(null);
  });

  it("merges into an existing witness set without duplicating", () => {
    const tx = hexToBytes(UNSIGNED_TX);
    const once = spliceWitnessSet(tx, fakeWitnessSet());
    const twice = spliceWitnessSet(once, fakeWitnessSet());
    expect(bytesToHex(twice)).toBe(bytesToHex(once));
  });
});

describe("previewTransaction", () => {
  it("decodes outputs, fee and inputs of the real deposit", () => {
    const p = previewTransaction(UNSIGNED_TX);
    expect(p.fee).toBe(176193n);
    expect(p.inputCount).toBe(1);
    expect(p.outputs).toHaveLength(2);
    const [deposit, change] = p.outputs;
    expect(deposit.lovelace).toBe(50_000_000n);
    expect(deposit.hasDatum).toBe(true);
    expect(deposit.address.startsWith("addr_test1qqm62yhc")).toBe(true);
    expect(change.address).toBe(USER_ADDR);
    expect(change.hasDatum).toBe(false);
  });
});

describe("addresses", () => {
  it("round-trips bech32 <-> hex", () => {
    const hex = bech32ToAddressHex(USER_ADDR);
    expect(hex.startsWith("00794e1bce")).toBe(true);
    expect(addressHexToBech32(hex)).toBe(USER_ADDR);
  });
});
