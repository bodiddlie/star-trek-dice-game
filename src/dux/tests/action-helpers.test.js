import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as helpers from '../action-helpers';
import * as fromEvents from '../events';
import * as eventDeck from '../event-deck';
import * as missionDeck from '../mission-deck';
import * as fromHull from '../hull';
import * as fromShields from '../shields';
import * as fromCrew from '../crew';
import { clone } from '../util';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseState = {
  missions: { activeMission: null, deck: clone(missionDeck.cards) },
  crystals: 10,
  events: { activeEvents: [], deck: clone(eventDeck.cards), drawnEvent: null, discardedEvents: [] },
  shields: 0,
  hull: 7,
};

describe('Action Helpers', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = clone(baseState);
    store = mockStore(initialState);
  });

  describe('discardRandomEvent', () => {
    it('discards a random active event', () => {
      store.dispatch(helpers.discardRandomEvent());
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0].type).toEqual(fromEvents.actionTypes.REMOVE_ACTIVE_EVENT);
      expect(actions[1].type).toEqual(fromEvents.actionTypes.DISCARD_EVENT);
    });
  });

  describe('activateAndDiscardEvent', () => {
    it('will activate an event', () => {
      store.dispatch(helpers.activateAndDiscardEvent(eventDeck.cards[0]));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
    });

    it('will discard a random event if there are already 9 active and then activate', () => {
      initialState.events.activeEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      store.dispatch(helpers.activateAndDiscardEvent(eventDeck.cards[0]));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(fromEvents.actionTypes.REMOVE_ACTIVE_EVENT);
      expect(actions[1].type).toEqual(fromEvents.actionTypes.DISCARD_EVENT);
      expect(actions[2]).toEqual(fromEvents.activateEvent(eventDeck.cards[0]));
    });
  });

  describe('dealDamage', () => {
    it('will deal damage to the hull if the shields are down', () => {
      store.dispatch(helpers.dealDamage(1));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(1));
    });

    it('will deal damage to the shields if they are up', () => {
      initialState.shields = 5;
      store.dispatch(helpers.dealDamage(1));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromShields.takeDamage(1));
    });

    it('will deal damage to shields first and then hull if any is left over', () => {
      initialState.shields = 5;
      store.dispatch(helpers.dealDamage(7));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromShields.takeDamage(5));
      expect(actions[1]).toEqual(fromHull.takeDamage(2));
    });

    it('damage past shields and hull is stored for later', () => {
      initialState.hull = 0;
      store.dispatch(helpers.dealDamage(1));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.takeDamage(1));
    });

    it('damages shield, hull, then crew in that order', () => {
      initialState.shields = 5;
      store.dispatch(helpers.dealDamage(14));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromShields.takeDamage(5));
      expect(actions[1]).toEqual(fromHull.takeDamage(7));
      expect(actions[2]).toEqual(fromCrew.takeDamage(2));
    });
  });

  describe('dealHullDamage', () => {
    it('will deal damage to the hull bypassing the shields', () => {
      initialState.shields = 5;
      store.dispatch(helpers.dealHullDamage(1));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(1));
    });

    it('will deal damage to crew past hull', () => {
      initialState.hull = 0;
      store.dispatch(helpers.dealHullDamage(1));
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.takeDamage(1));
    });
  });
});
