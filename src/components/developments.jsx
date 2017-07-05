import React from 'react';
import { connect } from 'react-redux';

const Developments = props => {
  const { developments } = props;

  return (
    <div>
      {developments.map(d =>
        <span key={d.id}>
          {d.title}
        </span>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    developments: state.developments.availableDevelopments,
  };
};

export default connect(mapStateToProps)(Developments);
