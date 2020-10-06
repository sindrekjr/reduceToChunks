# reduce-to-chunks [![npm version](https://badge.fury.io/js/reduce-to-chunks.svg)](https://npmjs.com/package/reduce-to-chunks)
A small and powerful utility for reducing arrays to chunks. 

- [Installation](#installation)
- [Usage](#usage)
- [Advanced Examples](#advanced-examples)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation
```
$ npm i reduce-to-chunks
```

## Usage
We use a single overloaded function, which returns a given array as an array of arrays ("chunks").
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
The snippets above show basic usage. An array must always be provided as the first argument, while the second argument defines chunk sizes.

#### `reduceToChunks(array, chunkFunc, preserveEmptyEntries = false)`
```ts
reduceToChunks(['One', 'Two', 'Three', 'Four'], val => val.length);
// ^ [['One', 'Two'], ['Four'], ['Three']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], (val, index) => index / 2);
// ^ [['One'], ['Three']]
```
When passing a function (a "chunkFunc") as the second argument, that function must return an integer. The integer returned is used to decide which chunk a given item belongs to, which allows for some very powerful grouping logic while still writing nice and concise code. See the [Advanced Examples](#advanced-examples) section for more.

### Notes
- Any item for which the chunkFunc returns undefined or a decimal number will be filtered out.
- When passing functions, some indices at the top-level may be unused and result in undefined array entries; these entries are removed by default.
- To retain undefined entries, provide `true` as the third argument.
```ts
reduceToChunks(
  ['One', 'Two', 'Three', 'Four'],
  (val, index) => index * 2, 
  true
);
// ^ [['One'], undefined, ['Two'], undefined, ['Three'], undefined, ['Four']]
```
As seen above, when the chunkFunc multiplies each item's index by 2, every odd index is undefined in the resulting array.

## Advanced Examples
### Group numbers by remainder
```ts
reduceToChunks(
  [1, 3, 5, 11, 7, 32, 15, 101, 16, 17, 91],
  val => val % 10
);
// ^ [[1, 11, 101, 91], [32], [3], [5, 15], [16], [7, 17]]
```
### Group and filter by object fields
```ts
const objects = [
  { entry: 'apple', type: 'fruit' },
  { entry: 'orange', type: 'fruit' },
  { entry: 'pepper', type: 'spice' },
  { entry: 'celery', type: 'vegetable' },
  { entry: 'cabbage', type: 'vegetable' }
];
const edibleEnum = { fruit: 0, spice: 1 };
reduceToChunks(objects, val => edibleEnum[val.type]);
// ^ [[{apple...}, {orange...}], [{pepper...}]]
```

## Features
- Written in [TypeScript](https://www.typescriptlang.org/).
- Minimally scoped.
- No dependencies.
- Uses generics.

## Contributing
Submitted issues and pull requests are welcome.

## License
[Unlicense](https://github.com/sindrekjr/reduceToChunks/blob/master/LICENSE)
