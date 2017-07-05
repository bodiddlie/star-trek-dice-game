import React from 'react';
import { connect } from 'react-redux';

import { Modal } from './modal';
import { tryChooseDifficulty } from '../sagas/game-start';

export const DifficultyChooser = ({ show, chooseDifficulty }) =>
  <Modal show={show}>
    <button type="button" onClick={() => chooseDifficulty(1)}>
      Easy
    </button>
    <button type="button" onClick={() => chooseDifficulty(2)}>
      Medium
    </button>
    <button type="button" onClick={() => chooseDifficulty(3)}>
      Hard
    </button>
    <button type="button" onClick={() => chooseDifficulty(4)}>
      Kobayashi Maru
    </button>
  </Modal>;

const mapStateToProps = state => ({
  show: state.difficulty === 0,
});

const mapDispatchToProps = dispatch => ({
  chooseDifficulty: difficulty => {
    dispatch(tryChooseDifficulty(difficulty));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DifficultyChooser);
