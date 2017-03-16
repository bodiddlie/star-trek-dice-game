import { depleteCrystals } from './crystals';
import { failMission } from './missions';

export function runDepletePhase() {
  return (dispatch, getState) => {
    if (getState().missions.activeMission) {
      dispatch(depleteCrystals());
      if (getState().crystals < 1) {
        dispatch(failMission());
      }
    }
  };
}
