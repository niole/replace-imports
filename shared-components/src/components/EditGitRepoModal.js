import React from 'react';
import {
  string,
  func,
  bool,
} from 'prop-types';
import UpdateAddGitRepoModal from './UpdateAddGitRepoModal';
import EditGitRepoContent from './EditGitRepoContent';

function EditGitRepoModal(props) {
  return (
    <UpdateAddGitRepoModal>
      <EditGitRepoContent
        {...props}
      />
    </UpdateAddGitRepoModal>
  );
}

EditGitRepoModal.propTypes = {
  repoName: string.isRequired,
  url: string.isRequired,
  areReferencesCustomizable: bool.isRequired,
  onClose: func.isRequired,
};

export default EditGitRepoModal;
