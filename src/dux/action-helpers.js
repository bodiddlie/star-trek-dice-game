// @flow
import { type ThunkAction, type Dispatch, type GetState, type EventCard } from './types';
import { activateEvent, removeActiveEvent, discardEvent } from './events';
import * as hull from './hull';
import * as shields from './shields';
import * as crew from './crew';

export function activateAndDiscardEvent(event: EventCard): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (getState().events.activeEvents.length === 9) {
      dispatch(discardRandomEvent());
    }
    dispatch(activateEvent(event));
  };
}

export function discardRandomEvent(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const randomIndex: number = Math.floor(Math.random() * 9);
    const discarded: EventCard = getState().events.activeEvents[randomIndex];
    dispatch(removeActiveEvent(discarded));
    dispatch(discardEvent(discarded));
  };
}

export function dealDamage(amount: number): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
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

export function dealHullDamage(amount: number): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    let remaining: number = amount;
    const hullLeft: number = getState().hull;
    if (hullLeft) {
      const hullDamage: number = remaining > hullLeft ? hullLeft : remaining;
      remaining -= hullDamage;
      dispatch(hull.takeDamage(hullDamage));
    }

    if (remaining) {
      dispatch(crew.takeDamage(remaining));
    }
  };
}
