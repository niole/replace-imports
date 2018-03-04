import React from 'react';

import TableCell from './TableCell';

export const emDash = '\u2014';

export function TableNullCell() {
  return (
    <TableCell className="text-muted">
      {emDash}
    </TableCell>
  );
}

export default TableNullCell;
