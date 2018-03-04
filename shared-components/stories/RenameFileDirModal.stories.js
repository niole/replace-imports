import React from 'react';
import RenameFileDirModalContainer from '../src/components/RenameFileDirModalContainer';
import { storiesOf } from '@kadira/storybook';

const stories = storiesOf('RenameFileModal', module);

stories.add('directory', () =>
  <RenameFileDirModalContainer
    submitHandler={(newName, oldPath) => console.log(newName, oldPath)}
    oldPath={"a/b/"}
    toggleButtonLabel="Submit"
    entityType="directory"
    csrfToken="xyz"
    closeHandler={() => console.log('close')}
    ownerUsername="me"
    projectName="project"
  />
);

stories.add('file', () =>
  <RenameFileDirModalContainer
    projectName="project"
    ownerUsername="me"
    csrfToken="xyz"
    oldPath={"a/b"}
    submitHandler={(newName, oldPath) => console.log(newName, oldPath)}
    toggleButtonLabel="Submit"
    entityType="file"
    closeHandler={() => console.log('close')}
  />
);
