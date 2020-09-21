import reduceToChunks from './index';

describe('reduceToChunks(array: any[], chunkSize: number)', () => {
  it('should not throw', () => expect(() => reduceToChunks([])).not.toThrow());

  it.each([
    [
      ['One', 'Two', 'Three', 'Four'],
      undefined,
      [['One'], ['Two'], ['Three'], ['Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      2,
      [['One', 'Two'], ['Three', 'Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      3,
      [['One', 'Two', 'Three'], ['Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      4,
      [['One', 'Two', 'Three', 'Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      5,
      [['One', 'Two', 'Three', 'Four']],
    ],
  ])('should chunk correctly with sizes', (array, size, expected) => {
    expect(reduceToChunks<string>(array, size)).toEqual(expected);
  });
});

describe('reduceToChunks(array: any[], chunkFunc: IndexResolvableFunction)', () => {
  it.each([
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string) => val ? 0 : 1,
      [['One', 'Two', 'Three', 'Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string) => val === 'One' ? 0 : 1,
      [['One'], ['Two', 'Three', 'Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string) => val.length,
      [['One', 'Two'], ['Four'], ['Three']],
    ],
    [
      [1, 3, 5, 11, 7, 32, 15, 101, 16, 17, 91],
      (val: number) => val % 10,
      [[1, 11, 101, 91], [32], [3], [5, 15], [16], [7, 17]]
    ],
    [
      [
        { entry: 'apple', type: 'fruit' },
        { entry: 'orange', type: 'fruit' },
        { entry: 'pepper', type: 'spice'},
        { entry: 'celery', type: 'vegetable' },
        { entry: 'cabbage', type: 'vegetable' },
      ],
      (val: { entry: string, type: string }) => {
        if (val.type === 'fruit') return 0;
        if (val.type === 'spice') return 1;
      },
      [
        [
          { entry: 'apple', type: 'fruit' },
          { entry: 'orange', type: 'fruit' },
        ],
        [
          { entry: 'pepper', type: 'spice'},
        ],
      ],
    ],
  ])('should chunk correctly with functions that examine the value', (array, func, expected) => {
    expect(reduceToChunks<any>(array, func)).toEqual(expected);
  });

  it.each([
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string, index: number) => index,
      [['One'], ['Two'], ['Three'], ['Four']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string, index: number) => index / 2,
      [['One'], ['Three']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string, index: number) => index * 2,
      [['One'], ['Two'], ['Three'], ['Four']],
    ],
  ])('should chunk correctly with functions that examine the index', (array, func, expected) => {
    expect(reduceToChunks<string>(array, func)).toEqual(expected);
  });

  it.each([
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string) => val.length,
      [undefined, undefined, undefined, ['One', 'Two'], ['Four'], ['Three']],
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      (val: string, index: number) => index * 2,
      [['One'], undefined, ['Two'], undefined, ['Three'], undefined, ['Four']],
    ],
    [
      [1, 3, 5, 11, 7, 32, 15, 101, 16, 17, 91],
      (val: number) => val % 10,
      [undefined, [1, 11, 101, 91], [32], [3], undefined, [5, 15], [16], [7, 17]]
    ],
  ])('should keep undefined when preserveEmptyEntries is set to true', (array, func, expected) => {
    expect(reduceToChunks<any>(array, func, true)).toEqual(expected);
  });
});
