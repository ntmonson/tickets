import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toggleStatus from './toggleStatus.graphql';
// import s from './Pinned.css';

const Closed = ({ value, ticketId, toggleStat }) => {
  const color = value ? 'Red' : 'Green';
  return (
    <button style={{ color }} onClick={() => toggleStat(ticketId)}>
      <i className="fas fa-circle" />
    </button>
  );
};

Closed.propTypes = {
  value: PropTypes.bool.isRequired,
  ticketId: PropTypes.string.isRequired,
  toggleStat: PropTypes.func.isRequired,
};

const graphqlQueries = graphql(toggleStatus, {
  name: 'toggleStat',
  props: ({ toggleStat }) => ({
    toggleStat: id => toggleStat({ variables: { id } }),
  }),
});

export default compose(graphqlQueries)(Closed);
