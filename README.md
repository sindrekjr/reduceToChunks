# reduce-to-chunks [![npm version](https://badge.fury.io/js/reduce-to-chunks.svg)](https://npmjs.com/package/reduce-to-chunks)
A small and powerful utility for reducing arrays to chunks. Any array provided to the function will be returned as an array of arrays ("chunks").

## Installation
```
$ npm i reduce-to-chunks
```

## Usage
#### `reduceToChunks(array, chunkSize = 1)`
```ts
const reduceToChunks = require('reduce-to-chunks');

reduceToChunks(['One', 'Two', 'Three', 'Four']);
// ^ [['One'], ['Two'], ['Three'], ['Four']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], 2);
// ^ [['One', 'Two'], ['Three', 'Four']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], 3);
// ^ [['One', 'Two', 'Three'], ['Four']]
```
The examples above show basic usage. An array must always be provided as the first argument, while the second argument defines chunk sizes.

#### `reduceToChunks(array, chunkFunc, preserveEmptyEntries = false)`
```ts
reduceToChunks(['One', 'Two', 'Three', 'Four'], val => val.length);
// ^ [['One', 'Two'], ['Four'], ['Three']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], (val, index) => index / 2);
// ^ [['One'], ['Three']]
```
When passing a function as the second argument, that function must return a number. This number is used to decide which chunk a given item belongs to, which allows for some very powerful grouping logic while still writing nice and concise code.

Note that when passing functions, some indices may be unused and result in undefined array entries, but these entries are removed by default. To keep undefined entries, provide `true` as the third argument when using `reduceToChunks`.
```ts
reduceToChunks(
  ['One', 'Two', 'Three', 'Four'],
  (val, index) => index * 2, 
  true
);
// ^ [['One'], undefined, ['Two'], undefined, ['Three'], undefined, ['Four']]
```
As seen above, when the given function multiplies each item's index by 2, every odd index is undefined in the resulting array.

## Import
Importing is basically the same whether you're using CommonJS or ES Modules.
```ts
const reduceToChunks = require('reduce-to-chunks'); // cjs
import reduceToChunks from 'reduce-to-chunks'; // es
```

## Features
- Written in [TypeScript](https://www.typescriptlang.org/).
- Minimally scoped.
- No dependencies.

## Contributing
Submitted issues or pull requests are welcome.
