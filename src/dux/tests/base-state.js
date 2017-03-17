import { type GameState } from '../types';
import { initialState as crew } from '../crew';
import { initialState as crystals } from '../crystals';
import { initialState as developments } from '../developments';
import { initialState as events } from '../events';
import { initialState as hull } from '../hull';
import { initialState as missions } from '../missions';
import { initialState as shields } from '../shields';

export const baseState: GameState = {
  crew,
  crystals,
  developments,
  events,
  hull,
  missions,
  shields,
};
