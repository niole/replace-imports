import React from 'react';
import { oneOf, string, number } from 'prop-types';
import Icon from './Icon';

export const UP = 'up';
export const DOWN = 'down';
export const LEFT = 'left';
export const RIGHT = 'right';

class RotateableIcon extends Icon {
  rotateContent() {
    const { baseRotation, direction } = this.props;

    switch (direction) {
      case UP:
        return baseRotation + 90;
      case DOWN:
        return baseRotation + 270;
      case LEFT:
        return baseRotation + 0;
      case RIGHT:
        return baseRotation + 180;
      default:
        return 0;
    }
  }

  getRotation(degreeRotation, height, width) {
      if (window.navigator.userAgent.indexOf("Firefox") > -1) {
        return `rotate(${degreeRotation}, ${width/2}, ${height/2})`;
      }
      return `rotate(${degreeRotation})`;

  }


  renderIcon() {
    const { className, viewBox, onClick } = this.props;
    const degreeRotation = this.rotateContent();
    const width = this.getWidth();
    const height = this.getHeight();

    return (
      <svg
        onClick={onClick}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={viewBox}
        transform={this.getRotation(degreeRotation, height, width)}
      >
        {this.renderContent()}
      </svg>
    );
  }
}

RotateableIcon.propTypes = {
  baseRotation: number,
  height: number,
  width: number,
  direction: oneOf([UP, DOWN, LEFT, RIGHT]),
  fill: string,
  viewBox: string,
};

RotateableIcon.defaultProps = {
  baseRotation: 0,
  height: 13,
  width: 13,
  direction: UP,
  fill: 'currentColor',
  viewBox: "0 0 24 24",
};

export default RotateableIcon;
