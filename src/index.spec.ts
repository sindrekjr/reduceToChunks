import reduceToChunks from './index';

describe('reduceToChunks(array: any[], chunkRule: number)', () => {
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
    expect(reduceToChunks(array, size)).toEqual(expected);
  });
});

describe('reduceToChunks(array: any[], chunkRule: Function)', () => {
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
  ])('should chunk correctly with functions that examine the value', (array, func, expected) => {
    expect(reduceToChunks(array, func)).toEqual(expected);
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
    expect(reduceToChunks(array, func)).toEqual(expected);
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
  ])('should keep undefined when preserveEmptyEntries is set to true', (array, func, expected) => {
    console.log(reduceToChunks(array, func, true));
    expect(reduceToChunks(array, func, true)).toEqual(expected);
  });
});
