import React, {PureComponent} from 'react';
import {
  string,
  bool,
} from 'prop-types';
import {
  Button,
} from 'react-bootstrap';
import ToggleButton from './ToggleButton';
import EditGitRepoModal from './EditGitRepoModal';
import {
  returnUserToGitReposTab,
} from './util/gitRepoUtil';
import {
  editGitRepo,
} from './util/queryUtil';


class EditRepoButton extends PureComponent {
  getOnSubmit = (closeModal) => {
    return (values) => {
      const {
        ownerUsername,
        projectName,
        csrfToken,
      } = this.props;

      return editGitRepo(ownerUsername, projectName, csrfToken, values)
        .then(() => {
          closeModal();
          returnUserToGitReposTab(ownerUsername, projectName);
        });
    };
  }

  renderButton = ({ state, toggleModal, closeModal }) => {
    const {
      buttonLabel,
      ...rest
    } = this.props;
    const {
      show,
    } = state;

    return (
      <Button
        onClick={toggleModal}
        bsStyle="link"
        bsSize="small"
      >
        {buttonLabel}
        { show && <EditGitRepoModal
                    onClose={closeModal}
                    onSubmit={this.getOnSubmit(closeModal)}
                    {...rest}
                  /> }
      </Button>

    );
  }

  render() {
    return (
      <ToggleButton>
        {this.renderButton}
      </ToggleButton>
    );
  }
}

EditRepoButton.propTypes = {
  csrfToken: string.isRequired,
  url: string.isRequired,
  repoName: string.isRequired,
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  areReferencesCustomizable: bool.isRequired,
  buttonLabel: string,
};

EditRepoButton.defaultProps = {
  buttonLabel: "Edit",
  areReferencesCustomizable: bool.isRequired,
}

export default EditRepoButton;
