import React from 'react';
import RotateableIcon, {
  UP,
  DOWN,
  LEFT,
  RIGHT,
} from './RotateableIcon';
import { oneOf, string, number } from 'prop-types';


class RoundedArrow extends RotateableIcon {
  renderContent() {
    const { fill } = this.props;

    return (
      <g fill="none" fillRule="evenodd" transform="matrix(-1 0 0 1 14 -4)">
        <path
          fill={fill}
          d="M8.32052878,4.4376907 C8.73352878,4.8406907 12.7775288,9.0866907 12.7775288,9.0866907 C12.9985288,9.3026907 13.1085288,9.5846907 13.1085288,9.8666907 C13.1085288,10.1486907 12.9985288,10.4316907 12.7775288,10.6466907 C12.7775288,10.6466907 8.73352878,14.8926907 8.32052878,15.2956907 C7.90652878,15.6986907 7.16252878,15.7266907 6.72052878,15.2956907 C6.27852878,14.8646907 6.24352878,14.2636907 6.72052878,13.7346907 L10.4305288,9.8656907 L6.72052878,5.9966907 C6.24352878,5.4686907 6.27852878,4.8666907 6.72052878,4.4356907 C7.16252878,4.0066907 7.90652878,4.0336907 8.32052878,4.4376907 Z"
        />
      </g>
    );
  }
}

RoundedArrow.propTypes = {
  className: string,
  height: number,
  width: number,
  direction: oneOf([UP, DOWN, LEFT, RIGHT]),
  fill: string,
  viewBox: string,
  baseRotation: number,
};

RoundedArrow.defaultProps = {
  baseRotation: 0,
  viewBox: "0 0 12 12",
  className: 'rounded-arrow-icon',
  height: 12,
  width: 12,
  direction: UP,
  fill: 'currentColor',
};

export default RoundedArrow;
