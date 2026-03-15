export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function cloneValue<T>(value: T): T {
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value instanceof RegExp) return new RegExp(value.source, value.flags) as T;
  if (value instanceof Map) return new Map(value) as T;
  if (value instanceof Set) return new Set(value) as T;
  if (value instanceof ArrayBuffer) return value.slice(0) as T;
  if (Array.isArray(value)) return [...value] as T;
  if (isPlainObject(value)) return { ...value } as T;
  return value;
}
