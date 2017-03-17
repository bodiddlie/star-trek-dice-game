// @flow

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
