import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FileNameEditor from '../src/components/FileNameEditor';

const stories = storiesOf('FileNameEditor', module);

const props = {
  projectName: "sdf",
  ownerUsername: "ddd",
  oldPath: "a/b/c",
  filename: "c",
  closeHandler: () => {},
  saveAndRunHandler: () => {},
};

stories.add('creating', () =>
  <FileNameEditor
    {...props}
    creating={true}
    defaultValues={{ newName: "File Name" }}
  />
);

stories.add('not creating', () =>
  <FileNameEditor
    {...props}
    creating={false}
    defaultValues={{ newName: "File Name" }}
  />
);
