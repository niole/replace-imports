/**
 * @format
 */

import React from 'react';
import { propType } from 'graphql-anywhere';
import { HardwareTierFragment } from '@domino/graphql';

import Label from './Label';

export function HardwareTierCapacityLabel({ hardwareTier, ...otherProps }) {
  const { bsStyle, labelText, tooltipText } = propsForHardwareTier(
    hardwareTier,
  );
  const overlayId = `hardware-tier-${hardwareTier.id}-capacity-label`;
  return (
    <Label overlayContent={tooltipText} overlayId={overlayId} bsStyle={bsStyle}>
      {labelText}
    </Label>
  );
}

HardwareTierCapacityLabel.propTypes = {
  hardwareTier: propType(HardwareTierFragment),
};

export function propsForHardwareTier(hardwareTier) {
  const hardwareTierCapacityLevel =
    hardwareTier.capacity && hardwareTier.capacity.level;
  switch (hardwareTierCapacityLevel) {
    case 'FULL':
      return {
        labelText: 'INDEFINITE',
        bsStyle: 'danger',
        tooltipText:
          'This hardware tier has no more capacity to execute a run and will not launch new executors.',
      };
    case 'REQUIRES_LAUNCHING_INSTANCE':
      return {
        labelText: '< 7 MIN',
        bsStyle: 'warning',
        tooltipText:
          'This hardware tier will have to launch new executors to execute a run',
      };
    case 'CAN_EXECUTE_WITH_CURRENT_INSTANCES':
      return {
        labelText: '< 1 MIN',
        bsStyle: 'success',
        tooltipText:
          'This hardware tier has capacity to execute a run without needing new executors.',
      };
    default:
      return {};
  }
}

export default HardwareTierCapacityLabel;
