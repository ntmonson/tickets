/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import Link from './Link';

describe('Link', () => {
  test('renders with children correctly', () => {
    const component = renderer
      .create(
        <Link to="https://www.google.com/" onClick={() => {}}>
          <div>Test child div</div>
        </Link>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test('Handles the click correctly, no default prevented', () => {
    const component = renderer
      .create(
        <Link to="https://www.google.com/" onClick={() => {}}>
          <div>Test child div</div>
        </Link>,
      )
      .toJSON();

    component.props.onClick({ target: 'asdf' });

    expect(component).toMatchSnapshot();
  });
});
