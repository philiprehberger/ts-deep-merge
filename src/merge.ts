import type { MergeOptions, DeepMerge } from './types';
import { isPlainObject, cloneValue } from './utils';

function mergeArrays(target: unknown[], source: unknown[], options: MergeOptions): unknown[] {
  const strategy = options.arrayStrategy ?? 'replace';

  if (typeof strategy === 'function') {
    return strategy(target, source);
  }

  switch (strategy) {
    case 'concat':
      return [...target, ...source];
    case 'union':
      return [...new Set([...target, ...source])];
    case 'replace':
    default:
      return source;
  }
}

function mergeInternal(target: unknown, source: unknown, options: MergeOptions, seen: WeakSet<object>): unknown {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return options.clone ? cloneValue(source) : source;
  }

  if (seen.has(source)) {
    return source;
  }
  seen.add(source);

  const result: Record<string, unknown> = options.clone ? { ...target } : target;

  for (const key of Object.keys(source)) {
    const targetVal = target[key];
    const sourceVal = source[key];

    if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
      result[key] = mergeArrays(targetVal, sourceVal, options);
    } else if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {
      result[key] = mergeInternal(targetVal, sourceVal, options, seen);
    } else {
      result[key] = options.clone ? cloneValue(sourceVal) : sourceVal;
    }
  }

  return result;
}

export function deepMerge<T extends object, S extends object>(
  target: T,
  source: S,
  options?: MergeOptions,
): DeepMerge<T, S> {
  const opts: MergeOptions = { clone: true, ...options };
  return mergeInternal(target, source, opts, new WeakSet()) as DeepMerge<T, S>;
}

export function deepMergeAll<T extends object>(objects: T[], options?: MergeOptions): T {
  if (objects.length === 0) return {} as T;
  return objects.reduce((acc, obj) => deepMerge(acc, obj, options) as T);
}
