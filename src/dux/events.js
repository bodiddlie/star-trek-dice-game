import { type Action, type EventCard } from './types';
import { cards } from './event-deck';
import { clone, shuffle } from './util';

type EventState = {
  deck: Array<EventCard>,
  drawnEvents: Array<EventCard>,
  activeEvents: Array<EventCard>,
};

export const initialState: EventState = {
  deck: clone(cards),
  drawnEvents: [],
  activeEvents: [],
};

export default function reducer(state: EventState = initialState, action: Action): EventState {
  switch (action.type) {
    case SHUFFLE_DECK: {
      return { ...state, deck: shuffle(state.deck) };
    }
    case DRAW_EVENT: {
      const drawnEvents = [...state.drawnEvents, state.deck.slice(0, action.payload - 1)];
      const deck = state.deck.slice(action.payload);
      return { ...state, deck, drawnEvents };
    }
    case ADD_ACTIVE_EVENTS: {
      let activeEvents;
      const overage = state.activeEvents.length + action.payload.length - 9;
      if (overage > 0) {
        const trimmed = discardRandomEvents(state.activeEvents, overage);
        activeEvents = [...trimmed, ...action.payload];
      } else {
        activeEvents = [...state.activeEvents, ...action.payload];
      }
      return { ...state, activeEvents };
    }
    default: {
      return state;
    }
  }
}

const discardRandomEvents = (events: Array<EventCard>, count: number): Array<EventCard> => {
  let newEvents = clone(events);
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * (9 - i));
    newEvents = [...newEvents.slice(0, randomIndex), ...newEvents.slice(randomIndex + 1)];
  }
  return newEvents;
};

const SHUFFLE_DECK = '[Events] Shuffle Deck';
const DRAW_EVENT = '[Events] Draw Event';
const ADD_ACTIVE_EVENTS = '[Events] Add Active Events';

export function shuffleDeck(): Action {
  return { type: SHUFFLE_DECK, payload: null };
}

export function drawEvent(numberToDraw: number): Action {
  return { type: DRAW_EVENT, payload: numberToDraw };
}

export function addActiveEvents(events: Array<EventCard>): Action {
  return { type: ADD_ACTIVE_EVENTS, payload: events };
}
