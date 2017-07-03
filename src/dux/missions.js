import { cards } from './mission-deck';
import { clone, shuffle } from './util';

const SHUFFLE_DECK = '[Mission] Shuffle Deck';
const DRAW_MISSION_CARD = '[Mission] Draw Mission Card';
const FAIL_MISSION = '[Mission] Fail Mission';
const COMPLETE_MISSION = '[Mission] Complete Mission';

export function shuffleDeck() {
  return { type: SHUFFLE_DECK };
}

export function drawMissionCard() {
  return { type: DRAW_MISSION_CARD };
}

export function failMission() {
  return { type: FAIL_MISSION };
}

export function completeMission() {
  return { type: COMPLETE_MISSION };
}

export const initialState = {
  deck: clone(cards),
  activeMission: null,
  failedMissions: [],
  completedMissions: [],
  drawnMission: null,
};

export default function reducer(state = initialState, action) {
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
