import React, { Component } from 'react';
import { bool, number, func, arrayOf, any } from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import BootstrapPaginationComponent from './BootstrapPaginationComponent';

const Table = styled(ReactTable)`
  .rt-noData {
    background: transparent !important;
  }
`;


/**
 * When server side paginated, underlying paginating component is totally controlled, get data from  PaginatedDataTable's
 * parent (api call, presumably)
 * When client side paginated, underlying paginating component does all work
 *
 */
class PaginatedDataTable extends Component {
  constructor(props) {
    super(props);
    const {
      page,
      defaultPageSize,
      pages,
      rows,
    } = props;

    this.tableState = {
      defaultPageSize,
      page,
      data: rows,
    };

    this.state = {
      defaultPageSize,
      pageSize: defaultPageSize,
      page,
      pages,
      data: rows,
      loading: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const {
      isControlledComponent,
    } = this.props;
    const {
      pages,
      page,
      rows,
    } = newProps;

    if (isControlledComponent) {
      this.setState({
        data: rows,
        pages,
        page,
        loading: false,
      });
    }
  }

  updatePageSize = (nextPageSize) => {
    const {
      pageSize,
      page,
      pages,
    } = this.state;
    const {
      onChange,
    } = this.props;
    const nextPage = Math.floor((pageSize*page)/nextPageSize);
    this.setState({
      pageSize: nextPageSize,
      page: nextPage,
      pages: Math.ceil((pageSize*pages)/nextPageSize),
      loading: true,
    }, () => {
      onChange({
        pageSize: nextPageSize,
        page: nextPage,
      });
    });
  }

  updatePage = (nextPage) => {
    const {
      pageSize,
    } = this.state;
    const {
      onChange,
    } = this.props;

    this.setState({
      pageSize,
      page: nextPage,
      loading: true,
    }, () => {
      onChange({
        pageSize,
        page: nextPage,
      });
    });
  }

  tableComponent = () => {
    const {
      isControlledComponent,
      children,
    } = this.props;

    if (isControlledComponent) {
      return children(this.state.data);
    }
    return children(this.getClientSidePaginatedRows(this.tableState));
  }

  getClientSidePaginatedRows({ startRow, endRow, data }) {
    return data.slice(startRow, endRow);
  }

  render() {
    const {
      page,
      defaultPageSize,
      rows,
      PaginationComponent,
      isControlledComponent,
      isPaginatedServerSide,
    } = this.props;

    if (isControlledComponent) {
      /**
       * server side paginated table is totally controlled component
       */
      return (
        <Table
          columns={[]}
          data={this.state.data}
          noDataText={this.state.data.length ? '' : 'No rows found'}
          pages={this.state.pages}
          page={this.state.page}
          defaultPageSize={this.state.defaultPageSize}
          loading={this.state.loading}
          onPageChange={this.updatePage}
          onPageSizeChange={this.updatePageSize}
          PaginationComponent={PaginationComponent}
          TableComponent={this.tableComponent}
          isPaginatedServerSide={isPaginatedServerSide}
        >
          {(state, makeTable, instance) => {
            return makeTable();
          }}
        </Table>
      );
    }

    return (
      <ReactTable
        page={page}
        defaultPageSize={defaultPageSize}
        data={rows}
        columns={[]}
        PaginationComponent={PaginationComponent}
        TableComponent={this.tableComponent}
      >
        {(state, makeTable, instance) => {
          this.tableState = state;
          return makeTable();
        }}
      </ReactTable>
    );
  }
}

PaginatedDataTable.propTypes = {
  isPaginatedServerSide: bool,
  isControlledComponent: function(props, propName, cmpName) {
    if (props.isPaginatedServerSide && !props[propName]) {
      return new Error(
        `${propName} must be true if isPaginatedServerSide is true. Check the props of ${cmpName}`
      );
    }
  },
  rows: arrayOf(any),
  children: func.isRequired, // func(arrayOf(any)) => func
  pageSize: number,
  PaginationComponent: func,
  onChange: func, //func(shape({ page, pageSize }) => unit
  pages: number,
  defaultPages: number,
  defaultPageSize: number,
  page: number,
};

PaginatedDataTable.defaultProps = {
  rows: [],
  onChange: () => {},
  isPaginatedServerSide: false,
  isControlledComponent: false,
  PaginationComponent: BootstrapPaginationComponent,
  defaultPageSize: 10,
};

export default PaginatedDataTable;
