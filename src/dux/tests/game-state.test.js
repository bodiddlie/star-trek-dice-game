import reducer, { setDifficulty } from '../game-state';

describe('Game State Reducer', () => {
  it('difficulty starts at 0', () => {
    const result = reducer(undefined, {});
    expect(result).toBe(0);
  });

  it('can set the difficulty', () => {
    const result = reducer(undefined, setDifficulty(1));
    expect(result).toBe(1);
  });
});
