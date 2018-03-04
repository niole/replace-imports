import React from 'react';
import { storiesOf } from '@kadira/storybook';

import CreateDataSetFromFilesModal from '../src/components/CreateDataSetFromFilesModal';

const stories = storiesOf('CreateDataSetFromFilesModal', module);

stories.add('simple', () =>
  <CreateDataSetFromFilesModal
    inputField={{
      type: "text",
      componentClass: "input",
      help: "Data set name",
      id: "inputName",
      defaultValue: "",
      label: "Data Set Name"
    }}
    username="niole"
    submitLabel="Create Data Set"
    cancelLabel="Cancel"
    csrfToken="abc"
    submitUrl="def"
    title="Create Data Set"
  />);


