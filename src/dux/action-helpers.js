import { activateEvent, removeActiveEvent, discardEvent } from './events';
import * as hull from './hull';
import * as shields from './shields';
import * as crew from './crew';

export function activateAndDiscardEvent(event) {
  return (dispatch, getState) => {
    if (getState().events.activeEvents.length === 9) {
      dispatch(discardRandomEvent());
    }
    dispatch(activateEvent(event));
  };
}

export function discardRandomEvent() {
  return (dispatch, getState) => {
    const randomIndex = Math.floor(Math.random() * 9);
    const discarded = getState().events.activeEvents[randomIndex];
    dispatch(removeActiveEvent(discarded));
    dispatch(discardEvent(discarded));
  };
}

export function dealDamage(amount) {
  return (dispatch, getState) => {
    let remaining = amount;
    const shieldsLeft = getState().shields;
    if (shieldsLeft) {
      const shieldDamage = amount > shieldsLeft ? shieldsLeft : amount;
      remaining -= shieldDamage;
      dispatch(shields.takeDamage(shieldDamage));
    }

    if (remaining) {
      const hullLeft = getState().hull;
      if (hullLeft) {
        const hullDamage = remaining > hullLeft ? hullLeft : remaining;
        remaining -= hullDamage;
        dispatch(hull.takeDamage(hullDamage));
      }
    }

    if (remaining) {
      dispatch(crew.takeDamage(remaining));
    }
  };
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
