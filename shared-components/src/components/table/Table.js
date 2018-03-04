import React from 'react';
import { bool, func, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { compose, withHandlers, hoistStatics } from 'recompose';
import memoizeWeak from 'memoize-weak';
import {
  isArray,
  range,
} from 'lodash';
import { Table as BootstrapTable } from 'react-bootstrap';

import uncontrollable from '../../higherOrderComponents/composableUncontrollable';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';
import TableColumn from './TableColumn';
import TableTextCell from './TableTextCell';
import TableMutableTextCell from './TableMutableTextCell';
import TableControlCell from './TableControlCell';
import TableNullCell from './TableNullCell';
import TableInputCell from './TableInputCell';
import { rowType, columnType, sortType } from './propTypes';
import { defaultSortMode, toggleSortMode } from './sortModes';

export function Table({
  rows,
  columns,
  onColumnSort,
  sortable,
  sort,
  mapRowToKey,
  rowsSorted,
  fixed,
  ...otherProps
}) {
  const cells = createCells(rows, columns);

  const sortMode = sort ? sort.mode : undefined;
  const sortingMap =
    sort && !rowsSorted
      ? createSortingMap(rows, columns, sort.columnIndex)
      : createBasicSortingMap(rows.length);

  return (
    <StyledBootstrapTable fixed={fixed} {...otherProps}>
      <colgroup>
        {columns.map((column, columnIndex) => {
          const ColumnComponent = column.component
            ? column.component
            : TableColumn;
          return (
            <ColumnComponent
              {...{
                key: columnIndex,
                column,
                columnIndex,
              }}
            />
          );
        })}
      </colgroup>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => {
            const HeaderComponent = column.headerComponent
              ? column.headerComponent
              : TableHeaderCell;
            const onSort = onColumnSort
              ? event => onColumnSort(columnIndex)
              : undefined;
            const columnSortMode =
              sort && sort.columnIndex === columnIndex ? sortMode : undefined;
            return (
              <HeaderComponent
                {...{
                  key: columnIndex,
                  column,
                  columnIndex,
                  sortable,
                  sortMode: columnSortMode,
                  onSort,
                }}
              />
            );
          })}
        </tr>
      </thead>
      <tbody>
        {range(rows.length).map(unsortedRowIndex => {
          const rowIndex = sortingMap(unsortedRowIndex, sortMode);
          const row = rows[rowIndex];
          const rowKey = mapRowToKey ? mapRowToKey(row) : rowIndex;
          return (
            <tr key={rowKey}>
              {columns.map((column, columnIndex) => {
                const cell = cells[rowIndex][columnIndex];
                const cellProps = {
                  row,
                  rowIndex,
                  rowKey,
                  column,
                  columnIndex,
                  cell,
                };
                const finalCellProps =
                  typeof column.cellProps === 'function'
                    ? column.cellProps(cellProps)
                    : typeof column.cellProps === 'object'
                      ? column.cellProps
                      : cellProps;
                const CellComponent = column.cellComponent
                  ? column.cellComponent
                  : cell === null || cell === undefined
                    ? TableNullCell
                    : TableCell;
                return (
                  <CellComponent
                    {...{
                      ...finalCellProps,
                      key: columnIndex,
                    }}
                  >
                    {cell}
                  </CellComponent>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledBootstrapTable>
  );
}

Table.propTypes = {
  /**
   * The data to render. Can be 1-dimensional (rows only) or 2-dimensional
   * (rows and columns).
   */
  rows: arrayOf(rowType),
  /**
   * The columns to display.
   */
  columns: arrayOf(columnType),
  /**
   * An optional function to map rows to keys.
   */
  mapRowToKey: func,
  /**
   * Set this to `true` to enable sorting by clicking on row columns. The
   * `columns` prop should be provided when this is enabled.
   */
  sortable: bool,
  /**
   * The sorting state, e.g. `{ columnIndex: 0, mode: 'ascending' }`.
   */
  sort: sortType,
  /**
   * If the provided `rows` prop is already sorted, set this to `true` to
   * disable internal row sorting.
   */
  rowsSorted: bool,
};

Table.defaultProps = {
  sortable: false,
  rowsSorted: false,
  fixed: false,
};

export const StyledBootstrapTable = styled(BootstrapTable)`
  table-layout: ${props => props.fixed ? 'fixed' : 'auto'};
`;

// Take an array of rows and an array of columns and return a 2D array of
// cells
export const createCells = memoizeWeak((rows, columns) => {
  const cells = rows.map((row, rowIndex) =>
    // Create a 2D array of cells
    columns.map((column, columnIndex) => {
      if (typeof column.cell === 'function') {
        // Cell is computed by column.cell
        return column.cell({ row, rowIndex, columnIndex });
      } else if (isArray(row)) {
        // Row is an array, and cell is the corresponding value
        return row[columnIndex];
      }
      // Cell is null (column.cellComponent should probably be provided)
      return null;
    }),
  );
  return cells;
});

// Take an array of rows and an array of columns and a sort column index and
// return a function that maps from unsorted row indices to sorted row indices
export const createSortingMap = memoizeWeak(
  (rows, columns, sortColumnIndex) => {
    const cells = createCells(rows, columns);
    const sortColumn = columns[sortColumnIndex];

    // For each row, create a sort value (either the value computed by
    // sortColumn.sortValue or the value computed by sortColumn.cell)
    const sortValues = rows.map((row, rowIndex) => {
      const cell = cells[rowIndex][sortColumnIndex];
      if (typeof sortColumn.sortValue === 'function') {
        return sortColumn.sortValue({ row, rowIndex, cell });
      }
      return cell;
    });

    // Create an array of sorted indices by comparing the computed sort values
    const sortedIndices = range(rows.length).sort((indexA, indexB) => {
      const sortValueA = sortValues[indexA];
      const sortValueB = sortValues[indexB];
      if (sortColumn.compare) {
        return sortColumn.compare(sortValueA, sortValueB);
      } else if (sortValueA < sortValueB) {
        return -1;
      } else if (sortValueA > sortValueB) {
        return +1;
      }
      return 0;
    });

    // Create an identity sorting map which is responsible for the ascending
    // or descending sorting mode
    const identitySortingMap = createBasicSortingMap(rows.length);

    // Create a function which maps an unsorted index to a sorted index
    const sortingMap = (unsortedIndex, sortMode) => {
      const sortedIndex =
        sortedIndices[identitySortingMap(unsortedIndex, sortMode)];
      return sortedIndex;
    };

    return sortingMap;
  },
);

// Create a sorting map for ascending/descending mapping only
export const createBasicSortingMap = numRows => (
  unsortedIndex,
  sortMode = 'ascending',
) => {
  switch (sortMode) {
    case 'ascending':
      return unsortedIndex;
    case 'descending':
      return numRows - 1 - unsortedIndex;
    default:
      throw new Error(`Invalid sortMode: ${sortMode}`);
  }
};

Table.Cell = TableCell;
Table.TextCell = TableTextCell;
Table.MutableTextCell = TableMutableTextCell;
Table.ControlCell = TableControlCell;
Table.NullCell = TableNullCell;
Table.InputCell = TableInputCell;

export const TableWithState = hoistStatics(
  compose(
    uncontrollable({ sort: 'onSortChange' }),
    withHandlers({
      onColumnSort: props => columnIndex => {
        if (props.sort && props.sort.columnIndex === columnIndex) {
          props.onSortChange({
            columnIndex,
            mode: toggleSortMode(props.sort.mode),
          });
        } else {
          props.onSortChange({
            columnIndex,
            mode: defaultSortMode,
          });
        }
      },
    }),
  ),
)(Table);

TableWithState.propTypes = {
  /**
   * A callback function that is called when the user changes the `sort` prop.
   */
  onSortChange: func,
  /**
   * The initial value for the `sort` prop.
   */
  defaultSort: sortType,
};

export default TableWithState;
