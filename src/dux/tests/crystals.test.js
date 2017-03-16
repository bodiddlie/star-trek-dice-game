import reducer, { depleteCrystals, resetCrystals, addCrystal } from '../crystals';

describe('Dilithium Crystals Reducer', () => {
  it('depletes one crystal', () => {
    const result = reducer(10, depleteCrystals());
    expect(result).toBe(9);
  });

  it('does not deplete past 0', () => {
    const result = reducer(0, depleteCrystals());
    expect(result).toBe(0);
  });

  it('resets crystals to 10', () => {
    const result = reducer(5, resetCrystals());
    expect(result).toBe(10);
  });

  it('can add a crystal', () => {
    const result = reducer(5, addCrystal());
    expect(result).toBe(6);
  });

  it('can not add past 10', () => {
    const result = reducer(10, addCrystal());
    expect(result).toBe(10);
  });
});
