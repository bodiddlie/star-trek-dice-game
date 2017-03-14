// @flow

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
  MAction: string,
  Steps: Array<MissionStep>,
};

export type MissionStep = {
  level: number,
  action: string,
  requirement: string,
};

export type EventCard = {
  id: number,
  title: string,
  persistent: boolean,
};
