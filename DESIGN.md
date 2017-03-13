# Star Trek: The Dice Game

My goal here is to implement the game using React/Redux. I think I'd like to wrap
it in an electron shell so it can be used as a desktop app. No network connection
should be necessary.

## State Shape
---

```
{
  ship: {
    hull: int,
    shields: int,
    scanners: array<T>,
    securityStations: array<T>,
    commandStations: array<T>,
    scienceStations: array<T>,
    medicalStations: array<T>,
    engineeringStations: array<T>,
    quarters: array<T>,
    sickbay: array<T>,
    dilithiumReserves: int,
  },
  phase: object,
  currentYear: int,
  developmentDeck: array<T>,
  developmentStack: array<T>,
  claimedDevelopments: array<T>,
  discardedDevelopments: array<T>,
  eventDeck: array<T>,
  activeEvents: array<T>,
  discardedEvents: array<T>,
  missionDeck: array<T>,
  completedMissions: array<T>,
  failedMissions: array<T>,
  activeMission: object,
  difficultyOptions: array<T>,
  selectedYearCard: object,
}
```