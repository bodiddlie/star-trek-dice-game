import reducer, { advanceYear } from '../year';

describe('Year Reducer', () => {
  it('has an initial value of 1', () => {
    const result = reducer(undefined, {});
    expect(result).toBe(1);
  });

  it('can advance the year by one', () => {
    const result = reducer(2, advanceYear());
    expect(result).toBe(3);
  });
});
