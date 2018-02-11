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
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      databaseGetAllTickets: PropTypes.array.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
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
          {loading ? 'Loading...' : <TicketTable tickets={filteredTickets} />}
        </div>
      </div>
    );
  }
}
const graphqlQueries = compose(graphql(ticketsQuery));

export default compose(withStyles(s), graphqlQueries)(Home);
