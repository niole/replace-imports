import React from 'react';
import {
  node,
} from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal';

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
  }

  .uncustomizable-refs, .defaultref {
    margin-bottom: 20px;
  }

  .btn-success {
    width: 135px;
  }

  .submit-error-field {
    width: 55%;
    word-break: break-all;
    float: left;
  }
`;

function UpdateAddGitRepoModal({ children }) {
  return (
    <Modal>
      <StyledModalContent>
        {children}
      </StyledModalContent>
    </Modal>
  );
}

UpdateAddGitRepoModal.propTypes = {
  children: node.isRequired,
};

export default UpdateAddGitRepoModal;
