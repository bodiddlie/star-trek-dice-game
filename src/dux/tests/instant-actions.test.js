// @flow
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { type GameState } from '../types';
import * as iact from '../instant-actions';
import * as fromEvents from '../events';
import * as eventDeck from '../event-deck';
import * as fromHull from '../hull';
import * as fromShields from '../shields';
import * as fromCrew from '../crew';
import * as fromMissions from '../missions';
import * as fromCrystals from '../crystals';
import * as fromStations from '../stations';
import { clone } from '../util';
import { baseState } from './base-state';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Instant Action Thunks', () => {
  let store;
  let initialState: GameState;

  beforeEach(() => {
    initialState = clone(baseState);
    store = mockStore(initialState);
  });

  describe('Report to Sickbay', () => {
    it('will log that one crew needs to move to sickbay', () => {
      store.dispatch(iact.reportToSickbay());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.requireActiveDiceToSickbay());
    });
  });

  describe('Meteor Strike', () => {
    it('deals two damage', () => {
      store.dispatch(iact.meteorStrike());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromHull.takeDamage(2));
    });
  });

  describe('Love Interest', () => {
    it('logs that one active crew dice needs to be moved to quarters', () => {
      initialState.crew.crew[0].deployed = true;
      store.dispatch(iact.loveInterest());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.requireActiveToQuarters());
    });

    it('randomly moves a die to sickbay if all are in quarters', () => {
      store.dispatch(iact.loveInterest());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.moveRandomCrewFromQuartersToSickbay());
    });

    it('counts locked crew as active', () => {
      initialState.crew.crew[0].locked = true;
      store.dispatch(iact.loveInterest());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.requireActiveToQuarters());
    });

    it('does not count captured as active', () => {
      initialState.crew.crew[0].captured = true;
      store.dispatch(iact.loveInterest());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrew.moveRandomCrewFromQuartersToSickbay());
    });
  });

  describe('Solar Flare', () => {
    it('lowers the shields', () => {
      store.dispatch(iact.solarFlare());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromShields.lowerShields());
    });
  });

  describe('Dilithium Deposits', () => {
    it('adds 3 crystals to the dilithium track', () => {
      store.dispatch(iact.dilithiumDeposits(3)());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrystals.addCrystal(3));
    });

    it('adds any number to the track', () => {
      store.dispatch(iact.dilithiumDeposits(2)());
      const actions = store.getActions();
      expect(actions[0]).toEqual(fromCrystals.addCrystal(2));
    });
  });
});
