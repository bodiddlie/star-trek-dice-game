import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../index';

import { runDepletePhase } from '../deplete-phase';

describe('Deplete Phase Thunks Full', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      missions: { activeMission: null, failedMissions: [] },
      crystals: 10,
    };
    store = createStore(reducer, initialState, applyMiddleware(thunk));
  });

  it('will not deplete a crystal if no mission is active', () => {
    return store.dispatch(runDepletePhase()).then(() => {
      const state = store.getState();
      expect(state.crystals).toBe(10);
    });
  });

  it('will deplete a crystal if a mission is active', () => {
    initialState.missions.activeMission = {};
    return store.dispatch(runDepletePhase()).then(() => {
      const state = store.getState();
      expect(state.crystals).toBe(9);
    });
  });

  it('will fail a mission if the crystals deplete to zero', () => {
    initialState.missions.activeMission = {};
    initialState.crystals = 1;
    return store.dispatch(runDepletePhase()).then(() => {
      const state = store.getState();
      expect(state.missions.failedMissions).toHaveLength(1);
    });
  });
});
