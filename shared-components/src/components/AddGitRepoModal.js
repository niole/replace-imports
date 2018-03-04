import React from 'react';
import {
  func,
  bool,
} from 'prop-types';
import UpdateAddGitRepoModal from './UpdateAddGitRepoModal';
import AddGitRepoContent from './AddGitRepoContent';

function AddGitRepoModal(props) {
  return (
    <UpdateAddGitRepoModal>
        <AddGitRepoContent
          {...props}
        />
    </UpdateAddGitRepoModal>
  );
}

AddGitRepoModal.propTypes = {
  areReferencesCustomizable: bool.isRequired,
  onClose: func.isRequired,
};

export default AddGitRepoModal;
