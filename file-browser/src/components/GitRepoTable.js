import React, { PureComponent } from 'react';
import {oneOf, bool, arrayOf, shape, string} from 'prop-types';
import styled from 'styled-components';
import {
  TagRenderer,
  XButton,
  EditRepoButton,
  Octicon,
  MinimalSortableFilterableTable,
} from '@domino/shared-components';
import {
  archiveRepo,
} from './utils/queryUtil';

const HEAD = "head";
const BRANCHES = "branch";
const TAGS = "tag";
const COMMITID = "commitId";
const REF = "ref";

const secondaryBaseColor = '#999';

const truncationStyle = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AvatarContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 1px 5px;
`;

const DetailsContainer = styled.div`
  display: flex;
  padding: 10px 0px;
  height: 100%;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const RepoNameContainer = styled.div`
  display: inline-block;
  flex-grow: 1;
  min-width: 0px;

  button {
    padding: 0px;
    padding-left: 5px;
  }
`;

const RepoName = styled.div`
  display: flex;
  font-weight: bold;

  svg {
    margin: 2px 5px 0px 0px;
  }

  span {
    ${truncationStyle}
  }
`;

const URI = styled.div`
  display: flex;

  span {
    color: ${secondaryBaseColor};
    ${truncationStyle}
  }
`;

function sorter(accessor) {
  return (a, b) => {
    if (accessor(a) > accessor(b)) {
      return 1;
    }
    return -1;
  };
}

class GitRepoTable extends PureComponent {
  createSlideinEvent(props) {
    return new CustomEvent("slideintoggle", {
      detail: props,
    });
  }

  showSlideinNotification(props) {
    const opener = this.createSlideinEvent({
      show: true,
      ...props,
    });
    window.dispatchEvent(opener);
  }

  renderRepoCell = ({ value }) => {
    const {
      areReferencesCustomizable,
      csrfToken,
      ownerUsername,
      projectName,
    } = this.props;

    return (
      <DetailsContainer>
        <AvatarContainer>
          <Octicon height={12} width={12} />
        </AvatarContainer>
        <RepoNameContainer>
          <RepoName>
            <span title={value.repoName}>
              {value.repoName}
            </span>
            {areReferencesCustomizable &&
              <EditRepoButton
                url={value.uri}
                repoName={value.repoName}
                csrfToken={csrfToken}
                ownerUsername={ownerUsername}
                projectName={projectName}
                areReferencesCustomizable={areReferencesCustomizable}
              />}
          </RepoName>
          <URI>
            <span title={value.uri}>
              {value.uri}
            </span>
          </URI>
        </RepoNameContainer>
      </DetailsContainer>
    );
  }

  renderRefCell = ({ value }) => {
    if (value.refType === HEAD || value.refType === COMMITID) {
      return (
        <DetailsContainer>
          <TagRenderer
            label={value.refLabel}
            tagType="commit"
          />
        </DetailsContainer>
      );
    }

    return (
      <DetailsContainer>
        <TagRenderer
          label={value.refLabel}
          tagType={value.refType}
        />
      </DetailsContainer>
    );
  }

  archiveRepo = ({ row }) => {
    const {
      ownerUsername,
      projectName,
      csrfToken,
    } = this.props;
    const {
      repository,
    } = row;

    archiveRepo(ownerUsername, projectName, repository.uri, csrfToken)
      .then(() => {
        const nextHref = `/u/${ownerUsername}/${projectName}/browse#gitrepos`;
        const origin = window.location.origin;
        const href = window.location.href;
        if (`${origin}${nextHref}` === href) {
            window.location.reload();
        } else {
            window.location.href = `/u/${ownerUsername}/${projectName}/browse#gitrepos`;
        }
      })
      .catch(error => {
        this.showSlideinNotification({
          message: {
              primary: {
                  content: `Domino was unable to archive ${repository.repoName}`,
              },
              secondary: {
                  content: this.getErrorMessage(error),
              },
          },
          messageType: "warning",
          isDismissable: true,
          shouldDisappear: false,
          onDismiss: this.handleDismissNotification,
          isClickable: true,
        });
      });
  }

  getErrorMessage(error) {
    let message = "Something went wrong with your request.";

    if (error.message) {
        message = error.message;
    } else if (error.response && error.response.data) {
        message = error.response.data;
    } else if (error.status) {
        message = `${error.status} - ${error.statusText}`;
    }

    return message;
  }

  handleDismissNotification() {
    const closer = this.createSlideinEvent({ show: false });
    window.dispatchEvent(closer);
  }

  renderLocationCell = (row) => {
    return (
        <DetailsContainer>
            <Location>
                {row.value}
            </Location>
        </DetailsContainer>
    );
  }

  renderRemoveCell = (props) => {
    return (
      <XButton
        title="Archive this repo"
        onClick={this.archiveRepo.bind(this, props)}
      />
    );
  }

  getHeaders() {
    return [
      {
        Header: "Repository",
        accessor: "repository",
        Cell: this.renderRepoCell,
        sortMethod: sorter(r => r.repoName.toLowerCase())
      },
      {
        Header: "Location",
        accessor: "location",
        Cell: this.renderLocationCell,
      },
      {
        Header: "Reference",
        accessor: "reference",
        Cell: this.renderRefCell,
        sortMethod: sorter(r => r.refLabel.toLowerCase())
      },
      {
        Header: "",
        accessor: "remove",
        Cell: this.renderRemoveCell,
        width: 40,
      },
    ];
  }

  formatRows() {
    const {
      gitRepos,
    } = this.props;

    return gitRepos.map(({
        repoName,
        uri,
        refLabel,
        refType,
        location,
      }) => {

      return {
        repository: {
          repoName,
          uri,
        },
        location,
        reference: {
          refType,
          refLabel,
        },
        remove: {
        },
      };
    });
  }

  render() {
    return (
      <MinimalSortableFilterableTable
        className="-highlight"
        defaultPageSize={this.props.gitRepos.length}
        showPagination={false}
        minRows={0}
        rows={this.formatRows()}
        headers={this.getHeaders()}
      />
    );
  }
}

GitRepoTable.propTypes = {
  areReferencesCustomizable: bool.isRequired,
  csrfToken: string,
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  gitRepos: arrayOf(
    shape({
      repoName: string,
      uri: string,
      refLabel: string,
      refType: oneOf([
        HEAD,
        BRANCHES,
        TAGS,
        COMMITID,
        REF,
      ]),
    })
  )
};

export default GitRepoTable;
