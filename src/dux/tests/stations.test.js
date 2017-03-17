// @flow
import reducer, * as inc from '../stations';
import { type StationState } from '../stations';
import { clone } from '../util';

describe('Stations reducer', () => {
  let state: StationState;

  beforeEach(() => {
    state = clone(inc.initialState);
  });

  it('logs that a station needs to be blocked', () => {
    const result: StationState = reducer(state, inc.markStationForBlock(6));
    expect(result.stationsToBlock[0]).toEqual('COM');
  });
});
