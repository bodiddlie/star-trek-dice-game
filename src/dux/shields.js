const TAKE_DAMAGE = '[Shields] Take Damage';
const RAISE_SHEILDS = '[Shields] Raise Shields';
const LOWER_SHIELDS = '[Shields] Lower Shields';

export function takeDamage(amount) {
  return { type: TAKE_DAMAGE, amount };
}

export function raiseShields() {
  return { type: RAISE_SHEILDS };
}

export function lowerShields() {
  return { type: LOWER_SHIELDS };
}

export const initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TAKE_DAMAGE: {
      return Math.max(0, state - action.amount);
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
