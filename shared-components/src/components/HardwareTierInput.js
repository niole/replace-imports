/**
 * @format
 */

import React from 'react';
import { bool, string, func, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { compose, withHandlers } from 'recompose';
import { propType } from 'graphql-anywhere';
import { Badge } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { ProjectQuery, HardwareTierFragment } from '@domino/graphql';

import composableUncontrollable from '../higherOrderComponents/composableUncontrollable';
import DropdownInput from './DropdownInput';
import HardwareTierDescription from './HardwareTierDescription';

export const PlaceholderBadge = styled(Badge)`
  [role='menuitem'] & {
    display: inline-block;
    margin: 11px 0;
  }
`;

export function HardwareTierInput({
  name,
  availableHardwareTiers,
  selectedHardwareTierForProject,
  value,
  valueIsProjectDefault,
  nonNullable,
  loading,
  onSelectedOptionChange,
  ...otherProps
}) {
  const selectedHardwareTier =
    availableHardwareTiers &&
    availableHardwareTiers.find(hardwareTier => hardwareTier.id === value);

  function renderMenuItemChildren(hardwareTier) {
    const withDefaultLabel =
      !valueIsProjectDefault &&
      selectedHardwareTierForProject &&
      selectedHardwareTierForProject.id === hardwareTier.id;
    return (
      <HardwareTierDescription
        hardwareTier={hardwareTier}
        withDefaultLabel={withDefaultLabel}
      />
    );
  }

  function renderButtonChildren(hardwareTier) {
    return <HardwareTierDescription hardwareTier={hardwareTier} inline />;
  }

  return (
    <DropdownInput
      defaultValue=""
      name={name}
      options={availableHardwareTiers}
      selectedOption={selectedHardwareTier}
      onSelectedOptionChange={onSelectedOptionChange}
      placeholder={
        loading ? null : (
          <PlaceholderBadge>Default for Project</PlaceholderBadge>
        )
      }
      nullable={!nonNullable}
      keyForOption={hardwareTier => hardwareTier.id}
      valueForOption={hardwareTier => hardwareTier.id}
      renderButtonChildren={renderButtonChildren}
      renderMenuItemChildren={renderMenuItemChildren}
    />
  );
}

HardwareTierInput.propTypes = {
  availableHardwareTiers: arrayOf(propType(HardwareTierFragment)).isRequired,
  selectedHardwareTierForProject: propType(HardwareTierFragment),
  value: string,
  onSelectedOptionChange: func,
};

export const HardwareTierInputWithData = compose(
  composableUncontrollable({ value: 'onChange' }),
  graphql(ProjectQuery, {
    options: ({ projectId }) => ({
      variables: { projectId },
      pollInterval: 10 * 1000,
    }),
    props: ({
      ownProps: { value, valueIsProjectDefault },
      data: { project, loading },
    }) => {
      const availableHardwareTiers = project
        ? project.availableHardwareTiers.nodes
        : [];

      const selectedHardwareTierForProject =
        project && project.selectedHardwareTier;

      // Filter hardware tiers down to what should be visible to users.
      // Hardware tiers that are marked as 'hidden' are removed. The
      // 'd-endpoint' hardware tier (which is for API endpoints only) is
      // removed. This filtering should ideally be done server-side, but it is
      // not currently.
      const availableVisibleHardwareTiers = availableHardwareTiers.filter(
        hardwareTier =>
          !hardwareTier.hidden && hardwareTier.id !== 'd-endpoint',
      );

      // If `props.valueIsProjectDefault` is true, the input will show the
      // project's selected hardware tier as the selected value (this is used
      // by `ProjectSettingsHardwareTierInput`)
      const finalValue =
        value !== undefined
          ? value
          : valueIsProjectDefault && selectedHardwareTierForProject
            ? selectedHardwareTierForProject.id
            : undefined;

      return {
        loading,
        availableHardwareTiers: loading ? null : availableVisibleHardwareTiers,
        selectedHardwareTierForProject,
        value: finalValue,
      };
    },
  }),
  withHandlers({
    onSelectedOptionChange: props => hardwareTier => {
      const hardwareTierId = hardwareTier ? hardwareTier.id : null;
      props.onChange && props.onChange(hardwareTierId);
    },
  }),
)(HardwareTierInput);

HardwareTierInputWithData.propTypes = {
  projectId: string.isRequired,
  valueIsProjectDefault: bool,
};

HardwareTierInputWithData.defaultProps = {
  valueIsProjectDefault: false,
};

export default HardwareTierInputWithData;
