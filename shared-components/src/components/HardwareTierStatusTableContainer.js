import React from 'react';
import styled from 'styled-components';
import {string} from 'prop-types';
import HardwareTierStatusTable from './HardwareTierStatusTable';
import HardwareTierStatusDataGetter, {HardwareTierStatusDataGetterProps} from './HardwareTierStatusDataGetter';
import SpinningDominoLogo from './icons/SpinningDominoLogo';

const WAIT_SPINNER_SIZE = 68;

const SpinnerContainer = styled.div`
  text-align: center;

  svg {
    display: block;
    margin: 0px auto 20px auto;
  }
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <SpinningDominoLogo
        height={WAIT_SPINNER_SIZE}
        width={WAIT_SPINNER_SIZE}
      />
      Gathering information on compute capacity...
    </SpinnerContainer>
  );
}

class HardwareTierStatusTableContainer extends HardwareTierStatusDataGetter {
  render() {
    const {
      ownerUsername,
      projectName,
    } = this.props;
    const {
      selectedTier,
      hardwareTierDetails,
    } = this.state;

    return (
      !hardwareTierDetails.length ?
      <Spinner />:
      <HardwareTierStatusTable
        handleUpdateGloballySelectedTier={this.handleUpdateGloballySelectedTier}
        ownerUsername={ownerUsername}
        projectName={projectName}
        selectedTier={selectedTier}
        hardwareTierDetails={hardwareTierDetails}
      />
    );
  }
}

export const HardwareTierStatusContainerProps = {
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  ...HardwareTierStatusDataGetterProps
};

HardwareTierStatusTableContainer.propTypes = HardwareTierStatusContainerProps;

export default HardwareTierStatusTableContainer;
