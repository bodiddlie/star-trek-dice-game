// @flow
import { type MissionCard } from './types';

export const cards: Array<MissionCard> = [
  {
    id: 1,
    title: 'Avert Diplomatic Crisis',
    MAction: 'Draw Event',
    Steps: [
      {
        level: 1,
        action: 'Travel',
        requirement: '2 ENG',
      },
      {
        level: 2,
        action: 'Combat',
        requirement: '2 SEC',
      },
      {
        level: 3,
        action: 'Influence',
        requirement: '2 COM',
      },
      {
        level: 4,
        action: 'Development',
        requirement: 'Draw 1',
      },
    ],
  },
  {
    id: 2,
    title: 'Deliver Emergency Medical Supplies',
    MAction: 'Draw Event, If Sickbay is empty, move 1 Crew Dice from Quarters to Sickbay',
    Steps: [
      {
        level: 1,
        action: 'Travel',
        requirement: '2 ENG',
      },
      {
        level: 2,
        action: 'Transport',
        requirement: 'Shield/1 ENG',
      },
      {
        level: 3,
        action: 'Cure',
        requirement: '2 MED',
      },
      {
        level: 4,
        action: 'Development',
        requirement: 'Draw 1',
      },
    ],
  },
  {
    id: 3,
    title: 'Investigate Deep Space Distress Beacon',
    MAction: 'Draw Event',
    Steps: [
      {
        level: 1,
        action: 'Transport',
        requirement: 'Shield/1 ENG',
      },
      {
        level: 2,
        action: 'Scan',
        requirement: '2 SCI',
      },
      {
        level: 3,
        action: 'Event',
        requirement: 'DRAW 1',
      },
      {
        level: 4,
        action: 'Repair',
        requirement: '1 ENG/ 1 SCI',
      },
      {
        level: 5,
        action: 'Development',
        requirement: 'DRAW 1',
      },
    ],
  },
];
