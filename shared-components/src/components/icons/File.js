import React from 'react';
import {
  string,
  number,
} from 'prop-types';
import Icon from './Icon';

class File extends Icon {
  renderContent() {
    const {
      fill,
    } = this.props;

    return [
      <path fill={fill} key="a" d="M1,24h22V6.586L16.414,0H1V24z M3,2h12v6h6v14H3V2z"/>,
      <rect fill={fill} key="b" x="6" y="6" width="6" height="2"/>,
      <rect fill={fill} key="c" x="6" y="11" width="12" height="2"/>,
      <rect fill={fill} key="d" x="6" y="16" width="12" height="2"/>,
    ];
  }
}

File.propTypes = {
  width: number,
  height: number,
  viewBox: string,
  className: string,
  fill: string,
};

File.defaultProps = {
  fill: 'currentColor',
  width: 10,
  height: 14,
  viewBox: "0 0 24 24",
  className: "file-icon",
};

export default File;
