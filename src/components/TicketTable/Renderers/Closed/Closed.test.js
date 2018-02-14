/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import { Closed } from './Closed';

describe('Closed', () => {
  test('Closed renders correctly with value 1', () => {
    const component = renderer
      .create(<Closed value={1} ticketId="ASDF1234" toggleStat={() => {}} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Closed renders correctly with value 0', () => {
    const component = renderer
      .create(<Closed value={0} ticketId="ASDF1234" toggleStat={() => {}} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
