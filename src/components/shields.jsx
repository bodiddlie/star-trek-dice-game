import React from 'react';
import { connect } from 'react-redux';

export const Shields = ({ shields }) =>
  <div>
    {shields}
  </div>;

const mapStateToProps = state => ({
  shields: state.shields,
});

export default connect(mapStateToProps)(Shields);
