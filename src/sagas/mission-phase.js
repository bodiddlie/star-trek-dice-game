import { select } from 'redux-saga/effects';

export function* depleteCrystalReserves() {
  const activeMission = yield select(selectors.activeMission);
}

//-----------------------
// SELECTORS
//-----------------------
export const selectors = {
  activeMission: state => state.missions.activeMission,
};
