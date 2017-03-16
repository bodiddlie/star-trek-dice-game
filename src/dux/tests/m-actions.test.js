import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as mact from '../m-actions';
import * as fromEvents from '../events';
import * as eventDeck from '../event-deck';
import * as missionDeck from '../mission-deck';
import * as fromHull from '../hull';
import { clone } from '../util';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseState = {
  missions: { activeMission: null, deck: clone(missionDeck.cards) },
  crystals: 10,
  events: { activeEvents: [], deck: clone(eventDeck.cards), drawnEvent: null, discardedEvents: [] },
};

describe('Mission Action Thunks', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = clone(baseState);
    store = mockStore(initialState);
  });

  describe('Draw Event', () => {
    it('will draw a new event and activate it', () => {
      initialState.events.drawnEvent = eventDeck.cards[0];
      store.dispatch(mact.drawEventAction());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.drawEvent());
      expect(actions).toHaveLength(2);
    });

    it('will discard a random event if there are already 9 active', () => {
      initialState.events.drawnEvent = eventDeck.cards[0];
      initialState.events.activeEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      store.dispatch(mact.drawEventAction());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.drawEvent());
      expect(actions).toHaveLength(4);
    });
  });

  describe('Escort Colonist Vessel', () => {
    //this is one of the more complicated actions

    it('will search the event deck for a raiders card and activate it', () => {
      store.dispatch(mact.raidersOrBattlecruiser());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.removeEventFromDeck(eventDeck.cards[0]));
      expect(actions[1]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
    });

    it('will search the discard pile for a raiders card if not in the deck', () => {
      initialState.events.discardedEvents = [eventDeck.cards[0]];
      initialState.events.deck = [...initialState.events.deck.slice(1)];
      store.dispatch(mact.raidersOrBattlecruiser());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.removeEventFromDeck(eventDeck.cards[0]));
      expect(actions[1]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
    });

    it('will search the event deck for a klingon battlecruiser card if raiders are all active', () => {
      initialState.events.activeEvents = [eventDeck.cards[0]];
      initialState.events.deck = [...initialState.events.deck.slice(1)];
      store.dispatch(mact.raidersOrBattlecruiser());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.removeEventFromDeck(eventDeck.cards[1]));
      expect(actions[1]).toEqual(fromEvents.activateEvent(eventDeck.cards[1]));
    });

    it('will search the discard pile for a klingon battlecruiser if not in the deck', () => {
      initialState.events.activeEvents = [eventDeck.cards[0]];
      initialState.events.discardedEvents = [eventDeck.cards[1]];
      initialState.events.deck = [...initialState.events.deck.slice(2)];
      store.dispatch(mact.raidersOrBattlecruiser());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.removeEventFromDeck(eventDeck.cards[1]));
      expect(actions[1]).toEqual(fromEvents.activateEvent(eventDeck.cards[1]));
    });

    it('will do nothing if all raiders and battlecruisers are active', () => {
      initialState.events.activeEvents = [eventDeck.cards[0], eventDeck.cards[1]];
      initialState.events.deck = [...initialState.events.deck.slice(2)];
      store.dispatch(mact.raidersOrBattlecruiser());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    it('will discard a random event if there are already 9 active', () => {
      initialState.events.activeEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      store.dispatch(mact.raidersOrBattlecruiser());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.removeEventFromDeck(eventDeck.cards[0]));
      expect(actions[1].type).toEqual(fromEvents.actionTypes.REMOVE_ACTIVE_EVENT);
      expect(actions[2].type).toEqual(fromEvents.actionTypes.DISCARD_EVENT);
      expect(actions[3]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
    });
  });

  describe('Draw 2 Events', () => {
    it('will draw 2 events and activate them', () => {
      initialState.events.drawnEvent = eventDeck.cards[0];
      store.dispatch(mact.drawTwoEvents());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.drawEvent());
      expect(actions[1]).toEqual(fromEvents.drawEvent());
      expect(actions[2]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
      expect(actions[3]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
    });
  });

  describe('Gain 1 Hull', () => {
    it('will add 1 hull', () => {
      store.dispatch(mact.gainOneHull());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.repairDamage(1));
      expect(actions).toHaveLength(1);
    });
  });
});
