# @philiprehberger/deep-merge-ts

Type-safe deep merging of objects.

## Installation

```bash
npm install @philiprehberger/deep-merge-ts
```

## Usage

```ts
import { deepMerge, deepMergeAll } from '@philiprehberger/deep-merge-ts';

const config = deepMerge(
  { server: { port: 3000, host: 'localhost' }, debug: false },
  { server: { port: 8080 }, debug: true },
);
// { server: { port: 8080, host: 'localhost' }, debug: true }
// Return type is fully inferred

const merged = deepMergeAll([base, env, runtime]);
```

### Array Strategies

```ts
deepMerge({ tags: ['a'] }, { tags: ['b'] });
// { tags: ['b'] } — default: replace

deepMerge({ tags: ['a'] }, { tags: ['b'] }, { arrayStrategy: 'concat' });
// { tags: ['a', 'b'] }

deepMerge({ tags: ['a', 'b'] }, { tags: ['b', 'c'] }, { arrayStrategy: 'union' });
// { tags: ['a', 'b', 'c'] }
```

## API

| Function | Description |
|----------|-------------|
| `deepMerge(target, source, options?)` | Deep merge two objects with type inference |
| `deepMergeAll(objects[], options?)` | Merge N objects left-to-right |
| `isPlainObject(value)` | Check if a value is a plain object |

## License

MIT
