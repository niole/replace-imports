import React from 'react';
import { string, func } from 'prop-types';
import { FormControl, Checkbox, Radio } from 'react-bootstrap';

import TableCell from './TableCell';

export function TableInputCell({
  type,
  bsSize,
  componentClass,
  children,
  ...otherProps
}) {
  const Component = componentClass || componentClassForType(type);
  const componentProps = componentPropsForType(type);
  return (
    <TableCell>
      <Component {...{ type, bsSize, ...componentProps, ...otherProps }}>
        {children}
      </Component>
    </TableCell>
  );
}

export function componentClassForType(type) {
  switch (type) {
    case 'checkbox':
      return Checkbox;
    case 'radio':
      return Radio;
    default:
      return FormControl;
  }
}

export function componentPropsForType(type) {
  switch (type) {
    case 'checkbox':
      return { inline: true };
    case 'radio':
      return { inline: true };
    default:
      return undefined;
  }
}

TableInputCell.propTypes = {
  type: string,
  bsSize: string,
  componentClass: func,
};

TableInputCell.defaultProps = {
  bsSize: 'small',
};

export default TableInputCell;
