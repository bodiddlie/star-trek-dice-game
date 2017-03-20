import { combineReducers } from 'redux';

import missions, * as missionActions from './missions';
import crystals from './crystals';
import events, * as eventActions from './events';
import developments, * as developmentActions from './developments';
import hull from './hull';

const gameState = combineReducers({
  missions,
  crystals,
  events,
  developments,
  hull,
});

export default gameState;

export { missionActions, eventActions, developmentActions };
