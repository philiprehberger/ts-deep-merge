export type ArrayStrategy = 'replace' | 'concat' | 'union';

export type MergeFunction = (target: unknown[], source: unknown[]) => unknown[];

export interface MergeOptions {
  arrayStrategy?: ArrayStrategy | MergeFunction;
  clone?: boolean;
}

export type DeepMerge<T, S> = S extends undefined
  ? T
  : T extends object
    ? S extends object
      ? {
          [K in keyof T | keyof S]: K extends keyof S
            ? K extends keyof T
              ? DeepMerge<T[K], S[K]>
              : S[K]
            : K extends keyof T
              ? T[K]
              : never;
        }
      : S
    : S;
