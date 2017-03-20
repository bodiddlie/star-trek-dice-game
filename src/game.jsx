import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Modal } from './modal';
import { missionActions, eventActions, developmentActions } from './dux';

class Game extends React.Component {
  state = {
    showStartModal: true,
  };
  onStartModalClose = () => {
    this.props.shuffleDecks();
    this.setState({ showStartModal: false });
  };
  render() {
    const { showStartModal } = this.state;
    const { events, missions, developments } = this.props;

    return (
      <Container>
        {showStartModal && <h3>Waiting on you...</h3>}
        {!showStartModal &&
          <DeckGrid>
            <Deck>
              {events.map(e => <span key={e.id}>{e.title}</span>)}
            </Deck>
            <Deck>
              {missions.map(m => <span key={m.id}>{m.title}</span>)}
            </Deck>
            <Deck>
              {developments.map(d => <span key={d.id}>{d.title}</span>)}
            </Deck>
          </DeckGrid>}
        <Modal show={showStartModal}>
          <button type="button" onClick={this.onStartModalClose}>Start Game!</button>
        </Modal>
      </Container>
    );
  }
}

const Container = styled.div`
`;

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

const mapDispatchToProps = dispatch => {
  return {
    shuffleDecks: () => {
      dispatch(eventActions.shuffleDeck());
      dispatch(missionActions.shuffleDeck());
      dispatch(developmentActions.shuffleDeck());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
