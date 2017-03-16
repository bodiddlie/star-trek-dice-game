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
    // case DISCARD_ACTIVE_EVENT: {
    //   const index = state.activeEvents.indexOf(action.payload);
    //   if (index < 0) return state;
    //   const discardedEvents = [...state.discardedEvents, state.activeEvents[index]];
    //   const activeEvents = [...state.activeEvents.slice(0, index), ...state.activeEvents.slice(index + 1)];
    //   return { ...state, activeEvents, discardedEvents };
    // }
    default: {
      return state;
    }
  }
}

// type DiscardReturn = { events: Array<EventCard>, discarded: EventCard };
// const discardRandomEvent = (events: Array<EventCard>): DiscardReturn => {
//   const randomIndex = Math.floor(Math.random() * 9);
//   const discarded = events[randomIndex];
//   const newEvents = [...events.slice(0, randomIndex), ...events.slice(randomIndex + 1)];
//   return { events: newEvents, discarded };
// };

const SHUFFLE_DECK = '[Events] Shuffle Deck';
const DRAW_EVENT = '[Events] Draw Event';
const ACTIVATE_EVENT = '[Events] Activate Event';
const DISCARD_EVENT = '[Events] Discard Event';
const CLEAR_DRAWN_EVENT = '[Events] Clear Drawn Event';

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
