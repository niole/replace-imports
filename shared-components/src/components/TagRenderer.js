import React from 'react';
import {oneOf, node, string} from 'prop-types';
import styled from 'styled-components';
import GitCommit from './icons/GitCommit';
import Branch from './icons/Branch';
import Tag from './icons/Tag';
import RefIcon from './icons/RefIcon';
import {
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';

const BRANCH = "branch";
const COMMIT = "commit";
const REF = "ref";
const TAG = "tag";
export const HIGHLY_CONGESTED = "highlyCongested";
export const SEMI_CONGESTED = "semiCongested";
export const NOT_CONGESTED = "notCongested";
export const UNKNOWN = "unkown";

const semiCongestedBackground = '#FFB300';
const semiCongestedColor = 'white';

const branchLabelBackground = '#E8EAEC';
const branchLabelColor = '#7A8899';

const commitLabelBackground = '#2D71C7';
const commitLabelColor = 'white';

const refLabelBackground = '#3CB42C';
const refLabelColor = 'white';

const tagLabelBackground = '#E9564B';
const tabLabelColor = 'white';

const truncationStyle = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WithIcon = styled.span`
  display: inline-flex;
  background: ${props => props.background};
  padding: .35em 1em .25em 1em;
  align-items: center;
  border-radius: 3px;
  color: ${props => props.color};
  ${truncationStyle}

  span {
    margin-left: 3px;
  }

  svg {
    flex-shrink: 0;
  }
`;

const Label = styled.div`
  display: flex;
  min-width: 0px;
  flex-grow: 1;
  align-items: center;
  font-size: 13px;
  font-size: 12px;
  font-weight: bold;

`;

function renderRefLabel({ title }, label, background, color, icon) {
  const tooltip = (
      <Tooltip id="tooltip">
        {title}
      </Tooltip>
  );
  return (
    <Label>
        <OverlayTrigger placement="top" overlay={tooltip}>
            <WithIcon
                background={background}
                color={color}
            >
                {icon}
                <span>
                    {label}
                </span>
            </WithIcon>
        </OverlayTrigger>
    </Label>
  );
}

function TagRenderer({
    tagType,
    label,
    icon,
    ...rest
  }) {
  switch (tagType) {
    case HIGHLY_CONGESTED:
      return (
        renderRefLabel(
            rest,
            label,
            tagLabelBackground,
            tabLabelColor
        )
      );

    case SEMI_CONGESTED:
      return (
        renderRefLabel(
            rest,
            label,
            semiCongestedBackground,
            semiCongestedColor,
        )
      );

    case NOT_CONGESTED:
      return (
        renderRefLabel(
            rest,
            label,
            refLabelBackground,
            refLabelColor
        )
      );

    case BRANCH:
      return (
        renderRefLabel(
            rest,
            label,
            branchLabelBackground,
            branchLabelColor,
            <Branch
              height={13}
              width={13}
            />
        )
      );

    case TAG:
      return (
        renderRefLabel(
            rest,
            label,
            tagLabelBackground,
            tabLabelColor,
            <Tag
              height={13}
              width={13}
            />
        )
      );
    case COMMIT:
      return (
        renderRefLabel(
            rest,
            label,
            commitLabelBackground,
            commitLabelColor,
            <GitCommit
              height={13}
              width={13}
            />
        )
      );
    case REF:
      return (
        renderRefLabel(
            rest,
            label,
            refLabelBackground,
            refLabelColor,
            <RefIcon />
        )
      );

    case UNKNOWN:
      return (
        renderRefLabel(
            rest,
            label,
            branchLabelBackground,
            branchLabelColor
        )
      );

    default:
      return (
        renderRefLabel(
            rest,
            label,
            'white',
            'black'
        )
      );
  }
}

TagRenderer.propTypes = {
  tagType: oneOf([
    BRANCH,
    COMMIT,
    REF,
    TAG,
    HIGHLY_CONGESTED,
    SEMI_CONGESTED,
    NOT_CONGESTED,
    UNKNOWN,
  ]),
  label: string,
  icon: node,
};

export default TagRenderer;
