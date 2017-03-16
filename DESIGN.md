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