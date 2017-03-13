// @flow
import {
  type Action,
} from './types';

const TAKE_DAMAGE = '[Shields] Take Damage';
const RAISE_SHEILDS = '[Shields] Raise Shields';
const LOWER_SHIELDS = '[Shields] Lower Shields';

export default function reducer(state: number = 0, action: Action): number {
  switch (action.type) {
    case TAKE_DAMAGE: {
      return state - action.payload;
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

export function takeDamage(amount: number): Action {
  return {type: TAKE_DAMAGE, payload: amount}
}

export function raiseShields(): Action {
  return {type: RAISE_SHEILDS, payload: null}
}

export function lowerShields(): Action {
  return {type: LOWER_SHIELDS, payload: null}
}