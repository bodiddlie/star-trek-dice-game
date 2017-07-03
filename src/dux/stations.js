import { DiceValues } from './types';

const MARK_STATION_FOR_BLOCK = '[Stations] Mark Station For Block';

export const actionTypes = {
  MARK_STATION_FOR_BLOCK,
};

export function markStationForBlock(diceValue) {
  return { type: MARK_STATION_FOR_BLOCK, diceValue };
}

export const initialState = {
  stationsToBlock: [],
};

export default function reducer(state, action) {
  switch (action.type) {
    case MARK_STATION_FOR_BLOCK: {
      const stationsToBlock = [...state.stationsToBlock, DiceValues[action.diceValue]];
      return { ...state, stationsToBlock };
    }
    default: {
      return state;
    }
  }
}
