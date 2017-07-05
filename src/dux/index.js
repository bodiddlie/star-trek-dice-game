import { combineReducers } from 'redux';

import missions, * as missionActions from './missions';
import crystals from './crystals';
import events, * as eventActions from './events';
import developments, * as developmentActions from './developments';
import hull from './hull';
import shields from './shields';
import year from './year';
import difficulty from './difficulty';

const state = combineReducers({
  missions,
  crystals,
  events,
  developments,
  hull,
  shields,
  year,
  difficulty,
});

export default state;

export { missionActions, eventActions, developmentActions };
