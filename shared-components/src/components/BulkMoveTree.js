import React from 'react';
import {string, func, arrayOf} from 'prop-types';
import BulkMoveNode, {
  TreeNodeProp,
} from './BulkMoveNode';

function BulkMoveTree({
    tree,
    ...rest,
  }) {
  return (
    <div>
      {tree.map(node => {
        return (
          <BulkMoveNode
            isRoot={true}
            key={node.dirName}
            relativePath={node.dirName}
            {...node}
            {...rest}
          />
        );
      })}
    </div>
  );
}

BulkMoveTree.propTypes = {
  selectedPath: string.isRequired,
  selectNode: func.isRequired,
  tree: arrayOf(TreeNodeProp),
  onClose: func.isRequired,
  onOpen: func.isRequired,
};

export default BulkMoveTree;
