import React from 'react';
import {
  string,
  number,
} from 'prop-types';
import Icon from './Icon';

class Gear extends Icon {
  renderContent() {
    const {
      fill,
    } = this.props;

    return (
      <path fill={fill} d="M13.297,5.184l1.067-2.134L12.95,1.636l-2.134,1.067c-0.336-0.179-0.691-0.328-1.062-0.441L9,0H7L6.246,2.262  C5.875,2.375,5.52,2.524,5.184,2.703L3.05,1.636L1.636,3.05l1.067,2.134C2.524,5.52,2.375,5.875,2.262,6.246L0,7v2l2.262,0.754  c0.113,0.371,0.262,0.725,0.441,1.062L1.636,12.95l1.414,1.414l2.134-1.067c0.336,0.179,0.691,0.328,1.062,0.441L7,16h2l0.754-2.262  c0.371-0.113,0.726-0.262,1.062-0.441l2.134,1.067l1.414-1.414l-1.067-2.134c0.179-0.336,0.328-0.691,0.441-1.062L16,9V7  l-2.262-0.754C13.625,5.875,13.476,5.52,13.297,5.184z M8,11c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S9.657,11,8,11z"/>
    );
  }
}

Gear.propTypes = {
  width: number,
  height: number,
  viewBox: string,
  className: string,
  fill: string,
};

Gear.defaultProps = {
  fill: 'currentColor',
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  className: "gear-icon",
};

export default Gear;
