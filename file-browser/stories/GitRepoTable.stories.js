import React from 'react';
import { storiesOf } from '@kadira/storybook';
import GitRepoTable from '../src/components/GitRepoTable';

const stories = storiesOf('GitRepoTable', module);

const editLink = "edit_link.com";
const removeHref = "remove_link.com";
const uri = "http.github.com";
const refTypes = [
  "branch",
  "ref",
  "head",
  "tag",
  "commitId",
];

const repos = refTypes.map(refType => (
  {
    repoName: `DDLAB-${refType}-repo`,
    editLink,
    uri,
    refType,
    refLabel: `${refType}-label`,
    removeHref,
  }
));

const csrfToken = 'csrf123abc';
const ownerUsername = "purple peopleeater";
const projectName = 'predicting-edible-people-count';
const archiveUrl = 'archive_with_this_url';

stories.add('happy path', () => (
  <GitRepoTable
    csrfToken={csrfToken}
    ownerUsername={ownerUsername}
    projectName={projectName}
    archiveUrl={archiveUrl}
    areReferencesCustomizable={true}
    gitRepos={repos}
  />
));

stories.add('cant customize references', () => (
  <GitRepoTable
    csrfToken={csrfToken}
    ownerUsername={ownerUsername}
    projectName={projectName}
    archiveUrl={archiveUrl}
    areReferencesCustomizable={false}
    gitRepos={repos}
  />
));
