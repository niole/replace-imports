import React from 'react';
import { storiesOf } from '@kadira/storybook';

import RunQueueingInformation from '../src/components/RunQueueingInformation';
import { mockRunQueueingInformation } from './mockData';

const stories = storiesOf('RunQueueingInformation', module);

stories.add(`basic`, () =>
  <RunQueueingInformation {...mockRunQueueingInformation()} />,
);

stories.add(`without help text`, () =>
  <RunQueueingInformation {...mockRunQueueingInformation({ withHelpText: false })} />,
);

stories.add(`with HTML in help text`, () =>
  <RunQueueingInformation
    {...mockRunQueueingInformation({ withHTMLInHelpText: true })}
  />,
);
