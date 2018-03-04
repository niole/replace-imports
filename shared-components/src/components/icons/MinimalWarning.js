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

class MinimalWarning extends Icon {
    renderContent() {
        const {
            fill,
            height,
            width,
        } = this.props;

        return (
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g>
                    <g>
                        <rect x="0" y="0" width={width} height={height} />
                        <path d="M12.00025,22.00025 C11.74425,22.00025 11.48825,21.90225 11.29325,21.70725 L2.29325,12.70725 C1.90225,12.31625 1.90225,11.68425 2.29325,11.29325 L11.29325,2.29325 C11.68425,1.90225 12.31625,1.90225 12.70725,2.29325 L21.70725,11.29325 C22.09825,11.68325 22.09825,12.31625 21.70725,12.70725 L12.70725,21.70725 C12.51225,21.90325 12.25625,22.00025 12.00025,22.00025 Z M4.41425,12.00025 L12.00025,4.41525 L19.58625,12.00025 L12.00025,19.58625 L4.41425,12.00025 Z M11.00025,8.00025 L11.00025,14.00025 L13.00025,14.00025 L13.00025,8.00025 L11.00025,8.00025 Z M12.00025,17.25025 C12.6906059,17.25025 13.25025,16.6906059 13.25025,16.00025 C13.25025,15.3098941 12.6906059,14.75025 12.00025,14.75025 C11.3098941,14.75025 10.75025,15.3098941 10.75025,16.00025 C10.75025,16.6906059 11.3098941,17.25025 12.00025,17.25025 Z" fill={fill} />
                    </g>
                </g>
            </g>
        );
    }

    render() {
        return this.renderIcon();
    }
}

MinimalWarning.propTypes = propTypes;
MinimalWarning.defaultProps = defaultProps;

export default MinimalWarning;
