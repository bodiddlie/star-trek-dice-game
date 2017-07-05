import { put, call } from 'redux-saga/effects';

import { chooseDifficulty } from '../game-start';
import { setDifficulty } from '../../dux/game-state';
import { eventActions, missionActions, developmentActions } from '../../dux';
import { startDevelopments } from '../developments';

describe('Game Start Saga', () => {
  it('will set the state for asking for difficulty level', () => {
    const gen = chooseDifficulty({ difficulty: 1 });
    let result = gen.next();
    expect(result.value).toEqual(put(setDifficulty(1)));
    result = gen.next();
    expect(result.value).toEqual(put(eventActions.shuffleDeck()));
    result = gen.next();
    expect(result.value).toEqual(put(missionActions.shuffleDeck()));
    result = gen.next();
    expect(result.value).toEqual(put(developmentActions.shuffleDeck()));
    result = gen.next();
    expect(result.value).toEqual(call(startDevelopments));
    result = gen.next();
    expect(result.done).toBeTruthy();
  });
});
