import { any, string, bool, func, arrayOf, objectOf, shape } from 'prop-types';
import { compose, mapProps, withProps, setStatic } from 'recompose';

import uncontrollable from './composableUncontrollable';
import omitProps from './omitProps';

export const fieldsShape = objectOf(
  shape({
    value: any,
    errors: arrayOf(string.isRequired),
  }),
);

export const formDataShape = shape({
  fields: fieldsShape,
});

export const formDataApiShape = shape({
  fields: fieldsShape.isRequired,
  getFieldValue: func.isRequired,
  getFieldError: func.isRequired,
  getFieldErrors: func.isRequired,
  setFieldValue: func.isRequired,
  setFieldErrors: func.isRequired,
  commitField: func.isRequired,
  commitAllFields: func.isRequired,
  resetFieldValue: func.isRequired,
  isValid: bool.isRequired,
  isModified: bool.isRequired,
  fieldIsModified: func.isRequired,
});

export default function withFormData(configuration) {
  const higherOrderComponent = compose(
    mapProps(props => {
      const finalDefaultFormData = configuration.mapFormData
        ? configuration.mapFormData(props.defaultFormData)
        : props.defaultFormData;
      return {
        ...props,
        defaultFormData: finalDefaultFormData,
        unmodifiedFormData: finalDefaultFormData,
      };
    }),
    uncontrollable({ formData: 'onFormDataChange' }),
    withProps(props => {
      const { formData, unmodifiedFormData, onFormDataChange } = props;
      const finalConfiguration =
        typeof configuration === 'function'
          ? configuration(props)
          : configuration;
      return {
        formData: {
          fields: {},
          ...formData,
          isValid: validate(formData, finalConfiguration),
          isModified: isModified(
            formData,
            unmodifiedFormData,
            finalConfiguration,
          ),
          fieldIsModified: fieldName =>
            fieldIsModified(
              fieldName,
              formData,
              unmodifiedFormData,
              finalConfiguration,
            ),
          getFieldValue: fieldName =>
            getFieldValue(formData, fieldName, finalConfiguration),
          getFieldError: fieldName => getFieldError(formData, fieldName),
          getFieldErrors: fieldName => getFieldErrors(formData, fieldName),
          setFieldValue: (fieldName, value) =>
            onFormDataChange(setFieldValue(formData, fieldName, value)),
          setFieldValueAndCommit: (fieldName, value) =>
            onFormDataChange(
              commitField(
                setFieldValue(formData, fieldName, value),
                fieldName,
                finalConfiguration,
              ),
            ),
          setFieldErrors: (fieldName, errors) =>
            onFormDataChange(setFieldErrors(formData, fieldName, errors)),
          commitField: fieldName =>
            onFormDataChange(
              commitField(formData, fieldName, finalConfiguration),
            ),
          commitAllFields: () => {
            const nextFormData = commitAllFields(formData, finalConfiguration);
            const isValid = validate(nextFormData, finalConfiguration);
            onFormDataChange(nextFormData);
            return isValid;
          },
          resetFieldValue: fieldName =>
            onFormDataChange(
              setFieldValue(
                formData,
                fieldName,
                getFieldValue(
                  unmodifiedFormData,
                  fieldName,
                  finalConfiguration,
                ),
              ),
            ),
        },
      };
    }),
    omitProps('onFormDataChange', 'unmodifiedFormData'),
    setStatic('propTypes', {
      defaultFormData: formDataShape,
      formData: formDataShape,
      onFormDataChange: func,
    }),
  );

  return higherOrderComponent;
}

export function getField(formData, fieldName) {
  const field =
    (formData && formData.fields && formData.fields[fieldName]) || {};
  return field;
}

export function getFieldValue(formData, fieldName, configuration) {
  const fieldConfiguration = configuration.fields[fieldName];
  const value = getField(formData, fieldName).value;
  const parsedValue = fieldConfiguration
    ? parseValue(value, fieldConfiguration)
    : value;
  return parsedValue;
}

export function parseValue(value, fieldConfiguration) {
  if (fieldConfiguration.parseValue) {
    return fieldConfiguration.parseValue(value);
  } else if (fieldConfiguration.boolean === true) {
    return value === true || value === 'true';
  }
  return value;
}

export function getFieldErrors(formData, fieldName) {
  return getField(formData, fieldName).errors || [];
}

export function getFieldError(formData, fieldName) {
  return getFieldErrors(formData, fieldName)[0];
}

export function setFieldValue(formData, fieldName, value, unsetErrors = true) {
  formData = formData || {};
  const fields = formData.fields || {};
  const field = fields[fieldName] || {};
  return {
    ...formData,
    fields: {
      ...fields,
      [fieldName]: {
        ...field,
        value,
        errors: unsetErrors ? [] : field.errors,
      },
    },
  };
}

export function commitField(formData, fieldName, configuration) {
  const errors = Array.from(errorsForField(formData, fieldName, configuration));
  const nextFormData = setFieldErrors(formData, fieldName, errors);
  return nextFormData;
}

export function commitAllFields(formData, configuration) {
  const fieldNames = configuration.fields
    ? Object.keys(configuration.fields)
    : [];
  const nextFormData = fieldNames.reduce(
    (formData, fieldName) => commitField(formData, fieldName, configuration),
    formData,
  );
  return nextFormData;
}

export function setFieldErrors(formData, fieldName, errors) {
  formData = formData || {};
  const fields = formData.fields || {};
  const field = fields[fieldName] || {};
  return {
    ...formData,
    fields: {
      ...fields,
      [fieldName]: {
        ...field,
        errors,
      },
    },
  };
}

export function* errorsForField(formData, fieldName, configuration) {
  const fieldConfiguration = configuration.fields[fieldName];
  if (!fieldConfiguration) {
    return;
  }
  const value = getFieldValue(formData, fieldName, configuration);
  const valueIsEmpty = value === undefined || value === null || value === '';
  if (fieldConfiguration.required && valueIsEmpty) {
    yield 'This field is required';
  }
  if (fieldConfiguration.errorsForValue && !valueIsEmpty) {
    yield* fieldConfiguration.errorsForValue(value, fieldName =>
      getFieldValue(formData, fieldName, configuration),
    );
  }
}

export function validate(formData, configuration) {
  for (const fieldName of Object.keys(configuration.fields)) {
    const errorIterator = errorsForField(formData, fieldName, configuration);
    const hasErrors = errorIterator.next().done === false;
    if (hasErrors) {
      return false;
    }
  }
  return true;
}

export function isModified(formData, unmodifiedFormData, configuration) {
  const fieldNames = Object.keys({
    ...formData.fields,
    ...unmodifiedFormData.fields,
  });
  for (let fieldName of fieldNames) {
    if (
      fieldIsModified(fieldName, formData, unmodifiedFormData, configuration)
    ) {
      return true;
    }
  }
  return false;
}

export function fieldIsModified(
  fieldName,
  formData,
  unmodifiedFormData,
  configuration,
) {
  const fieldIsModified =
    getFieldValue(formData, fieldName, configuration) !==
    getFieldValue(unmodifiedFormData, fieldName, configuration);
  return fieldIsModified;
}
