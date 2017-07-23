import { put, select, call } from 'redux-saga/effects';
import {
  drawEvent,
  removeEventFromDeck,
  activateEvent,
  removeActiveEvent,
  discardEvent,
} from './events';
import { repairDamage } from './hull';
import {
  moveRandomCrewFromQuartersToSickbay,
  requireActiveDiceToSickbay,
} from './crew';
import {
  activateAndDiscardEvent,
  dealDamage,
  dealHullDamage,
} from './action-helpers';

export const selectors = {
  drawnEvent: state => state.events.drawnEvent,
  activeEvents: state => state.events.activeEvents,
  sickbay: state => state.crew.crew.filter(c => c.sickbay),
  missionStage: state => state.missions.activeMission.currentStage,
  eventDeck: state => state.events.deck,
  discardedEvents: state => state.events.discardedEvents,
};

export function* drawEventAction() {
  yield put(drawEvent());
  const activeEvents = yield select(selectors.activeEvents);
  if (activeEvents.length >= 9) {
    const randomIndex = Math.floor(Math.random() * 9);
    const discarded = activeEvents[randomIndex];
    yield put(removeActiveEvent(discarded));
    yield put(discardEvent(discarded));
  }
  const drawn = yield select(selectors.drawnEvent);
  yield put(activateEvent(drawn));
}

export function* deliverEmergencySupplies() {
  yield call(drawEventAction);
  const crewInSickbay = yield select(selectors.sickbay);
  if (crewInSickbay.length === 0) {
    yield put(moveRandomCrewFromQuartersToSickbay);
  }
}

export function* investigateSpatialAnomaly() {
  const currentStage = yield select(selectors.missionStage);
  if (currentStage === 1) {
    yield call(dealDamage, 2);
  }
  yield call(drawEventAction);
}

export function* dealOneDamage() {
  yield call(dealDamage, 1);
}

export function* dealTwoDamage() {
  yield call(dealDamage, 2);
}

export function* escortColonistVessel() {
  const deck = yield select(selectors.eventDeck);
  let card = deck.find(e => e.title === 'Raiders');

  if (!card) {
    const discardedEvents = yield select(selectors.discardedEvents);
    card = discardedEvents.find(e => e.title === 'Raiders');
  }
  if (!card) {
    card = deck.find(e => e.title === 'Klingon Battlecruiser');
  }
  if (!card) {
    const discardedEvents = yield select(selectors.discardedEvents);
    card = discardedEvents.find(e => e.title === 'Klingon Battlecruiser');
  }
  if (card) {
    yield put(removeEventFromDeck(card));
    yield call(activateAndDiscardEvent, card);
  }
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
      card = state.events.discardedEvents.find(
        e => e.title === 'Klingon Battlecruiser'
      );
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
    const card = getState().events.activeEvents.find(
      e => e.title === 'Alien Entity'
    );
    if (!card) return;

    const damage = card.crewSlots.filter(s => s.id > 0).length;
    if (damage) {
      dispatch(dealDamage(damage));
    }
  };
}
