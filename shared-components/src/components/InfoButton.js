import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import { OverlayTrigger } from './OverlayTrigger';

export const normalColor = '#c3c8ce';
export const hoverColor = '#4c89d6';
export const focusColor = hoverColor;

export const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  color: ${normalColor};
  :hover {
    color: ${hoverColor};
  }
  :focus {
    color: ${focusColor};
  }
`;

function InfoButton({
  animation,
  defaultOverlayShown,
  delay,
  delayHide,
  delayShow,
  onEnter,
  onEntered,
  onEntering,
  onExit,
  onExited,
  onExiting,
  placement,
  rootClose,
  trigger,
  children,
  ...otherProps
}) {
  return (
    <OverlayTrigger
      animation={animation}
      defaultOverlayShown={defaultOverlayShown}
      delay={delay}
      delayHide={delayHide}
      delayShow={delayShow}
      onEnter={onEnter}
      onEntered={onEntered}
      onEntering={onEntering}
      onExit={onExit}
      onExited={onExited}
      onExiting={onExiting}
      overlay={children}
      placement={placement}
      rootClose={rootClose}
      trigger={trigger}
    >
      <StyledButton {...otherProps}>
        <Glyphicon glyph="info-sign" />
      </StyledButton>
    </OverlayTrigger>
  );
}

InfoButton.defaultProps = {
  placement: 'top',
  trigger: 'click',
  rootClose: true,
};

export default InfoButton;
