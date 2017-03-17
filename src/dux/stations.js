// @flow
import { type Action, type CrewStation, DiceValues } from './types';

export type StationState = {
  stationsToBlock: string[],
};

export const initialState: StationState = {
  stationsToBlock: [],
};

export default function reducer(state: StationState, action: Action): StationState {
  switch (action.type) {
    case MARK_STATION_FOR_BLOCK: {
      const stationsToBlock = [...state.stationsToBlock, DiceValues[action.payload]];
      return { ...state, stationsToBlock };
    }
    default: {
      return state;
    }
  }
}

const MARK_STATION_FOR_BLOCK = '[Stations] Mark Station For Block';

export const actionTypes = {
  MARK_STATION_FOR_BLOCK,
};

export function markStationForBlock(diceValue: number): Action {
  return { type: MARK_STATION_FOR_BLOCK, payload: diceValue };
}
