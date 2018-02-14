import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import togglePinned from './togglePinned.graphql';
import s from './Pinned.css';

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export const Pinned = ({ value, ticketId, togglePin }) => {
  const color = value ? 'Gold' : '';
  return (
    <button style={{ color }} onClick={() => togglePin(ticketId)}>
      <i className="fas fa-thumbtack" />
    </button>
  );
};

Pinned.propTypes = {
  value: PropTypes.number.isRequired,
  ticketId: PropTypes.string.isRequired,
  togglePin: PropTypes.func.isRequired,
};

const graphqlQueries = graphql(togglePinned, {
  name: 'togglePin',
  props: ({ togglePin }) => ({
    togglePin: id => togglePin({ variables: { id } }),
  }),
});

export default compose(withStyles(s), graphqlQueries)(Pinned);
