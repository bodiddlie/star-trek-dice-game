import { put, select } from 'redux-saga/effects';

import { depleteCrystalReserves, refreshMission, selectors } from '../mission-phase';
import { depleteCrystals, setCrystals } from '../../dux/crystals';
import { failMission, drawMissionCard } from '../../dux/missions';
import { drawEvent, activateEvent } from '../../dux/events';

describe('Mission Phase Sagas', () => {
  describe('Deplete Crystal Reserves Saga', () => {
    let gen;
    let result;

    beforeEach(() => {
      gen = depleteCrystalReserves();
      result = gen.next();
      expect(result.value).toEqual(select(selectors.activeMission));
    });

    it('will do nothing if no mission is in play', () => {
      result = gen.next(null);
      expect(result.done).toBeTruthy();
    });

    it('will deplete the crystals if a mission is active', () => {
      result = gen.next('test');
      expect(result.value).toEqual(put(depleteCrystals()));
    });

    it('will be done if there are still crystals left after deplete', () => {
      result = gen.next('test');
      expect(result.value).toEqual(put(depleteCrystals()));
      result = gen.next();
      expect(result.value).toEqual(select(selectors.crystals));
      result = gen.next(5);
      expect(result.done).toBeTruthy();
    });

    it('will fail the mission and draw an event card if crystals reach 0', () => {
      result = gen.next('test');
      expect(result.value).toEqual(put(depleteCrystals()));
      result = gen.next();
      expect(result.value).toEqual(select(selectors.crystals));
      result = gen.next(0);
      expect(result.value).toEqual(put(failMission()));
      result = gen.next();
      expect(result.value).toEqual(put(drawEvent()));
      result = gen.next();
      expect(result.value).toEqual(select(selectors.drawnEvent));
      result = gen.next('test');
      expect(result.value).toEqual(put(activateEvent('test')));
      result = gen.next();
      expect(result.done).toBeTruthy();
    });
  });

  describe('Refresh Mission Saga', () => {
    let gen;
    let result;

    beforeEach(() => {
      gen = refreshMission();
      result = gen.next();
      expect(result.value).toEqual(select(selectors.activeMission));
    });

    it('does nothing if a mission card is already in play', () => {
      result = gen.next('test');
      expect(result.done).toBeTruthy();
    });

    it('draw an new mission, activates it, and resets crystals if no mission is active', () => {
      result = gen.next(null);
      expect(result.value).toEqual(put(drawMissionCard()));
      result = gen.next();
      expect(result.value).toEqual(select(selectors.difficulty));
      result = gen.next(2);
      expect(result.value).toEqual(put(setCrystals(9)));
      result = gen.next();
      expect(result.done).toBeTruthy();
    });
  });
});
