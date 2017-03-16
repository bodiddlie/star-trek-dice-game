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
    const result = reducer(state, inc.drawEvent());
    expect(result.drawnEvent).toEqual(cards[0]);
  });

  it('can add an event to the active pile', () => {
    const result = reducer(state, inc.activateEvent(state.deck[0]));
    expect(result.activeEvents).toHaveLength(1);
  });

  it('can add an event to the discard pile', () => {
    const result = reducer(state, inc.discardEvent(state.deck[0]));
    expect(result.discardedEvents).toHaveLength(1);
  });

  it('can clear the drawn card', () => {
    state.drawnEvent = state.deck[0];
    const result = reducer(state, inc.clearDrawnEvent());
    expect(result.drawnEvent).toBeNull();
  });
  // it('removes active events at random if more than 9', () => {
  //   state.activeEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   state.drawnEvent = state.deck[0];
  //   const result = reducer(state, inc.activateDrawnEvent());
  //   expect(result.activeEvents).toContainEqual(state.deck[0]);
  //   expect(result.activeEvents).toHaveLength(9);
  //   expect(result.discardedEvents).toHaveLength(1);
  //   expect(result.drawnEvent).toBeNull();
  // });
  // it('can add an active event to the discard pile', () => {
  //   state.activeEvents = [state.deck[0]];
  //   const result = reducer(state, inc.discardActiveEvent(state.deck[0]));
  //   expect(result.discardedEvents).toHaveLength(1);
  // });
  // it('can not discard an event that is not active', () => {
  //   state.activeEvents = [state.deck[1]];
  //   const result = reducer(state, inc.discardActiveEvent(state.deck[0]));
  //   expect(result.discardedEvents).toHaveLength(0);
  // });
});
