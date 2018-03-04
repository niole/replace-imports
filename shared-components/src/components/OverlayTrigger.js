import React from 'react';
import BaseOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export const defaultContainer = () =>
  document.querySelector('.scrollable-content');

export function OverlayTrigger({
  container = defaultContainer,
  ...otherProps
}) {
  return <BaseOverlayTrigger container={container} {...otherProps} />;
}

export default OverlayTrigger;
