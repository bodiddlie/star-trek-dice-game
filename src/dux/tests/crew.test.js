import reducer, * as inc from '../crew';
import { type CrewMember } from '../types';

describe('Crew Reducer', () => {
  let state: Array<CrewMember>;

  beforeEach(() => {
    state = [...inc.initialState];
  });

  it('can roll a random dice roll for each crew member', () => {
    const result: Array<CrewMember> = reducer(state, inc.rollCall());
    result.forEach(c => expect(c.value).toBeGreaterThan(0));
  });
});
