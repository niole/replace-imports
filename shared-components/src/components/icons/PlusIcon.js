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
    className: 'plus-icon',
    fill: 'currentColor',
    height: 16,
    viewBox: '0 0 16 16',
    width: 16,
};

class PlusIcon extends Icon {
    renderContent() {
        const {
            fill,
        } = this.props;

        return (
            <g xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g fillRule="nonzero" fill={fill}>
                    <polygon points="7 14 9 14 9 9 14 9 14 7 9 7 9 2 7 2 7 7 2 7 2 9 7 9" />
                </g>
            </g>
        );
    }

    render() {
        return this.renderIcon();
    }
}

PlusIcon.propTypes = propTypes;
PlusIcon.defaultProps = defaultProps;

export default PlusIcon;
