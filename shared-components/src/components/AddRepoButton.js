import React, {PureComponent} from 'react';
import {
  string,
  bool,
} from 'prop-types';
import {
  Button,
} from 'react-bootstrap';
import AddGitRepoModal from './AddGitRepoModal';
import {
  returnUserToGitReposTab,
} from './util/gitRepoUtil';
import {
  addGitRepo,
} from './util/queryUtil';
import ToggleButton from './ToggleButton';


class AddRepoButton extends PureComponent {
  getOnSubmit = (closeModal) => {
    return (values) => {
      const {
        ownerUsername,
        projectName,
        csrfToken,
      } = this.props;

      return addGitRepo(ownerUsername, projectName, csrfToken, values)
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
      <Button onClick={toggleModal} bsStyle="success">
        {buttonLabel}
        { show && <AddGitRepoModal
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

AddRepoButton.propTypes = {
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  buttonLabel: string,
  areReferencesCustomizable: bool.isRequired,
};

AddRepoButton.defaultProps = {
  buttonLabel: "Add a New Repository",
  areReferencesCustomizable: false,
}

export default AddRepoButton;
