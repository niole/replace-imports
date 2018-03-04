import React, {PureComponent} from 'react';
import {string, func} from 'prop-types';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import BulkMoveDialog from './BulkMoveDialog';

class BulkMoveButton extends PureComponent {
  constructor() {
    super();
    this.state = { open: false };
    this.toggleBulkMoveModal = this.toggleBulkMoveModal.bind(this);
    this.unmountModal = this.unmountModal.bind(this);
    this.getEntities = this.getEntities.bind(this);
  }

  toggleBulkMoveModal() {
    this.props.onOpen();
    this.setState({ open: true });
  }

  getSelectedEntities() {
    return $.map($('.selected-file-checkbox:checked'), function(item) {
      return {
        path: $(item).data('path'),
        isDir: !!$(item).attr('datatype'),
      };
    });
  }

  unmountModal() {
    this.setState({ open: false });
    ReactDOM.unmountComponentAtNode(document.getElementById("bulk-move-dialog-mount"));
  }

  getEntities() {
    if (!this.props.selectedEntities) {
      return this.getSelectedEntities();
    }
    return this.props.selectedEntities;
  }

  mountBulkMoveDialog() {
    const props = Object.assign(
      {},
      this.props,
      {
        selectedEntities: this.getEntities(),
        handleClose: this.unmountModal,
      }
    );

    ReactDOM.render(
      <BulkMoveDialog { ...props }/>,
      document.getElementById("bulk-move-dialog-mount")
    );
  }

  render() {
    if (this.state.open) {
      this.mountBulkMoveDialog();
    }

    return (
      <MenuItem
        id={this.props.btnId}
        onClick={this.toggleBulkMoveModal}
      >
        Move
      </MenuItem>
    );
  }
}

BulkMoveButton.propTypes = {
  onOpen: func,
  btnId: string,
};

BulkMoveButton.defaultProps = {
  btnId: undefined,
  onOpen: () => {},
};

export default BulkMoveButton;
