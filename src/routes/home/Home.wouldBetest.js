/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

// This test suite cannot run because Home.js renders TicketTable which uses the withSyles HOC.
// Unfortunately there isn't a workaround for this specific scenario.
// Once it is made available implement in this file and rename to Home.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import '@babel/polyfill';
import { Home } from './Home';

describe('Home', () => {
  const data = [
    {
      loading: false,
      databaseGetAllTickets: {
        closed: 1,
        createdAt: '1234',
        id: '1234',
        pinned: 1,
        posts: [],
        topic: 'Topic',
        updatedAt: '05/22/2018',
      },
    },
  ];
  test('Home renders correctly, loading false, closed 1, pinned 1', () => {
    const component = renderer.create(<Home data={data} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Home renders correctly, loading true, closed 1, pinned 1', () => {
    data[0].loading = true;
    const component = renderer.create(<Home data={data} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Home renders correctly, loading false, closed 0, pinned 1', () => {
    data[0].loading = false;
    data[0].closed = 0;
    const component = renderer.create(<Home data={data} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Home renders correctly, loading false, closed 0, pinned 0', () => {
    data[0].pinned = 0;
    const component = renderer.create(<Home data={data} />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
