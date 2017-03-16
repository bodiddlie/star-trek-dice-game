import { combineReducers } from 'redux';
import missions from './missions';
import crystals from './crystals';

const gameState = combineReducers({
  missions,
  crystals,
});

export default gameState;
