import reducer, * as inc from '../events';
import { cards } from '../event-deck';
import { clone } from '../util';

describe('Events Reducer', () => {
  let state;

  beforeEach(() => {
    state = clone(inc.initialState);
  });

  it('loads an unshuffled deck to start with', () => {
    const result = reducer(undefined, {});
    expect(result.deck).toEqual(cards);
  });

  it('can shuffle the deck', () => {
    const result = reducer(state, inc.shuffleDeck());
    expect(result.deck).not.toEqual(cards);
  });

  it('can draw an event card', () => {
    const result = reducer(state, inc.drawEvent(1));
    expect(result.drawnEvents).toHaveLength(1);
  });

  it('can add an event to the active pile', () => {
    const result = reducer(state, inc.addActiveEvents([state.deck[0]]));
    expect(result.activeEvents).toHaveLength(1);
  });

  it('removes active events at random if more than 9', () => {
    state.activeEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = reducer(state, inc.addActiveEvents([{ id: 1 }, { id: 2 }]));
    expect(result.activeEvents).toContainEqual({ id: 1 });
    expect(result.activeEvents).toContainEqual({ id: 2 });
    expect(result.activeEvents).toHaveLength(9);
  });
});
