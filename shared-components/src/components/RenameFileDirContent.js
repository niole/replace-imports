import React from 'react';
import styled from 'styled-components';
import { object, oneOf, func, string } from 'prop-types';
import { FormError, FormInput } from 'react-form';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormField from './FormField';
import ValidatedForm from './ValidatedForm';
import WarningBox from './WarningBox';
import DominoLogoOnSubmitButton from './DominoLogoOnSubmitButton';
import StyledModalHeader from './styled/StyledModalHeader';
import {
  getFileDirName,
  capitalize,
  getChangeEntityWarning,
  validateFileDirName,
  getNewFilePath,
  getSubmitButtonLabel,
} from './util/validateFileNameFormUtil';
import {
  postRenameFileOrDir,
} from './util/queryUtil';
import {
  cleanPath,
} from './util/bulkMoveUtil';
import {
    forceReload,
} from './util/sharedComponentUtil';

export const FILE = "file";
const DIRECTORY = "directory";

const StyledFooter = styled(Modal.Footer)`
    min-height: 95px;
`;

const StyledModalBody = styled(Modal.Body)`
  padding: 10px 30px;
`;

const StyledFormField = styled(FormField)`
  + .help-block {
    display: none;
  }
`;

const ErrorBlock = styled(HelpBlock)`
  font-size: 14px;
  color: red;
  display: inline;
  width: 275px;
  margin: 0px;
  float: left;
  text-align: left;
  word-break: break-all;
`;

const StyledError = styled(FormError)`
  color: red;
  height: 35px;
  display: block !important;
`;

const ActionsContainer = styled.div`
  position: absolute;
  bottom: -85px;
  right: 30px;
`;

class RenameFileDirContent extends ValidatedForm {
  constructor(props) {
    super(props);
    this.oldName = getFileDirName(props.oldPath);
  }

  validate = (formData) => {
    return {
      newName: validateFileDirName(formData.newName, this.oldName, this.props.entityType),
    };
  }

  closeDialog = () => {
    this.props.closeHandler();
  }

  getChangeEntityHeader() {
    const {
      entityType,
    } = this.props;
    const type = capitalize(entityType);
    return `Rename a ${type}`;
  }

  onSubmit = (values, state, props, instance) => {
    const {
      onSubmit,
      oldPath,
      ownerUsername,
      projectName,
      entityType,
      locationUrl,
    } = this.props;
    const newPath = getNewFilePath(values.newName, oldPath);

    // ValidatedForm (parent) handles errors thrown in here
    return postRenameFileOrDir(ownerUsername, projectName, cleanPath(oldPath), cleanPath(newPath), entityType)
      .then(() => {
        if (onSubmit) {
          onSubmit(values);
          this.closeDialog();
        } else {
          forceReload(locationUrl.replace(this.oldName, values.newName));
        }
      });
  }

  renderInfoBox = () => {
    const {
      entityType,
    } = this.props;

    return (
      <WarningBox>
        {getChangeEntityWarning(entityType)}
      </WarningBox>
    );
  }

  renderValidationError() {
    return (
      <StyledError field="newName" />
    );
  }

  renderInput = (values) => {
    return ({ setValue, setTouched, setAllValues}) => {
      return (
        <div>
          {this.renderInfoBox()}
          <StyledFormField
            onKeyUp={this.formatInputData(setValue, values, setAllValues)}
            defaultValue={this.oldName}
            onBlur={setTouched}
            type="text"
            label="New Name"
          />
          {this.renderValidationError()}
        </div>
      );
    };
  }

  renderInputGroup(values) {
    return (
      <FormInput
        field="newName"
        showErrors={false}
      >
        {this.renderInput(values)}
      </FormInput>
    );
  }

  renderForm = ({ values, submitForm }) => {
    const {
      cancelLabel,
      entityType,
    } = this.props;
    const {
      submitted,
      submitError,
    } = this.state;

    return (
      <form>
        {this.renderInputGroup(values)}
        <ActionsContainer>
          <Button
            bsStyle="link"
            onClick={this.closeDialog}
          >
            {cancelLabel}
          </Button>
          <DominoLogoOnSubmitButton
            type="submit"
            width={149}
            submitError={submitError}
            submitted={submitted}
            onSubmit={submitForm}
            label={getSubmitButtonLabel(entityType)}
          />
        </ActionsContainer>
      </form>
    );
  }

  renderSubmitError() {
    const {
      submitError,
    } = this.state;

    return (
      <ErrorBlock>
        <div>
          {submitError}
        </div>
      </ErrorBlock>
    );
  }

  render() {
    return (
      <div>
        <StyledModalHeader>
          {this.getChangeEntityHeader()}
        </StyledModalHeader>
        <StyledModalBody>
          {this.renderValidatedForm(this.renderForm)}
        </StyledModalBody>
        <StyledFooter>
          {this.renderSubmitError()}
        </StyledFooter>
      </div>
    );
  }
}

export const props = {
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  oldPath: string.isRequired,
  closeHandler: func,
  entityType: oneOf([FILE, DIRECTORY]),
  submitLabel: string,
  cancelLabel: string,
  defaultValues: object,
  onSubmit: func,
};

export const defaultProps = {
  entityType: FILE,
  submitLabel: "Rename File",
  cancelLabel: "Cancel",
  closeHandler: () => {},
  defaultValues: {},
};

RenameFileDirContent.propTypes = props;

RenameFileDirContent.defaultProps = defaultProps;

export default RenameFileDirContent;
