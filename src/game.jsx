import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Modal } from './modal';
import { tryChooseDifficulty } from './sagas/game-start';

const Game = props => {
  const { events, missions, developments, showDifficulty, chooseDifficulty } = props;

  return (
    <Container>
      {showDifficulty && <h3>Waiting on you...</h3>}
      {!showDifficulty &&
        <DeckGrid>
          <Deck>
            {events.map(e =>
              <span key={e.id}>
                {e.title}
              </span>
            )}
          </Deck>
          <Deck>
            {missions.map(m =>
              <span key={m.id}>
                {m.title}
              </span>
            )}
          </Deck>
          <Deck>
            {developments.map(d =>
              <span key={d.id}>
                {d.title}
              </span>
            )}
          </Deck>
        </DeckGrid>}
      <Modal show={showDifficulty}>
        <button type="button" onClick={() => chooseDifficulty(1)}>
          Start Game!
        </button>
      </Modal>
    </Container>
  );
};

const Container = styled.div``;

const DeckGrid = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Deck = styled.div`
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = state => {
  return {
    events: state.events.deck,
    developments: state.developments.deck,
    missions: state.missions.deck,
    showDifficulty: state.gameState === 0,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chooseDifficulty: difficulty => {
      dispatch(tryChooseDifficulty(difficulty));
    },
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     shuffleDecks: () => {
//       dispatch(eventActions.shuffleDeck());
//       dispatch(missionActions.shuffleDeck());
//       dispatch(developmentActions.shuffleDeck());
//     },
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
