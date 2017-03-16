import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { runDepletePhase } from '../deplete-phase';
import { depleteCrystals } from '../crystals';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  missions: { activeMission: null },
  crystals: 10,
};

describe('Deplete Phase Thunks', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('will not deplete a crystal if no mission is active', () => {
    store.dispatch(runDepletePhase());
    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });

  it('will deplete a crystal if a mission is active', () => {
    initialState.missions.activeMission = {};
    store.dispatch(runDepletePhase());
    const actions = store.getActions();
    expect(actions[0]).toEqual(depleteCrystals());
  });
});
