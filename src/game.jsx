import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Developments, Hull, Shields, Crystals, Year, Difficulty } from './components';
import { DifficultyChooser } from './modals';

const Game = props => {
  const { events, missions, developments } = props;

  return (
    <Container>
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
      </DeckGrid>
      <Developments />
      <Hull />
      <Shields />
      <Crystals />
      <Year />
      <Difficulty />
      <DifficultyChooser />
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
  };
};

export default connect(mapStateToProps)(Game);
