import React, { PureComponent } from 'react';
import { string, node } from 'prop-types';
import TagRenderer, {
  UNKNOWN,
  HIGHLY_CONGESTED,
  SEMI_CONGESTED,
  NOT_CONGESTED,
} from'./TagRenderer';

const level0 = "CanExecuteWithCurrentInstances";
const level1 = "RequiresLaunchingInstance";
const level2 = "Full";
const levelunknown = "Unknown";

class HardwareTierStatusesUIMixin extends PureComponent {
  state = {
    selectedTier: this.props.selectedTier,
  }

  formatType(cores, memory) {
    return `${cores} cores | ${memory} GB RAM`;
  }

  formatPrice(value) {
    return `$${parseFloat(Math.fround(value/100).toFixed(4))}/min`;
  }

  formatCongestionLevel(level, description) {
    switch (level) {
      case levelunknown:
        return (
          <TagRenderer
            tagType={UNKNOWN}
            label="UNKNOWN"
            title={description}
          />
        );

      case level0:
        return (
          <TagRenderer
            tagType={NOT_CONGESTED}
            label="< 1 MIN"
            title={description}
          />
        );

      case level1:
        return (
          <TagRenderer
            tagType={SEMI_CONGESTED}
            label="< 5 MIN"
            title={description}
          />
        );

      case level2:
        return (
          <TagRenderer
            tagType={HIGHLY_CONGESTED}
            label="INDEFINITE"
            title={description}
          />
        );

      default:
        throw new Error('This congestion level doesn\'t exist');
    }
  }

  render() {
    const {
      children,
    } = this.props;

    return children;
  }
}

HardwareTierStatusesUIMixin.propTypes = {
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  selectedTier: string.isRequired,
  children: node.isRequired,
};

export default HardwareTierStatusesUIMixin;
