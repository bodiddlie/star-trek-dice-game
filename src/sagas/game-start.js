import { put, takeEvery, call } from 'redux-saga/effects';

import { setDifficulty } from '../dux/difficulty';
import { setCrystals } from '../dux/crystals';
import { eventActions, missionActions, developmentActions } from '../dux';
import { startDevelopments } from './developments';

//----------------------------------
// ACTIONS
//----------------------------------
const CHOOSE_DIFFICULTY = '[Game Start Saga] Choose Difficulty';

export function tryChooseDifficulty(difficulty) {
  return { type: CHOOSE_DIFFICULTY, difficulty };
}

//----------------------------------
// SAGAS
//----------------------------------
export function* chooseDifficulty(action) {
  const { difficulty } = action;
  yield put(setDifficulty(difficulty));
  yield put(setCrystals(10 - (difficulty - 1)));
  yield call(shuffleDecks);
  yield call(startDevelopments);
}

export function* shuffleDecks() {
  yield put(eventActions.shuffleDeck());
  yield put(missionActions.shuffleDeck());
  yield put(developmentActions.shuffleDeck());
}

export function* watchChooseDifficulty() {
  yield takeEvery(CHOOSE_DIFFICULTY, chooseDifficulty);
}

//----------------------------------
// SELECTORS
//----------------------------------
