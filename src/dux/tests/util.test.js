import * as util from '../util';

describe('Util Functions', () => {
  it('can roll a random number from 1 - 6', () => {
    for (let i = 0; i < 100; i++) {
      const result = util.rollD6();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });

  it('can clone an object', () => {
    const o = { id: 1, name: 'test' };
    const result = util.clone(o);
    expect(result).toEqual(o);
    expect(result).not.toBe(o);
  });

  it('can clone an array', () => {
    const a = [{ id: 1 }, { id: 2 }];
    const result = util.clone(a);
    expect(result).toEqual(a);
    expect(result).not.toBe(a);
  });

  it('can shuffle an array', () => {
    const a = [1, 2, 3, 4, 5];
    const result = util.shuffle(a);
    expect(result).not.toEqual(a);
  });
});
