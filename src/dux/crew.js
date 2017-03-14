// @flow
import { type Action, type CrewMember } from './types';
import { rollD6 } from './util';

const ROLL_CALL = '[Crew] Roll Call';

export const initialState = [
  { id: 1, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 2, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 3, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 4, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 5, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 6, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 7, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 8, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 9, value: 0, deployed: false, sickbay: false, locked: false },
  { id: 10, value: 0, deployed: false, sickbay: false, locked: false }
];

export default function reducer(
  state: Array<CrewMember>,
  action: Action
): Array<CrewMember> {
  switch (action.type) {
    case ROLL_CALL: {
      return state.map(rollCrewMember);
    }
    default: {
      return state;
    }
  }
}

function rollCrewMember(member: CrewMember): CrewMember {
  if (!member.sickbay && !member.deployed && !member.locked) {
    return { ...member, value: rollD6() };
  }
  return { ...member };
}

export function rollCall(): Action {
  return { type: ROLL_CALL, payload: null };
}
