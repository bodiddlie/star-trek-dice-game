import reducer, * as inc from '../stations';
import { clone } from '../util';

describe('Stations reducer', () => {
  let state;

  beforeEach(() => {
    state = clone(inc.initialState);
  });

  it('logs that a station needs to be blocked', () => {
    const result = reducer(state, inc.markStationForBlock(6));
    expect(result.stationsToBlock[0]).toEqual('COM');
  });
});
