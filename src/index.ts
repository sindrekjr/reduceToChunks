export default function reduceToChunks(array: any[], chunkSize: number = 1): Array<any[]> {
  return chunkBySize(array, chunkSize)
}

const chunkBySize = (array: any[], chunkSizes: number): Array<any[]> => array.reduce((acc: Array<any[]>, item: any, index: number) => {
  acc[Math.floor(index / chunkSizes)].push(item);
  return acc;
}, Array.from(Array(Math.ceil(array.length / chunkSizes)), i => []));
