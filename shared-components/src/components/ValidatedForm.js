import React, {PureComponent} from 'react';
import {object} from 'prop-types';
import { FormError, Form } from 'react-form';
import {
  getErrorMessage,
} from './util/sharedComponentUtil';

/**
 * passes validate cb to form
 * passes submit cb to form
 * handles errors thrown in submit cb
 * handles state consistency when errors thrown in submit cb
 */

class ValidatedForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      submitError: '',
      submitted: false,
    };
    this._onSubmit = this._onSubmit.bind(this);
  }

  validate(values) {
    return values;
  }

  /**
   * Private callback used as react-form's onSubmit callback
   * Handles lifecycle for maintaining consistent state in react-form while also
   * handling errors thrown outside of react-form
   *
   * @name _onSubmit
   * @param {Object} values - all values in react-form, should be current state of form
   * @param {Object} state - see react-form docs
   * @param {Object} props - see react-form docs
   * @param {Object} instance - see react-form docs
   */
  _onSubmit(values, state, props, instance) {
    this.updateAll({ submitError: '', submitted: true }, values, instance.setAllValues);
    this.onSubmit(values, state, props, instance) //user implemented submit
      .catch(error => {
        this.handleSubmitError(this.getErrorMessage(error), values, instance.setAllValues);
      });
  }

  getErrorMessage(error) {
    return getErrorMessage(error);
  }

  onSubmit(values, state, props, instance) {
    return;
  }

  /**
   * handles hiding any submitErrors, which are generated outside of react-form
   * and maintains react-form's inner state and subsequently updates value of this
   * form input
   * @name formatInputData
   * @param {Function} setValue - react-form callback for setting value for this form field
   * @param {Object} values - all values in react-form fields
   * @param {Function} setAllValues - react-form callback for updating all values in form
   */
  formatInputData(setValue, values, setAllValues) {
    return (data) => {
      const value = (typeof data === "object" ?
        data.target.value :
        data).trim();
      if (this.state.submitError) {
        this.updateAll({ submitError: ''}, values, setAllValues, () => {
          setValue(value);
        })
      } else {
        setValue(value);
      }
    };
  }

  /**
   * Updates ValidatedForm state to reflect errors thrown in react-form's
   * onSubmit callback
   * @name handleSubmitError
   * @param {String} errorMessage - error message
   * @param {Object} resetData - values for all field in react-form, should be the current form's
   * state
   * @param {Function} setAllValues - react-form callback for updating all values in form
   */
  handleSubmitError(errorMessage, resetData, setAllValues) {
    this.updateAll({
      submitError: errorMessage,
      submitted: false,
    }, resetData, setAllValues);
  }

  updateAll(newState, resetData, setAllValues, cb) {
    this.setState(newState, () => {
      setAllValues(resetData);

      if (cb) {
        cb();
      }
    });
  }

  /**
   * This funnels the react-form functionality into
   * whatever form you want to bootstrap
   *
   * @name renderValidatedForm
   * @param {Function} children - an unexecuted function that returns
   * the form for react-form to bootstrap
   */
  renderValidatedForm(children) {
    const {
      defaultValues,
    } = this.props;

    return (
      <Form
        validate={this.validate}
        onSubmit={this._onSubmit}
        defaultValues={defaultValues}
      >
        {children}
      </Form>
    );
  }

  renderValidationError(fieldName) {
    return (
      <FormError field={fieldName} />
    );
  }

  render() {
    return this.renderValidatedForm(() => {});
  }

}

ValidatedForm.propTypes = {
  defaultValues: object,
};

export default ValidatedForm;
