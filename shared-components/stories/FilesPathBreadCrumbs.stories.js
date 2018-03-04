import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilePathBreadCrumbs from '../src/components/FilePathBreadCrumbs';

const stories = storiesOf('FilePathBreadCrumbs', module);

const breadCrumbs = [
  { label: "A", url: "A" },
  { label: "B", url: "B" },
  { label: "C", url: "C" },
];

stories.add('happy path', () => (
  <FilePathBreadCrumbs breadCrumbs={breadCrumbs}/>
));

const extraLongCrumbs = breadCrumbs.concat([
  { label: "D", url: "D" },
  { label: "E", url: "E" },
  { label: "F", url: "F" },
  { label: "G", url: "G" },
  { label: "H", url: "H" },
  { label: "I", url: "I" },
  { label: "J", url: "J" },
  { label: "K", url: "K" },
  { label: "L", url: "L" },
  { label: "M", url: "M" },
  { label: "N", url: "N" },
  { label: "O", url: "O" },
  { label: "P", url: "P" },
  { label: "Q", url: "Q" },
  { label: "R", url: "R" },
  { label: "S", url: "S" },
  { label: "T", url: "T" },
  { label: "U", url: "U" },
  { label: "V", url: "V" },
  { label: "W", url: "W" },
  { label: "X", url: "X" },
  { label: "Y", url: "Y" },
  { label: "Z", url: "Z" },
])

stories.add('path too big for container', () => (
  <div style={{ border: "1px solid", width: 400 }}>
    <FilePathBreadCrumbs breadCrumbs={extraLongCrumbs}/>
  </div>
));
