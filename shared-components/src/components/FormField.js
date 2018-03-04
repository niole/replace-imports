import React from 'react';
import { string, bool, func, any } from 'prop-types';
import { compose, withState, withProps, withHandlers } from 'recompose';
import memoizeWeak from 'memoize-weak';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Checkbox,
  Radio,
} from 'react-bootstrap';

import uncontrollable from '../higherOrderComponents/composableUncontrollable';
import omitProps from '../higherOrderComponents/omitProps';
import { formDataApiShape } from '../higherOrderComponents/withFormData';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const nonBreakingSpace = '\u00a0';

export const mapValueChangeHandlerToCheckboxOrRadioChangeHandler = memoizeWeak(
  onValueChange => {
    return event => onValueChange(!!event.target.checked);
  },
);

export const mapValueChangeHandlerToInputChangeHandler = memoizeWeak(
  onValueChange => {
    return event => onValueChange(event.target.value);
  },
);

export function controlComponentForType(type) {
  switch (type) {
    case 'checkbox':
      return Checkbox;
    case 'radio':
      return Radio;
    default:
      return FormControl;
  }
}

export function FormField({
  label,
  type,
  name,
  id = name,
  value,
  error,
  includePasswordStrengthMeter = type === 'password',
  help,
  children,
  validationState,
  ...otherProps
}) {
  const finalValidationState = error ? 'error' : validationState;
  const errorOrHelp = error ? error : help;

  const ControlComponent = controlComponentForType(type);

  return (
    <FormGroup validationState={finalValidationState}>
      {label &&
        <ControlLabel>
          {label}
        </ControlLabel>}
      <ControlComponent
        {...mapControlComponentProps({
          id,
          name,
          type,
          value,
          ...otherProps,
        })}
      >
        {children}
      </ControlComponent>
      {includePasswordStrengthMeter
        ? <PasswordStrengthMeter password={value} help={errorOrHelp} />
        : <HelpBlock>
            {errorOrHelp || nonBreakingSpace}
          </HelpBlock>}
    </FormGroup>
  );
}

FormField.propTypes = {
  componentClass: string,
  label: string,
  type: string,
  name: string,
  id: string,
  value: any,
  onValueChange: func,
  error: string,
  onFocus: func,
  onBlur: func,
  includePasswordStrengthMeter: bool,
  help: string,
};

FormField.defaultProps = {
  componentClass: 'input',
  type: 'text',
};

export function mapControlComponentProps(props) {
  switch (props.type) {
    case 'checkbox':
    case 'radio': {
      const { value, onValueChange, ...otherProps } = props;
      const checked = !!value;
      const onChange = mapValueChangeHandlerToCheckboxOrRadioChangeHandler(
        onValueChange,
      );
      return {
        value: 'true',
        checked,
        onChange,
        ...otherProps,
      };
    }
    default: {
      const { onValueChange, ...otherProps } = props;
      const onChange = mapValueChangeHandlerToInputChangeHandler(onValueChange);
      return {
        onChange,
        ...otherProps,
      };
    }
  }
}

export const FormFieldWithState = compose(
  uncontrollable({ value: 'onValueChange' }),
  withState('modified', 'setModified', false),
  withProps(
    ({ formData, name }) =>
      formData && name
        ? {
            value: formData.getFieldValue(name),
            error: formData.getFieldError(name),
          }
        : undefined,
  ),
  withHandlers({
    onValueChange: props => value => {
      if (props.formData && props.name) {
        if (props.commitOnChange) {
          props.formData.setFieldValueAndCommit(props.name, value);
        } else {
          props.formData.setFieldValue(props.name, value);
          props.setModified(true);
        }
      }
      props.onValueChange(value);
    },
    onBlur: props => event => {
      if (props.formData && props.name && props.modified) {
        props.formData.commitField(props.name);
        props.setModified(false);
      }
      props.onBlur && props.onBlur(event);
    },
  }),
  omitProps('modified', 'setModified', 'formData', 'commitOnChange'),
)(FormField);

FormFieldWithState.propTypes = {
  value: string,
  onValueChange: func,
  formData: formDataApiShape,
  commitOnChange: bool,
};

export default FormFieldWithState;
