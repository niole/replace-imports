import styled from 'styled-components';
import { focusedGrey, clickableBlue, shady4 } from './colors.js';

const buttonWidth = 42;
const buttonGroupSidePadding = 5;
const buttonGroupSize = buttonGroupSidePadding * 2 + buttonWidth;
const textColor = '#172434';
const hoverBlue = '#F4FAFE';
const MenuBorder = `1px solid ${shady4}`;
const listHeight = '220px';
const ListElementStyle = `
  padding: 5px;
  cursor: pointer;
`;

export const List = styled.div`
  overflow: auto;
  color: ${clickableBlue};
  height: ${listHeight};
  border: ${MenuBorder};
  font-weight: bold;

  &::-webkit-scrollbar-track {
    background: white;
    box-shadow: inset 1px 0 0 ${shady4};
  }

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: ${shady4};
    border-left: 3px solid white;
    border-right: 3px solid white;
  }
`;

export const ListGroup = styled.div`
  display: inline-block;
  width: calc(50% - ${buttonGroupSize / 2}px);
  height: 100%;
`;

export const ButtonGroup = styled.div`
  position: relative;
  top: -85px;
  margin: 0px ${buttonGroupSidePadding}px;
  display: inline-block;
  width: ${buttonWidth}px;
`;

export const ListElement = styled.div`${ListElementStyle};`;

export const FocusedListElement = styled.div`
  ${ListElementStyle} background: ${focusedGrey};
`;

export const Button = styled.div`
  transition: all .1s ease-in;
  color: ${clickableBlue};
  display: inline-block;
  border: ${MenuBorder};
  border-radius: 2px;
  padding: 9px 14px;
  text-align: center;
  margin: 2px 0px;

  &:hover {
    border: 1px solid ${clickableBlue};
    background: ${hoverBlue};
  }

  svg {
    vertical-align: middle;
  }
`;

export const Header = styled.div`
  color: ${textColor};
  padding: 10px 0px;
  font-weight: bold;
`;
