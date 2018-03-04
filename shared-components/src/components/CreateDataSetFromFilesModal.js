import React, {PureComponent} from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import {
  func,
  bool,
  string,
  shape,
} from 'prop-types';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import StyledModalContainer from './StyledModalContainer';
import {
  getInvalidNamespaceMessage,
  fileProjectDatasetNameValidator,
} from './util/fileProjectDatasetNameValidator';
import CSRFForm from './Form';
import { FormInput, Form, Checkbox, FormError } from 'react-form'
import FormField from './FormField';

const defaultValues = {
  name: 'example_data_set_name',
  importDataSet: true,
  removeFilesFromParent: true,
};
const noFilesSelectedError = "No files selected";
const ErrorHelpBlock = styled(HelpBlock)`
  text-align: left;
  color: red;
  display: inline-block;
  font-size: 14px;
  position: absolute;
  bottom: 0px;
  left: 30px;
  margin: 0px;
  height: 52px;
  width: 300px;
`;

const StyledCodeBlock = styled.code`
    display: block;
    white-space: pre-line;
    word-wrap: break-word;
    text-align: left;
`;

const StyledFormError = styled(FormError)`
  color: red;
  margin-bottom: 15px;
  display: block !important;
`;

const ActionsContainer = styled.div`
  position: absolute;
  bottom: -67px;
  right: 30px;
`;

const CheckboxContainer = styled.div`
  div {
    display: inline-block;
  }

  .check-label {
    font-weight: bold;
    margin-left: 5px;
    bottom: 1px;
    position: relative;
  }
`;

function getSelectedFilePaths() {
  return $.map($('.selected-file-checkbox:checked'), function(item) {
    return $(item).data('path');
  });
}

function toggleModal() {
  const modal = document.getElementById("create-dataset-modal");
  modal.style.display = "none";
}


class CreateDataSetFromFilesModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      submitFailure: '',
    };

    this.renderActionsContainer = this.renderActionsContainer.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderDataSetNameInput = this.renderDataSetNameInput.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  onSubmit(values, state, props, instance) {
    const {
      submitUrl,
    } = this.props;
    const selectedFilePaths = getSelectedFilePaths();
    const data = Object.assign(
      {},
      values,
      { 'working-folder-env-var-name': this.getWorkingDirEnvName(values.name) },
    );

    if (selectedFilePaths.length === 0) {
      this.updateAll(noFilesSelectedError, data, instance.setAllValues);
      throw new Error(noFilesSelectedError);
    }
    data['paths'] = selectedFilePaths;

    $.ajax({
      type: "POST",
      url: submitUrl,
      data: data
    }).done((data, textStatus, xhr) => {
      const successUrl = xhr.getResponseHeader("Location");
      instance.setAllTouched(false);
      this.updateAll('', defaultValues, instance.setAllValues);
      window.location.href = successUrl;
    }).fail((jqXhr, textStatus, errorThrown) => {
      const errorMessage = jqXhr.responseText || "An error occured while trying to create the data set"
      this.updateAll(errorMessage, data, instance.setAllValues);
      throw new Error(errorMessage);
    }).always(() => {
      toggleModal();
    });
  }

  updateAll(submitFailure, resetData, setAllValues) {
    this.setState({ submitFailure }, () => setAllValues(resetData));
  }

  validate({ name }) {
    return {
      name: fileProjectDatasetNameValidator(name) ?
        undefined :
        getInvalidNamespaceMessage("Data Set", name),
    };
  }

  renderCheckbox(values, label, fieldName, help) {
    return (
        <CheckboxContainer>
          <Checkbox
            field={fieldName}
          />
          <span className="check-label">
            {label}
          </span>
          <HelpBlock>
            {help}
          </HelpBlock>
        </CheckboxContainer>
    );
  }

  renderWorkingFolderEnvInput(envName) {
    return function() {
      return (
          <FormControl
            className="form-control"
            type="text"
            name="working-folder-env-var-name"
            id="working-folder-env-var-name"
            value={envName}
            readOnly
          />
      );
    };
  }

  renderExamples(formValues) {
    const {
      name,
    } = formValues;
    const envName = this.getWorkingDirEnvName(name);

    return (
      <div>
        <label for="working-folder-env-var-name">
          Working Folder Environment Variable Name
        </label>
        <FormInput>
          {this.renderWorkingFolderEnvInput(envName)}
        </FormInput>

        <HelpBlock>
          When creating a Data Set from an existing Project, selecting "Import
            data set", and selecting "Delete selected files" will cause all existing relative
          references to these files to stop working. Instead use this environment variable name
          as an alias to the path where the imported files can be accessed.
        </HelpBlock>
        <div id="env-var-usage-python-example">
          To use this environment variable in Python:
          <StyledCodeBlock>
          import os
            os.environ['<span class="example">{envName}</span>']
          </StyledCodeBlock>
        </div>
      </div>
    );
  }

  getWorkingDirEnvName(name) {
    const {
      username,
    } = this.props;
    const Username = username.toUpperCase();
    const Name = name.toUpperCase();

    return `DOMINO_${Username}_${Name}_WORKING_DIR`;
  }

  handleCancel(setAllValues) {
    return () => {
      this.updateAll('', defaultValues, setAllValues);
      toggleModal();
    };
  }

  renderActionsContainer(setAllValues, submitForm) {
    const {
      submitLabel,
      cancelLabel,
    } = this.props;

    return (
      <ActionsContainer>
        <Button
          bsStyle="link"
          onClick={this.handleCancel(setAllValues)}
        >
          {cancelLabel}
        </Button>
        <Button
          bsStyle="success"
          onClick={submitForm}
        >
          {submitLabel}
        </Button>
      </ActionsContainer>
    );
  }

  renderForm({ touched, values, submitForm, setAllValues }) {
    const {
      csrfToken,
    } = this.props;

    //when input blurs, update code example and working folder env var name
    return (
     <CSRFForm csrfToken={csrfToken}>
        <FormInput value={values.name} showErrors={false} field="name">
          {this.renderDataSetNameInput}
        </FormInput>
        <StyledFormError field="name" />
        {this.renderCheckbox(
          values,
          'Import data set',
          'importDataSet',
          'Import the newly created data set into this project',
          )}
        {this.renderCheckbox(
          values,
          'Delete selected files',
          'removeFilesFromParent',
          'Delete the selected files from this project',
          )}
        {touched.name && this.renderExamples(values)}
        {this.renderActionsContainer(setAllValues, submitForm)}
     </CSRFForm>
    )

  }

  handleInputUpdate(setValueCB) {
    return function(event) {
      setValueCB(event.target.value);
    };
  }

  renderDataSetNameInput(props) {
      const {
        setValue,
        setTouched,
      } = props;

      return (
          <FormField
            {...this.props.inputField}
            onKeyUp={this.handleInputUpdate(setValue)}
            onBlur={this.setTouched(setTouched, setValue)}
          />
      );
  }

  setTouched(setTouched, setValue) {
    return event => {
        setValue(event.target.value);
        setTouched();
    };
  }

  render() {
    const {
      title,
    } = this.props;
    const {
      submitFailure,
    } = this.state;

    return (
      <StyledModalContainer>
        <Modal.Header>
          {title}
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            defaultValues={defaultValues}
          >
            {this.renderForm}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ErrorHelpBlock>
            {submitFailure}
          </ErrorHelpBlock>
        </Modal.Footer>
      </StyledModalContainer>
    );
  }
}



CreateDataSetFromFilesModal.propTypes = {
  inputField: shape({
      componentClass: string,
      disabled: bool,
      help: string,
      error: string,
      id: string,
      defaultValue: string,
      placeholder: string,
      name: string,
  }).isRequired,
  username: string.isRequired,
  submitUrl: string.isRequired,
  csrfToken: string.isRequired,
  submitLabel: string,
  cancelLabel: string,
  title: string,
  selectedFilePaths: func,
};

CreateDataSetFromFilesModal.defaultProps = {
  selectedFilePaths: () => [],
  title: '',
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
};


export default CreateDataSetFromFilesModal;
