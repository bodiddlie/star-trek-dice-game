import { type MissionAction } from './types';
import { drawEvent, removeEventFromDeck } from './events';
import { repairDamage } from './hull';
import { activateAndDiscardEvent } from './action-helpers';

const DrawEvent: MissionAction = {
  id: 1,
  text: 'Draw Event',
  actionFunc: () => {},
};

export function drawEventAction() {
  return (dispatch, getState) => {
    dispatch(drawEvent());
    const drawn = getState().events.drawnEvent;
    dispatch(activateAndDiscardEvent(drawn));
  };
}

export function raidersOrBattlecruiser() {
  return (dispatch, getState) => {
    const state = getState();
    let card = state.events.deck.find(e => e.title === 'Raiders');
    if (!card) {
      card = state.events.discardedEvents.find(e => e.title === 'Raiders');
    }
    if (!card) {
      card = state.events.deck.find(e => e.title === 'Klingon Battlecruiser');
    }
    if (!card) {
      card = state.events.discardedEvents.find(e => e.title === 'Klingon Battlecruiser');
    }
    if (card) {
      dispatch(removeEventFromDeck(card));
      dispatch(activateAndDiscardEvent(card));
    }
  };
}

export function drawTwoEvents() {
  return (dispatch, getState) => {
    dispatch(drawEvent());
    const card1 = getState().events.drawnEvent;
    dispatch(drawEvent());
    const card2 = getState().events.drawnEvent;
    dispatch(activateAndDiscardEvent(card1));
    dispatch(activateAndDiscardEvent(card2));
  };
}

export function gainOneHull() {
  return dispatch => {
    dispatch(repairDamage(1));
  };
}
