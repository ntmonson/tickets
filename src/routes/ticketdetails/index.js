import React from 'react';
import TicketDetails from './TicketDetails';
import Layout from '../../components/Layout';

function action({ params }) {
  return {
    title: 'Nick Monson Ticket App',
    component: (
      <Layout>
        <TicketDetails ticketId={params.id} />
      </Layout>
    ),
  };
}

export default action;
