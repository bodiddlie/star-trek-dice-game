import React from 'react';
import { connect } from 'react-redux';

export const Year = ({ year }) =>
  <div>
    Year - {year}
  </div>;

const mapStateToProps = state => ({
  year: state.year,
});

export default connect(mapStateToProps)(Year);
