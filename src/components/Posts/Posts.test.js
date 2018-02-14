/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import { Posts } from './Posts';

describe('Posts', () => {
  test('Renders table correctly', () => {
    const posts = [
      {
        id: '1234',
        content: 'New post',
        createdAt: 'My new date',
        updatedAt: 'My new updated at',
      },
      {
        id: '12345',
        content: 'New post2',
        createdAt: 'My new date2',
        updatedAt: 'My new updated at2',
      },
    ];
    const component = renderer.create(<Posts posts={posts} />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
