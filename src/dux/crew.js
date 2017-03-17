// @flow
import { type Action, type CrewMember } from './types';
import { rollD6 } from './util';

export type CrewState = {
  crew: Array<CrewMember>,
  remainingDamage: number,
  requiredToSickbayRemaining: number,
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
  requiredToSickbayRemaining: 0,
};

export default function reducer(state: CrewState, action: Action): CrewState {
  switch (action.type) {
    case ROLL_CALL: {
      return { ...state, crew: state.crew.map(rollCrewMember) };
    }
    case TAKE_DAMAGE: {
      return { ...state, remainingDamage: state.remainingDamage + action.payload };
    }
    case MOVE_RANDOM_CREW_FROM_QUARTERS_TO_SICKBAY: {
      const crew = [...state.crew];
      let found = false;
      while (!found) {
        const randomIndex = Math.floor(Math.random() * 10);
        if (!crew[randomIndex].deployed && !crew[randomIndex].locked && !crew[randomIndex].deployed) {
          crew[randomIndex].sickbay = true;
          found = true;
        }
      }
      return { ...state, crew };
    }
    case REQUIRE_ACTIVE_DICE_TO_SICKBAY: {
      const requiredToSickbayRemaining = state.requiredToSickbayRemaining + 1;
      return { ...state, requiredToSickbayRemaining };
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
const MOVE_RANDOM_CREW_FROM_QUARTERS_TO_SICKBAY = '[Crew] Move Random Crew From Quaters To Sickbay';
const REQUIRE_ACTIVE_DICE_TO_SICKBAY = '[Crew] Require Active Dice to Sickbay';

export function rollCall(): Action {
  return { type: ROLL_CALL, payload: null };
}

export function takeDamage(amount: number): Action {
  return { type: TAKE_DAMAGE, payload: amount };
}

export function moveRandomCrewFromQuartersToSickbay(): Action {
  return { type: MOVE_RANDOM_CREW_FROM_QUARTERS_TO_SICKBAY, payload: null };
}

export function requireActiveDiceToSickbay(): Action {
  return { type: REQUIRE_ACTIVE_DICE_TO_SICKBAY, payload: null };
}
