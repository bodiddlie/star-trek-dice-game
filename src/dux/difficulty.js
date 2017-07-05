export default function reducer(state = 0, action) {
  switch (action.type) {
    case SET_DIFFICULTY: {
      return action.difficulty;
    }
    default: {
      return state;
    }
  }
}

//----------------------
// ACTIONS
//----------------------
const SET_DIFFICULTY = '[Difficulty] Set Difficulty';

export function setDifficulty(difficulty) {
  return { type: SET_DIFFICULTY, difficulty };
}
