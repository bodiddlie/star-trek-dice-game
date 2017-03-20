// @flow
import { type ThunkAction, type Dispatch, type GetState } from './types';
import { requireActiveDiceToSickbay, requireActiveToQuarters, moveRandomCrewFromQuartersToSickbay, requireTwoCrewToSec } from './crew';
import { lowerShields, raiseShields } from './shields';
import { addCrystal } from './crystals';
import { dealDamage } from './action-helpers';

export function reportToSickbay(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(requireActiveDiceToSickbay());
  };
}

export function meteorStrike(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(dealDamage(2));
  };
}

export function loveInterest(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const crew = getState().crew.crew;
    const activeCount = crew.filter(c => c.deployed || c.locked).length;
    if (activeCount) {
      dispatch(requireActiveToQuarters());
    } else {
      dispatch(moveRandomCrewFromQuartersToSickbay());
    }
  };
}

export function solarFlare(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(lowerShields());
  };
}

export function dilithiumDeposits(amount: number): () => ThunkAction {
  return (): ThunkAction => {
    return (dispatch: Dispatch) => {
      dispatch(addCrystal(amount));
    };
  };
}

export function redAlert(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(raiseShields());
    dispatch(requireTwoCrewToSec());
  };
}
