import { cards } from './event-deck';
import { clone, shuffle } from './util';

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

export function shuffleDeck() {
  return { type: SHUFFLE_DECK };
}

export function drawEvent() {
  return { type: DRAW_EVENT };
}

export function activateEvent(event) {
  return { type: ACTIVATE_EVENT, event };
}

export function discardEvent(event) {
  return { type: DISCARD_EVENT, event };
}

export function clearDrawnEvent() {
  return { type: CLEAR_DRAWN_EVENT };
}

export function removeActiveEvent(event) {
  return { type: REMOVE_ACTIVE_EVENT, event };
}

export function removeEventFromDeck(event) {
  return { type: REMOVE_EVENT_FROM_DECK, event };
}

export const initialState = {
  deck: clone(cards),
  drawnEvent: null,
  activeEvents: [],
  discardedEvents: [],
};

export default function reducer(state = initialState, action) {
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
      const activeEvents = [...state.activeEvents, action.event];
      return { ...state, activeEvents };
    }
    case DISCARD_EVENT: {
      const discardedEvents = [...state.discardedEvents, action.event];
      return { ...state, discardedEvents };
    }
    case CLEAR_DRAWN_EVENT: {
      return { ...state, drawnEvent: null };
    }
    case REMOVE_ACTIVE_EVENT: {
      const activeEvents = state.activeEvents.filter(e => e.id !== action.event.id);
      return { ...state, activeEvents };
    }
    case REMOVE_EVENT_FROM_DECK: {
      const deck = state.deck.filter(e => e.id !== action.event.id);
      return { ...state, deck };
    }
    default: {
      return state;
    }
  }
}
