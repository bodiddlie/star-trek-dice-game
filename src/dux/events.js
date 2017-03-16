// @flow
import { type Action, type EventCard } from './types';
import { cards } from './event-deck';
import { clone, shuffle } from './util';

type EventState = {
  deck: Array<EventCard>,
  drawnEvent: ?EventCard,
  activeEvents: Array<EventCard>,
  discardedEvents: Array<EventCard>,
};

export const initialState: EventState = {
  deck: clone(cards),
  drawnEvent: null,
  activeEvents: [],
  discardedEvents: [],
};

export default function reducer(state: EventState = initialState, action: Action): EventState {
  switch (action.type) {
    case SHUFFLE_DECK: {
      return { ...state, deck: shuffle(state.deck) };
    }
    case DRAW_EVENT: {
      const drawnEvent = state.deck[0];
      const deck = state.deck.slice(1);
      return { ...state, deck, drawnEvent };
    }
    case ACTIVATE_EVENT: {
      const activeEvents = [...state.activeEvents, action.payload];
      return { ...state, activeEvents };
    }
    case DISCARD_EVENT: {
      const discardedEvents = [...state.discardedEvents, action.payload];
      return { ...state, discardedEvents };
    }
    case CLEAR_DRAWN_EVENT: {
      return { ...state, drawnEvent: null };
    }
    case REMOVE_ACTIVE_EVENT: {
      const activeEvents = state.activeEvents.filter(e => e.id !== action.payload.id);
      return { ...state, activeEvents };
    }
    case REMOVE_EVENT_FROM_DECK: {
      const deck = state.deck.filter(e => e.id !== action.payload.id);
      return { ...state, deck };
    }
    default: {
      return state;
    }
  }
}

const SHUFFLE_DECK = '[Events] Shuffle Deck';
const DRAW_EVENT = '[Events] Draw Event';
const ACTIVATE_EVENT = '[Events] Activate Event';
const DISCARD_EVENT = '[Events] Discard Event';
const REMOVE_ACTIVE_EVENT = '[Events] Remove Active Event';
const CLEAR_DRAWN_EVENT = '[Events] Clear Drawn Event';
const REMOVE_EVENT_FROM_DECK = '[Events] Remove Event From Deck';

export const actionTypes = {
  SHUFFLE_DECK,
  DRAW_EVENT,
  ACTIVATE_EVENT,
  DISCARD_EVENT,
  REMOVE_ACTIVE_EVENT,
  CLEAR_DRAWN_EVENT,
  REMOVE_EVENT_FROM_DECK,
};

export function shuffleDeck(): Action {
  return { type: SHUFFLE_DECK, payload: null };
}

export function drawEvent(): Action {
  return { type: DRAW_EVENT, payload: null };
}

export function activateEvent(event: EventCard): Action {
  return { type: ACTIVATE_EVENT, payload: event };
}

export function discardEvent(event: EventCard): Action {
  return { type: DISCARD_EVENT, payload: event };
}

export function clearDrawnEvent(): Action {
  return { type: CLEAR_DRAWN_EVENT, payload: null };
}

export function removeActiveEvent(event: EventCard): Action {
  return { type: REMOVE_ACTIVE_EVENT, payload: event };
}

export function removeEventFromDeck(event: EventCard): Action {
  return { type: REMOVE_EVENT_FROM_DECK, payload: event };
}
