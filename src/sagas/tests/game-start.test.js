import { put, call } from 'redux-saga/effects';

import { chooseDifficulty, shuffleDecks } from '../game-start';
import { setDifficulty } from '../../dux/difficulty';
import { setCrystals } from '../../dux/crystals';
import { eventActions, missionActions, developmentActions } from '../../dux';
import { startDevelopments } from '../developments';

describe('Game Start Steps', () => {
  describe('Choose Difficulty Saga', () => {
    it('will set the state for asking for difficulty level', () => {
      const gen = chooseDifficulty({ difficulty: 1 });
      let result = gen.next();
      expect(result.value).toEqual(put(setDifficulty(1)));
      result = gen.next();
      expect(result.value).toEqual(put(setCrystals(10)));
      result = gen.next();
      expect(result.value).toEqual(call(shuffleDecks));
      result = gen.next();
      expect(result.value).toEqual(call(startDevelopments));
      result = gen.next();
      expect(result.done).toBeTruthy();
    });
  });

  describe('Shuffle Decks Saga', () => {
    it('will shuffle the three decks', () => {
      const gen = shuffleDecks();
      let result = gen.next();
      expect(result.value).toEqual(put(eventActions.shuffleDeck()));
      result = gen.next();
      expect(result.value).toEqual(put(missionActions.shuffleDeck()));
      result = gen.next();
      expect(result.value).toEqual(put(developmentActions.shuffleDeck()));
      result = gen.next();
    });
  });
});
