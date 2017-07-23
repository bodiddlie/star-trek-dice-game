import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { put, select, call } from 'redux-saga/effects';

import * as mact from '../m-actions';
import * as helpers from '../action-helpers';
import * as fromEvents from '../events';
import * as eventDeck from '../event-deck';
import * as fromHull from '../hull';
import * as fromShields from '../shields';
import * as fromCrew from '../crew';
import * as fromMissions from '../missions';
import * as fromCrystals from '../crystals';
import { clone } from '../util';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseState = {
  missions: fromMissions.initialState,
  crystals: fromCrystals.initialState,
  events: fromEvents.initialState,
  shields: fromShields.initialtate,
  hull: fromHull.initialState,
  crew: fromCrew.initialState,
};

describe('M-Actions', () => {
  describe('Draw Event', () => {
    let gen;
    let result;

    beforeEach(() => {
      gen = mact.drawEventAction();
      result = gen.next();
      expect(result.value).toEqual(put(fromEvents.drawEvent()));
      result = gen.next();
      expect(result.value).toEqual(select(mact.selectors.activeEvents));
    });

    it('will draw a new event and activate it', () => {
      result = gen.next([]);
      expect(result.value).toEqual(select(mact.selectors.drawnEvent));
      result = gen.next('test');
      expect(result.value).toEqual(put(fromEvents.activateEvent('test')));
      result = gen.next();
      expect(result.done).toBeTruthy();
    });

    it('will discard a random event if there are already 9 active', () => {
      result = gen.next([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      expect(result.value).toEqual(put(fromEvents.removeActiveEvent(4)));
      result = gen.next();
      expect(result.value).toEqual(put(fromEvents.discardEvent(4)));
      result = gen.next();
      expect(result.value).toEqual(select(mact.selectors.drawnEvent));
      result = gen.next('test');
      expect(result.value).toEqual(put(fromEvents.activateEvent('test')));
      result = gen.next();
      expect(result.done).toBeTruthy();
    });
  });

  describe('Deliver Emergency Supplies', () => {
    let gen;
    let result;

    beforeEach(() => {
      gen = mact.deliverEmergencySupplies();
      result = gen.next();
      expect(result.value).toEqual(call(mact.drawEventAction));
      result = gen.next();
      expect(result.value).toEqual(select(mact.selectors.sickbay));
    });

    it('will do nothing if any crew already in sickbay', () => {
      result = gen.next(['test']);
      expect(result.done).toBeTruthy();
    });

    it('will move one crew to sickbay if sickbay is empty', () => {
      result = gen.next([]);
      expect(result.value).toEqual(
        put(fromCrew.moveRandomCrewFromQuartersToSickbay)
      );
      result = gen.next();
      expect(result.done).toBeTruthy();
    });
  });

  describe('Investigate Spatial Anomaly', () => {
    it('will deal two damage to hull if on stage 1', () => {
      const gen = mact.investigateSpatialAnomaly();
      let result = gen.next();
      expect(result.value).toEqual(select(mact.selectors.missionStage));
      result = gen.next(1);
      expect(result.value).toEqual(call(helpers.dealDamage, 2));
    });

    it('will draw an event if stage 1 is complete', () => {
      const gen = mact.investigateSpatialAnomaly();
      let result = gen.next();
      expect(result.value).toEqual(select(mact.selectors.missionStage));
      result = gen.next(2);
      expect(result.value).toEqual(call(mact.drawEventAction));
    });
  });

  describe('Deal 1 Damage', () => {
    const gen = mact.dealOneDamage();
    let result = gen.next();
    expect(result.value).toEqual(call(helpers.dealDamage, 1));
  });

  describe('Deal 2 Damage', () => {
    const gen = mact.dealTwoDamage();
    let result = gen.next();
    expect(result.value).toEqual(call(helpers.dealDamage, 2));
  });

  describe('Escort Colonist Vessel', () => {
    let gen;
    let result;

    beforeEach(() => {
      gen = mact.escortColonistVessel();
      result = gen.next();
      expect(result.value).toEqual(select(mact.selectors.eventDeck));
    });

    describe('Raiders', () => {
      const card = { title: 'Raiders' };
      afterEach(() => {
        expect(result.value).toEqual(put(fromEvents.removeEventFromDeck(card)));
        result = gen.next();
        expect(result.value).toEqual(
          call(helpers.activateAndDiscardEvent, card)
        );
      });

      it('will search the event deck for a raiders card and activate it', () => {
        result = gen.next([card]);
      });

      it('will search the discard pile for a raiders card if not in the deck', () => {
        result = gen.next([]);
        expect(result.value).toEqual(select(mact.selectors.discardedEvents));
        result = gen.next([card]);
      });
    });

    describe('Klingon BattleCruiser', () => {
      const card = { title: 'Klingon Battlecruiser' };

      afterEach(() => {
        expect(result.value).toEqual(put(fromEvents.removeEventFromDeck(card)));
        result = gen.next();
        expect(result.value).toEqual(
          call(helpers.activateAndDiscardEvent, card)
        );
      });

      it('will search the event deck for a klingon battlecruiser card if raiders are all active', () => {
        result = gen.next([card]);
        expect(result.value).toEqual(select(mact.selectors.discardedEvents));
        result = gen.next([]);
      });

      it('will search the discard pile for a klingon battlecruiser if not in the deck', () => {
        result = gen.next([]);
        expect(result.value).toEqual(select(mact.selectors.discardedEvents));
        result = gen.next([card]);
        expect(result.value).toEqual(select(mact.selectors.discardedEvents));
        result = gen.next([card]);
      });
    });

    it('will do nothing if all raiders and battlecruisers are active', () => {
      result = gen.next([]);
      expect(result.value).toEqual(select(mact.selectors.discardedEvents));
      result = gen.next([]);
      expect(result.value).toEqual(select(mact.selectors.discardedEvents));
      result = gen.next([]);
      expect(result.done).toBeTruthy();
    });
  });
});

xdescribe('Mission Action Thunks', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = clone(baseState);
    store = mockStore(initialState);
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
      initialState.events.activeEvents = [
        eventDeck.cards.find(e => e.title === 'Alien Entity'),
      ];
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    it('does one damage if one SEC is locked in', () => {
      initialState.events.activeEvents = [
        eventDeck.cards.find(e => e.title === 'Alien Entity'),
      ];
      initialState.events.activeEvents[0].crewSlots[0].id = 1;
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(1));
    });

    it('does two damage if two SEC are locked in', () => {
      initialState.events.activeEvents = [
        eventDeck.cards.find(e => e.title === 'Alien Entity'),
      ];
      initialState.events.activeEvents[0].crewSlots[0].id = 1;
      initialState.events.activeEvents[0].crewSlots[1].id = 1;
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(2));
    });

    it('does three damage if three SEC are locked in', () => {
      initialState.events.activeEvents = [
        eventDeck.cards.find(e => e.title === 'Alien Entity'),
      ];
      initialState.events.activeEvents[0].crewSlots[0].id = 1;
      initialState.events.activeEvents[0].crewSlots[1].id = 1;
      initialState.events.activeEvents[0].crewSlots[2].id = 1;
      store.dispatch(mact.alienEntity());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(3));
    });
  });
});
