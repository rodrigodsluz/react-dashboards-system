import React from 'react';
import renderer from 'react-test-renderer';

import Badge from '../index';

it('renders badge', () => {
  const tree = renderer
    .create(
      <Badge content="test" textColor="#FFFFFF" backgroundColor="#ff0000" />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
