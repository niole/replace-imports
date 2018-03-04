import React from 'react';
import { omit } from 'lodash';

export function TableCell({ children, ...otherProps }) {
  const elementProps = omit(otherProps, [
    'cell',
    'row',
    'rowIndex',
    'rowKey',
    'column',
    'columnIndex',
  ]);
  return (
    <td {...elementProps}>
      {children}
    </td>
  );
}

export default TableCell;
