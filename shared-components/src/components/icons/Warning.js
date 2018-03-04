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

class Warning extends Icon {
    renderContent() {
        const {
            fill,
        } = this.props;

        return (
            <g fill={fill}>
                <path
                    d="M11.933,0.657c-0.346,-0.657 -1.424,-0.657 -1.77,0l-10,19c-0.163,0.31 -0.152,0.683 0.028,0.982c0.182,0.301 0.506,0.484 0.857,0.484h20c0.351,0 0.675,-0.183 0.856,-0.483c0.181,-0.3 0.191,-0.672 0.028,-0.982l-9.999,-19.001Zm-0.885,17.466c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1Zm1,-4h-2v-7h2v7Z"
                    transform="translate(0.952, 1.877)"
                />
            </g>

        );
    }
}

Warning.propTypes = propTypes;

Warning.defaultProps = defaultProps;

export default Warning;
