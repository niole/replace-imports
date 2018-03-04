import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DuelingList from '../src/components/DuelingList';

const stories = storiesOf('DuelingList', module);

stories.add('basic', () =>
  <DuelingList
    header1="header1"
    header2="header2"
    onChange={d => console.log('change', d)}
    list1={['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']}
  />,
);
