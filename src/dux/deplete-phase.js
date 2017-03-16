import { depleteCrystals } from './crystals';
import { failMission } from './missions';

export function runDepletePhase() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.missions.activeMission) {
      return Promise.resolve();
    }
    if (state.missions.activeMission) {
      return dispatch(doDeplete()).then(() => {
        if (getState().crystals < 1) {
          return dispatch(failMission());
        }
      });
    }
  };
}

function doDeplete() {
  return (dispatch, getState) => {
    return Promise.resolve(dispatch(depleteCrystals()));
  };
}
