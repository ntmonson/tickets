import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toggleStatus from './toggleStatus.graphql';

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export const Closed = ({ value: closed, ticketId, toggleStat }) => {
  const color = closed ? 'Red' : '#373277';
  return (
    <span>
      {closed ? 'Closed' : 'Open'}
      <button style={{ color }} onClick={() => toggleStat(ticketId)}>
        {closed ? (
          <i className="fas fa-toggle-off" />
        ) : (
          <i className="fas fa-toggle-on" />
        )}
      </button>
    </span>
  );
};

Closed.propTypes = {
  value: PropTypes.number.isRequired,
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
