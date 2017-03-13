import reducer, {depleteCrystals, resetCrystals} from '../crystals';

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
});