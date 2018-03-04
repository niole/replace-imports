import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, select, boolean } from '@kadira/storybook-addon-knobs';

import RevisionControl from '../src/components/RevisionControl';
import { mockRevision, mockRevisions } from '../src/utils/mockData';

const stories = storiesOf('RevisionControl', module);

stories.addDecorator(withKnobs);


stories.add('happy path', () => {
  const numRevisions = select(
    'Number of revisions',
    {
      1: '1',
      3: '3',
      10: '10',
      100: '100',
      1000: '1000',
      10000: '10,000',
    },
    10,
  );
  const withRunIds = boolean('With run IDs?');
  const fromNow = boolean('Use current date as reference date');

  return (
    <RevisionControl
      runLink="link_to_run"
      runNumber="#15"
      revision={mockRevision({ withRunId: withRunIds, fromNow })}
      revisions={mockRevisions({ numRevisions, withRunIds, fromNow })}
      onChange={action('onChange')}
    />
  );
});

stories.add('no run number', () => {
  const numRevisions = select(
    'Number of revisions',
    {
      1: '1',
      3: '3',
      10: '10',
      100: '100',
      1000: '1000',
      10000: '10,000',
    },
    10,
  );
  const withRunIds = boolean('With run IDs?');
  const fromNow = boolean('Use current date as reference date');

  return (
    <RevisionControl
      runLink="link_to_run"
      revision={mockRevision({ withRunId: withRunIds, fromNow })}
      revisions={mockRevisions({ numRevisions, withRunIds, fromNow })}
      onChange={action('onChange')}
    />
  );
});
