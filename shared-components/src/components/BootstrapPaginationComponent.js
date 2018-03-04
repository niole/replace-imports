import React, { Component } from 'react';
import {
  any,
  bool,
  oneOfType,
  arrayOf,
  string,
  number,
  func,
} from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import {
  clickableBlue,
  defaultBootstrapBorderColor,
} from './styled/colors';

const MAX_INDEX_BEFORE_TRUNCATION = 4;

const PaginationContainer = styled.div`
  .btn-group {
    float: right;
  }
`;

const PaginationDetails = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
`;

const PagedButton = styled(Button)`
  &.focused {
    border-color: ${clickableBlue};
    background: ${clickableBlue};
    color: white;
  }

  &:focus {
    &.notfocusable {
      border-color: ${defaultBootstrapBorderColor};
      background: white;
      color: ${clickableBlue};
    }

  }

  &:hover.notclickable {
    border-color: ${defaultBootstrapBorderColor};
    background: white;
    color: ${clickableBlue};
  }

`;

// basic code stolen from react-table and restyled
class BootstrapPaginationComponent extends Component {
  next = () => {
    const {
      pages,
      page,
    } = this.props;

    if ((pages-1) !== page) {
      this.changePage(page+1);
    }
  }

  previous = () => {
    const {
      page,
    } = this.props;

    if (0 !== page) {
      this.changePage(page-1);
    }
  }

  renderPagedButtons() {
    const {
      maxIndexBeforeTruncation,
      pages,
      page,
    } = this.props;
    const withTruncation = pages - maxIndexBeforeTruncation - 1 > 1;
    const totalButtons = withTruncation ? maxIndexBeforeTruncation + 3 : pages;
    const buttons = Array(totalButtons).fill(0).map((n, index) => {
      if (withTruncation) {
        if (index === maxIndexBeforeTruncation) {
          const isFocused = page >= maxIndexBeforeTruncation && page < pages - 1;
          return (
            <PagedButton
              key={`${index}-page`}
              onClick={this.changePage.bind(this, index)}
              className={isFocused ? 'focused' : undefined}
            >
              { isFocused ? page + 1 : index+1 }
            </PagedButton>
          );
        }

        if (index === maxIndexBeforeTruncation + 1) {
          //truncation
          return (
            <PagedButton
              key="truncation"
              className="notfocusable notclickable"
            >
              ...
            </PagedButton>
          );
        }

        if (index === maxIndexBeforeTruncation + 2) {
          return (
            <PagedButton
              key={`${index}-page`}
              onClick={this.changePage.bind(this, pages - 1)}
              className={page === (pages - 1) ? 'focused' : undefined}
            >
              { pages }
            </PagedButton>
          );
        }

      }

      // nothing special
      return (
        <PagedButton
          key={`${index}-page`}
          onClick={this.changePage.bind(this, index)}
          className={page === index ? 'focused' : undefined}
        >
          { index+1 }
        </PagedButton>
      );
    });

    return [
      <PagedButton key="prev" onClick={this.previous} className="notfocusable">
        Previous
      </PagedButton>
    ].concat(
      buttons.concat([
          <PagedButton key="next" onClick={this.next} className="notfocusable">
            Next
          </PagedButton>
        ])
    );
  }

  changePage = (page) => {
    this.props.onPageChange(page)
  }

  getShowingBlurb() {
    const {
      data,
      page,
      pageSize,
      pages,
      isPaginatedServerSide,
    } = this.props;

    if (isPaginatedServerSide) {
      return `Showing ${page+1} of ${pages} pages`;
    }
    return `Showing ${(page*pageSize)+1} to ${Math.min((page+1)*pageSize, data.length)} of ${data.length} entries`;
  }

  render () {
    const {
      // Props
      showPageSizeOptions,
      pageSizeOptions,
      onPageSizeChange,
      className,
      pageSize,
      pages,
    } = this.props
    return (
      <div
        className={classnames(className, '-pagination')}
        style={this.props.paginationStyle}
      >
        <PaginationDetails>
          <span className="-pageInfo">
            {this.getShowingBlurb()}
          </span>
          {showPageSizeOptions &&
            <span className="select-wrap -pageSizeOptions">
              <select
                onChange={e => onPageSizeChange(Number(e.target.value))}
                value={pageSize}
              >
                {pageSizeOptions.map((option, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={i} value={option}>
                    {option} {this.props.rowsText}
                  </option>
                ))}
              </select>
            </span>}
        </PaginationDetails>
        { pages > 1 &&
          <PaginationContainer>
            <ButtonGroup>
              {this.renderPagedButtons()}
            </ButtonGroup>
          </PaginationContainer> }
      </div>
    );
  }
}

BootstrapPaginationComponent.propTypes = {
  isPaginatedServerSide: bool,
  isControlledComponent: bool,
  pageSize: number.isRequired,
  page: number.isRequired,
  pages: number.isRequired,
  showPageSizeOptions: bool,
  pageSizeOptions: arrayOf(oneOfType([string, number])),
  data: arrayOf(any),
  onPageSizeChange: func,
  onPageChange: func,
  className: string,
  maxIndexBeforeTruncation: number,
};

BootstrapPaginationComponent.defaultProps = {
  isPaginatedServerSide: false,
  isControlledComponent: false,
  showPageSizeOptions: false,
  data: [],
  pageSizeOptions: [],
  onPageSizeChange: () => {},
  onPageChange: () => {},
  maxIndexBeforeTruncation: MAX_INDEX_BEFORE_TRUNCATION,
};

export default BootstrapPaginationComponent;
