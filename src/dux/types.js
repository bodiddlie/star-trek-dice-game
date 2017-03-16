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
};

export type EventCard = {
  id: number,
  title: string,
  persistent: boolean,
  actions: Array<MissionAction>,
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
