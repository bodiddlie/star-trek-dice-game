import reducer, { takeDamage, repairDamage } from '../hull';

describe('Hull Reducer', () => {
  it('has an initial value of 10', () => {
    const result = reducer(undefined, {});
    expect(result).toBe(7);
  });

  it('can apply damage to the hull', () => {
    const result = reducer(10, takeDamage(1));
    expect(result).toBe(9);
  });

  it('can apply any amount to the hull', () => {
    const result = reducer(10, takeDamage(2));
    expect(result).toBe(8);
  });

  it('can not go below 0', () => {
    const result = reducer(10, takeDamage(12));
    expect(result).toBe(0);
  });

  it('can repair damage to the hull', () => {
    const result = reducer(1, repairDamage(1));
    expect(result).toBe(2);
  });

  it('can repair any number of damage', () => {
    const result = reducer(1, repairDamage(3));
    expect(result).toBe(4);
  });

  it('can not repair past 7', () => {
    const result = reducer(6, repairDamage(3));
    expect(result).toBe(7);
  });
});
