import React from 'react';
import {string} from 'prop-types';
import HardwareTierStatusDataGetter from './HardwareTierStatusDataGetter';
import HardwareTierStatusSelect from './HardwareTierStatusSelect';
import {HardwareTierStatusContainerProps} from './HardwareTierStatusTableContainer';

class HardwareTierStatusSelectContainer extends HardwareTierStatusDataGetter {
  render() {
    const {
      ownerUsername,
      projectName,
      ...rest
    } = this.props;
    const {
      selectedTier,
      hardwareTierDetails,
    } = this.state;

    return (
      <HardwareTierStatusSelect
        handleUpdateGloballySelectedTier={this.handleUpdateGloballySelectedTier}
        ownerUsername={ownerUsername}
        projectName={projectName}
        selectedTier={selectedTier}
        hardwareTierDetails={hardwareTierDetails}
        {...rest}
      />
    );
  }
}

HardwareTierStatusSelectContainer.propTypes = {
  projectType: string,
  ...HardwareTierStatusContainerProps
};

HardwareTierStatusSelectContainer.defaultProps = {
  projectType: "Project",
};

export default HardwareTierStatusSelectContainer;
