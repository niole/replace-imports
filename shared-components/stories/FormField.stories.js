import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FormField } from '../src/components/FormField';
import { mockPassword } from './mockData';

const stories = storiesOf('FormField', module);

const label = 'Label';
const passwordLabel = 'Password';
const help = 'Here is an instructive message.';
const value = 'Hello, world!';
const error = 'Computer says no';

const handlers = {
  onChange: action('onChange'),
};

stories.add('basic', () => <FormField label={label} {...handlers} />);

stories.add('with help', () =>
  <FormField label={label} help={help} {...handlers} />,
);

stories.add('with value', () =>
  <FormField label={label} value={value} {...handlers} />,
);

stories.add('with default value', () =>
  <FormField label={label} defaultValue={value} {...handlers} />,
);

stories.add('with value and help', () =>
  <FormField label={label} value={value} help={help} {...handlers} />,
);

stories.add('with value and error', () =>
  <FormField label={label} value={value} error={error} {...handlers} />,
);

stories.add('with value, error and help', () =>
  <FormField
    label={label}
    value={value}
    error={error}
    help={help}
    {...handlers}
  />,
);

stories.add('password', () =>
  <FormField type="password" label={passwordLabel} />,
);

stories.add('password with value', () =>
  <FormField type="password" label={passwordLabel} value={mockPassword()} />,
);

stories.add('password with weak value', () =>
  <FormField
    type="password"
    label={passwordLabel}
    value={mockPassword({ score: 1 })}
  />,
);

stories.add('password with strong value', () =>
  <FormField
    type="password"
    label={passwordLabel}
    value={mockPassword({ score: 3 })}
  />,
);
