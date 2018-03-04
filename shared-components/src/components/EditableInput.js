import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

function EditPanel({ children, onCancelButtonClick, onUpdateButtonClick }) {
  return (
    <div className="text-edit-panel">
      <FormGroup>
        {children}
      </FormGroup>
      <FormGroup>
        <Button
          className="btn-secondary update"
          bsSize="small"
          onClick={onUpdateButtonClick}
        >
          Update
        </Button>
        <Button
          className="cancel"
          bsSize="small"
          bsStyle="link"
          onClick={onCancelButtonClick}
        >
          Cancel
        </Button>
      </FormGroup>
    </div>
  );
}

function RenderedText({ name, onClickEditText, readOnly, renderText, value }) {
  const renderedText = (value ?
    <span>{renderText(value)}</span> :
    <i>No {name} provided</i>
  );
  return (readOnly ?
    renderedText : (
    <span
      className="editable-field"
      title="Click to edit"
      onClick={onClickEditText}
    >
      {renderedText}
      <Glyphicon glyph="pencil" className="overlay-icon" />
    </span>
  ));
}

/**
 * A higher-order component that wraps an input or textarea tag so that it
 * renders as a span when the user is not editing it. The user can press a
 * button to enter mode to update the value, and then press another button to
 * exit edit mode when they're done.
 *
 * This component also accepts a callback that triggers when the user updates
 * the value of the control, which can be useful for updating particular fields
 * of a resource using AJAX.
 *
 * @param {boolean} isEditing - Shows the edit panel if true else shows the
 *                              rendered text.
 * @param {string} name - The name of the control, which is submitted with the
 *                        form data.
 * @param {Function?} onUpdate - A function which is called when the user
 *                               updates the value of the control. It will be
 *                               passed the new value of the control.
 * @param {boolean?} readOnly - Indicates whether the user can modify the value
 *                              of the control.
 * @param {Function?} renderText - A function which takes the value of the
 *                                 control and maps it to a string to show to
 *                                 the user.
 * @param {string} value - The initial value of the control.
 */
function EditableInput(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      isEditing: PropTypes.bool,
      name: PropTypes.string.isRequired,
      onUpdate: PropTypes.func,
      readOnly: PropTypes.bool,
      renderText: PropTypes.func,
      value: PropTypes.string.isRequired,
    };

    static defaultProps = {
      isEditing: false,
      readOnly: false,
      renderText: text => text,
    };

    constructor(props) {
      super(props);
      this.state = {
        isEditing: props.isEditing,
        persistedValue: props.value,
        value: props.value,
      };
    }

    onChange = event => {
      this.setState({ value: event.target.value });
    };

    onClickEditText = () => {
      this.setState({ isEditing: true });
    };

    onCancelButtonClick = () => {
      this.setState({
        isEditing: false,
        value: this.state.persistedValue,
      });
    };

    onUpdateButtonClick = () => {
      if (
        this.props.onUpdate &&
        this.state.value !== this.state.persistedValue
      ) {
        this.props.onUpdate(this.state.value);
      }
      this.setState(previousState => ({
        isEditing: false,
        persistedValue: previousState.persistedValue,
      }));
    };

    render() {
      const {
        isEditing,
        name,
        onUpdate,
        readOnly,
        renderText,
        value,
        ...otherProps
      } = this.props;
      return this.state.isEditing
        ? <EditPanel
            onCancelButtonClick={this.onCancelButtonClick}
            onUpdateButtonClick={this.onUpdateButtonClick}
          >
            <WrappedComponent
              onChange={this.onChange}
              value={this.state.value}
              {...otherProps}
            />
          </EditPanel>
        : <RenderedText
            readOnly={this.props.readOnly}
            onClickEditText={this.onClickEditText}
            renderText={this.props.renderText}
            value={this.state.value}
            name={this.props.name}
          />;
    }
  };
}

const EditableText = EditableInput(function(props) {
  return <FormControl type="text" autoFocus {...props} />;
});

export default EditableText;
