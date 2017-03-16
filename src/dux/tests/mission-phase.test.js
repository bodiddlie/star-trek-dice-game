import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { runDepleteStep, runRefreshMissionStep } from '../mission-phase';
import { depleteCrystals, resetCrystals } from '../crystals';
import { failMission, drawMissionCard } from '../missions';
import { clone } from '../util';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseState = {
  missions: { activeMission: null },
  crystals: 10,
};

describe('Mission Phase Thunks', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = clone(baseState);
    store = mockStore(initialState);
  });

  describe('Deplete Step', () => {
    it('will not deplete a crystal if no mission is active', () => {
      store.dispatch(runDepleteStep());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    it('will deplete a crystal if a mission is active', () => {
      initialState.missions.activeMission = {};
      store.dispatch(runDepleteStep());
      const actions = store.getActions();
      expect(actions[0]).toEqual(depleteCrystals());
    });

    it('will fail a mission if the crystals deplete to zero', () => {
      initialState.missions.activeMission = {};
      initialState.crystals = 0;
      store.dispatch(runDepleteStep());
      const actions = store.getActions();
      expect(actions[1]).toEqual(failMission());
    });
  });

  describe('Refresh Mission Step', () => {
    it('will do nothing if there is an active mission', () => {
      initialState.missions.activeMission = {};
      store.dispatch(runRefreshMissionStep());
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    it('will draw a mission card if none is active', () => {
      store.dispatch(runRefreshMissionStep());
      const actions = store.getActions();
      expect(actions[0]).toEqual(drawMissionCard());
    });

    it('will set the crystals to 10 if a new mission is drawn', () => {
      store.dispatch(runRefreshMissionStep());
      const actions = store.getActions();
      expect(actions[1]).toEqual(resetCrystals());
    });
  });
});
