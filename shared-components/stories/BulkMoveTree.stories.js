import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BulkMoveTree from '../src/components/BulkMoveTree';

const stories = storiesOf('BulkMoveTree', module);

const props = {
  selectedPath: "",
  selectNode: () => console.log('select'),
  tree: [{
    isOpen: true,
    dirName: "a",
    childDirs: [
      {
        isOpen: true,
        dirName: "a/b",
        childDirs: [],
      },
      {
        isOpen: true,
        dirName: "a/c",
        childDirs: [],
      },
    ],
  }],
  onClose: () => console.log('close'),
  onOpen: () => console.log('open'),
}

stories.add('basic', () =>
  <BulkMoveTree
    {...props}
  />
);
