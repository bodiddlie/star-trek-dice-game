import React from 'react';
import { connect } from 'react-redux';

export const Crystals = ({ crystals }) =>
  <div>
    {crystals}
  </div>;

const mapStateToProps = state => ({
  crystals: state.crystals,
});

export default connect(mapStateToProps)(Crystals);
