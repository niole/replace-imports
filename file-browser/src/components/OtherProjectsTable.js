import React, { PureComponent } from 'react';
import {oneOfType, number, bool, arrayOf, shape, string} from 'prop-types';
import styled from 'styled-components';
import {
    Button,
} from 'react-bootstrap';
import {
  MinimalSelect,
  Form,
  MinimalSortableFilterableTable,
  XButton,
  EyeIcon,
} from '@domino/shared-components';
import {
  removeProjectDependency,
} from './utils/queryUtil';

const Table = styled(MinimalSortableFilterableTable)`
  .rt-td {
    display: flex;
    align-items: center;
  }

  .rt-tr-group {
    ${props => getRowStyles(props.rowDetails)}
  }
`;

function getRowStyles(rowDetails) {
  return rowDetails.map(({ isActive }, index) => {
    if (!isActive) {
      return `
        &:nth-child(${index+1}) {
          background: #FFFBF2;

          .unauthorized-imports {
              color: #736000;
          }
        }
      `;
    }
    return "";
  }).join("");
}

const ReleaseForm = styled(Form)`
    position: absolute;
    width: 200px;
`;

const Remove = styled.div`
    height: 100%;
    width: 100%;
`;

const Centerer = styled.div`
    padding: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const ProjectCell = styled.div`
    width: 250px;

    form {
        position: absolute;
        width: 200px;
    }
`;

const EyeButton = styled(Button)`
    float: right;
    padding: 7px 8px;
    height: 35px;

    svg {
        vertical-align: middle;
    }
`;

class OtherProjectsTable extends PureComponent {
  renderProjectDropdown = (row) => {
    const {
      ownerUsername,
      projectName,
      csrfToken,
    } = this.props;

    const {
        projects,
        isArchived,
    } = row.value;
    const projectUser = row.value.ownerUsername;
    const importedProjectName = row.value.projectName;
    const depName = `${projectUser}/${importedProjectName}/`;
    const viewUrl = `/u/${projectUser}/${importedProjectName}#console`;
    const url = `/u/${ownerUsername}/${projectName}/dependencies/changeImportFork?importedProjectOwnerUsername=${projectUser}&importedProjectName=${importedProjectName}`;
    const options = [
        ({ onSelect }) =>
          <option
            key={depName}
            onClick={onSelect}
            value={depName}
          >
            {depName}
          </option>
        ].concat(
        projects.map(fork => {
          return ({ onSelect }) =>
            <option
              key={fork}
              onClick={onSelect}
              value={fork}
            >
              {fork}
            </option>
        })
    );

    return (
        <ProjectCell>
          <Form
            action={url}
            csrfToken={csrfToken}
            method="POST"
          >
            <MinimalSelect
                name="newDependencyProjectId"
                noToggleBorder={true}
                defaultValue={depName}
                shouldSumbitOnSelect={true}
            >
                {options}
            </MinimalSelect>
          </Form>
          {!isArchived &&
              <EyeButton target="_blank" href={viewUrl}>
                  <EyeIcon height={18} width={18} />
              </EyeButton>}
        </ProjectCell>
    );
  }

  renderLocation = (row) => {
    return this.centerContent(row.value);
  }

  sortProjects = (a, b) => {
    const A = `${a.ownerUsername}${a.projectName}`.toLowerCase();
    const B = `${b.ownerUsername}${b.projectName}`.toLowerCase();
    if (A > B) {
        return 1;
    }
    return -1;
  }

  renderRelease = (row) => {
    const {
      ownerUsername,
      projectName,
      csrfToken,
    } = this.props;
    const {
        availableReleases,
    } = row.value;
    const projectUser = row.value.ownerUsername;
    const importedProjectName = row.value.projectName;
    const depName = `${projectUser}/${importedProjectName}`;
    const actionUrl = `/u/${ownerUsername}/${projectName}/dependencies/selectRelease`;
    let defaultValue = "Latest";

    const options = [
      ({ onSelect }) =>
        <option
          key="latest"
          onClick={onSelect}
          value=""
        >
          Latest
        </option>
    ].concat(
    availableReleases.map(({
          releaseId,
          runNumber,
          createdAt,
          runHeading,
          isSelected,
      }) => {
        if (isSelected) {
          defaultValue = `#${runNumber} ${runHeading} ${createdAt}`;
        }

        return (
          ({ onSelect }) =>
            <option
              key={releaseId}
              onClick={onSelect}
              value={releaseId}
            >
              {`#${runNumber} ${runHeading} ${createdAt}`}
            </option>
        );
      }));

    return (
        <ReleaseForm
            action={actionUrl}
            method="POST"
            csrfToken={csrfToken}
        >
        <input type="hidden" name="dependencyName" value={depName} />
        <MinimalSelect
            labelFormatter={value => {
              const foundOption = availableReleases.find(r => r.releaseId === value);
              if (foundOption) {
                return `#${foundOption.runNumber} ${foundOption.runHeading} ${foundOption.createdAt}`;
              }
              return value || "Latest";
            }}
            name="importedRelease"
            shouldSumbitOnSelect={true}
            noToggleBorder={true}
            defaultValue={defaultValue}
        >
          {options}
        </MinimalSelect>
      </ReleaseForm>
    );
  }

  centerContent(content) {
    return (
        <Centerer>
            <span>
                {content}
            </span>
        </Centerer>
    );
  }

  renderImports = (row) => {
    const {
        isArchived,
        filesAvailable,
        packageAvailable,
        variablesAvailable,
        isActive,
    } = row.value;

    if (isArchived) {
        return this.centerContent(<div>Archived</div>);
    } else {
        const imports = [];

        if (variablesAvailable) {
            imports.push(<div key="envvars">Environment variables</div>);
        }

        if (filesAvailable) {
            imports.push(<div key="files">Files</div>);
        }

        if (packageAvailable) {
            imports.push(<div key="codepkgs">Code Package</div>);
        }

        if (!isActive){
            imports.push(
              <div
                key="notauth"
                className="unauthorized-imports"
              >
                Unauthorized or project has no exports
              </div>
            );
        }

        return this.centerContent(imports);
    }
  }

  handleRemove = (depName, depId) => {
    return () => {
      const {
        csrfToken,
        ownerUsername,
        projectName,
      } = this.props;

      removeProjectDependency(
        ownerUsername,
        projectName,
        csrfToken,
        depName,
        depId
      )
      .then(() => {
        const pathWHash = `/u/${ownerUsername}/${projectName}/browse#otherprojects`;
        const loc = window.location;
        if (`${loc.pathname}${loc.hash}` === pathWHash) {
          loc.reload();
        } else {
          loc.href = pathWHash;
        }
      })
      .catch(error => console.error(error));
    };
  }

  renderRemove = (row) => {
    const projectUser = row.value.ownerUsername;
    const importedProjectName = row.value.projectName;
    const depName = `${projectUser}/${importedProjectName}`;

    return (
        <Remove
            onClick={this.handleRemove(depName, row.value.id)}
        >
            <XButton
                type="submit"
                title="Remove dependency"
            />
        </Remove>
    );
  }

  formatRows() {
    const {
      importedProjects,
    } = this.props;

    return importedProjects.map(({
        id,
        projects,
        ownerUsername,
        projectName,
        isActive,
        mountPath,
        isArchived,
        filesAvailable,
        packageAvailable,
        variablesAvailable,
        availableReleases,
      }) => {

      return {
        project: {
          ownerUsername,
          projectName,
          projects,
          isArchived,
        },
        location: mountPath,
        release: {
          ownerUsername,
          projectName,
          availableReleases,
        },
        imports: {
          isArchived,
          filesAvailable,
          packageAvailable,
          variablesAvailable,
          isActive,
        },
        remove: {
          ownerUsername,
          projectName,
          id,
        },
      };
    });
  }

  getHeaders() {
    const {
      runTaggingEnabled,
      userIsAllowedToChangeProjectSettings,
    } = this.props;

    const headers = [{
      Header: "Project",
      accessor: "project",
      Cell: this.renderProjectDropdown,
      sortMethod: this.sortProjects,
      width: 250,
    }, {
      Header: "Location",
      accessor: "location",
      Cell: this.renderLocation,
    }];

    if (runTaggingEnabled) {
      headers.push({
        Header: "Release",
        accessor: "release",
        Cell: this.renderRelease,
        width: 210,
      });
    }

    headers.push({
      Header: "Imports",
      accessor: "imports",
      Cell: this.renderImports,
    });

    if (userIsAllowedToChangeProjectSettings) {
      headers.push({
        Header: "Remove",
        accessor: "remove",
        Cell: this.renderRemove,
        width: 75,
      });
    }

    return headers;
  }

  render() {
    const {
      importedProjects,
    } = this.props;
    return (
      <Table
        rowDetails={importedProjects}
        defaultPageSize={this.props.importedProjects.length}
        showPagination={false}
        minRows={0}
        rows={this.formatRows()}
        headers={this.getHeaders()}
      />
    );
  }
}

OtherProjectsTable.propTypes = {
  ownerUsername: string.isRequired,
  csrfToken: string.isRequired,
  userIsAllowedToChangeProjectSettings: bool.isRequired,
  runTaggingEnabled: bool.isRequired,
  projectName: string.isRequired,
  importedProjects: arrayOf(
    shape({
      id: oneOfType([number, string]),
      projects: arrayOf(string),
      availableReleases: arrayOf(
        shape({
          releaseId: string,
          runNumber: number,
          runHeading: string,
          createdAt: string,
          isSelected: bool,
        }),
      ),
      isReleaseOptionSelected: bool,
      variablesAvailable: bool,
      ownerUsername: string,
      projectName: string,
      isActive: bool,
      mountPath: string,
      isArchived: bool,
      filesAvailable: bool,
      packageAvailable: bool,
    })
  )
};

export default OtherProjectsTable;
