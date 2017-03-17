// @flow
import { type Action, type CrewMember } from './types';
import { rollD6 } from './util';

export type CrewState = {
  crew: Array<CrewMember>,
  remainingDamage: number,
};

export const initialState: CrewState = {
  crew: [
    { id: 1, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 2, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 3, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 4, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 5, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 6, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 7, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 8, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 9, value: 0, deployed: false, sickbay: false, locked: false },
    { id: 10, value: 0, deployed: false, sickbay: false, locked: false },
  ],
  remainingDamage: 0,
};

export default function reducer(state: CrewState, action: Action): CrewState {
  switch (action.type) {
    case ROLL_CALL: {
      return { ...state, crew: state.crew.map(rollCrewMember) };
    }
    case TAKE_DAMAGE: {
      return { ...state, remainingDamage: state.remainingDamage + action.payload };
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

const ROLL_CALL = '[Crew] Roll Call';
const TAKE_DAMAGE = '[Crew] Take Damage';

export function rollCall(): Action {
  return { type: ROLL_CALL, payload: null };
}

export function takeDamage(amount: number): Action {
  return { type: TAKE_DAMAGE, payload: amount };
}
