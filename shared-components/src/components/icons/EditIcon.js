import React from 'react';
import { number, string } from 'prop-types';
import Icon from './Icon';

const propTypes = {
    className: string,
    fill: string,
    height: number,
    viewBox: string,
    width: number,
};

const defaultProps = {
    className: 'edit-icon',
    fill: 'currentColor',
    height: 24,
    viewBox: '0 0 24 24',
    width: 24,
};

class EditIcon extends Icon {
    renderContent() {
        const {
            fill,
        } = this.props;

        return (
            <path fill={fill} d="M20.121,1.707c-1.17-1.17-3.072-1.17-4.242,0L2.066,15.52l-1.283,7.697l7.697-1.283L22.293,8.121  c1.17-1.17,1.17-3.072,0-4.242L20.121,1.707z M4.414,16L14.5,5.914L18.086,9.5L8,19.586L4.414,16z M3.667,18.081l2.252,2.252  l-2.702,0.45L3.667,18.081z M20.879,6.707L19.5,8.086L15.914,4.5l1.379-1.379c0.391-0.391,1.023-0.391,1.414,0l2.172,2.172  C21.269,5.683,21.269,6.317,20.879,6.707z"/>
        );
    }
}

EditIcon.propTypes = propTypes;
EditIcon.defaultProps = defaultProps;

export default EditIcon;
