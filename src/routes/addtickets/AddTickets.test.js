/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import '@babel/polyfill';
import { AddTickets } from './AddTickets';

// This oddity is required if the component being tested uses a ref to set focus.
// See: https://reactjs.org/blog/2016/11/16/react-v15.4.0.html
function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      focus() {},
    };
  }
  return null;
}

describe('Add tickets', () => {
  test('AddTickets component renders correctly', () => {
    const component = renderer
      .create(<AddTickets addTicket={() => {}} />, {
        createNodeMock,
      })
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
