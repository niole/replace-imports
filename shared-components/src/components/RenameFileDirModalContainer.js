import React from 'react';
import RenameFileDirModal, {
  props as modalProps,
  defaultProps as modalDefaultProps
} from './RenameFileDirModal';
import ReactInScalaToggleableRenderer, {
  props as toggleableProps,
  defaultProps as defaultToggleableProps
} from './ReactInScalaToggleableRenderer';

function RenameFileDirModalContainer(props) {
  const {
    toggleButtonLabel,
    buttonClass,
    ...rest,
  } = props;
  return (
    <ReactInScalaToggleableRenderer
      toggleButtonLabel={toggleButtonLabel}
      buttonClass={buttonClass}
    >
      <RenameFileDirModal {...rest}/>
    </ReactInScalaToggleableRenderer>
  );
}

RenameFileDirModalContainer.propTypes = {
  ...modalProps,
  ...toggleableProps
};

RenameFileDirModalContainer.defaultProps = {
  ...modalDefaultProps,
  ...defaultToggleableProps
};

export default RenameFileDirModalContainer;

