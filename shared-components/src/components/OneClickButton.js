import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { compose, withState, withHandlers } from 'recompose';
import omitProps from '../higherOrderComponents/omitProps';
import Spinner from './styled/Spinner';

export function OneClickButton({
  clicked,
  disabled,
  onClick,
  children,
  ...otherProps
}) {
  return (
    <Button disabled={disabled || clicked} onClick={onClick} {...otherProps}>
      {clicked && <Spinner />}
      {typeof children === 'function' ? children(clicked) : children}
    </Button>
  );
}

export const OneClickButtonWithState = compose(
  withState('clicked', 'setClicked', false),
  withHandlers({
    onClick: props => event => {
      props.onClick && props.onClick(event);
      setTimeout(() => props.setClicked(true));
    },
  }),
  omitProps('setClicked'),
)(OneClickButton);

export default OneClickButtonWithState;
