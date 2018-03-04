import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';


const { number, string } = PropTypes;
const propTypes = {
    className: string,
    fill: string,
    height: number,
    viewBox: string,
    width: number,
};

const defaultProps = {
    className: '',
    fill: 'currentColor',
    height: 24,
    viewBox: '0 0 24 24',
    width: 24,
};

class MinimalSuccess extends Icon {
    renderContent() {
        const {
            fill,
        } = this.props;

        return (
            <g>
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill={fill} d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </g>
        );
    }

    render() {
        return this.renderIcon();
    }
}

MinimalSuccess.propTypes = propTypes;
MinimalSuccess.defaultProps = defaultProps;

export default MinimalSuccess;
