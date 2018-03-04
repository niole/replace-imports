import React, {PureComponent} from 'react';
import {node, string} from 'prop-types';
import Button from 'react-bootstrap/lib/Button';


/*
 * This component allows toggleable react modals in Scala.
 * The Problem: the toggle
 * functionality of a toggleable thing requires that the its context
 * is aware of its state (open/closed). With the React in
 * Scala pattern, the isolated React component is largely
 * uncontextualized in the Scala UI
 * Solution: Render the toggleable thing and the button
 * that toggles it together in React
 */
class ReactInScalaToggleableRenderer extends PureComponent {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  toggleModal() {
    this.setState({ open: !this.state.open });
  }

  closeModal() {
    this.setState({ open: false });
  }

  renderToggleable() {
    const {
      children,
    } = this.props;

    return React.cloneElement(
      React.Children.only(children),
      {
        closeHandler: this.closeModal,
      },
    );
  }

  render() {
    const {
      toggleButtonLabel,
      buttonClass,
    } = this.props;
    const {
      open,
    } = this.state;

    return (
      <span className="ReactInScalaToggleableRenderer">
        <Button
          className={buttonClass}
          onClick={this.toggleModal}
        >
          {toggleButtonLabel}
        </Button>
        {open && this.renderToggleable()}
      </span>
    );
  }
}

export const props = {
  toggleButtonLabel: string.isRequired,
  buttonClass: string,
};

export const defaultProps = {
  buttonClass: "",
};

ReactInScalaToggleableRenderer.propTypes = props;

ReactInScalaToggleableRenderer.defaultProps = defaultProps;

export default ReactInScalaToggleableRenderer;
