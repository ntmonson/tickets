import React from 'react';
import PropTypes from 'prop-types';
// import { graphql, compose } from 'react-apollo';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

const TicketDetails = props => (
  <div>This is ticket details {props.ticketId} </div>
);

TicketDetails.propTypes = {
  ticketId: PropTypes.string.isRequired,
};

export default TicketDetails;
