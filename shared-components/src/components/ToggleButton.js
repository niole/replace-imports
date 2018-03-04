/* eslint no-unused-vars: 0 */
import React, {PureComponent} from 'react';
import {
  func,
} from 'prop-types';


class ToggleButton extends PureComponent {
  state = { show: false }

  toggleModal = () => {
    this.setState({ show: !this.state.show });
  }

  closeModal = () => {
    this.setState({ show: false });
  }

  render() {
    return this.props.children(this);
  }
}

ToggleButton.propTypes = {
  children: func.isRequired,
}

export default ToggleButton;
