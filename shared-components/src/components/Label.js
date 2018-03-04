/**
 * @format
 */

import React from 'react';
import { string, bool, node, oneOfType, arrayOf } from 'prop-types';
import {
  Label as BaseLabel,
  Tooltip,
  Popover,
  Glyphicon,
} from 'react-bootstrap';
import styled from 'styled-components';

import OverlayTrigger from './OverlayTrigger';

const propTypes = {
  overlayContent: node,
  overlayId: string,
  overlayPlacement: string,
  overlayTrigger: oneOfType([string, arrayOf(string)]),
  overlayRootClose: bool,
};

export function Label({
  overlayContent,
  overlayId,
  overlayPlacement,
  overlayTrigger,
  overlayRootClose,
  children,
  ...otherProps
}) {
  return (
    <OverlayWrapper
      content={overlayContent}
      id={overlayId}
      placement={overlayPlacement}
      trigger={overlayTrigger}
      rootClose={overlayRootClose}
    >
      <StyledLabel data-interactive={!!overlayContent} {...otherProps}>
        {children}
        {overlayContent && <StyledGlyphicon glyph="info-sign" />}
      </StyledLabel>
    </OverlayWrapper>
  );
}

Label.propTypes = propTypes;

export function OverlayWrapper({
  content,
  id,
  placement = 'top',
  trigger = typeof content === 'string' ? ['hover', 'focus'] : 'click',
  rootClose = typeof content === 'string' ? false : true,
  children,
}) {
  if (content) {
    const overlay =
      typeof content === 'string' ? (
        <Tooltip id={id}>{content}</Tooltip>
      ) : (
        <Popover id={id}>{content}</Popover>
      );
    return (
      <OverlayTrigger
        placement={placement}
        trigger={trigger}
        rootClose={rootClose}
        overlay={overlay}
      >
        {children}
      </OverlayTrigger>
    );
  }
  return children;
}

export const StyledGlyphicon = styled(Glyphicon)`
  opacity: 0.6;
  margin-left: 0.3em;
`;

export const StyledLabel = styled(BaseLabel)`
  cursor: default;
  white-space: nowrap;
  &[data-interactive='true'] {
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export default Label;
