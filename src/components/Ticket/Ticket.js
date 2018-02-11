import React from 'react';
import PropTypes from 'prop-types';

const Ticket = ({ ticket: { topic, pinned, closed } }) => (
  <div>
    <div>Topic: {topic}</div>
    <div>Pinned: {pinned ? 'Yes' : 'No'}</div>
    <div>Closed: {closed ? 'Yes' : 'No'}</div>
  </div>
);

Ticket.propTypes = {
  ticket: PropTypes.shape({
    closed: PropTypes.number.isRequired,
    pinned: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired,
  }).isRequired,
};

export default Ticket;
