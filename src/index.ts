const chunkBySize = (array: any[], size: number): Array<any[]> => array.reduce((acc: Array<any[]>, item: any, index: number) => {
  acc[Math.floor(index / size)].push(item);
  return acc;
}, Array.from(Array(Math.ceil(array.length / size)), () => []));

const chunkByFunction = (array: any[], func: (item: any, index: number) => number | undefined): Array<any[]> => array.reduce((acc: Array<any[]>, item: any, index: number) => {
  const resolvedIndex = func(item, index);
  if (resolvedIndex != undefined) {
    if (acc[resolvedIndex]) {
      acc[resolvedIndex].push(item);
    } else if (resolvedIndex - Math.floor(resolvedIndex) === 0) {
      acc[resolvedIndex] = [item];
    }
  }
  return acc;
}, []);

export default function reduceToChunks(array: any[], chunkSize?: number): Array<any[]>;
export default function reduceToChunks(array: any[], chunkFunc: (item: any, index: number) => number | undefined, preserveEmptyEntries?: boolean): Array<any[]>;
export default function reduceToChunks(array: any[], chunkRule: ((item: any, index: number) => number | undefined) | number = 1, preserveEmptyEntries?: boolean): Array<any[]> {
  if (preserveEmptyEntries) {
    return typeof chunkRule === 'number' ? chunkBySize(array, chunkRule) : chunkByFunction(array, chunkRule);
  }
  return typeof chunkRule === 'number' ? chunkBySize(array, chunkRule) : chunkByFunction(array, chunkRule).filter(entry => entry);
}

module.exports = reduceToChunks;
