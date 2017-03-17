import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as mact from '../m-actions';
import * as fromEvents from '../events';
import * as eventDeck from '../event-deck';
import * as fromHull from '../hull';
import * as fromShields from '../shields';
import * as fromCrew from '../crew';
import * as fromMissions from '../missions';
import * as fromCrystals from '../crystals';
import { clone } from '../util';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseState = {
  missions: fromMissions.initialState,
  crystals: fromCrystals.initialState,
  events: fromEvents.initialState,
  shields: fromShields.initialState,
  hull: fromHull.initialState,
  crew: fromCrew.initialState,
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

  describe('Deal One Damage', () => {
    it('will deal damage using the helper', () => {
      store.dispatch(mact.dealOneDamage());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(1));
    });

    it('will deal damage in the proper order', () => {
      initialState.shields = 5;
      store.dispatch(mact.dealOneDamage());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromShields.takeDamage(1));
    });
  });

  describe('Deal Two Damage', () => {
    it('will deal damage using the helper', () => {
      store.dispatch(mact.dealTwoDamage());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(2));
    });

    it('will deal damage in the proper order', () => {
      initialState.shields = 5;
      store.dispatch(mact.dealTwoDamage());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromShields.takeDamage(2));
    });
  });

  describe('Investiage Spatial Anomaly', () => {
    it('will deal two damage if stage one is incomplete', () => {
      initialState.missions.activeMission = { currentStage: 1 };
      store.dispatch(mact.investigateSpatialAnomaly());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(2));
    });

    it('will draw an event if stage one is complete', () => {
      initialState.missions.activeMission = { currentStage: 2 };
      store.dispatch(mact.investigateSpatialAnomaly());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromEvents.drawEvent());
      expect(actions).toHaveLength(2);
    });
  });

  describe('If Sickbay empty move 1 crew from quarters to sickbay', () => {
    it('will move one crew to sickbay if sickbay is empty', () => {
      store.dispatch(mact.emptySickbayMove());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.moveRandomCrewFromQuartersToSickbay());
    });

    it('will not move a crew if any are in sickbay', () => {
      initialState.crew.crew[0].sickbay = true;
      store.dispatch(mact.emptySickbayMove());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });
  });

  describe('Deal 1 Hull Damage', () => {
    it('will deal damage directly to the hull, bypassing shields', () => {
      initialState.shields = 5;
      store.dispatch(mact.dealOneHullDamage());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(1));
    });
  });

  describe('Deal 2 Hull Damage', () => {
    it('will deal damage directly to the hull, bypassing shields', () => {
      initialState.shields = 5;
      store.dispatch(mact.dealTwoHullDamage());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(2));
    });
  });

  describe('1 Active Crew Dice to Sickbay', () => {
    it('logs that an active dice needs to be moved to sickbay', () => {
      store.dispatch(mact.oneActiveCrewToSickbay());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.requireActiveDiceToSickbay());
    });
  });

  describe('Alien Entity', () => {
    it('does no damage if the event is not active', () => {
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    it('does no damage if no SEC are locked on it', () => {
      initialState.events.activeEvents = [eventDeck.cards.find(e => e.title === 'Alien Entity')];
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    it('does one damage if one SEC is locked in', () => {
      initialState.events.activeEvents = [eventDeck.cards.find(e => e.title === 'Alien Entity')];
      initialState.events.activeEvents[0].crewSlots[0].id = 1;
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(1));
    });

    it('does two damage if two SEC are locked in', () => {
      initialState.events.activeEvents = [eventDeck.cards.find(e => e.title === 'Alien Entity')];
      initialState.events.activeEvents[0].crewSlots[0].id = 1;
      initialState.events.activeEvents[0].crewSlots[1].id = 1;
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(2));
    });

    it('does three damage if three SEC are locked in', () => {
      initialState.events.activeEvents = [eventDeck.cards.find(e => e.title === 'Alien Entity')];
      initialState.events.activeEvents[0].crewSlots[0].id = 1;
      initialState.events.activeEvents[0].crewSlots[1].id = 1;
      initialState.events.activeEvents[0].crewSlots[2].id = 1;
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(3));
    });
  });
});
