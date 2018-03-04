import React from 'react';
import styled from 'styled-components';
import SelectMenu from './styled/SelectMenu';
import formatDate from '../utils/formatDate';

const UniqueIdentifiers = styled.span`
  color: #4c89d6;
  font-weight: bold;

  span {
    &:first-of-type {
      margin-bottom: 5px;
    }
  }
`;

const Date = styled.span`
  float: right;
`;

const CommitMessage = styled.div`
  width: 580px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function RevisionSelectMenuListItem({
  revision,
  onClick,
  navigateOnClick,
}) {
  const href = navigateOnClick ? revision.url : '#';
  return (
    <SelectMenu.RevisionListItem>
      <SelectMenu.RevisionListItemLink href={href} onClick={onClick}>
          <UniqueIdentifiers className="unique-identifiers">
            <span>
              {typeof revision.runId === 'number' ? ` · #${revision.runId}` : null}
            </span>
            <span title={revision.sha}>
              {revision.sha.substr(0, 7)}
            </span>
          </UniqueIdentifiers>
          <Date title={formatDate(revision.timestamp)}>
            {formatDate(revision.timestamp, { allowFuzzyDateIfRecent: true })}
          </Date>
          <CommitMessage>
            {`${revision.author.username} - “${revision.message}”`}
          </CommitMessage>
      </SelectMenu.RevisionListItemLink>
    </SelectMenu.RevisionListItem>
  );
}

export default RevisionSelectMenuListItem;
