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
  className: 'branch-icon',
  fill: 'currentColor',
  height: 24,
  width: 24,
  viewBox: '0 0 1792 1792',
};

class Branch extends Icon {
  renderContent() {
    const { fill } = this.props;

    return (
      <path
        fill={fill}
        d="M672 1472q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm0-1152q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm640 128q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm96 0q0 52-26 96.5t-70 69.5q-2 287-226 414-68 38-203 81-128 40-169.5 71t-41.5 100v26q44 25 70 69.5t26 96.5q0 80-56 136t-136 56-136-56-56-136q0-52 26-96.5t70-69.5v-820q-44-25-70-69.5t-26-96.5q0-80 56-136t136-56 136 56 56 136q0 52-26 96.5t-70 69.5v497q54-26 154-57 55-17 87.5-29.5t70.5-31 59-39.5 40.5-51 28-69.5 8.5-91.5q-44-25-70-69.5t-26-96.5q0-80 56-136t136-56 136 56 56 136z"
      />
    );
  }
}

Branch.propTypes = propTypes;
Branch.defaultProps = defaultProps;

export default Branch;
