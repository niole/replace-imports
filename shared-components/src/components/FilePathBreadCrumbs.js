import React from 'react';
import {func, arrayOf, shape, string} from 'prop-types';
import styled from 'styled-components';
import {
    Breadcrumb,
} from 'react-bootstrap';

const baseColor = '#172434';

const NoTruncationStyle = `
  white-space: nowrap;
  overflow: visible;
  text-overflow: unset;
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  background: transparent;
  display: flex;
  margin: 0;
  padding: 5px 0px;
  font-size: 16px;

  a:hover {
    display: inline-block;
  }

  li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li:hover {
    ${NoTruncationStyle}
    z-index: 1; // when hovering over breadcrumbs, if truncated they will show untruncated and on top of everything else
  }

  li:last-of-type {
    span {
      padding-right: 8px;
    }
  }

li + li {
    &:before {
      color: ${baseColor};
    }
  }

  li.active {
    color: ${baseColor};

    &:before {
      color: #9fa8b3;
    }

    ${props => {
      if (props.customTerminalNode) {
        return NoTruncationStyle;
      }
      return '';
    }}

    ${props => {
      if (props.customTerminalNode) {
        return '';
      }
      return `&:after {
        content: "/";
      }`;
    }}
  }
`;


function FilePathBreadCrumbs({ children, breadCrumbs, ...rest }) {
  const hasChildren = !!children;
  return (
    <StyledBreadcrumb customTerminalNode={hasChildren}>
      {breadCrumbs.map(({ url, label }, index) => {
        if (index === breadCrumbs.length - 1) {
          return (
            <Breadcrumb.Item key={label} active>
              {!hasChildren && label}
              {hasChildren  && children(rest)}
            </Breadcrumb.Item>
          );
        }
        return (
          <Breadcrumb.Item key={label} href={url}>
            {label}
          </Breadcrumb.Item>
        );
      })}
    </StyledBreadcrumb>
  );
}

export const BreadCrumbsProp =  {
  breadCrumbs: arrayOf(
    shape({
      label: string,
      url: string,
    }),
  ),
};

FilePathBreadCrumbs.propTypes = {
  ...BreadCrumbsProp,
  children: func,
};

export default FilePathBreadCrumbs;
