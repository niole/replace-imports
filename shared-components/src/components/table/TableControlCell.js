import React from 'react';
import styled from 'styled-components';

import TableCell from './TableCell';

export function TableControlCell({ children, ...otherProps }) {
  return (
    <TableControlCellContainer {...otherProps}>
      {children}
    </TableControlCellContainer>
  );
}

export const TableControlCellContainer = styled(TableCell)`
  .table > tbody > tr > &,
  .table > tfoot > tr > &,
  .table > thead > tr > & {
    padding: 2px 12px;
    vertical-align: middle;
    white-space: nowrap;
  }
`;

export default TableControlCell;
