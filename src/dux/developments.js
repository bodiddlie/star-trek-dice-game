import { cards } from './development-deck';
import { clone, shuffle } from './util';

const SHUFFLE_DECK = '[Developments] Shuffle Deck';
const DRAW_DEVELOPMENT = '[Developments] Draw Development';
const MAKE_DEVELOPMENT_AVAILABLE = '[Devlopments] Make Development Available';
const DISCARD_DEVELOPMENT = '[Developments] Discard Development';
const CLAIM_DEVELOPMENT = '[Developments] Claim Development';
const CLEAR_DRAWN_DEVELOPMENT = '[Developments] Clear Drawn Development';

export function shuffleDeck() {
  return { type: SHUFFLE_DECK };
}

export function drawDevelopment() {
  return { type: DRAW_DEVELOPMENT };
}

export function makeDevelopmentAvailable(development) {
  return { type: MAKE_DEVELOPMENT_AVAILABLE, development };
}

export function discardDevelopment(development) {
  return { type: DISCARD_DEVELOPMENT, development };
}

export function claimDevelopment(development) {
  return { type: CLAIM_DEVELOPMENT, development };
}

export function clearDrawnDevelopment() {
  return { type: CLEAR_DRAWN_DEVELOPMENT };
}

export const initialState = {
  deck: clone(cards),
  drawnDevelopment: null,
  availableDevelopments: [],
  discardedDevelopments: [],
  claimedDevelopments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHUFFLE_DECK: {
      return { ...state, deck: shuffle(state.deck) };
    }
    case DRAW_DEVELOPMENT: {
      const drawnDevelopment = state.deck[0];
      const deck = [...state.deck.slice(1)];
      return { ...state, deck, drawnDevelopment };
    }
    case MAKE_DEVELOPMENT_AVAILABLE: {
      const availableDevelopments = [...state.availableDevelopments, action.development];
      return { ...state, availableDevelopments };
    }
    case DISCARD_DEVELOPMENT: {
      const discardedDevelopments = [...state.discardedDevelopments, action.development];
      return { ...state, discardedDevelopments };
    }
    case CLAIM_DEVELOPMENT: {
      const claimedDevelopments = [...state.claimedDevelopments, action.development];
      return { ...state, claimedDevelopments };
    }
    case CLEAR_DRAWN_DEVELOPMENT: {
      return { ...state, drawnDevelopment: null };
    }
    default: {
      return state;
    }
  }
}
