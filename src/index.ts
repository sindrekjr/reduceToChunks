const chunkBySize = <T>(array: T[], size: number): Array<T[]> => array.reduce((acc: Array<T[]>, item: T, index: number) => {
  acc[Math.floor(index / size)].push(item);
  return acc;
}, Array.from(Array(Math.ceil(array.length / size)), () => []));

const chunkByFunction = <T>(array: T[], func: (item: T, index: number) => number | undefined): Array<T[]> => array.reduce((acc: Array<T[]>, item: T, index: number) => {
  const resolvedIndex = func(item, index);
  if (resolvedIndex !== undefined) {
    if (acc[resolvedIndex]) {
      acc[resolvedIndex].push(item);
    } else if (resolvedIndex - Math.floor(resolvedIndex) === 0) {
      acc[resolvedIndex] = [item];
    }
  }
  return acc;
}, []);

export default function reduceToChunks<T>(array: T[], chunkSize?: number): Array<T[]>;
export default function reduceToChunks<T>(array: T[], chunkFunc: (item: T, index: number) => number | undefined, preserveEmptyEntries?: boolean): Array<T[]>;
export default function reduceToChunks<T>(array: T[], chunkRule: ((item: T, index: number) => number | undefined) | number = 1, preserveEmptyEntries?: boolean): Array<T[]> {
  if (preserveEmptyEntries) {
    return typeof chunkRule === 'number' ? chunkBySize<T>(array, chunkRule) : chunkByFunction<T>(array, chunkRule);
  }
  return typeof chunkRule === 'number' ? chunkBySize<T>(array, chunkRule) : chunkByFunction<T>(array, chunkRule).filter(entry => entry);
}

module.exports = reduceToChunks;
