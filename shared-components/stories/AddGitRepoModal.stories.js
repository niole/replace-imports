import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AddGitRepoModal from '../src/components/AddGitRepoModal';

const stories = storiesOf('AddGitRepoModal', module);

stories.add('editing, customizable refs, in modal', () => (
  <AddGitRepoModal
    csrfToken="yay"
    repoName="nam nam ename"
    areReferencesCustomizable={true}
  />
));


