const initialState = 1;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADVANCE_YEAR: {
      return state + 1;
    }
    default: {
      return state;
    }
  }
}

const ADVANCE_YEAR = '[Year] Advance Year';

export function advanceYear() {
  return { type: ADVANCE_YEAR };
}
