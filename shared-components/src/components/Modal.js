import React, {PureComponent} from 'react';
import shortid from 'shortid';
import ReactDOM from 'react-dom';
import StyledModalContainer from './StyledModalContainer';

const uniqueMount = `modal-mount-${shortid.generate()}`;

/**
 * This is a Modal component which wraps the element to mount in the Modal
 * It can be used from anywhere in the DOM tree. It will mount itself at the top of the DOM
 * When the component is removed from the DOM, it will unmount the component it rendered
 * as a modal
 */
class Modal extends PureComponent {
  componentDidMount() {
    this.mountModal();
  }

  componentWillUnmount() {
    this.unmountModal();
  }

  getMount() {
    // this will not allow two different modals to show at once
    // the latter will bump the earlier modal
    const mount = document.querySelector(`#${uniqueMount}`);
    if (!mount) {
      // create and return
      const newMount = document.createElement("div");
      newMount.setAttribute("id", uniqueMount);
      document.body.appendChild(newMount);
      return newMount;
    }
    return mount;
  }

  mountModal() {
    ReactDOM.render(this.getModal(), this.getMount());
  }

  unmountModal() {
    const mount = this.getMount();
    if (mount) {
      ReactDOM.unmountComponentAtNode(mount);
    }
  }

  getModal() {
    return (
      <StyledModalContainer>
        {this.props.children}
      </StyledModalContainer>
    );
  }

  render() {
    return <span />;
  }
}

export default Modal;
