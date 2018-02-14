/* @flow */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import toggleStatus from './toggleStatus.graphql';

export type Props = {
  value: number,
  ticketId: string,
  toggleStat: Function,
};

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export const Closed = (props: Props) => {
  const { value: closed, ticketId, toggleStat } = props;
  const color = closed ? 'Red' : '#373277';
  return (
    <span>
      {closed ? 'Closed' : 'Open'}
      <button style={{ color }} onClick={() => toggleStat(ticketId)}>
        {closed ? (
          <i className="fas fa-toggle-on" data-fa-transform="rotate-180" />
        ) : (
          <i className="fas fa-toggle-on" />
        )}
      </button>
    </span>
  );
};

const graphqlQueries = graphql(toggleStatus, {
  name: 'toggleStat',
  props: ({ toggleStat }) => ({
    toggleStat: id => toggleStat({ variables: { id } }),
  }),
});

export default compose(graphqlQueries)(Closed);
