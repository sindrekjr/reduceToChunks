# reduceToChunks [![npm version](https://badge.fury.io/js/reduceToChunks.svg)](https://badge.fury.io/js/reduceToChunks)
Util for reducing arrays to chunks.

## Installation
```
$ npm i reduce-to-chunks
```

## Usage
There are two basic ways to use the function `reduceToChunks`, and both which return an array of arrays.
### `reduceToChunks(array: any[], chunkSize?: number): Array<any[]>`
In this example, we provide a number as a second param (or accept the default `1`).
```js
const reduceToChunks = require('reduce-to-chunks');

reduceToChunks(['One', 'Two', 'Three', 'Four']);
// --> [['One'], ['Two'], ['Three'], ['Four']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], 3);
// --> [['One', 'Two', 'Three'], ['Four']]
```

### `reduceToChunks(array: any[], chunkFunc: (item: any, index: number) => number, preserveEmptyEntries?: boolean): Array<any[]>`
In this usage, we  provide a function as the second param, which must resolve to a number. The number is used to decide which chunk a given item belongs to.
```js
const reduceToChunks = require('reduce-to-chunks');

reduceToChunks(['One', 'Two', 'Three', 'Four'], val => val.length);
// --> [['One', 'Two'], ['Four'], ['Three']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], (val, index) => index / 2);
// --> [['One'], ['Three']]
```

Note that when passing functions, some indices may be unused and result in undefined array entries, but these entries are removed by default. To retain empty entries, provide `true` as the third param when using `reduceToChunks`.
```js
reduceToChunks(['One', 'Two', 'Three', 'Four'], (val, index) => index * 2, true);
// --> [['One'], undefined, ['Two'], undefined, ['Three'], undefined, ['Four']]
```

## Import
Importing is basically the same whether you're using CommonJS or ES6. 
#### CJS
```js
const reduceToChunks = require('reduce-to-chunks');
```
#### ES6
```js
import reduceToChunks from 'reduce-to-chunks';
```

## Contributing
Submitted issues or pull requests are welcome.
