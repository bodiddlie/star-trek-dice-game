// @flow
import { type Action, type DevelopmentCard } from './types';
import { cards } from './development-deck';
import { clone, shuffle } from './util';

type DevelopmentState = {
  deck: Array<DevelopmentCard>,
  drawnDevelopment: ?DevelopmentCard,
  availableDevelopments: Array<DevelopmentCard>,
  discardedDevelopments: Array<DevelopmentCard>,
  claimedDevelopments: Array<DevelopmentCard>,
};

export const initialState: DevelopmentState = {
  deck: clone(cards),
  drawnDevelopment: null,
  availableDevelopments: [],
  discardedDevelopments: [],
  claimedDevelopments: [],
};

export default function reducer(state: DevelopmentState = initialState, action: Action): DevelopmentState {
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
      const availableDevelopments = [...state.availableDevelopments, action.payload];
      return { ...state, availableDevelopments };
    }
    case DISCARD_DEVELOPMENT: {
      const discardedDevelopments = [...state.discardedDevelopments, action.payload];
      return { ...state, discardedDevelopments };
    }
    case CLAIM_DEVELOPMENT: {
      const claimedDevelopments = [...state.claimedDevelopments, action.payload];
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

const SHUFFLE_DECK = '[Developments] Shuffle Deck';
const DRAW_DEVELOPMENT = '[Developments] Draw Development';
const MAKE_DEVELOPMENT_AVAILABLE = '[Devlopments] Make Development Available';
const DISCARD_DEVELOPMENT = '[Developments] Discard Development';
const CLAIM_DEVELOPMENT = '[Developments] Claim Development';
const CLEAR_DRAWN_DEVELOPMENT = '[Developments] Clear Drawn Development';

export function shuffleDeck(): Action {
  return { type: SHUFFLE_DECK, payload: null };
}

export function drawDevelopment(): Action {
  return { type: DRAW_DEVELOPMENT, payload: null };
}

export function makeDevelopmentAvailable(development: DevelopmentCard): Action {
  return { type: MAKE_DEVELOPMENT_AVAILABLE, payload: development };
}

export function discardDevelopment(development: DevelopmentCard): Action {
  return { type: DISCARD_DEVELOPMENT, payload: development };
}

export function claimDevelopment(development: DevelopmentCard): Action {
  return { type: CLAIM_DEVELOPMENT, payload: development };
}

export function clearDrawnDevelopment(): Action {
  return { type: CLEAR_DRAWN_DEVELOPMENT, payload: null };
}
