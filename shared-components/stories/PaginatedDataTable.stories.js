import React from 'react';
import { storiesOf } from '@kadira/storybook';
import PaginatedDataTable from '../src/components/PaginatedDataTable';

const stories = storiesOf('PaginatedDataTable', module);

function genData(totalRows, prefix = '') {
  const rows = []
  for (let i=0; i < totalRows; i++) {
    rows.push(`${prefix}d${i}`);
  }

  return rows;
}

function Table(rows) {
  return (
    <table>
      <thead>
        <tr>
          <th className="revision-status">Status</th>
          <th className="revision-id">ID</th>
          <th className="revision-summary">Summary</th>
          <th className="revision-logs">Logs</th>
          <th className="revision-created">Created</th>
          <th className="revision-creator">Creator</th>
          <th className="revision-docker-image">Docker Image Name</th>
          <th className="actions">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => <tr>{r}</tr>)}
      </tbody>
    </table>
  );
}


stories.add('with defaults', () => (
  <PaginatedDataTable
    rows={genData(78)}
  >
    {Table}
  </PaginatedDataTable>
));

stories.add('with default page size of 10', () => (
  <PaginatedDataTable
    rows={genData(78)}
    defaultPageSize={10}
  >
    {Table}
  </PaginatedDataTable>
));

stories.add('with default start index', () => (
  <PaginatedDataTable
    rows={genData(78)}
    page={2}
  >
    {Table}
  </PaginatedDataTable>
));

stories.add('with one page', () => (
  <PaginatedDataTable
    rows={genData(10)}
  >
    {Table}
  </PaginatedDataTable>
));

stories.add('with multiple pages', () => (
  <PaginatedDataTable
    rows={genData(30)}
  >
    {Table}
  </PaginatedDataTable>
));

class ServerPaginatedTable extends React.Component {
  constructor() {
    super();
    this.data = genData(150);
    this.pagedRows = Array(Math.ceil(this.data.length/10)).fill(0).reduce((state, n, index) => {
      state[index] = this.data.slice(index*10, (index+1)*10);
      return state;
    }, {});

    this.state = {
      page: 0,
      pageSize: 10,
      pages: Math.ceil(this.data.length/10),
    };
  }

  updatePagedRows = ({ page, pageSize }) => {
    const totalPages = Math.ceil(this.data.length/pageSize);

    this.pagedRows = Array(this.data.length).fill(0).reduce((state, n, index) => {
      state[index] = this.data.slice(index*pageSize, (index+1)*pageSize);
      return state;
    }, {});

    this.setState({
      page: Math.min(isNaN(page)? this.state.page : page, totalPages-1),
      pageSize,
      pages: totalPages,
    });
  }

  render() {
    return (
      <PaginatedDataTable
        page={this.state.page}
        pages={this.state.pages}
        pageSize={this.state.pageSize}
        rows={this.pagedRows[this.state.page]}
        onChange={this.updatePagedRows}
        isPaginatedServerSide={true}
        isControlledComponent={true}
      >
        {Table}
      </PaginatedDataTable>
    );
  }
}

stories.add('paginated server side', () => (
  <ServerPaginatedTable />
));
