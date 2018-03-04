import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AddGitRepoContent from '../src/components/AddGitRepoContent';
import Modal from '../src/components/Modal';

const stories = storiesOf('AddGitRepoContent', module);

async function onSubmit() {
  console.log('submit');
}

stories.add('adding', () => (
  <AddGitRepoContent
    csrfToken="yay"
    onSubmit={onSubmit}
  />
));

stories.add('editing', () => (
  <AddGitRepoContent
    onSubmit={onSubmit}
    repoName="nam nam ename"
    csrfToken="yay"
  />
));

stories.add('editing, with all defaults', () => (
  <AddGitRepoContent
    onSubmit={onSubmit}
    repoName="nam nam ename"
    url="git.http.hswww.google.com"
    defaultReference="ref"
    csrfToken="yay"
  />
));

stories.add('editing, customizable refs', () => (
  <AddGitRepoContent
    csrfToken="yay"
    onSubmit={onSubmit}
    repoName="nam nam ename"
    areReferencesCustomizable={true}
  />
));
