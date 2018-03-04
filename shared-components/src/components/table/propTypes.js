import {
  string,
  number,
  bool,
  func,
  shape,
  any,
  arrayOf,
  oneOfType,
  oneOf,
} from 'prop-types';

import sortModes from './sortModes';

export const cellType = any;

export const columnType = shape({
  header: string,
  headerComponent: func,
  cell: func,
  cellComponent: func,
  sortValue: func,
  sortable: bool,
  width: oneOfType([string, number]),
});

export const rowType = oneOfType([arrayOf(cellType), any]);

export const sortModeType = oneOf(sortModes);

export const sortType = shape({
  columnIndex: number.isRequired,
  mode: sortModeType.isRequired,
});
