import React from 'react';
import {
  string,
  number,
} from 'prop-types';
import Icon from './Icon';

class Directory extends Icon {
  renderContent() {
    const {
      fill,
    } = this.props;

    return (
      <path fill={fill} d="M11,0H0v7v2v15h24V9V7V3H11V0z M22,22H2V9h20V22z M22,5v2H2V2h7v3H22z"/>
    );
  }
}

Directory.propTypes = {
  width: number,
  height: number,
  viewBox: string,
  className: string,
  fill: string,
};

Directory.defaultProps = {
  fill: 'currentColor',
  width: 10,
  height: 14,
  viewBox: "0 0 24 24",
  className: "directory-icon",
};

export default Directory;
