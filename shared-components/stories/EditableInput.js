import React from 'react';
import { action, storiesOf } from '@kadira/storybook';

import EditableText from '../src/components/EditableInput';

const stories = storiesOf('EditableInput', module);

stories.add('Editable', () =>
  <div style={{ margin: '100px auto', width: '50%' }}>
    <h2><EditableText
      onUpdate={action('onUpdate')}
      renderText={text => text + ' - Revision #1'}
      name="name"
      placeholder="A name for your environment"
      value="My Environment"
    /></h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </div>,
);

stories.add('Read Only', () =>
  <EditableText
    name="name"
    placeholder="A name for your environment"
    readOnly={true}
    value="My Environment"
  />,
);
