import { select, put } from 'redux-saga/effects';

import { depleteCrystals, setCrystals } from '../dux/crystals';
import { failMission, drawMissionCard } from '../dux/missions';
import { drawEvent, activateEvent } from '../dux/events';

export function* depleteCrystalReserves() {
  const activeMission = yield select(selectors.activeMission);
  if (!activeMission) return;

  yield put(depleteCrystals());
  const crystals = yield select(selectors.crystals);

  if (crystals > 0) return;

  yield put(failMission());
  yield put(drawEvent());
  const drawn = yield select(selectors.drawnEvent);
  yield put(activateEvent(drawn));
}

export function* refreshMission() {
  const activeMission = yield select(selectors.activeMission);
  if (!!activeMission) return;

  yield put(drawMissionCard());
  const difficulty = yield select(selectors.difficulty);
  yield put(setCrystals(10 - (difficulty - 1)));
}

//-----------------------
// SELECTORS
//-----------------------
export const selectors = {
  activeMission: state => state.missions.activeMission,
  crystals: state => state.crystals,
  drawnEvent: state => state.events.drawnEvent,
  difficulty: state => state.difficulty,
};
