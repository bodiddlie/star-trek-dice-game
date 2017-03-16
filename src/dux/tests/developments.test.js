import reducer, * as inc from '../developments';
import { cards } from '../development-deck';
import { clone } from '../util';

describe('Developments Reducer', () => {
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

  it('can draw a development', () => {
    const result = reducer(state, inc.drawDevelopment());
    expect(result.drawnDevelopment).toEqual(cards[0]);
    expect(result.deck).toHaveLength(cards.length - 1);
  });

  it('can make a development available', () => {
    const result = reducer(state, inc.makeDevelopmentAvailable(state.deck[0]));
    expect(result.availableDevelopments).toHaveLength(1);
  });

  it('can discard a development', () => {
    const result = reducer(state, inc.discardDevelopment(state.deck[0]));
    expect(result.discardedDevelopments).toHaveLength(1);
  });

  it('can claim a development', () => {
    const result = reducer(state, inc.claimDevelopment(state.deck[0]));
    expect(result.claimedDevelopments).toHaveLength(1);
  });

  it('can clear the drawn development', () => {
    state.drawnDevelopment = state.deck[0];
    const result = reducer(state, inc.clearDrawnDevelopment());
    expect(result.drawnDevelopment).toBeNull();
  });
});
