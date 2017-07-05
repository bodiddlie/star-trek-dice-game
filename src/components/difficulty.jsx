import React from 'react';
import { connect } from 'react-redux';

export const Difficulty = ({ difficulty }) =>
  <div>
    {difficulty}
  </div>;

const mapStateToProps = state => ({
  difficulty: state.difficulty,
});

export default connect(mapStateToProps)(Difficulty);
