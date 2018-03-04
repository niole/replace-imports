import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Form from '../src/components/Form';
import FormField from '../src/components/FormField';

const stories = storiesOf('Form', module);

stories.add('basic', () =>
  <Form>
    <FormField type="text" label="Your favorite color" />
  </Form>,
);

stories.add('with csrf token', () =>
  <Form csrfToken="csrf12345">
    <FormField type="text" label="Your favorite color" />
  </Form>,
);
