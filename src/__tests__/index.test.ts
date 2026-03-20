import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('deep-merge-ts', () => {
  it('should export deepMerge', () => {
    assert.ok(mod.deepMerge);
  });

  it('should export deepMergeAll', () => {
    assert.ok(mod.deepMergeAll);
  });

  it('should export isPlainObject', () => {
    assert.ok(mod.isPlainObject);
  });
});
