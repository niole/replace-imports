import React from 'react';
import { shallow } from 'enzyme';

import { TypeaheadWithAuxiliaryValue } from '../src/components/TypeaheadWithAuxiliaryValue';

test('renders a hidden input with the correct value', () => {
  const options = [
    { id: 'a', label: 'Alpha', value: 0 },
    { id: 'b', label: 'Beta', value: 1 },
    { id: 'c', label: 'Gamma', value: 2 },
  ];

  const wrapper = shallow(
    <TypeaheadWithAuxiliaryValue
      name="foo"
      options={options}
      onChange={() => {}}
      selected={[options[1]]}
    />,
  );

  expect(wrapper.contains(<input type="hidden" name="foo" value="1" />)).toBe(
    true,
  );
});
