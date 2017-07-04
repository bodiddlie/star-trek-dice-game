// export const gameStates = {
//   WaitingToStart: 'WAITING TO START',
//   GameStarted: 'GAME STARTED',
//   ChoosingDifficulty: 'CHOOSING DIFFICULTY',
// };

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
const SET_GAME_STARTED = '[Game State] Set Game Started';
const SET_DIFFICULTY = '[Game State] Set Difficulty';

export function setGameStarted() {
  return { type: SET_GAME_STARTED };
}

export function setDifficulty(difficulty) {
  return { type: SET_DIFFICULTY, difficulty };
}
