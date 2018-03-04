import React from 'react';
import styled from 'styled-components';
import {
  oneOfType,
  node,
  func,
  bool,
  oneOf,
  arrayOf,
  string,
  shape,
} from 'prop-types';
import { FormError, FormInput } from 'react-form';
import {
  Modal,
  MenuItem,
  DropdownButton,
  Button,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { subGrey } from './styled/colors';
import ValidatedForm from './ValidatedForm';
import CSRFForm from './Form';
import DominoLogoOnSubmitButton from './DominoLogoOnSubmitButton';
import InfoBox from './InfoBox';
import WarningBox from './WarningBox';

const Sublabel = styled.span`
  margin-left: 5px;
  font-weight: normal;
  color: ${subGrey};
`;

const StyledFormControl = styled(FormControl)`
  resize: none;
`;

const Link = styled.a`
  margin-left: 5px;
  font-weight: normal;
`;

const ErrorStyle = `
  color: red;
  font-size: 13px;
  text-align: left;
`;

const StyledError = styled(FormError)`
  ${ErrorStyle}
  display: block !important;
  height: 30px;
`;

const OnSubmitError = styled.div`
  ${ErrorStyle}
  display: inline-block;
`;

const nonInputGroups = [
  "text",
  "info",
  "warning",
];

const ColGroup = styled.div`
  display: inline-block;
  margin: 0px 10px;

  &:first-of-type {
    margin-left: 0px;
  }

  &:last-of-type {
    margin-right: 0px;
  }
`;

const RowGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;

  &:first-of-type {
    margin-top: 0px;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`;

/**
 * FormattedForm is a prevalidated, preformatted form creator. The idea is that creation of this kind of component
 * is exactly the same 90% of the time. The basic structure is completely automatable.
 * The `fieldsMatrix` provides a data structure through which you can specify what elements you want to show
 * and where they should show.
 *
 * The rows of the `fieldsMatrix` are literally the rows of the form. Elements that you want to show up next to each
 * other go on the same row. If you want one to show on to of the other, put it in the row before the other one.
 *
 * [[x], [y]] -> x is on top of y
 * [[x, y]] -> y is on the right side of x
 *
 * The columns of the `fieldsMatrix` specify position of the element on the row
 *
 * This form creator doesn't presume much styling out of the box. It uses react-bootstrap for most of its core
 * elements, it adds padding to elements' containers, and it attempts to center elements vertically in their `RowGroup`.
 *
 * Extra UI tweaks can be done through css.
 */
class FormattedForm extends ValidatedForm {
  constructor() {
    super();
    this.getDepProps = this.getDepProps.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.validate = this.validate.bind(this);
  }

  /**
   * Runs validation callbacks for all inputs that specify that they are validated
   *
   * @function
   * @memberof FormattedForm
   * @name validateAll
   * @param {Object} values - mapping from input key to user inputted value (undefined if no default value
   * or user input specified). This mapping is tracked by react-form
   * @return {Object} - found errors, computed by validators provided by user
   */
  validateAll(values) {
    const {
      fieldMatrix,
    } = this.props;
    const errors = Object.keys(values).reduce((acc, key) => {
      acc[key] = undefined;
      return acc;
    }, {});

    let i = 0;
    for (; i < fieldMatrix.length; i++) {
      let j = 0;
      for (; j < fieldMatrix[i].length; j++) {
        const inputGroup = fieldMatrix[i][j].inputOptions;
        if (inputGroup.validated) {
          const {
            validators = [], // if user accidentally adds validate with no validators
            key,
          } = inputGroup;
          const errorArgs = [values[key], this.props, values];
          const foundError = validators.find(({ checker }) => {
            return checker.apply(null, errorArgs);
          });

          if (foundError) {
            errors[key] = foundError.errorCreator.apply(null, errorArgs);
          }
        }
      }
    }

    return errors;
  }

  /**
   * Passed to react-form by `ValidatedForm` as validate prop. Triggers when values managed by react-form
   * update and runs validation on those values
   *
   * @function
   * @memberof FormattedForm
   * @name validate
   * @param {Object} values - values managed by react-form, mapping from input key to user inputted value
   * @return {Object} - mapping from input key to error messages
   */
  validate(values) {
    return this.validateAll(values);
  }

  /**
   * Triggers user provided onSubmit Promise. Triggered by ValidatedForm
   *
   * @function
   * @memberof FormattedForm
   * @name onSubmit
   * @param {Object} values - values managed by react-form
   * @param {Object} state - state managed by react-form
   * @param {Object} props - props managed by react-form
   * @param {Object} instance - instance methods managed by react-form
   * @return {Promise} - whatever you want to have happen onSubmit
   */
  onSubmit(values, state, props, instance) {
    const {
      onSubmit,
    } = this.props;

    if (onSubmit) {
      return onSubmit(values, this.props);
    }
  }

  /**
   * Assembles a drop down specified by the SelectOptions prop type in the InputSpec prop type
   *
   * @function
   * @memberof FormattedForm
   * @name getSelect
   * @param {Object} values - values managed by react-form
   * @param {Object} options - see the SelectOptions prop type
   * @return {Function} - callback managed by react-form, which returns a drop down
   */
  getSelect(values, options) {
    return ({ setValue, setTouched, setAllValues}) => {
      return (
        <div className={options.className || options.key}>
          <DropdownButton
            title={options.label}
            onSelect={(eventKey) => {
              setTouched();
              this.formatInputData(setValue, values, setAllValues)(eventKey);
            }}
            {...this.getDepProps(options, values)}
          >
            {options.options.map(({ itemType, value, label }, index) => {
              if (itemType === "option") {
                return (
                  <MenuItem key={value} eventKey={value}>
                    {label}
                  </MenuItem>
                );
              }

              if (itemType === "divider") {
                return (
                  <MenuItem key={`divider-${index}`} divider />
                );
              }

              return (
                <MenuItem key={value} eventKey={value}>
                  {label}
                </MenuItem>
              );
            })}
          </DropdownButton>
          {this.renderLinkAndSublabel(options)}
        </div>
      );
    };
  }

  /**
   * Computes props for an input based on the related `onValuesUpdate` callback, optionally provided by the user
   *
   * @function
   * @memberof FormattedForm
   * @name getDepProps
   * @param {Object} options - see the InputSpec's prop type's `inputOptions` field
   * @param {Object} values - values managed by react-form
   * @return {Object} - props to be copied into input
   */
  getDepProps(options, values) {
    const {
      onValuesUpdate,
      key,
    } = options;

    if (onValuesUpdate) {
      return onValuesUpdate(values[key], this.props, values);
    }
    return {};
  }

  /**
   * Assembles a validateable input or a textarea
   *
   * @function
   * @memberof FormattedForm
   * @name getInputUI
   * @param {Object} values - values managed by react-form
   * @param {Object} options - see the InputOptions prop type
   * @param {string} componentType - either "input" or "textarea"
   * @return {Function} - callback managed by react-form which returns a text input or a text area
   */
  getInputUI(values, options, componentType) {
    const {
      label,
      validated,
      key,
      placeholder,
      className,
      onValuesUpdate,
      ...rest
    } = options;

    return ({ setValue, setTouched, setAllValues}) => {
      return (
        <div className={className || key}>
          {label &&
            <ControlLabel>
              {label}
              {this.renderLinkAndSublabel(options)}
            </ControlLabel>}
          <StyledFormControl
            defaultValue={values[key]}
            componentClass={componentType}
            onChange={this.formatInputData(setValue, values, setAllValues)}
            onKeyUp={this.formatInputData(setValue, values, setAllValues)}
            onBlur={setTouched}
            placeholder={placeholder}
            {...rest}
            {...this.getDepProps(options, values)}
          />
          {validated && <StyledError className="col-error" field={key} />}
        </div>
      );
    };
  }

  /**
   * Handles creating link and sublabel elements for inputs, if either exist
   *
   * @function
   * @memberof FormattedForm
   * @name renderLinkAndSublabel
   * @param {Object} details - link and sublabel details
   * @param {string} details.sublabel - copy to be used as a sublabel
   * @param {string} details.linklabel - copy to be used as the label for the specified link
   * @param {string} details.link - href for the link
   * @return {Array} - the link and the sublabel, or neither!
   */
  renderLinkAndSublabel({ sublabel, link, linklabel }) {
    const contents = [];
    if (sublabel) {
      contents.push(
        <Sublabel key="sublabel">
          {sublabel}
        </Sublabel>
      );
    }

    if (link) {
      contents.push(
        this.renderLink(link, linklabel)
      );
    }

    return contents;
  }

  getInput(values, options) {
    return this.getInputUI(values, options);
  }

  /**
   * Assembles a validateable checkbox
   *
   * @function
   * @memberof FormattedForm
   * @name getCheckBox
   * @param {Object} values - values managed by react-form
   * @param {Object} options - see the CheckBoxOptions prop type
   * @return {Function} - callback managed by react-form which returns a checkbox
   */
  getCheckBox(values, options) {
    const {
      key,
      label,
      validated,
      className,
      ...rest,
    } = options;

    return ({ setValue, setTouched, setAllValues}) => {
      return (
        <div className={className || key}>
          <input
            id={key}
            type="checkbox"
            defaultChecked={values[key]}
            onChange={event => {
              setTouched();
              this.formatInputData(setValue, values, setAllValues)(event.target.checked);
            }}
            {...rest}
          />
          <label htmlFor={key}>
            {label}
            {this.renderLinkAndSublabel(options)}
          </label>
          {validated && <StyledError field={key} />}
        </div>
      );
    };
  }

  getTextArea(values, options) {
    return this.getInputUI(values, options, "textarea");
  }

  /**
   * Handles rendering interactive form components
   *
   * @function
   * @memberof FormattedForm
   * @name renderInput
   * @param {Object} values - values managed by react-form
   * @param {string} inputType - type of input to create
   * @param {Object} options - see the `inputOptions` field of the InputSpec prop type
   * @return {Function} - callback managed by react-form which returns specified input
   */
  renderInput(values, inputType, options) {
    switch (inputType) {
      case "input":
        return this.getInput(values, options);

      case "select":
        return this.getSelect(values, options);

      case "checkbox":
        return this.getCheckBox(values, options);

      case "textarea":
        return this.getTextArea(values, options);

      default:
        return this.getInput(values, options);
    }
  }

  /**
   * Delegates to proper node creation logic based on inputType
   *
   * @function
   * @memberof FormattedForm
   * @name renderInputGroup
   * @param {Object} values - values managed by react-form
   * @param {string} inputType - type of input to create
   * @param {Object} options - see the `inputOptions` field of the InputSpec prop type
   * @return {Object} - node, renderable by React
   */
  renderInputGroup(values, inputType, options) {
    if (nonInputGroups.indexOf(inputType) === -1) {
      return (
        <FormInput
          field={options.key}
          showErrors={false}
        >
          {this.renderInput(values, inputType, options)}
        </FormInput>
      );
    }

    if (inputType === "text") {
      return (
        <div className="text-bloc">
          {options}
        </div>
      );
    }

    if (inputType === "info") {
      return (
        <InfoBox className="info-box">
          {options.content}
          {options.link && this.renderLink(options.link, options.linklabel)}
        </InfoBox>
      );
    }

    if (inputType === "warning") {
      return (
        <WarningBox className="warning-box">
          {options.content}
          {options.link && this.renderLink(options.link, options.linklabel)}
        </WarningBox>
      );
    }
  }

  renderLink(link, linklabel) {
    return (
      <Link key={linklabel} href={link} target="blank">
        {linklabel}
      </Link>
    );
  }

  /**
   * Assembles the form specified by the user via the props of `FormattedForm`
   *
   * @function
   * @memberof FormattedForm
   * @name renderForm
   * @param {Object} formDetails - helpful information managed by react-form
   * @param {Object} formDetails.values - values managed by react-form, mapping from user provided keys to values
   * inputted by user in relevant inputs
   * @param {Func} formDetails.submitForm - submit callback, to be triggered when user clicks form's submit button
   * @return {Object} - form node, renderable by React
   */
  renderForm({ values, submitForm }) {
    const {
      cancelLabel,
      submitLabel,
      onCancel,
      fieldMatrix,
      asModal,
    } = this.props;
    const {
      submitted,
      submitError,
    } = this.state;

    const fields = fieldMatrix.map((row, i) => {
      return (
        <RowGroup className="row-group" key={`row-${i}`}>
          {row.map(({ inputType, inputOptions }) => {
            return (
              <ColGroup
                className="col-group"
                key={inputOptions.key}
              >
                  {this.renderInputGroup(values, inputType, inputOptions)}
              </ColGroup>
            );
          })}
        </RowGroup>
      );
    });

    const actions = [
      <OnSubmitError
        key="submiterror"
        className="submit-error-field"
      >
        {submitError}
      </OnSubmitError>,
      <Button
        key="cancelbutton"
        bsStyle="link"
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>,
      <DominoLogoOnSubmitButton
        type="submit"
        key="submitbutton"
        submitError={submitError}
        submitted={submitted}
        onSubmit={submitForm}
        label={submitLabel}
      />,
    ];

    return (
      <CSRFForm>
        { asModal ?
          <Modal.Body>
            {fields}
          </Modal.Body> :
          <div>
            {fields}
          </div>
        }
        { asModal ?
          <Modal.Footer>
            {actions}
          </Modal.Footer> :
          <div>
            {actions}
          </div> }
      </CSRFForm>
    );
  }

  render() {
    return this.renderValidatedForm(this.renderForm);
  }
}

const LinkDetails = {
  link: string,
  linklabel: string,
};

const Validators = arrayOf(
  shape({
    checker: func, // call with value, props, react-form values
    errorCreator: func, // call with value, props, react-form values
  })
);

const ValidationGroup = {
  validated: bool,
  validators: Validators,
};

const TitleDetails = {
  label: string,
  sublabel: string,
  ...LinkDetails
};

const InteractiveInputDetails = {
  key: string,
  onValuesUpdate: func, // called with (value, props, values)
  className: string,
  ...TitleDetails,
  ...ValidationGroup,
};

const SelectOptions = shape({
  options: arrayOf(shape({
    itemType: oneOf(["option", "divider"]),
    value: string,
    label: string,
  })),
  ...InteractiveInputDetails
});

const InputOptions = shape({
  placeholder: string,
  ...InteractiveInputDetails
});

const TextAreaOptions = InputOptions;

const CheckBoxOptions = shape({
  checked: bool,
  ...InteractiveInputDetails
});

const PlainText = oneOfType([string, node]);

const Info = shape({
  content: string,
  ...LinkDetails
});

const Warning = Info;

const InputSpec = shape({
  inputType: oneOf([
    "input",
    "checkbox",
    "select",
    "textarea",
    "text",
    "info",
    "warning",
  ]),
  inputOptions: oneOfType([
    Info,
    Warning,
    PlainText,
    SelectOptions,
    InputOptions,
    TextAreaOptions,
    CheckBoxOptions,
  ]),
});

FormattedForm.propTypes = {
  fieldMatrix: arrayOf(arrayOf(InputSpec)),
  csrfToken: string,
  onChange: func,
  onSubmit: func.isRequired, // will be called with values, this.props, must implement promise API
  onCancel: func.isRequired,
  cancelLabel: string,
  submitLabel: string,
  asModal: bool,
};

FormattedForm.defaultProps = {
  cancelLabel: "Cancel",
  submitLabel: "Submit",
  asModal: false,
  csrfToken: '',
  fieldMatrix: [[]],
  onChange: () => {},
};

export default FormattedForm;
