const TAKE_DAMAGE = '[Hull] Take Damage';
const REPAIR_DAMAGE = '[Hull] Repair Damage';

export function takeDamage(amount) {
  return { type: TAKE_DAMAGE, amount };
}

export function repairDamage(amount) {
  return { type: REPAIR_DAMAGE, amount };
}

export const initialState = 7;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TAKE_DAMAGE: {
      return Math.max(0, state - action.amount);
    }
    case REPAIR_DAMAGE: {
      return Math.min(7, state + action.amount);
    }
    default: {
      return state;
    }
  }
}
