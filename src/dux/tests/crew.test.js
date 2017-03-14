// @flow
import reducer, * as inc from '../crew';
import { type CrewMember } from '../types';
import { clone } from '../util';

describe('Crew Reducer', () => {
  let state: Array<CrewMember>;

  beforeEach(() => {
    state = clone(inc.initialState);
  });

  it('can roll a random dice roll for each crew member', () => {
    const result: Array<CrewMember> = reducer(state, inc.rollCall());
    result.forEach(c => {
      expect(c.value).toBeGreaterThan(0);
      expect(c.value).toBeLessThanOrEqual(6);
    });
  });

  it('does not roll crew that are in sickbay', () => {
    state[0].sickbay = true;
    const result: Array<CrewMember> = reducer(state, inc.rollCall());
    expect(result[0].value).toBe(0);
  });

  it('does not roll crew that are deployed', () => {
    state[0].deployed = true;
    const result: Array<CrewMember> = reducer(state, inc.rollCall());
    expect(result[0].value).toBe(0);
  });

  it('does not roll crew that are locked', () => {
    state[0].locked = true;
    const result: Array<CrewMember> = reducer(state, inc.rollCall());
    expect(result[0].value).toBe(0);
  });
});
