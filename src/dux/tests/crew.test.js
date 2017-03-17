// @flow
import reducer, * as inc from '../crew';
import { type CrewState } from '../crew';
import { clone } from '../util';

describe('Crew Reducer', () => {
  let state: CrewState;

  beforeEach(() => {
    state = clone(inc.initialState);
  });

  it('can roll a random dice roll for each crew member', () => {
    const result: CrewState = reducer(state, inc.rollCall());
    result.crew.forEach(c => {
      expect(c.value).toBeGreaterThan(0);
      expect(c.value).toBeLessThanOrEqual(6);
    });
  });

  it('does not roll crew that are in sickbay', () => {
    state.crew[0].sickbay = true;
    const result: CrewState = reducer(state, inc.rollCall());
    expect(result.crew[0].value).toBe(0);
  });

  it('does not roll crew that are deployed', () => {
    state.crew[0].deployed = true;
    const result: CrewState = reducer(state, inc.rollCall());
    expect(result.crew[0].value).toBe(0);
  });

  it('does not roll crew that are locked', () => {
    state.crew[0].locked = true;
    const result: CrewState = reducer(state, inc.rollCall());
    expect(result.crew[0].value).toBe(0);
  });

  it('tracks damage dealt over the hull', () => {
    const result: CrewState = reducer(state, inc.takeDamage(1));
    expect(result.remainingDamage).toBe(1);
  });

  it('can move a random dice from quarters to sickbay', () => {
    const result: CrewState = reducer(state, inc.moveRandomCrewFromQuartersToSickbay());
    expect(result.crew.filter(c => c.sickbay)).toHaveLength(1);
  });

  it('can log that an active crew dice needs to be moved to sickbay', () => {
    const result: CrewState = reducer(state, inc.requireActiveDiceToSickbay());
    expect(result.requiredToSickbayRemaining).toEqual(1);
  });
});
