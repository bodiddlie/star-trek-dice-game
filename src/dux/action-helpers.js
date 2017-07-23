import { put, select } from 'redux-saga/effects';

import { activateEvent, removeActiveEvent, discardEvent } from './events';
import * as hull from './hull';
import * as shields from './shields';
import * as crew from './crew';

export const selectors = {
  shields: state => state.shields,
  hull: state => state.hull,
  activeEvents: state => state.events.activeEvents,
};

export function* activateAndDiscardEvent(event) {
  const activeEvents = yield select(selectors.activeEvents);
  if (activeEvents.length === 9) {
    const randomIndex = Math.floor(Math.random() * 9);
    const discarded = activeEvents[randomIndex];
    yield put(removeActiveEvent(discarded));
    yield put(discardEvent(discarded));
  }
  yield put(activateEvent(event));
}

export function discardRandomEvent() {
  return (dispatch, getState) => {
    const randomIndex = Math.floor(Math.random() * 9);
    const discarded = getState().events.activeEvents[randomIndex];
    dispatch(removeActiveEvent(discarded));
    dispatch(discardEvent(discarded));
  };
}

export function* dealDamage(amount) {
  let remaining = amount;
  const shieldsLeft = yield select(selectors.shields);
  if (shieldsLeft) {
    const shieldDamage = remaining > shieldsLeft ? shieldsLeft : amount;
    remaining -= shieldDamage;
    yield put(shields.takeDamage(shieldDamage));
  }

  if (remaining) {
    const hullLeft = yield select(selectors.hull);
    if (hullLeft) {
      const hullDamage = remaining > hullLeft ? hullLeft : remaining;
      remaining -= hullDamage;
      yield put(hull.takeDamage(hullDamage));
    }
  }

  if (remaining) {
    yield put(crew.takeDamage(remaining));
  }
}

export function dealHullDamage(amount) {
  return (dispatch, getState) => {
    let remaining = amount;
    const hullLeft = getState().hull;
    if (hullLeft) {
      const hullDamage = remaining > hullLeft ? hullLeft : remaining;
      remaining -= hullDamage;
      dispatch(hull.takeDamage(hullDamage));
    }

    if (remaining) {
      dispatch(crew.takeDamage(remaining));
    }
  };
}
