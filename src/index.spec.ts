import reduceToChunks from './index';

describe('reduceToChunks(array: any[], rule: number)', () => {
  it('should not throw', () => expect(() => reduceToChunks([])).not.toThrow());

  it.each([
    [
      ['One', 'Two', 'Three', 'Four'],
      undefined,
      [['One'], ['Two'], ['Three'], ['Four']]
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      2,
      [['One', 'Two'], ['Three', 'Four']]
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      3,
      [['One', 'Two', 'Three'], ['Four']]
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      4,
      [['One', 'Two', 'Three', 'Four']]
    ],
    [
      ['One', 'Two', 'Three', 'Four'],
      5,
      [['One', 'Two', 'Three', 'Four']]
    ],
  ])('should chunk correctly', (array, chunkSize, expected) => {
    expect(reduceToChunks(array, chunkSize)).toEqual(expected);
  })
});
