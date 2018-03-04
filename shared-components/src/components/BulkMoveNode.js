import React from 'react';
import memoizeBind from 'memoize-bind';
import styled from 'styled-components';
import {shape, bool, object, string, func, arrayOf} from 'prop-types';
import Directory from './icons/Directory';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import Check from './icons/Check';
import {
  baseColor,
  clickableBlue,
  focusedGrey,
} from './styled/colors';

const StyledCheck = styled(Check)`
  left: 4px;
  position: relative;
`;

export const DirectoryContainer = styled.div`
  margin-left: ${props => props.isTop ? 0 : 22}px;
`;

const DirectoryLabel = styled.div`
  min-width: 100px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: ${clickableBlue};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Handle = styled.div`
  cursor: pointer;
  margin-right: 10px;
  display: inline-flex;
  color: ${clickableBlue};

  svg {
    border: 1px solid;
  }
`;

const StyledDirectoryIcon = styled(Directory)`
  margin-right: 10px;
  flex-shrink: 0;
`;

function getDirectoryName(path) {
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  if (path.endsWith("/")) {
    path = path.slice(1);
  }

  const splitPath = path.split("/");
  return splitPath[splitPath.length - 1];
}

const SelectedIndicator = styled.div`
  background: ${props => props.selected ? focusedGrey: 'white'};
  padding: 6px;
  padding-right: 10px;
  right: 6px;
  position: relative;
`;

const Label = styled.span`
  color: ${props => props.selected ? baseColor : clickableBlue};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: 2px;

  &:after {
    content: "/";
    color: ${clickableBlue};
    padding-left: 2px;
  }
`;

function handleClick(handler, path) {
  return function onClick() {
    handler(path);
  }
}


function BulkMoveNode({
    dirName,
    relativePath,
    childDirs,
    onClose,
    onOpen,
    selectNode,
    isOpen,
    selectedPath,
    isRoot,
  }) {
  const handler = isOpen ?
      onClose :
      onOpen;
  const selected = selectedPath === relativePath;
  const name = getDirectoryName(dirName);
  const boundSelect = memoizeBind(selectNode, null, relativePath);
  return (
    <DirectoryContainer isTop={isRoot}>
      <SelectedIndicator selected={selected}>
        <DirectoryLabel>
        {!!childDirs.length &&
          <Handle onClick={handleClick(handler, relativePath)}>
            { isOpen ?
              <MinusIcon height={12} width={12} /> :
              <PlusIcon height={12} width={12} /> }
          </Handle>}
          <StyledDirectoryIcon
            height={12}
            width={12}
            onClick={boundSelect}
          />
          <Label
            selected={selected}
            onClick={boundSelect}
            title={name}
          >
            {name}
          </Label>
          { selected && <StyledCheck height={14} width={14} fill='currentColor'/>}
        </DirectoryLabel>
      </SelectedIndicator>
      { isOpen &&
        childDirs.map(node => {
          return (
            <BulkMoveNode
              {...node}
              isRoot={false}
              selectedPath={selectedPath}
              selectNode={selectNode}
              key={node.dirName}
              relativePath={node.dirName}
              onClose={onClose}
              onOpen={onOpen}
            />
          );
        }) }
    </DirectoryContainer>
  );
}

export const TreeNodeProp = shape({
  isOpen: bool,
  dirName: string,
  childDirs: arrayOf(object),
})

BulkMoveNode.propTypes = {
  isRoot: bool.isRequired,
  selectedPath: string.isRequired,
  selectNode: func.isRequired,
  dirName: string.isRequired,
  relativePath: string.isRequired,
  childDirs: arrayOf(TreeNodeProp).isRequired,
  onClose: func.isRequired,
  onOpen: func.isRequired,
};

export default BulkMoveNode;

