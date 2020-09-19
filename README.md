# reduceToChunks [![npm version](https://badge.fury.io/js/reduceToChunks.svg)](https://badge.fury.io/js/reduceToChunks)
Util for reducing arrays to chunks.

## Installation
```
$ npm i reduce-to-chunks
```

## Import & Usage
Import is basically the same whether you're using CommonJS or ES6.
#### CJS
```js
const reduceToChunks = require('reduce-to-chunks');
```
### ES6
```js
import reduceToChunks from 'reduce-to-chunks';
```
For using the function, simply provide an array and a number as params, which will return an array of arrays.
### `reduceToChunks(array: any[], chunkSize?: number): Array<any[]>`
```js
reduceToChunks(['One', 'Two', 'Three', 'Four']);
// --> [['One'], ['Two'], ['Three'], ['Four']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], 3);
// --> [['One', 'Two', 'Three'], ['Four']]
```
