const DEPLETE_CRYSTALS = '[Dilithium Crystals] Deplete Crystals';
const RESET_CRYSTALS = '[Dilithium Crystals] Reset Crystals';
const ADD_CRYSTAL = '[Dilithium Crystals] Add Crystal';

export function depleteCrystals() {
  return { type: DEPLETE_CRYSTALS, payload: null };
}

export function resetCrystals() {
  return { type: RESET_CRYSTALS, payload: null };
}

export function addCrystal(amount) {
  return { type: ADD_CRYSTAL, amount };
}

export const initialState = 10;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DEPLETE_CRYSTALS: {
      return Math.max(0, state - 1);
    }
    case RESET_CRYSTALS: {
      return 10;
    }
    case ADD_CRYSTAL: {
      return Math.min(10, state + action.amount);
    }
    default: {
      return state;
    }
  }
}
