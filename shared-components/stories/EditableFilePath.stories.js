import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EditableFilePath from '../src/components/EditableFilePath';

const stories = storiesOf('EditableFilePath', module);

const breadCrumbs = [
  { label: "A", url: "A" },
  { label: "B", url: "B" },
  { label: "C", url: "C" },
];

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

const props = {
  projectName: "sdf",
  ownerUsername: "ddd",
  oldPath: "a/b/c",
  filename: "c",
  closeHandler: () => {},
  saveAndRunHandler: () => {},
  breadCrumbs,
  defaultValues:{ newName: "File Name" }
};

stories.add('basic', () =>
  <EditableFilePath {...props} />
);

stories.add('show truncation', () =>
  <div style={{ border: "1px solid", width: 400 }}>
    <EditableFilePath {...{...props, breadCrumbs: extraLongCrumbs} } />
  </div>
);
