import React, { PureComponent } from 'react';
import { func, bool, node, string } from 'prop-types';
import { ClosedIconCirle, ToggleContainer } from './styled/TwoFacedToggle';
import Check from './icons/Check';

class TwoFacedToggle extends PureComponent {
  constructor(props) {
    super(props);
    const { openLabel, closedLabel, openIcon, closedIcon } = props;
    this.input = null;
    this.getLabel = this.switchElement.bind(this, openLabel, closedLabel);
    this.getIcon = this.switchElement.bind(this, openIcon, closedIcon);
  }

  switchElement(e1, e2) {
    const { isOpen } = this.props;

    if (isOpen) {
      return e1;
    }
    return e2;
  }

  render() {
    const { openColor, closedColor, onChange, isOpen } = this.props;

    return (
      <ToggleContainer
        {...{
          openColor,
          closedColor,
          label: this.getLabel(),
        }}
      >
        <input
          checked={isOpen}
          onChange={onChange}
          ref={ref => (this.input = ref)}
          type="checkbox"
        />
        <div className="handle">
          {this.getIcon()}
        </div>
      </ToggleContainer>
    );
  }
}

TwoFacedToggle.propTypes = {
  openLabel: string.isRequired,
  closedLabel: string.isRequired,
  onChange: func.isRequired,
  isOpen: bool,
  openIcon: node,
  closedIcon: node,
  openColor: string,
  closedColor: string,
};

TwoFacedToggle.defaultProps = {
  isOpen: false,
  openColor: '#3CB42C',
  closedColor: '#7A8899',
  openIcon: <Check width={20} height={20} />,
  closedIcon: <ClosedIconCirle circleColor="white" />,
};

export default TwoFacedToggle;
