import React from 'react';
import {
  func,
  string,
  bool,
} from 'prop-types';
import styled from 'styled-components';
import FormattedForm from './FormattedForm';
import StyledModalHeader from './styled/StyledModalHeader';
import {
  addDefaultRefComponents,
  getModalHeader,
} from './util/gitRepoUtil';

const CANT_EDIT_MESSAGE = 'You are not allowed to edit this git repository\'s details';
const repoDetailsColor = '#83868b';
const RepoDetail = styled.div`
  color: ${repoDetailsColor};
`;

function getBaseFields(repoName, url) {
  return [
    [{
      inputType: "text",
      inputOptions: (
        <div>
          <strong>
            Name
          </strong>
          <RepoDetail>
            {repoName}
          </RepoDetail>
        </div>
      ),
    }], [
      {
        inputType: "text",
        inputOptions: (
          <div>
            <strong>
              URI
            </strong>
            <RepoDetail>
              {url}
            </RepoDetail>
          </div>
        ),
      }
    ], [

    ]
  ];
}

function EditGitRepoContent({
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
          defaultref: defaultReference,
          repoName,
          url,
        }}
        fieldMatrix={addDefaultRefComponents(areReferencesCustomizable, getBaseFields(repoName, url), CANT_EDIT_MESSAGE)}
        onCancel={onClose}
        submitLabel="Edit Repository"
        {...rest}
      />
    </div>
  );
}

EditGitRepoContent.propTypes = {
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  areReferencesCustomizable: bool.isRequired,
  repoName: string,
  url: string,
};

EditGitRepoContent.defaultProps = {
  areReferencesCustomizable: false,
  repoName: "",
  url: "",
  defaultReference: "head",
};

export default EditGitRepoContent;
