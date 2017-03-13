// @flow
import { type Action } from './types';

const TAKE_DAMAGE = '[Hull] Take Damage';
const REPAIR_DAMAGE = '[Hull] Repair Damage';
const RESET_NEGATIVE_HULL = '[Hull] Reset Negative Hull';

export default function reducer(state: number = 10, action: Action): number {
  switch (action.type) {
    case TAKE_DAMAGE: {
      return state - action.payload;
    }
    case REPAIR_DAMAGE: {
      return Math.min(10, state + action.payload);
    }
    case RESET_NEGATIVE_HULL: {
      return state <= 0 ? 0 : state;
    }
    default: {
      return state;
    }
  }
}

export function takeDamage(amount: number): Action {
  return { type: TAKE_DAMAGE, payload: amount };
}

export function repairDamage(amount: number): Action {
  return { type: REPAIR_DAMAGE, payload: amount };
}

export function resetNegativeHull(): Action {
  return { type: RESET_NEGATIVE_HULL, payload: null };
}
