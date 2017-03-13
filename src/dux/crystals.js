// @flow
import {
  type Action, 
} from './types';

const DEPLETE_CRYSTALS = '[Dilithium Crystals] Deplete Crystals';
const RESET_CRYSTALS = '[Dilithium Crystals] Reset Crystals';

export default function reducer(state: number = 10, action: Action): number {
  switch (action.type) {
    case DEPLETE_CRYSTALS: {
      return Math.max(0, state - 1);
    }
    case RESET_CRYSTALS: {
      return 10;
    }
    default: {
      return state;
    }
  }
}

export function depleteCrystals(): Action {
  return {type: DEPLETE_CRYSTALS, payload: null};
}

export function resetCrystals(): Action {
  return {type: RESET_CRYSTALS, payload: null};
}