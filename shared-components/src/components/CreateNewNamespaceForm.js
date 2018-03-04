import React, { PureComponent } from 'react';
import s from 'styled-components';
import { bool, oneOf, arrayOf, shape, string } from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import {
  INPUT,
  SELECT,
  debounceInput,
} from './util/sharedComponentUtil';
import {
  getInvalidNamespaceMessage,
  fileProjectDatasetNameValidator,
} from './util/fileProjectDatasetNameValidator';

import OneClickButton from './OneClickButton';
import Form from './Form';
import FormField from './FormField';

const InputsContainer = s.div`
    display: table;
    border-collapse: separate;
    border-spacing: 10px;
    margin: 0px -10px;
    height: 155px;
`;

const InputContainer = s.div`
    display: table-cell;
    vertical-align: top;
    &:not(:first-of-type) {
        width: 226px;
    }
`;

const HiddenInput = s.input`
  display: none;
`;

const UsernameFormGroup = s(FormGroup)`
    padding-top: 12px;
`;

class CreateNewNamespaceForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: '',
      name: '',
    };

    this.getFieldGroup = this.getFieldGroup.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.validateNewName = this.validateNewName.bind(this);
    this.debouncedValidator = debounceInput(this.validateNewName);
  }

  handleOnKeyPress(event) {
    this.debouncedValidator(event.target.value);
  }

  renderOption(value) {
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  }

  getInvalidNamespaceMessage(name) {
    const { nameSpaceType } = this.props;
    return getInvalidNamespaceMessage(nameSpaceType, name);
  }

  validateNewName(newName) {
    const valid = fileProjectDatasetNameValidator(newName);
    if (!valid) {
      this.setState({
        name: newName,
        error: newName ? this.getInvalidNamespaceMessage(newName) : '',
      });
    } else {
      this.setState({
        error: '',
        name: newName,
      });
    }
  }

  renderOptions() {
    const { organizations, username } = this.props;
    return [this.renderOption(username)].concat(
      organizations.map(this.renderOption),
    );
  }

  getFieldGroup({ componentClass, validationState, ...rest }) {
    const { error } = this.state;
    const { organizations, username } = this.props;

    switch (componentClass) {
      case INPUT:
        return (
          <InputContainer key={componentClass}>
            <FormField
              {...{
                ...rest,
                error,
                onKeyUp: this.handleOnKeyPress,
                validationState,
                componentClass,
              }}
            />
          </InputContainer>
        );

      case SELECT:
        return (
          <InputContainer key={componentClass}>
            {organizations.length
              ? <FormField {...{ componentClass, ...rest }}>
                  {this.renderOptions()}
                </FormField>
              : <UsernameFormGroup>
                  <HiddenInput {...rest} value={username} />
                  {username}
                </UsernameFormGroup>}
          </InputContainer>
        );
      default:
        return;
    }
  }

  submitIsDisabled() {
    const { error, name } = this.state;

    return error || !name;
  }

  renderInputs(inputs, nextField, index) {
    const next = this.getFieldGroup(nextField);
    if (index > 0) {
      return inputs.concat([
        <FormGroup key={`${index}-divider`}>/</FormGroup>,
        next,
      ]);
    }
    return [next];
  }

  getOwnershipExplanatoryMessage() {
    const { nameSpaceType } = this.props;
    const type = nameSpaceType.toLowerCase();
    return `You can set your ${type} to be owned by your account, or any of the organizations to which you belong.`;
  }

  render() {
    const {
      title,
      fields,
      csrfToken,
      submitUrl,
      submitLabel,
      organizations,
    } = this.props;

    return (
      <div>
        {title &&
          <h2>
            {title}
          </h2>}
        <Form method="POST" csrfToken={csrfToken} action={submitUrl}>
          <InputsContainer>
            {fields.reduce(this.renderInputs, [])}
            <FormGroup>
              <OneClickButton disabled={this.submitIsDisabled()} type="submit">
                {submitLabel}
              </OneClickButton>
            </FormGroup>
          </InputsContainer>
          {!!organizations.length &&
            <HelpBlock>
              {this.getOwnershipExplanatoryMessage()}
            </HelpBlock>}
        </Form>
      </div>
    );
  }
}

CreateNewNamespaceForm.propTypes = {
  fields: arrayOf(
    shape({
      componentClass: oneOf([INPUT, SELECT]).isRequired,
      disabled: bool,
      validationState: string,
      help: string,
      error: string,
      id: string,
      defaultValue: string,
      placeholder: string,
      name: string,
    }),
  ).isRequired,
  submitLabel: string,
  csrfToken: string.isRequired,
  submitUrl: string.isRequired,
  nameSpaceType: string.isRequired,
  organizations: arrayOf(string).isRequired,
  username: string.isRequired,
  title: string,
};

CreateNewNamespaceForm.defaultProps = {
  title: '',
  submitLabel: 'Submit',
};

export default CreateNewNamespaceForm;
