// import { type MissionAction } from './types';
import { drawEvent, removeEventFromDeck } from './events';
import { repairDamage } from './hull';
import { moveRandomCrewFromQuartersToSickbay, requireActiveDiceToSickbay } from './crew';
import { activateAndDiscardEvent, dealDamage, dealHullDamage } from './action-helpers';

// const DrawEvent: MissionAction = {
//   id: 1,
//   text: 'Draw Event',
//   actionFunc: () => {},
// };

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

export function dealOneDamage() {
  return dispatch => {
    dispatch(dealDamage(1));
  };
}

export function dealTwoDamage() {
  return dispatch => {
    dispatch(dealDamage(2));
  };
}

export function investigateSpatialAnomaly() {
  return (dispatch, getState) => {
    if (getState().missions.activeMission.currentStage > 1) {
      dispatch(drawEventAction());
    } else {
      dispatch(dealTwoDamage());
    }
  };
}

export function emptySickbayMove() {
  return (dispatch, getState) => {
    if (getState().crew.crew.filter(c => c.sickbay).length === 0) {
      dispatch(moveRandomCrewFromQuartersToSickbay());
    }
  };
}

export function dealOneHullDamage() {
  return dispatch => {
    dispatch(dealHullDamage(1));
  };
}

export function dealTwoHullDamage() {
  return dispatch => {
    dispatch(dealHullDamage(2));
  };
}

export function oneActiveCrewToSickbay() {
  return dispatch => {
    dispatch(requireActiveDiceToSickbay());
  };
}

export function alienEntity() {
  return (dispatch, getState) => {
    const card = getState().events.activeEvents.find(e => e.title === 'Alien Entity');
    if (!card) return;

    const damage = card.crewSlots.filter(s => s.id > 0).length;
    if (damage) {
      dispatch(dealDamage(damage));
    }
  };
}
