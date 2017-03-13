// @flow

export type Action = {
  type: string,
  payload: any
};

export type CrewMember = {
  id: number,
  value: number,
  deployed: boolean,
  sickbay: boolean,
  locked: boolean
};
