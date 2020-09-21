const chunkBySize = <T>(array: T[], size: number): Array<T[]> => array.reduce((acc: Array<T[]>, item: T, index: number) => {
  const chunkIndex = Math.floor(index / size);
  if (acc[chunkIndex]) {
    acc[chunkIndex].push(item);
  } else {
    acc[chunkIndex] = [item];
  }
  return acc;
}, []);

const chunkByFunction = <T>(array: T[], func: (item: T, index: number) => number | undefined): Array<T[]> => array.reduce((acc: Array<T[]>, item: T, index: number) => {
  const chunkIndex = func(item, index);
  if (chunkIndex !== undefined) {
    if (acc[chunkIndex]) {
      acc[chunkIndex].push(item);
    } else if (chunkIndex - Math.floor(chunkIndex) === 0) {
      acc[chunkIndex] = [item];
    }
  }
  return acc;
}, []);

export default function reduceToChunks<T>(array: T[], chunkSize?: number): Array<T[]>;
export default function reduceToChunks<T>(array: T[], chunkFunc: (item: T, index: number) => number | undefined, preserveEmptyEntries?: boolean): Array<T[]>;
export default function reduceToChunks<T>(array: T[], chunkRule: ((item: T, index: number) => number | undefined) | number = 1, preserveEmptyEntries?: boolean): Array<T[]> {
  if (preserveEmptyEntries || typeof chunkRule === 'number') {
    return typeof chunkRule === 'number' ? chunkBySize<T>(array, chunkRule) : chunkByFunction<T>(array, chunkRule);
  }
  return typeof chunkRule === 'number' ? chunkBySize<T>(array, chunkRule) : chunkByFunction<T>(array, chunkRule).filter(entry => entry);
}

module.exports = reduceToChunks;
