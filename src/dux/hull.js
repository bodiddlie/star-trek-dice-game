// @flow
import { type Action } from './types';

export default function reducer(state: number = 10, action: Action): number {
  switch (action.type) {
    case TAKE_DAMAGE: {
      return Math.max(0, state - action.payload);
    }
    case REPAIR_DAMAGE: {
      return Math.min(7, state + action.payload);
    }
    default: {
      return state;
    }
  }
}

const TAKE_DAMAGE = '[Hull] Take Damage';
const REPAIR_DAMAGE = '[Hull] Repair Damage';

export function takeDamage(amount: number): Action {
  return { type: TAKE_DAMAGE, payload: amount };
}

export function repairDamage(amount: number): Action {
  return { type: REPAIR_DAMAGE, payload: amount };
}
