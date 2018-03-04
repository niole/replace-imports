import React from 'react';
import {bool, object, string, func} from 'prop-types';
import { FormInput } from 'react-form';
import styled from 'styled-components';
import EditIcon from './icons/EditIcon';
import ValidatedForm from './ValidatedForm';
import RenameFileDirModal, {
  props as renameFileDirModalPropTypes,
  defaultProps as renameFileDirModalDefaultProps,
} from './RenameFileDirModal';
import {
  getFileDirName,
  validateFileDirName,
} from './util/validateFileNameFormUtil';
import {
  FormControl,
  Button,
} from 'react-bootstrap';
import DominoLogoOnSubmitButton from './DominoLogoOnSubmitButton';

const DisabledInput = styled.div`
  margin-right: 5px;
`;

const FileNameEditorContainer = styled.div`
    display: inline-block;
`;

const FileName = styled.div`
    padding-right: 10px;
    color: #172434;
    display: inline-block;
`;

const EditButton = styled.a`
  font-size: 11px;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  position: relative;
  top: -2px;

  &:focus {
    outline: none;
  }

  svg {
    vertical-align: middle;
    margin-right: 5px;
  }
`;

const StyledFormControl = styled(FormControl)`
    width: 100%;
`;

const StyledForm = styled.form`
  color: #172434;
  margin: 0px;
  display: inline-flex;
  align-items: center;
  height: 16px;
`;

const StyledFormInput = styled(FormInput)`
  width: 30%;
  min-width: 200px;
  display: inline-block;

  &.editing {
    width: auto;
    min-width: auto;
  }

  input {
    font-size: 16px;
    border: 1px solid #DDDDDD;
    border-radius: 3px;
    box-shadow: none;
  }
`;

const ErrorsContainer = styled.div`
  font-size: 13px;
  color: red;
  margin: 10px 0px;
  position: absolute;
  top: 35px;
`;

const ActionsContainer = styled.div`
  position: absolute;
  right: -238px;

  button {
    margin-left: 15px;
  }
`;

class FileNameEditor extends ValidatedForm {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      submitted: false,
      submitError: "",
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.oldName = getFileDirName(props.oldPath);
    this.handleSaveAndRun = this.handleSaveAndRun.bind(this);
  }

  validate = ({ newName }) => {
    const {
      editing,
    } = this.props;

    return {
      newName: editing ? undefined : validateFileDirName(newName.trim(), this.oldName),
    };
  }

  handleSaveAndRun() {
    const {
        saveAndRunHandler,
    } = this.props;

    document.getElementById("saveRunButton").click();

    saveAndRunHandler();
  }

  renderForm({ touched, values, submitForm, setValue }) {
    const {
      submitLabel,
      cancelLabel,
      saveAndRunLabel,
      showSaveAndRun,
      cancelLink,
      filename,
      creating,
      editing,
    } = this.props;
    const {
      submitted,
      submitError,
    } = this.state;

    if (creating) {
      return (
        <StyledForm>
            {this.renderFormInput(values, touched)}
            <ActionsContainer>
              <Button
                  bsStyle="link"
                  bsSize="small"
                  href={cancelLink}
              >
              {cancelLabel}
              </Button>
              {showSaveAndRun &&
                  <Button
                    bsSize="small"
                    onClick={this.handleSaveAndRun}
                  >
                  {saveAndRunLabel}
                  </Button>}
              <DominoLogoOnSubmitButton
                type="submit"
                bsSize="small"
                width={80}
                submitError={submitError}
                submitted={submitted}
                onSubmit={submitForm}
                label={submitLabel}
              />
            </ActionsContainer>
          <ErrorsContainer>
            {this.renderValidationError("newName")}
            {this.renderSubmitError()}
          </ErrorsContainer>
        </StyledForm>
      );
    }

    if (editing) {
      return (
        <StyledForm>
            {this.renderDisabledInputGroup(values, touched)}
            {this.getEditButton(setValue)}
            <ActionsContainer>
              <Button
                  bsStyle="link"
                  bsSize="small"
                  href={cancelLink}
              >
              {cancelLabel}
              </Button>
              {showSaveAndRun &&
                  <Button
                    bsSize="small"
                    onClick={this.handleSaveAndRun}
                  >
                  {saveAndRunLabel}
                  </Button>}
              <DominoLogoOnSubmitButton
                type="submit"
                bsSize="small"
                width={80}
                submitError={submitError}
                submitted={submitted}
                onSubmit={submitForm}
                label={submitLabel}
              />
            </ActionsContainer>
            <ErrorsContainer>
              {this.renderSubmitError()}
            </ErrorsContainer>
        </StyledForm>
      );
    }

    return (
      <FileNameEditorContainer>
        <FileName>
          {filename}
        </FileName>
        {this.getEditButton(setValue)}
      </FileNameEditorContainer>
    );
  }

  getEditButton(setValue) {
    const {
      editLabel,
      ...rest
    } = this.props;
    const {
      showModal,
    } = this.state;

    return (
      <EditButton
        onClick={this.openModal}
        bsSize="small"
        bsStyle="link"
      >
        {showModal &&
          <RenameFileDirModal
            {...rest}
            closeHandler={this.closeModal}
          />}
        <EditIcon width={13} height={13} />
        {editLabel}
      </EditButton>
    );
  }

  renderInput(values, touched) {
    const valueProp = {
      defaultValue: values.newName,
    };

    return ({ setValue, setTouched, setAllValues}) => {
      return (
        <StyledFormControl
          onKeyUp={this.formatInputData(setValue, values, setAllValues)}
          onBlur={setTouched}
          id="newNameInput"
          {...valueProp}
        />
      );
    };
  }

  onSubmit() {
    // uses the code in fileCreateOrEdit.scala.html
    // to submit data
    return async function() {
      // ValidatedForm expects a promise to be returned from onSubmit
      window.onSave(document.getElementById("saveButton"));
    }();
  }

  renderFormInput(values, touched) {
    return (
      <StyledFormInput
        field="newName"
        showErrors={false}
      >
        {this.renderInput(values, touched)}
      </StyledFormInput>
    );
  }

  renderDisabledInputGroup(values, touched) {
    const {
      editing,
    } = this.props;
    const formInputClass = editing ? "editing" : undefined;

    return (
      <StyledFormInput
        className={formInputClass}
        field="newName"
        showErrors={false}
      >
        {this.renderDisabledInput(values)}
      </StyledFormInput>
    );
  }

  renderDisabledInput(values) {
    return () => {
      return (
        <DisabledInput>
          {values.newName}
          <input type="hidden" id="newNameInput" value={values.newName} />
        </DisabledInput>
      );
    };
  }

  renderSubmitError() {
    const {
      submitError,
    } = this.state;

    return (
      <div>
        {submitError}
      </div>
    );
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return this.renderValidatedForm(this.renderForm);
  }
}

export const FileNamEditorProps = Object.assign(
  {},
  renameFileDirModalPropTypes,
  {
    editLabel: string,
    creating: bool,
    editing: bool,
    saveAndRunHandler: func,
    saveAndRunLabel: string,
    defaultValues: object,
    isFileRunnable: bool,
    showSaveAndRun: bool,
    cancelLink: string,
    filename: string,
    locationUrl: string,
  },
);

FileNameEditor.propTypes = FileNamEditorProps;

export const FileNameEditorDefaultProps = Object.assign(
  {},
  renameFileDirModalDefaultProps,
  {
    editLabel: "Edit",
    creating: false,
    editing: false,
    saveAndRunLabel: "Save and Run",
    saveAndRunHandler: () => {},
    isFileRunnable: true,
    showSaveAndRun: true,
    cancelLink: '',
    filename: '',
    locationUrl: '',
  },
);

FileNameEditor.defaultProps = FileNameEditorDefaultProps;

export default FileNameEditor;
