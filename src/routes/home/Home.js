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
import TicketTable from '../../components/TicketTable/TicketTable';
import createTicket from './createTicket.graphql';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      databaseGetAllTickets: PropTypes.array.isRequired,
    }).isRequired,
    // addTicket: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // newTicketInput: '',
      filterType: 'all',
    };
  }

  getFilteredTickets = () => {
    const tickets = this.props.data.databaseGetAllTickets;
    const { filterType } = this.state;
    switch (filterType) {
      case 'closed':
        return tickets.filter(ticket => ticket.closed);
      case 'pinned':
        return tickets.filter(ticket => ticket.pinned);
      case 'open':
        return tickets.filter(ticket => !ticket.closed);
      default:
        return tickets;
    }
  };

  // handleInputChange = e => {
  //   const val = e.target.value;
  //   this.setState({ newTicketInput: val });
  // };

  // handleAddTicketClick = () => {
  //   this.props.addTicket(this.state.newTicketInput);
  //   this.setState({ newTicketInput: '' });
  // };

  handleFilterChange = filterType => {
    this.setState({ filterType });
  };

  render() {
    const { data: { loading } } = this.props;
    const { filterType } = this.state;
    const filteredTickets = this.getFilteredTickets();
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Tickets:</h1>
          <ul>
            <li>
              <button
                className={filterType === 'all' ? s.active : ''}
                onClick={() => this.handleFilterChange('all')}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={filterType === 'pinned' ? s.active : ''}
                onClick={() => this.handleFilterChange('pinned')}
              >
                Pinned
              </button>
            </li>
            <li>
              <button
                className={filterType === 'open' ? s.active : ''}
                onClick={() => this.handleFilterChange('open')}
              >
                Open
              </button>
            </li>
            <li>
              <button
                className={filterType === 'closed' ? s.active : ''}
                onClick={() => this.handleFilterChange('closed')}
              >
                Closed
              </button>
            </li>
          </ul>
          {/* <div>New Ticket:</div>
          <input
            type="text"
            value={this.state.newTicketInput}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleAddTicketClick}>Add</button> */}
          {loading ? 'Loading...' : <TicketTable tickets={filteredTickets} />}
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
