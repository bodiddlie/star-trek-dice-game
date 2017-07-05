import React from 'react';
import { connect } from 'react-redux';

export const Hull = ({ hull }) =>
  <div>
    {hull}
  </div>;

const mapStateToProps = state => ({
  hull: state.hull,
});

export default connect(mapStateToProps)(Hull);
