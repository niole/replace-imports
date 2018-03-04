import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {shape, bool, func, string, arrayOf} from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import {Header, Body, Footer } from 'react-bootstrap/lib/Modal';
import StyledModalContainer from './StyledModalContainer';
import BulkMoveTree from './BulkMoveTree';
import DominoLogoOnSubmitButton from './DominoLogoOnSubmitButton';
import { baseColor } from './styled/colors';
import WarningBox from './WarningBox';
import WaitSpinner from './WaitSpinner';
import {
  postMoveEntities,
  getInitialBulkMoveTreeData,
} from './util/queryUtil';
import {
  formatInitialDataAsFileTree,
  openNode,
  closeNode,
  formatNodePathAsBulkTreePath,
  cleanPath,
} from './util/bulkMoveUtil';

const ErrorContainer = styled.div`
    color: red;
    width: 50%;
    text-align: left;
    word-break: break-all;
    float: left;
`;

const WarningContainer = styled(Body)`
  margin: 15px 32px;
  padding: 0px;
`;

const StyledButton = styled(Button)`
  margin-left: 10px !important;
  border-radius: 3px;
  padding: 12px 24px;
  font-size: 13px;
  font-weight: bold;
`;

const StyledLogoSubmit = styled(DominoLogoOnSubmitButton)`
  margin-left: 10px !important;
  border-radius: 3px;
  padding: 12px 24px;
  font-size: 13px;
  font-weight: bold;
`;

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${baseColor};
`;

const StyledHeader = styled(Header)`
  padding: 16px 30px;
`;

const StyledFooter = styled(Footer)`
  padding: 16px 30px;
`;

const StyledDialogBody = styled(Body)`
  padding: 2px 10px;
  border: 1px solid #e5e5e5;
  margin: 32px;
  margin-top: 18px;
  height: 200px;
  overflow: auto;
  border-radius: 3px;
`;

function noDataWaitSpinner() {
    return (
        <WaitSpinner>
            Loading file tree...
        </WaitSpinner>
    );
}


class BulkMoveDialog extends PureComponent {
  constructor(props) {
    super(props);
    const {
      relativePath,
    } = props;
    this.selectedEntities = null;
    this.state = {
      submitError: "",
      submitted: false,
      selectedPath: "none",
      tree: [],
    };

    this.updateErrorMessage = this.updateErrorMessage.bind(this);
    this.getInitialTreeData = this.getInitialTreeData.bind(this);
    this.handleBulkMove = this.handleBulkMove.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.handleNodeOpen = this.handleNodeOpen.bind(this);
    this.handleNodeClose = this.handleNodeClose.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.getInitialTreeData(cleanPath(relativePath));

  }

  showSlideinNotification(props) {
    const opener = this.createSlideinEvent({
      show: true,
      ...props,
    });
    window.dispatchEvent(opener);
  }

  getInitialTreeData(relativePath) {
    const {
      ownerUsername,
      projectName,
      selectedEntities,
    } = this.props;

    getInitialBulkMoveTreeData(
      ownerUsername,
      projectName,
      selectedEntities
    )
    .then(data => {
      const tree = formatInitialDataAsFileTree(data, relativePath);
      this.setState({
        tree,
      });
    })
    .catch(this.updateErrorMessage);
  }

  updateErrorMessage(error) {
    let message = "Something went wrong with your request.";

    if (error.message) {
        message = error.message;
    } else if (error.response && error.response.data) {
        message = error.response.data;
    } else if (error.status) {
        message = `${error.status} - ${error.statusText}`;
    }

    this.setState({
        submitError: message,
    });
  }

  handleBulkMove() {
    const {
      ownerUsername,
      projectName,
      selectedEntities,
    } = this.props;
    const {
      selectedPath,
    } = this.state;
    const targetPath = cleanPath(selectedPath);

    if (selectedPath !== "none" && selectedEntities.length) {
      const toMove = selectedEntities.reduce((acc, next) => {
        if (next.isDir) {
          acc.directories.push(next.path)
        } else {
          acc.files.push(next.path)
        }
        return acc;
      }, {
        files: [],
        directories: [],
        targetPath,
      })

      this.setState({
        submitted: true,
        submitError: "",
      });

      postMoveEntities(projectName, ownerUsername, toMove)
        .then(() => {
          this.showSlideinNotification({
            message: {
                primary: {
                    content: "Move successful",
                },
            },
            messageType: "success",
            isDismissable: true,
            shouldDisappear: true,
            onDismiss: this.handleDismissNotification,
            isClickable: true,
          });
          document.location.href = `/u/${ownerUsername}/${projectName}/browse`;
        })
        .catch(error => {
          this.showSlideinNotification({
            message: {
                primary: {
                    content: "Move failed - Please try again",
                },
                secondary: {
                    content: error.response.data,
                },
            },
            messageType: "warning",
            isDismissable: true,
            shouldDisappear: false,
            onDismiss: this.handleDismissNotification,
            isClickable: true,
          });

          this.setState({ submitError: error.response.data });
          console.warn(error)
        });
    }
  }

  createSlideinEvent(props) {
    return new CustomEvent("slideintoggle", {
      detail: props,
    });
  }

  handleDismissNotification() {
    const closer = this.createSlideinEvent({ show: false });
    window.dispatchEvent(closer);
  }

  handleNodeClose(path) {
    const newPath = formatNodePathAsBulkTreePath(path);

    this.setState({
      tree: closeNode(newPath, this.state.tree),
    });
  }

  handleNodeOpen(selectedPath) {
    const path = !selectedPath ?
        selectedPath.split("/"):
        [""].concat(selectedPath.split("/"));

    this.setState({
      tree: openNode(path, this.state.tree),
    });
  }

  selectNode(nextPath) {
    const {
      selectedPath,
    } = this.state;
    const {
      selectedEntities,
    } = this.props;
    const isASelectedEntity = !!selectedEntities.find(e => e.path === nextPath);

    if (nextPath !== selectedPath && !isASelectedEntity) {
      this.setState({ selectedPath: nextPath });
    } else {
      this.setState({ selectedPath: "none" });
    }
  }

  closeDialog() {
    const {
      handleClose,
    } = this.props;

    handleClose();
  }

  render() {
    const {
      submitted,
      submitError,
      tree,
    } = this.state;

    return (
      <StyledModalContainer>
        <StyledHeader>
          <StyledTitle>
            Move Files and Directories
          </StyledTitle>
        </StyledHeader>
        <WarningContainer>
          <WarningBox>
              Moving files will result in loss of the files' revision history.
          </WarningBox>
        </WarningContainer>
        <StyledDialogBody>
            {tree.length ?
                <BulkMoveTree
                    selectNode={this.selectNode}
                    onOpen={this.handleNodeOpen}
                    onClose={this.handleNodeClose}
                    {...this.state}
                /> :
                noDataWaitSpinner()}
        </StyledDialogBody>
        <StyledFooter>
            <ErrorContainer>
                {submitError}
            </ErrorContainer>
            <StyledButton onClick={this.closeDialog}>
            Cancel
            </StyledButton>
            <StyledLogoSubmit
            onSubmit={this.handleBulkMove}
            label="Move"
            submitted={submitted}
            submitError={submitError}
            />
        </StyledFooter>
      </StyledModalContainer>
    );
  }
}

BulkMoveDialog.propTypes = {
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  relativePath: string.isRequired, // initial root path
  selectedEntities: arrayOf(shape({
    isDir: bool,
    path: string,
  })).isRequired,
  handleClose: func,
  shouldTriggerNotifications: bool,
};

BulkMoveDialog.defaultProps = {
  shouldTriggerNotifications: true,
  handleClose: () => {},
};

export default BulkMoveDialog;
