import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EditGitRepoModal from '../src/components/EditGitRepoModal';

const stories = storiesOf('EditGitRepoModal', module);

const props = {
    onClose: () => console.log('close'),
    areReferencesCustomizable: true,
    repoName: "namenamnnalkfdsj",
    url: "sldfkjdsflkj",
};

stories.add('happy path', () => (
  <EditGitRepoModal
    {...props}
  />
));

stories.add('references not customizable', () => (
  <EditGitRepoModal
    {...{...props, areReferencesCustomizable: false }}
  />
));
