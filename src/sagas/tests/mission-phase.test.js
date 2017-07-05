import { put, select } from 'redux-saga/effects';

import { depleteCrystalReserves, refreshMission, selectors } from '../mission-phase';

describe('Mission Phase Sagas', () => {
  describe('Deplete Crystal Reserves Saga', () => {
    it('it will do nothing if no mission is in play', () => {
      const gen = depleteCrystalReserves();
      let result = gen.next();
      expect(result.value).toEqual(select(selectors.activeMission));
      result = gen.next(null);
      expect(result.done).toBeTruthy();
    });
  });
  describe('Refresh Mission Saga', () => {
    it('do nothing if a mission card is already in play', () => {});
  });
});
