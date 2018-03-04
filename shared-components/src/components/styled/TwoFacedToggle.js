import s from 'styled-components';
import { shady4 } from './colors.js';

const toggleGroupWidth = 90;
const toggleGroupHeight = 35;
const borderRadius = 5;
const toggleBaseColor = 'white';

export const ToggleContainer = s.label`
  font-size: 18px;
  display: inline-block;
  height: 40px;
  width: ${toggleGroupWidth}px;
  position: relative;

  .handle {
      height: ${toggleGroupHeight}px;
      width: ${toggleGroupWidth}px;
      position: absolute;
      cursor: pointer;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      background: ${toggleBaseColor};
      border: 1px solid ${shady4};
      border-radius: ${borderRadius}px;

      svg {
        position: absolute;
      }

      &:after {
        color: ${props => props.closedColor};
        padding: 7px;
        content: "${props => props.label}";
        height: ${toggleGroupHeight}px;
        width: ${toggleGroupWidth / 2}px;
        right: 0px;
        bottom: 0px;
        position: absolute;
        text-align: center;
      }

      &:before {
        content: "";
        border-radius: ${borderRadius}px;
        position: absolute;
        background: ${props => props.closedColor};
        height: ${toggleGroupHeight}px;
        width: ${toggleGroupWidth / 2}px;
        text-align: center;
        left: 0px;
        bottom: -1px;
        transition: .2s;
      }
  }

  input {
    display: none;

    &:checked + .handle {
      &:after {
        left: 0px;
        color: ${props => props.openColor};
      }

      &:before {
        transform: translateX(${toggleGroupWidth / 2}px);
        background: ${props => props.openColor};
      }

      svg {
        right: 9px;
        top: 5px;
      }
    }
  }
`;

export const ClosedIconCirle = s.div`
  position: absolute;
  border-radius: 100%;
  background: ${props => props.circleColor};
  height: 13px;
  width: 13px;
  top: 9px;
  left: 17px;
`;
