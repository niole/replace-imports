import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

/**
 * Asks the user to confirm an action.
 *
 * @param {string} title - The title on the confirmation modal.
 * @param {string} body - The body text on the confirmation modal.
 * @param {?string} warningText - Emphasized body text.
 * @param {string} acceptText - The text on the button the user must press
 * to confirm the action.
 */
export function ConfirmationModal({
  title,
  body,
  warningText,
  acceptText,
  visible,
  onCancelButtonClick,
  onConfirmButtonClick,
  ...otherProps
}) {
  return (
    <Modal keyboard animation={false} show={visible} {...otherProps}>
      <Modal.Header>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {body}
        {warningText &&
          <strong>
            {warningText}
          </strong>}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onCancelButtonClick}>Cancel</Button>
        <Button onClick={onConfirmButtonClick} bsStyle="danger">
          {acceptText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  acceptText: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  warningText: PropTypes.string,
  onCancelButtonClick: PropTypes.func,
  onConfirmButtonClick: PropTypes.func,
};

export default ConfirmationModal;
