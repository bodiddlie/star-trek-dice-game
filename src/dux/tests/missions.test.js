import reducer, * as inc from '../missions';
import { cards } from '../mission-deck';
import { clone } from '../util';

describe('Missions Reducer', () => {
  let state;

  beforeEach(() => {
    state = clone(inc.initialState);
  });

  it('loads an unshuffled deck to start with', () => {
    const result = reducer(undefined, {});
    expect(result.deck).toEqual(cards);
  });

  it('can shuffle the deck', () => {
    const result = reducer(undefined, inc.shuffleDeck());
    expect(result.deck).not.toEqual(cards);
  });

  it('can draw a mission card and make it active', () => {
    const result = reducer(undefined, inc.drawMissionCard());
    expect(result.activeMission).toEqual(cards[0]);
    expect(result.deck).toHaveLength(cards.length - 1);
  });

  it('can not draw a mission card if one is active', () => {
    state.activeMission = state.deck[0];
    const result = reducer(state, inc.drawMissionCard());
    expect(result.activeMission).toEqual(cards[0]);
    expect(result.deck).toHaveLength(cards.length);
  });

  it('can fail a mission and add it to the failed pile', () => {
    state.activeMission = state.deck[0];
    const result = reducer(state, inc.failMission());
    expect(result.activeMission).toBeNull();
    expect(result.failedMissions).toHaveLength(1);
  });

  it('can complete a mission and add it to the completed pile', () => {
    state.activeMission = state.deck[0];
    const result = reducer(state, inc.completeMission());
    expect(result.activeMission).toBeNull();
    expect(result.completedMissions).toHaveLength(1);
  });
});
