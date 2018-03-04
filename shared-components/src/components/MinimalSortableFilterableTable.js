import React, { PureComponent } from 'react';
import {func, shape, arrayOf, string, number, bool, object} from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import UpDownArrowButtons from './icons/UpDownArrowButtons';


const fontSize = '13px';
const baseColor = '#172434';

const StyledTable = styled(ReactTable)`
  && {
    margin-top: ${props => props.showFilterStyles ? "45px" : "auto"};
    position: relative;
    border: 0px;
    color: ${baseColor};
    font-size: ${fontSize};
    border-bottom: solid 1px rgba(0,0,0,0.05);

    .inline-help {
        cursor: pointer;
    }

    .-pagination {
      box-shadow: none;
      border-width: 1px;
    }

    ${props => props.hideSortToggleStyles || ""}

    .custom-toggle {
      div {
        vertical-align: middle;
      }

      &.-sort-asc {
        box-shadow: none !important;
        .up {
          color: ${baseColor};
        }

      }

      &.-sort-desc {
        box-shadow: none !important;

        .down {
          color: ${baseColor};
        }
      }
    }

    .rt-resizable-header-content {
      display: inline-block;
    }

    .rt-thead.-headerGroups {
      background: white;
    }

    .rt-tbody .rt-td {
      border-right: 0;
    }

    .rt-thead.-header {
      box-shadow: none;
      border-bottom: 1px solid;
    }

    .rt-thead .rt-th {
      border-right: 0px;
      text-align: left;
    }

    .-filters {

      .rt-th {
        display: none;
      }

      .custom-toggle {
          svg {
              display: none;
          }
      }

      ${props => props.showFilterStyles || ""}
    }
  }
`;

function showNthFilter(indexToShow) {
  return (
    `.rt-th:nth-of-type(${indexToShow}) {
      display: block;
      position: absolute;
      top: -50px;
      width: 200px !important;
      height: 40px;

      .custom-filter-input {
        color: #45474a;
        padding: 8px 25px;
        position: absolute;
        left: 0px;
      }

      input {
        border-radius: 15px;
        width: 100%;
      }
    }`
  );
}


function getDynamicStyles(headers, check, styleCreator) {
  const dynamicStyles = headers.reduce((styles, header, index) => {
    if (check(header)) {
      return styles.concat([styleCreator(index + 1)]);
    }
    return styles;
  }, []);

  return dynamicStyles.join(" ");
}

function getHiddenSortToggleStyle(indexToHide) {
  return (
    `.custom-toggle:nth-of-type(${indexToHide}) {
        svg {
            display: none;
        }
    }`
  );
}

/**
 * This table component applies minimal styling to react table
 * user must provide callbacks for rendering table cells specially
 * headers specified in this component's proptypes are passed directly
 * to react-table
 * and are used to make decisions like what column's filter input to show and
 * what sort toggle's to show
 */
class MinimalSortableFilterableTable extends PureComponent {
  renderThComponent = ({ toggleSort = () => {}, className, children, ...rest }) => {
    return (
      <div
        className={`${className} rt-th custom-toggle`}
        onClick={toggleSort}
        {...rest}
      >
        {children}
        <UpDownArrowButtons />
      </div>
    );
  }

  render() {
    const {
      rows,
      defaultPageSize = rows.length,
      showPagination,
      minRows,
      filterable,
      headers,
      className,
      renderHeaderCell,
      ...rest
    } = this.props;

    return (
      <StyledTable
        className={className}
        showFilterStyles={getDynamicStyles(headers, header => header.Filter, showNthFilter)}
        hideSortToggleStyles={getDynamicStyles(headers, header => !header.sortMethod, getHiddenSortToggleStyle)}
        showPagination={showPagination}
        defaultPageSize={defaultPageSize}
        ThComponent={renderHeaderCell || this.renderThComponent}
        filterable={filterable}
        minRows={minRows}
        data={rows}
        columns={headers}
        {...rest}
      />
    );
  }
}

MinimalSortableFilterableTable.propTypes = {
  showPagination: bool,
  renderHeaderCell: func,
  defaultPageSize: number.isRequired,
  filterable: bool,
  minRows: number,
  rows: arrayOf(object),
  headers: arrayOf(
    shape({
      Header: string,
      accessor: string,
      Cell: func,
      resizable: bool,
      filterMethod: func,
      sortMethod: func,
    }),
  ),
};

MinimalSortableFilterableTable.defaultProps = {
  showPagination: false,
  filterable: false,
  minRows: 0,
  rows: [[]],
};

export default MinimalSortableFilterableTable;
