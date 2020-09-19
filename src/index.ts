type IndexResolverFunction = {
  (item: any, index: number): number;
}

export default function reduceToChunks(array: any[], chunkSize?: number): Array<any[]>;
export default function reduceToChunks(array: any[], chunkFunc: IndexResolverFunction, preserveEmptyEntries?: boolean): Array<any[]>;
export default function reduceToChunks(array: any[], chunkRule: IndexResolverFunction | number = 1, preserveEmptyEntries?: boolean): Array<any[]> {
  if (preserveEmptyEntries) {
    return typeof chunkRule === 'number' ? chunkBySize(array, chunkRule) : chunkByFunction(array, chunkRule);
  }
  return typeof chunkRule === 'number' ? chunkBySize(array, chunkRule) : chunkByFunction(array, chunkRule).filter(entry => entry);
}

const chunkBySize = (array: any[], size: number): Array<any[]> => array.reduce((acc: Array<any[]>, item: any, index: number) => {
  acc[Math.floor(index / size)].push(item);
  return acc;
}, Array.from(Array(Math.ceil(array.length / size)), () => []));

const chunkByFunction = (array: any[], func: IndexResolverFunction): Array<any[]> => array.reduce((acc: Array<any[]>, item: any, index: number) => {
  const resolvedIndex = func(item, index);
  if (acc[resolvedIndex]) {
    acc[resolvedIndex].push(item);
  } else {
    if (wholeNumber(resolvedIndex)) acc[resolvedIndex] = [item];
  }
  return acc;
}, Array<any[]>());

const wholeNumber = (n: number) => (n - Math.floor(n)) === 0;

module.exports = reduceToChunks;
