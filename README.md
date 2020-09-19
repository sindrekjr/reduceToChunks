# reduceToChunks
Util for reducing arrays to chunks.

## Usage
```js
const reduceToChunks = require('reduce-to-chunks');

reduceToChunks(['One', 'Two', 'Three', 'Four']);
// --> [['One'], ['Two'], ['Three'], ['Four']]

reduceToChunks(['One', 'Two', 'Three', 'Four'], 3);
// --> [['One', 'Two', 'Three'], ['Four']]
```
