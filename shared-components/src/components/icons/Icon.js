import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const { number, string } = PropTypes;
const propTypes = {
  className: string,
  height: number,
  width: number,
  viewBox: string,
};

const defaultProps = {
  className: '',
  height: 10,
  width: 10,
  viewBox: '0 0 10 10',
};

class Icon extends PureComponent {
  getWidth() {
    const { width } = this.props;
    return width;
  }

  getHeight() {
    const { height } = this.props;
    return height;
  }

  renderContent() {
    return '';
  }

  renderIcon() {
    const { className, viewBox, onClick } = this.props;

    return (
      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/svg/2000"
        className={className}
        width={this.getWidth()}
        height={this.getHeight()}
        viewBox={viewBox}
        version="1.1"
      >
        {this.renderContent()}
      </svg>
    );
  }

  render() {
    return this.renderIcon();
  }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
