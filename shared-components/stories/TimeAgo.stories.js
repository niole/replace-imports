import React from 'react';
import { storiesOf } from '@kadira/storybook';

import TimeAgo from '../src/components/TimeAgo'

const stories = storiesOf('TimeAgo', module);

stories.add('less than a minute', () =>
  <TimeAgo date={new Date().getTime() - (30 * 1000)} />
);

stories.add('an hour ago', () =>
  <TimeAgo date={new Date().getTime() - (60 * 60 * 1000)} />
);