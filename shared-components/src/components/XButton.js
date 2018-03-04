import React from 'react';
import {func, string} from 'prop-types';
import styled from 'styled-components';
import {
  rejectRedColor,
} from './styled/colors';

const UNICODE_DISMISS = '\u2715';

const RemoveContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const BaseRemoveStyle = `
  cursor: pointer;
  color: ${rejectRedColor};
  font-size: 20px;
  padding: 5px;

  &:hover, &:focus {
    text-decoration: none;
    outline: 0px;
    color: ${rejectRedColor};
  }
`;

const RemoveLink = styled.a`
  ${BaseRemoveStyle}
`;

const RemoveButton = styled.button`
  ${BaseRemoveStyle}
  border: 0px;
  background: inherit;
`;

function XButton({
    onClick,
    title,
    href,
    className,
  }) {
  return (
    <RemoveContainer className={className}>
      {href ?
        <RemoveLink
          href={href}
          title={title}
          onClick={onClick}
        >
          {UNICODE_DISMISS}
        </RemoveLink>:
        <RemoveButton
          title={title}
          onClick={onClick}
        >
          {UNICODE_DISMISS}
        </RemoveButton>
      }
    </RemoveContainer>
  );
}

XButton.propTypes = {
    onClick: func,
    title: string,
    href: string,
    className: string,
};

export default XButton;
