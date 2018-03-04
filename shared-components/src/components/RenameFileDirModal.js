import React from 'react';
import { object, oneOf, func, string } from 'prop-types';
import StyledModalContainer from './Modal';
import RenameFileDirContent from './RenameFileDirContent';

export const FILE = "file";
const DIRECTORY = "directory";

function RenameFileDirModal(props) {
  return (
    <StyledModalContainer>
      <RenameFileDirContent {...props}/>
    </StyledModalContainer>
  );
}

export const props = {
  locationUrl: string.isRequired,
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  oldPath: string.isRequired,
  closeHandler: func,
  entityType: oneOf([FILE, DIRECTORY]),
  submitLabel: string,
  cancelLabel: string,
  defaultValues: object,
  onSubmit: func,
};

export const defaultProps = {
  entityType: FILE,
  submitLabel: "Rename File",
  cancelLabel: "Cancel",
  closeHandler: () => {},
  defaultValues: {},
};

RenameFileDirModal.propTypes = props;

RenameFileDirModal.defaultProps = defaultProps;

export default RenameFileDirModal;
