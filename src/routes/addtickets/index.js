import React from 'react';
import AddTickets from './AddTickets';
import Layout from '../../components/Layout';

function action() {
  return {
    title: 'Nick Monson Ticket App',
    component: (
      <Layout>
        <AddTickets />
      </Layout>
    ),
  };
}

export default action;
