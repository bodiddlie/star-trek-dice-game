// @flow
import { type Action } from './types';

export const initialState: number = 0;

export default function reducer(state: number = initialState, action: Action): number {
  switch (action.type) {
    case TAKE_DAMAGE: {
      return Math.max(0, state - action.payload);
    }
    case RAISE_SHEILDS: {
      return 5;
    }
    case LOWER_SHIELDS: {
      return 0;
    }
    default: {
      return state;
    }
  }
}

const TAKE_DAMAGE = '[Shields] Take Damage';
const RAISE_SHEILDS = '[Shields] Raise Shields';
const LOWER_SHIELDS = '[Shields] Lower Shields';

export function takeDamage(amount: number): Action {
  return { type: TAKE_DAMAGE, payload: amount };
}

export function raiseShields(): Action {
  return { type: RAISE_SHEILDS, payload: null };
}

export function lowerShields(): Action {
  return { type: LOWER_SHIELDS, payload: null };
}
