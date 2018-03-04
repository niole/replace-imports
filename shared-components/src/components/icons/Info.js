import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const { number, string } = PropTypes;
const propTypes = {
  className: string,
  fill: string,
  height: number,
  width: number,
  viewBox: string,
};

const defaultProps = {
  className: '',
  fill: 'currentColor',
  height: 20,
  width: 20,
  viewBox: '0 0 20 20',
};

class Info extends Icon {
  renderContent() {
    const { fill } = this.props;

    return (
      <path fill={fill} d="M10,0.4c-5.303,0-9.601,4.298-9.601,9.6c0,5.303,4.298,9.601,9.601,9.601c5.301,0,9.6-4.298,9.6-9.601  C19.6,4.698,15.301,0.4,10,0.4z M10.896,3.866c0.936,0,1.211,0.543,1.211,1.164c0,0.775-0.62,1.492-1.679,1.492  c-0.886,0-1.308-0.445-1.282-1.182C9.146,4.719,9.665,3.866,10.896,3.866z M8.498,15.75c-0.64,0-1.107-0.389-0.66-2.094l0.733-3.025  c0.127-0.484,0.148-0.678,0-0.678c-0.191,0-1.022,0.334-1.512,0.664L6.74,10.094c1.555-1.299,3.343-2.061,4.108-2.061  c0.64,0,0.746,0.756,0.427,1.92l-0.84,3.18c-0.149,0.562-0.085,0.756,0.064,0.756c0.192,0,0.82-0.232,1.438-0.719l0.362,0.486  C10.786,15.168,9.137,15.75,8.498,15.75z"/>
    );
  }
}

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;

export default Info;
