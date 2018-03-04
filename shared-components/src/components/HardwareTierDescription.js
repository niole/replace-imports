/**
 * @format
 */

import React from 'react';
import { bool } from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Label } from 'react-bootstrap';
import currencyFormatter from 'currency-formatter';
import { HardwareTierFragment } from '@domino/graphql';

import HardwareTierCapacityLabel from './HardwareTierCapacityLabel';

export function renderHardwareTier(hardwareTier) {
  if (!hardwareTier) {
    return <span className="text-muted">None</span>;
  }
  return (
    <span>
      {hardwareTier.name}{' '}
      <span className="text-muted">
        {renderHardwareTierInfo(hardwareTier)}
      </span>{' '}
      <HardwareTierCapacityLabel hardwareTier={hardwareTier} />
    </span>
  );
}

export function renderHardwareTierInfo(hardwareTier) {
  const labelParts = [
    renderHardwareTierSpecs(hardwareTier.cores, hardwareTier.RAM),
    hardwareTier.price
      ? renderHardwareTierPrice(hardwareTier.price)
      : undefined,
  ].filter(Boolean);
  const label = labelParts.filter(Boolean).join(' – ');
  return label;
}

export function renderHardwareTierSpecs(cores, ram) {
  const coresLabel = cores === 1 ? '1 CPU' : `${cores} CPUs`;
  const ramLabel = `${ram}GB RAM`;
  const label = `${coresLabel} | ${ramLabel}`;
  return label;
}

export function renderHardwareTierPrice(hardwareTierPrice) {
  const price = currencyFormatter.format(hardwareTierPrice.unitPrice.value, {
    code: hardwareTierPrice.unitPrice.currencyCode,
  });
  switch (hardwareTierPrice.unit) {
    case 'MINUTE':
      return `${price}/min`;
    default:
      console.warn(
        `Unexpected unit for hardware tier price: ${hardwareTierPrice.unit}.`,
      );
      return `${price}/${hardwareTierPrice.unit}`;
  }
}

export function HardwareTierDescription({
  hardwareTier,
  inline,
  withDefaultLabel,
  ...otherProps
}) {
  const Container = inline ? 'span' : 'div';
  return (
    <Container>
      <Container>
        {inline ? hardwareTier.name : <strong>{hardwareTier.name} </strong>}
        {withDefaultLabel && (
          <span>
            {' '}
            <Label>Default</Label>
          </span>
        )}
      </Container>{' '}
      <Container className={inline ? 'text-muted' : null}>
        {renderHardwareTierInfo(hardwareTier)}{' '}
        <HardwareTierCapacityLabel hardwareTier={hardwareTier} />
      </Container>
    </Container>
  );
}

HardwareTierDescription.propTypes = {
  hardwareTier: propType(HardwareTierFragment).isRequired,
  inline: bool,
  withDefaultLabel: bool,
};

export default HardwareTierDescription;
