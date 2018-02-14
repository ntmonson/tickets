/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import { Pinned } from './Pinned';

describe('Pinned', () => {
  test('Renders Pinned component correctly with value 1', () => {
    const component = renderer
      .create(<Pinned value={1} ticketId="asdf1234" togglePin={() => {}} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Renders Pinned component correctly with value 0', () => {
    const component = renderer
      .create(<Pinned value={0} ticketId="asdf1234" togglePin={() => {}} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
