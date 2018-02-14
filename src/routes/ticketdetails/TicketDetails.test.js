/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import '@babel/polyfill';
import { TicketDetails } from './TicketDetails';

describe('TicketDetails', () => {
  const data = {
    loading: false,
    databaseGetTicket: {
      closed: 1,
      createdAt: '1234',
      id: '1234',
      pinned: 1,
      posts: [],
      topic: 'Topic',
      updatedAt: '05/22/2018',
    },
  };
  test('TicketDetails renders correctly, loading false, closed 1, pinned 1', () => {
    const component = renderer
      .create(
        <TicketDetails ticketId="ASDF123" addPost={() => {}} data={data} />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('TicketDetails renders correctly, loading true, closed 1, pinned 1', () => {
    data.loading = true;
    const component = renderer
      .create(
        <TicketDetails ticketId="ASDF123" addPost={() => {}} data={data} />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('TicketDetails renders correctly, loading false, closed 0, pinned 1', () => {
    data.loading = false;
    data.closed = 0;
    const component = renderer
      .create(
        <TicketDetails ticketId="ASDF123" addPost={() => {}} data={data} />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('TicketDetails renders correctly, loading false, closed 0, pinned 0', () => {
    data.pinned = 0;
    const component = renderer
      .create(
        <TicketDetails ticketId="ASDF123" addPost={() => {}} data={data} />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
