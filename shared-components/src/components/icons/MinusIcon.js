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
    className: 'minus-icon',
    fill: 'currentColor',
    height: 16,
    viewBox: '0 0 16 16',
    width: 16,
};

class MinusIcon extends Icon {
    renderContent() {
        const {
            fill,
        } = this.props;

        return (
            <g xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g fillRule="nonzero" fill={fill}>
                    <g transform="translate(2.000000, 7.000000)">
                        <polygon points="7.5 2 12 2 12 0 7.5 0 4.5 0 0 0 0 2 4.5 2" />
                    </g>
                </g>
            </g>
        );
    }

    render() {
        return this.renderIcon();
    }
}

MinusIcon.propTypes = propTypes;
MinusIcon.defaultProps = defaultProps;

export default MinusIcon;
