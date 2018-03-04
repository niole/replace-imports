import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EditGitRepoContent from '../src/components/EditGitRepoContent';

const stories = storiesOf('EditGitRepoContent', module);

const props = {
    onSubmit: () => console.log('submit'),
    onClose: () => console.log('close'),
    areReferencesCustomizable: true,
    repoName: 'DD-repo-lsdkfjsdlfkj',
    url: '.comgithublah blah blah',
};

stories.add('happy path', () => (
  <EditGitRepoContent
    {...props}
  />
));

stories.add('references not customizable', () => (
  <EditGitRepoContent
    {...{...props, areReferencesCustomizable: false }}
  />
));
