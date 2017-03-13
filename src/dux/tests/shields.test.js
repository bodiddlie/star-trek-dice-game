import reducer, {takeDamage, raiseShields, lowerShields} from '../shields';

describe('Shield Reducer', () => {
  it('has an initial value of 0', () => {
    const result = reducer(undefined, {});
    expect(result).toBe(0);
  });

  it('applies damage to the shields', () => {
    const result = reducer(5, takeDamage(1));
    expect(result).toBe(4);
  });

  it('can apply any number of damage', () => {
    const result = reducer(5, takeDamage(2));
    expect(result).toBe(3);
  });

  it('can return a negative amount', () => {
    const result = reducer(5, takeDamage(10));
    expect(result).toBe(-5);
  });

  it('can raise the shields', () => {
    const result = reducer(0, raiseShields());
    expect(result).toBe(5);
  });

  it('can lower the shields', () => {
    const result = reducer(5, lowerShields());
    expect(result).toBe(0);
  });
});