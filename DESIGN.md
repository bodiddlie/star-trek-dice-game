# Star Trek: The Dice Game

My goal here is to implement the game using React/Redux. I think I'd like to wrap
it in an electron shell so it can be used as a desktop app. No network connection
should be necessary.

### Mission Actions
---
This is probably one of the trickiest parts to figure out. There could be any
number of actions active on any turn, and the rules state that the player
decides the order in which they resolve. So we'll need to build a list
of actions that are available, and then let the player activate them one by one.

To start we'll need to have a list of all the potential actions in the game and give them each a unique ID. We can then reference those IDs on the relevant
cards. There will be a redux state that just holds all the actions so we can
grab them as we need.

When the M action step takes place, we'll search through the active mission, all
claimed developments, and all active events for actions and build up a list. The tricky part here will be when an action calls to draw an event and then that event has an M action that needs to trigger. Easiest way would probably be to prioritize draw event actions, resolve all of those and then process the other actions after all draws are done.

### Phase 1: Get first phase of game working
---
As a first big step, I want to get the first phase of the game working, at least behind the scenes. This will entail initial game setup, the deplete crystal phase, refreshing the mission, and then doing M actions. Here's the things that need to be tackled:

- shuffle event deck
- shuffle development deck
- shuffle mission deck
- activate first three development cards
- set hull to 7
- set shields to 0
- set year to 1
- have user choose difficulty
- set crystals to difficulty level
- set 10 crew dice to ready
- have user click READY to start
- do deplete crystal step
- refresh mission step
  - draw mission card
  - activate mission card
  - reset crystals
- do mission actions

To do this we will need a few things UI wise. Don't want to waste a lot of time on the UI as it will likely all change:

- box that shows active development titles
- display hull value
- display shields value
- display crystals value
- display year value
- modal that asks for difficulty
  - just has buttons for easy, medium, hard, kobayashi maru
- box that shows crew dice
- modal with READY button
- box that shows active mission title
- box that show active events
- modal that shows queued M actions
- click an M action card to resolve it