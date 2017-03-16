// @flow
import { type Action } from './types';

export default function reducer(state: number = 10, action: Action): number {
  switch (action.type) {
    case DEPLETE_CRYSTALS: {
      return Math.max(0, state - 1);
    }
    case RESET_CRYSTALS: {
      return 10;
    }
    case ADD_CRYSTAL: {
      return Math.min(10, state + 1);
    }
    default: {
      return state;
    }
  }
}

const DEPLETE_CRYSTALS = '[Dilithium Crystals] Deplete Crystals';
const RESET_CRYSTALS = '[Dilithium Crystals] Reset Crystals';
const ADD_CRYSTAL = '[Dilithium Crystals] Add Crystal';

export function depleteCrystals(): Action {
  return { type: DEPLETE_CRYSTALS, payload: null };
}

export function resetCrystals(): Action {
  return { type: RESET_CRYSTALS, payload: null };
}

export function addCrystal(): Action {
  return { type: ADD_CRYSTAL, payload: null };
}
