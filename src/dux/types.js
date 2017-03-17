// @flow

import { type CrewState } from './crew';
import { type DevelopmentState } from './developments';
import { type EventState } from './events';
import { type MissionState } from './missions';
import { type StationState } from './stations';

export type Dispatch = (action: Action | ThunkAction) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getStat: GetState) => any;

export type Action = {
  type: string,
  payload: any,
};

export type CrewMember = {
  id: number,
  value: number,
  deployed: boolean,
  sickbay: boolean,
  locked: boolean,
  captured: boolean,
};

export type MissionCard = {
  id: number,
  title: string,
  currentStage: number,
};

export type EventCrewSlot = {
  id: number,
};

export type EventCard = {
  id: number,
  title: string,
  persistent: boolean,
  actions: Array<MissionAction>,
  crewSlots: Array<EventCrewSlot>,
};

export type DevelopmentCard = {
  id: number,
  title: string,
};

export type MissionAction = {
  id: number,
  text: string,
  actionFunc: Function,
};

export type CrewStation = {
  type: string,
  id: number,
  deployedCrewId: number,
  blocked: boolean,
};

export type GameState = {
  crew: CrewState,
  crystals: number,
  developments: DevelopmentState,
  events: EventState,
  hull: number,
  missions: MissionState,
  shields: number,
  stations: StationState,
};

export const DiceValues = ['', 'THR', 'SEC', 'ENG', 'MED', 'SCI', 'COM'];
