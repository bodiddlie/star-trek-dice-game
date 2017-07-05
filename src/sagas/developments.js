import { put, select } from 'redux-saga/effects';

import { drawDevelopment, makeDevelopmentAvailable } from '../dux/developments';

export function* startDevelopments() {
  for (let i = 0; i < 3; i++) {
    yield put(drawDevelopment());
    const drawn = yield select(selectors.drawn);
    yield put(makeDevelopmentAvailable(drawn));
  }
}

//----------------------
// SELECTORS
//----------------------

export const selectors = {
  drawn: state => state.developments.drawnDevelopment,
};
