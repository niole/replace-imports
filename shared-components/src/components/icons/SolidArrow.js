import React from 'react';
import {oneOf, number, string} from 'prop-types';
import RotateableIcon, {
  UP,
  DOWN,
  LEFT,
  RIGHT,
} from './RotateableIcon';


class SolidArrow extends RotateableIcon {
  renderContent() {
    const { fill } = this.props;
    return [
      <path key="p1" d="M7 10l5 5 5-5z" fill={fill} />,
      <path key="p2" d="M0 0h24v24H0z" fill="none" />
    ];
  }
}

SolidArrow.propTypes = {
  direction: oneOf([UP, DOWN, LEFT, RIGHT]),
  fill: string,
  baseRotation: number,
  viewBox: string,
  width: number,
  height: number,
};

SolidArrow.defaultProps = {
  fill: 'currentColor',
  baseRotation: 90,
  viewBox: "0 0 24 24",
  direction: UP,
  width: 24,
  height: 24,
};

export default SolidArrow;
