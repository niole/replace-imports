import React from 'react';
import {
  func,
  string,
  bool,
} from 'prop-types';
import FormattedForm from './FormattedForm';
import StyledModalHeader from './styled/StyledModalHeader';
import {
  addDefaultRefComponents,
  gitRepoURLValidator,
  getModalHeader,
} from './util/gitRepoUtil';

const baseFields = [
    [
      {
        inputType: "input",
        inputOptions: {
          key: "repoName",
          className: "repoName",
          label: "Name",
          sublabel: "(optional)",
        },
      },
    ], [
      {
        inputType: "input",
        inputOptions: {
          key: "url",
          className: "url",
          label: "URI",
          sublabel: "(https or ssh only)",
          placeholder: "https://github.com/org/repo.git or git@github.com:org/repo.git",
          validated: true,
          validators: [
            {
              checker: gitRepoURLValidator,
              errorCreator: () => "You must enter a valid git repository url",
            },
          ],
        },
      },
    ], [
      {
        inputType: "info",
        inputOptions: {
          content: "Add your credentials if the repository requires authentication",
          link: "/account#gitIntegration",
          linklabel: "Learn More",
        },
      },
    ],
];

function AddGitRepoContent({
  repoName,
  url,
  areReferencesCustomizable,
  defaultReference,
  onClose,
  ...rest
}) {
  return (
    <div>
      <StyledModalHeader>
        {getModalHeader(repoName)}
      </StyledModalHeader>
      <FormattedForm
        asModal={true}
        defaultValues={{
          repoName,
          url,
          defaultref: defaultReference,
        }}
        fieldMatrix={addDefaultRefComponents(areReferencesCustomizable, baseFields)}
        onCancel={onClose}
        submitLabel="Add Repository"
        {...rest}
      />
    </div>
  );
}

AddGitRepoContent.propTypes = {
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  areReferencesCustomizable: bool.isRequired,
  repoName: string,
  url: string,
};

AddGitRepoContent.defaultProps = {
  areReferencesCustomizable: false,
  repoName: "",
  url: "",
  defaultReference: "head",
};

export default AddGitRepoContent;
