import { depleteCrystals, resetCrystals } from './crystals';
import { failMission, drawMissionCard } from './missions';

export function runDepleteStep() {
  return (dispatch, getState) => {
    if (getState().missions.activeMission) {
      dispatch(depleteCrystals());
      if (getState().crystals < 1) {
        dispatch(failMission());
      }
    }
  };
}

export function runRefreshMissionStep() {
  return (dispatch, getState) => {
    if (getState().missions.activeMission) return;
    dispatch(drawMissionCard());
    dispatch(resetCrystals());
  };
}
