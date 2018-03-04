import React from 'react';
import { string } from 'prop-types';

import BaseForm from 'react-bootstrap/lib/Form';

export function Form({ csrfToken, children, innerRef, ...otherProps }) {
  function CsrfTokenInput() {
    return <input type="hidden" name="csrfToken" value={csrfToken} />;
  }

  return (
    <BaseForm ref={innerRef} {...otherProps}>
      {csrfToken && <CsrfTokenInput />}
      {children}
    </BaseForm>
  );
}

Form.propTypes = {
  csrfToken: string,
};

export default Form;
