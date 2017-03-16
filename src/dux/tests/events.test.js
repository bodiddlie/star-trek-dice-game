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

  it('can remove a card from the active pile', () => {
    state.activeEvents = [state.deck[0]];
    const result = reducer(state, inc.removeActiveEvent(state.deck[0]));
    expect(result.activeEvents).toHaveLength(0);
  });

  it('can remove a card from the deck', () => {
    const result = reducer(state, inc.removeEventFromDeck(state.deck[0]));
    expect(result.deck).toHaveLength(cards.length - 1);
  });
});
