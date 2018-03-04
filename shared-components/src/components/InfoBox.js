import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Info from './icons/Info';

export function InfoBox({ icon, children, ...rest}) {
    return (
        <ListGroupItem bsStyle="info" {...rest}>
          { icon ? icon : <Info height={13} width={13} /> }
          {children}
        </ListGroupItem>
    );
}

InfoBox.propTypes = {
    icon: node,
};

export const BaseInfoBoxStyle = `
  margin: 11px auto 11px auto;
  font-size: 13px;
  display: block;

  svg {
    margin-right: 5px;
    flex-shrink: 0;
  }
`;

const StyledInfoBox = styled(InfoBox)`
  ${BaseInfoBoxStyle}
  color: #6398DB;
  background-color: #EFF5FA;
  border: 1px solid #EEEEEE;
  display: inline-block;

  svg {
    fill: #2F74C7;
  }
`;

export default StyledInfoBox;
