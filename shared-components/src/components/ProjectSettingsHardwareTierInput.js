/**
 * @format
 */

import React from 'react';
import { string } from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { UpdateProjectMutation } from '@domino/graphql';

import HardwareTierInput from './HardwareTierInput';

export function ProjectSettingsHardwareTierInput({
  projectId,
  onHardwareTierInputChange,
  ...otherProps
}) {
  return (
    <HardwareTierInput
      projectId={projectId}
      valueIsProjectDefault
      onChange={onHardwareTierInputChange}
      nonNullable
      {...otherProps}
    />
  );
}

export const ProjectSettingsHardwareTierInputWithData = compose(
  graphql(UpdateProjectMutation, {
    props: ({ ownProps: { projectId }, mutate }) => ({
      onHardwareTierInputChange: async selectedHardwareTierId => {
        // Update project
        await mutate({
          variables: { projectId, selectedHardwareTierId },
        });
        // Show slide-in note
        window.dispatchEvent(
          new CustomEvent('slideintoggle', {
            detail: {
              show: true,
              message: {
                primary: {
                  content: 'Default hardware tier updated.',
                },
              },
              messageType: 'success',
              isDismissable: true,
              shouldDisappear: true,
              isClickable: true,
            },
          }),
        );
      },
    }),
  }),
)(ProjectSettingsHardwareTierInput);

ProjectSettingsHardwareTierInputWithData.propTypes = {
  projectId: string.isRequired,
};

export default ProjectSettingsHardwareTierInputWithData;
