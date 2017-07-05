import { put, select } from 'redux-saga/effects';

import { startDevelopments, selectors } from '../developments';
import { drawDevelopment, makeDevelopmentAvailable } from '../../dux/developments';

describe('Development Sagas', () => {
  it('can start the game with 3 active developments', () => {
    const gen = startDevelopments();
    let result = gen.next();

    for (let i = 0; i < 3; i++) {
      expect(result.value).toEqual(put(drawDevelopment()));
      result = gen.next();
      expect(result.value).toEqual(select(selectors.drawn));
      result = gen.next('test');
      expect(result.value).toEqual(put(makeDevelopmentAvailable('test')));
      result = gen.next();
    }

    expect(result.done).toBeTruthy();
  });
});
