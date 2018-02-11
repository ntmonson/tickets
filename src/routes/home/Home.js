/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ticketsQuery from './tickets.graphql';
import Ticket from '../../components/Ticket/Ticket';
import createTicket from './createTicket.graphql';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      news: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          content: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newTicketInput: '',
    };
  }

  handleInputChange = e => {
    const val = e.target.value;
    this.setState({ newTicketInput: val });
  };

  handleAddTicketClick = () => {
    this.props.addTicket(this.state.newTicketInput);
    this.setState({ newTicketInput: '' });
  };

  render() {
    const { data: { loading, databaseGetAllTickets } } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Tickets:</h1>
          <div>New Ticket:</div>
          <input
            type="text"
            value={this.state.newTicketInput}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleAddTicketClick}>Add</button>
          {loading
            ? 'Loading...'
            : databaseGetAllTickets.map(ticket => <Ticket ticket={ticket} />)}
        </div>
      </div>
    );
  }
}
const graphqlQueries = compose(
  graphql(ticketsQuery),
  graphql(createTicket, {
    name: 'addTicket',
    options: {
      update: (proxy, { data: { databaseCreateTicket } }) => {
        const data = proxy.readQuery({ query: ticketsQuery });
        data.databaseGetAllTickets.push(databaseCreateTicket);
        proxy.writeQuery({ query: ticketsQuery, data });
      },
    },
    props: ({ addTicket }) => ({
      addTicket: topic => addTicket({ variables: { topic } }),
    }),
  }),
);

export default compose(withStyles(s), graphqlQueries)(Home);
