
export function listFrom(data: unknown, key: string): any[] {
  if (Array.isArray(data)) return data;
  const v = (data as Record<string, unknown> | null | undefined)?.[key];
  return Array.isArray(v) ? v : [];
}

export function numOrNull(v: unknown): number | null {
  if (v === null || v === undefined || v === "" || typeof v === "boolean" || typeof v === "object") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function pick(o: any, ...keys: string[]): unknown {
  for (const k of keys) if (o?.[k] !== undefined && o?.[k] !== null) return o[k];
  return undefined;
}

export const pickNum = (o: any, ...keys: string[]): number | null => numOrNull(pick(o, ...keys));
export const pickStr = (o: any, ...keys: string[]): string => {
  const v = pick(o, ...keys);
  return typeof v === "string" || typeof v === "number" ? String(v) : "";
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: unknown): s is string => typeof s === "string" && UUID.test(s);
