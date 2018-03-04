import React from 'react';
import {
  string,
  bool,
} from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal';
import AddGitRepoContent from './AddGitRepoContent';

const StyledModalContent = styled.div`
  .modal-body {
    padding: 20px 20px 0px 20px !important;
  }

  .modal-footer {
    margin-top: 0px !important;
    padding: 20px;
  }

  .col-group {
    width: 100%;
  }

  .row-group {
    &:last-of-type {
      .col-group:first-of-type {
        width: auto;
      }
    }
  }

  .FormError {
    height: 20px;
  }

  .info-box {
    margin: 0px;

    a {
      font-weight: bold;
    }
  }

  .defaultref {
    width: 170px;
    margin-bottom: 20px;
  }
`;

function AddGitRepoModal(props) {
  return (
    <Modal>
      <StyledModalContent>
        <AddGitRepoContent {...props} />
      </StyledModalContent>
    </Modal>
  );
}

AddGitRepoModal.propTypes = {
  csrfToken: string,
  repoName: string,
  areReferencesCustomizable: bool.isRequired,
};

export default AddGitRepoModal;
