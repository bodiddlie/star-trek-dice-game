import {
  requireActiveDiceToSickbay,
  requireActiveToQuarters,
  moveRandomCrewFromQuartersToSickbay,
  requireTwoCrewToSec,
} from './crew';
import { lowerShields, raiseShields } from './shields';
import { addCrystal } from './crystals';
import { dealDamage } from './action-helpers';

export function reportToSickbay() {
  return dispatch => {
    dispatch(requireActiveDiceToSickbay());
  };
}

export function meteorStrike() {
  return dispatch => {
    dispatch(dealDamage(2));
  };
}

export function loveInterest() {
  return (dispatch, getState) => {
    const crew = getState().crew.crew;
    const activeCount = crew.filter(c => c.deployed || c.locked).length;
    if (activeCount) {
      dispatch(requireActiveToQuarters());
    } else {
      dispatch(moveRandomCrewFromQuartersToSickbay());
    }
  };
}

export function solarFlare() {
  return dispatch => {
    dispatch(lowerShields());
  };
}

export function dilithiumDeposits(amount) {
  return () => {
    return dispatch => {
      dispatch(addCrystal(amount));
    };
  };
}

export function redAlert() {
  return dispatch => {
    dispatch(raiseShields());
    dispatch(requireTwoCrewToSec());
  };
}
