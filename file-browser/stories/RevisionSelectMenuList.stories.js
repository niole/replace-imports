import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import RevisionSelectMenuList from '../src/components/RevisionSelectMenuList';
import { mockRevisions } from '../src/utils/mockData';

const stories = storiesOf('RevisionSelectMenuList', module);

stories.add('basic', () => {
  return (
    <RevisionSelectMenuList
      revisions={mockRevisions()}
      onSelect={action('onSelect')}
    />
  );
});

stories.add('with run ids', () => {
  return (
    <RevisionSelectMenuList
      revisions={mockRevisions({ withRunIds: true })}
      onSelect={action('onSelect')}
    />
  );
});

stories.add('filter on "excepteur"', () => {
  return (
    <RevisionSelectMenuList
      revisions={mockRevisions()}
      filterText="excepteur"
      onSelect={action('onSelect')}
    />
  );
});
