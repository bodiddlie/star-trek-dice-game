import { put, takeEvery, call } from 'redux-saga/effects';

import { setDifficulty } from '../dux/game-state';
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
  yield put(eventActions.shuffleDeck());
  yield put(missionActions.shuffleDeck());
  yield put(developmentActions.shuffleDeck());
  yield call(startDevelopments);
}

export function* watchChooseDifficulty() {
  yield takeEvery(CHOOSE_DIFFICULTY, chooseDifficulty);
}

//----------------------------------
// SELECTORS
//----------------------------------
// export const selectors = {
//   room: state => state.room,
//   player: state => state.player,
// };
