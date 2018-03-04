import React from 'react';
import styled from 'styled-components';
import {number, string, func, bool} from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import SpinningDominoLogo from './icons/SpinningDominoLogo';

const disabledColor = '#A2A7AD';
const StyledSubmitButton = styled(Button)`
  height: ${props => props.bsSize === "small" ? 29 : props.height}px;
  width: ${props => props.width}px;

  &:disabled {
    background: ${disabledColor};
    border: 1px solid ${disabledColor};

    &:focus {
      background: ${disabledColor};
      border: 1px solid ${disabledColor};
    }

    &:active {
      background: ${disabledColor};
      border: 1px solid ${disabledColor};
    }

    &:hover {
      background: ${disabledColor};
      border: 1px solid ${disabledColor};
    }

    &:visited {
      background: ${disabledColor};
      border: 1px solid ${disabledColor};
    }

  }
`;

function DominoLogoOnSubmitButton({
    submitError,
    submitted,
    onSubmit,
    label,
    ...rest,
  }) {
  const logoSize = rest.bsSize === "small" ? 17 : 20;
  return (
    <StyledSubmitButton
      disabled={!submitError && submitted}
      bsStyle="success"
      onClick={onSubmit}
      {...rest}
    >
      {!submitError && submitted ? <SpinningDominoLogo height={logoSize} width={logoSize}/> : label}
    </StyledSubmitButton>
  );
}

DominoLogoOnSubmitButton.propTypes = {
  submitError: string.isRequired,
  submitted: bool.isRequired,
  onSubmit: func.isRequired,
  height: number,
  width: number,
  label: string,
};

DominoLogoOnSubmitButton.defaultProps = {
  height: 45,
  width: 116,
  label: 'Submit',
};

export default DominoLogoOnSubmitButton;
