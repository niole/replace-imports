import React from 'react';
import { action, storiesOf, linkTo } from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';

import MinimalSelect from '../src/components/MinimalSelect';

const stories = storiesOf('MinimalSelect', module);

stories.addDecorator(withKnobs);

const props = {
  shouldSumbitOnSelect: false,
  noToggleBorder: true,
  onChange: d => {
    text('value of event at onChange', d.target.value);
  },
  onSelect: d => {
    text('value of event at onSelect', d.target.value);
  },
  defaultValue: 1,
};

const children = Array(5).fill(0).map((v, i) => (
  (componentContext) => {
    return (
      <option value={i} id={i} onClick={componentContext.onSelect}>
        {i}
      </option>
    );
  }
));

stories.add('with children', () => (
  <div style={{ width: 150 }}>
    <MinimalSelect {...props}>
      { children }
    </MinimalSelect>
  </div>
));

stories.add('no children', () => (
  <div style={{ width: 150 }}>
    <MinimalSelect {...props}>
    </MinimalSelect>
  </div>
));

stories.add('with long labels', () => (
  <div style={{ width: 150 }}>
    <MinimalSelect
      {...props}
      labelFormatter={(value) => `${value}-loooooooooooooooooooooooooooooooooooooooong`}
    >
      { children }
    </MinimalSelect>
  </div>
));
