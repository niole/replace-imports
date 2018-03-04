import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

import { columnType } from './propTypes';

export function TableColumn({ column, ...otherProps }) {
  const elementProps = omit(otherProps, ['columnIndex']);
  return (
    <StyledCol
      width={column.width}
      {...elementProps}
    />
  );
}

TableColumn.propTypes = {
  column: columnType,
};

export const StyledCol = styled.col`
  width: ${props => processLength(props.width, 'auto')};
`;

export function processLength(width, defaultValue) {
  if (typeof width === 'number') {
    return `${width}px`;
  } else if (width) {
    return width;
  }
  return defaultValue;
}

export default TableColumn;
