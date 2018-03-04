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
  fill: 'white',
  height: 10,
  width: 10,
  viewBox: '0 0 24 24',
};

class Check extends Icon {
  renderContent() {
    const { fill } = this.props;

    return (
      <g fill={fill}>
        <path
          d="M22.828,1.414l-1.414,-1.414l-13,13l-7,-7l-1.414,1.414l8.414,8.414Z"
          transform="translate(0.586, 4.586)"
        />
      </g>
    );
  }

  render() {
    return this.renderIcon();
  }
}

Check.propTypes = propTypes;
Check.defaultProps = defaultProps;

export default Check;
