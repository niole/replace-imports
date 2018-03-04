import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CreateNewNamespaceForm from '../src/components/CreateNewNamespaceForm';

const stories = storiesOf('CreateNewNamespaceForm', module);
const organizations = ['org1', 'org2', 'org3', 'org4', 'org5'];

const props = {
  fields: [
    {
      componentClass: 'select',
      disabled: false,
      validationState: '',
      help: 'Owner',
      error: '',
      type: 'text',
    },
    {
      componentClass: 'input',
      disabled: false,
      validationState: '',
      help: 'Data Set name',
      error: '',
      type: 'text',
    },
  ],
  submitLabel: 'Create Data Set',
  csrfToken: 'abc',
  submitUrl: 'def',
  nameSpaceType: 'Data Set',
  username: 'user',
  title: 'Create New Data Set',
};

stories.add('for data set, options', () =>
  <CreateNewNamespaceForm organizations={organizations} {...props} />,
);

stories.add('for data set, no options', () =>
  <CreateNewNamespaceForm organizations={[]} {...props} />,
);
