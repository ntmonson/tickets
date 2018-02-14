/* @flow */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import togglePinned from './togglePinned.graphql';
import s from './Pinned.css';

export type Props = {
  value: number,
  ticketId: string,
  togglePin: Function,
};

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export const Pinned = (props: Props) => {
  const { value, ticketId, togglePin } = props;
  const color = value ? 'Gold' : '';
  return (
    <button style={{ color }} onClick={() => togglePin(ticketId)}>
      <i className="fas fa-thumbtack" />
    </button>
  );
};

const graphqlQueries = graphql(togglePinned, {
  name: 'togglePin',
  props: ({ togglePin }) => ({
    togglePin: id => togglePin({ variables: { id } }),
  }),
});

export default compose(withStyles(s), graphqlQueries)(Pinned);
