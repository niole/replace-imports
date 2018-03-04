import React from 'react';
import styled from 'styled-components';

import { sortModeType } from './propTypes';

export function TableColumnSortButton({ sortMode, ...otherProps }) {
  return (
    <TableColumnSortButtonContainer sortMode={sortMode}>
      <i className="icon-sort">
        {sortMode && <i className={secondaryIconNameForSortMode(sortMode)} />}
      </i>
    </TableColumnSortButtonContainer>
  );
}

TableColumnSortButton.propTypes = {
  sortMode: sortModeType,
};

export function secondaryIconNameForSortMode(sortMode) {
  switch (sortMode) {
    case 'ascending':
      return 'icon-sort-down';
    case 'descending':
      return 'icon-sort-up';
    default:
      return null;
  }
}

export const TableColumnSortButtonContainer = styled.div`
  display: inline-block;
  visibility: ${props => (props.sortMode ? 'visible' : 'hidden')};
  margin-left: 5px;

  tr:hover & {
    visibility: visible;
  }

  th:hover & > i {
    color: rgba(0, 0, 0, 0.3);
  }

  & > i {
    color: rgba(0, 0, 0, 0.15);
    display: inline-block;
    position: relative;

    & > i {
      color: black;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

export default TableColumnSortButton;
