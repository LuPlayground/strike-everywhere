import { bech32 } from "bech32";
import { bytesToHex, hexToBytes } from "../bytes.js";

const BECH32_LIMIT = 1023;

export function addressBytesToBech32(bytes: Uint8Array): string {
  const header = bytes[0];
  const type = header >> 4;
  const networkId = header & 0x0f;
  const isStake = type === 14 || type === 15;
  const prefix = isStake ? (networkId === 1 ? "stake" : "stake_test") : networkId === 1 ? "addr" : "addr_test";
  return bech32.encode(prefix, bech32.toWords(bytes), BECH32_LIMIT);
}

export function addressHexToBech32(hex: string): string {
  return addressBytesToBech32(hexToBytes(hex));
}

export function bech32ToAddressHex(address: string): string {
  const { words } = bech32.decode(address, BECH32_LIMIT);
  return bytesToHex(new Uint8Array(bech32.fromWords(words)));
}

export function shortAddress(address: string, head = 12, tail = 6): string {
  return address.length <= head + tail + 1 ? address : `${address.slice(0, head)}…${address.slice(-tail)}`;
}
