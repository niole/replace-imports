import React from 'react';
import styled, { css } from 'styled-components';

import TableCell from './TableCell';

export function TableTextCell({ children, align, multiLine, ...otherProps }) {
  return (
    <StyledTableCell multiLine={multiLine} align={align} {...otherProps}>
      {children}
    </StyledTableCell>
  );
}

export const singleLineStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTableCell = styled(TableCell)`
  text-align: ${props => props.align || 'inherit'};

  ${props => (props.multiLine ? null : singleLineStyle)};
`;

export default TableTextCell;
