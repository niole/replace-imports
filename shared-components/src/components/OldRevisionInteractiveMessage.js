import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Warning from './icons/Warning';
import WarningBox from './WarningBox';

const Button = styled.a`
  color: #736000;
  border-radius: 3px;
  border: 1px solid #E8C300;
  background: whitesmoke;
  padding: 3px 3px 0px 3px;

  &:hover, &:active, &:focus {
      text-decoration: none;
      outline: none;
      color: #736000;
      border-color: #aa8e00;
  }
`;

const StyledWarningBox = styled(WarningBox)`
    margin: 0px;
    min-width: 0px;
    display: flex;
    align-items: center;
    background-color: #FFFBE4;

    span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 15px;
    }

    a {
        white-space: nowrap;
        margin-left: auto;
    }
`;

function OldRevisionInteractiveMessage({
    headCommitCreatedAt,
    headRevisionDirectoryLink,
  }) {
  const content =
    `This is an old version of your files. The latest version was made at ${moment(headCommitCreatedAt).format('MMMM Do YYYY [@] h:mm a')}`;
  return (
    <StyledWarningBox
        icon={
            <Warning
                width={18}
                height={18}
            />
        }>
        <span title={content}>
            {content}
        </span>
        <Button href={headRevisionDirectoryLink}>
            View Latest
        </Button>
    </StyledWarningBox>
  );
}

OldRevisionInteractiveMessage.propTypes = {
  headCommitCreatedAt: string.isRequired,
  headRevisionDirectoryLink: string.isRequired,
};

export default OldRevisionInteractiveMessage;
