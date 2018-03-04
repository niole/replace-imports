import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

import TableColumnSortButton from './TableColumnSortButton';
import { sortModeType, columnType } from './propTypes';
import { toggleSortMode } from './sortModes';

export function TableHeaderCell({
  column,
  sortable,
  sortMode,
  onSort,
  onClick,
  ...otherProps
}) {
  const headerText = column.header;
  const tableAndColumnSortable = sortable && column.sortable !== false;
  const onContainerClick = event => {
    tableAndColumnSortable && onSort && onSort();
    onClick && onClick(event);
  };
  return (
    <TableHeaderCellContainer
      sortable={tableAndColumnSortable}
      title={
        tableAndColumnSortable
          ? `Sort by ${headerText} ${toggleSortMode(sortMode)}`
          : undefined
      }
      onClick={onContainerClick}
      {...otherProps}
    >
      <div>
        {headerText}{' '}
        {tableAndColumnSortable &&
          <TableColumnSortButton sortMode={sortMode} />}
      </div>
    </TableHeaderCellContainer>
  );
}

TableHeaderCell.propTypes = {
  column: columnType,
  sortable: bool,
  sortMode: sortModeType,
  onSort: func,
};

export const TableHeaderCellContainer = styled.th`
  cursor: ${props => (props.sortable ? 'pointer' : 'inherit')};

  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
`;

export default TableHeaderCell;
