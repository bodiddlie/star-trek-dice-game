// @flow
import { type Action, type MissionCard } from './types';
import { cards } from './mission-deck';
import { clone, shuffle } from './util';

const SHUFFLE_DECK = '[Mission] Shuffle Deck';
const DRAW_MISSION_CARD = '[Mission] Draw Mission Card';
const FAIL_MISSION = '[Mission] Fail Mission';
const COMPLETE_MISSION = '[Mission] Complete Mission';

export type MissionState = {
  deck: Array<MissionCard>,
  activeMission: ?MissionCard,
  failedMissions: Array<MissionCard>,
  completedMissions: Array<MissionCard>,
};

export const initialState: MissionState = {
  deck: clone(cards),
  activeMission: null,
  failedMissions: [],
  completedMissions: [],
  drawnMission: null,
};

export default function reducer(state: MissionState = initialState, action: Action): MissionState {
  switch (action.type) {
    case SHUFFLE_DECK: {
      return { ...state, deck: shuffle(state.deck) };
    }
    case DRAW_MISSION_CARD: {
      if (state.activeMission) return state;
      const activeMission = state.deck[0];
      const deck = [...state.deck.slice(0, 0), ...state.deck.slice(1)];
      return { ...state, deck, activeMission };
    }
    case FAIL_MISSION: {
      if (!state.activeMission) return state;
      const failedMissions = [...state.failedMissions, state.activeMission];
      return { ...state, activeMission: null, failedMissions };
    }
    case COMPLETE_MISSION: {
      if (!state.activeMission) return state;
      const completedMissions = [...state.completedMissions, state.activeMission];
      return { ...state, activeMission: null, completedMissions };
    }
    default: {
      return state;
    }
  }
}

export function shuffleDeck(): Action {
  return { type: SHUFFLE_DECK, payload: null };
}

export function drawMissionCard(): Action {
  return { type: DRAW_MISSION_CARD, payload: null };
}

export function failMission(): Action {
  return { type: FAIL_MISSION, payload: null };
}

export function completeMission(): Action {
  return { type: COMPLETE_MISSION, payload: null };
}
