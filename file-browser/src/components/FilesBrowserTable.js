/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import moment from 'moment';
import styled from 'styled-components';
import { number, oneOfType, bool, shape, arrayOf, string } from 'prop-types';
import {
    OverlayTrigger,
    Tooltip,
    Glyphicon,
    MenuItem,
} from 'react-bootstrap';
import {
  ActionsDropdownButton,
  OldRevisionInteractiveMessage,
  BulkMoveButton,
  File,
  Directory,
  Form,
  RenameFileDirModal,
  MinimalSortableFilterableTable,
} from '@domino/shared-components';
import {
  selectBulkEntity,
  unselectBulkEntity,
  selectAllBulkEntities,
  unselectAllBulkEntities,
  setBulkEntities,
  openBulkMoveModal,
  hideBulkMoveModal,
  updateRenameEntityType,
  updateRenameEntityPath,
  openFileRenameModal,
  hideFileRenameModal,
} from './redux/filesbrowsetable/actions'


const ELIPSES = "...";
const BOTTOM_UP_DIR = "bottomGoUpDir";
const TOP_UP_DIR = "topGoUpDir";
const searchBoxColor = '#CCCCCC';
const baseClickableColor = '#4c89d6';
const fontSize = '13px';
const warningRed = '#ae0000';

const WarningContainer = styled.div`
    width: calc(100% - 300px);
    position: relative;
    display: inline-block;
    left: 300px;
    top: 40px;

    > span {
        margin: 0px;
    }
`;

const Table = styled(MinimalSortableFilterableTable)`
    .rt-td:last-of-type {
        padding: 0px;
    }

    .rt-tr:hover {
        .rt-td:last-of-type {
            .dropdown-toggle {
                background: rgba(0,0,0,.01) !important;
                transition-duration: 0s;
            }
        }
    }
`;

const FileSummary = styled.div`
  padding: 5px 0px;
`;

const StyledFilterIcon = styled(Glyphicon)`
  color: ${searchBoxColor};
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 8px;
`;

const entityIconStyle = `
    position: relative;
    top: 2px;
    margin-right: 5px;
`;

const ClickableCheckbox = styled.input`
    cursor: pointer;
`;

const StyledDirectoryIcon = styled(Directory)`
    ${entityIconStyle};
`;

const StyledFileIcon = styled(File)`
    ${entityIconStyle};
`;

const QuestionLink = styled.a`
  font-size: 10px;
  margin: 3px;
`;

// These styles are needed because React Table does not play nicely with the
// Dropdown from React Bootstrap
const StyledDropdownButton = styled.div`
  button {
    border: none;
    background: transparent !important;
    padding: 0px !important;
    color: ${baseClickableColor};
    position: relative;
    left: 50%;

    &.dropdown-toggle {
      color: ${baseClickableColor} !important;
      box-shadow: none;
      top: 3px;
    }

    &:active,
    &:hover,
    &:focus {
      background: white !important;
      color: ${baseClickableColor};
      box-shadow: none !important;
    }
  }

  .icon-gear {
    font-size: inherit;
  }

  .dropdown-menu {
    left: auto;
    right: 0px;
    top: 15px;
  }

  .dropdown {
    position: absolute;

    li {
      &.delete-link {
        a {
          color: ${warningRed};
        }
      }

      a,
      button {
        font-size: ${fontSize};
      }

      &:hover {
        a {
          color: white;
        }
      }
    }
  }
`;

const DETAILS_COLUMN = 'details';

class FilesBrowserTable extends PureComponent {
  constructor() {
      super();
      this.checkAllBoxes = this.checkAllBoxes.bind(this);
      this.renderFileName = this.renderFileName.bind(this);
      this.hideBulkMoveModal = this.hideBulkMoveModal.bind(this);
      this.uncheckCheckboxes = this.uncheckCheckboxes.bind(this);
      this.handleFileRenameCancel = this.handleFileRenameCancel.bind(this);
      this.detailsHeaderCellCreator = this.detailsHeaderCellCreator.bind(this);
      this.handleRemoveSelectedFile = this.handleRemoveSelectedFile.bind(this);
      this.renderRowCheckbox = this.renderRowCheckbox.bind(this);
      this.showFileRenameModal = this.showFileRenameModal.bind(this);
      this.hideFileRenameModal = this.hideFileRenameModal.bind(this);
      this.fileRenameModal = null;
  }

  componentDidMount() {
    const {
        rows,
        setBulkEntities,
    } = this.props;

    const entities = rows.reduce((es, row) => {
        es[row.checkbox.dataPath] = false;
        return es;
    }, {});

    setBulkEntities(entities);
  }

  showFileRenameModal(filePath, entityType) {
    const {
      getBatchedAction,
    } = this.props;

    getBatchedAction([
      updateRenameEntityType(entityType),
      updateRenameEntityPath(filePath),
      openFileRenameModal(),
    ]);
  }

  hideFileRenameModal() {
    const {
      getBatchedAction,
    } = this.props;

    getBatchedAction([
      updateRenameEntityPath(''),
      hideFileRenameModal(),
    ]);
  }

  uncheckCheckboxes() {
    this.props.unselectAllBulkEntities();
  }

  hideBulkMoveModal() {
    this.props.hideBulkMoveModal();
  }

  createHiddenInput(name, value, otherProps = {}) {
    return <input type="hidden" name={name} value={value} {...otherProps} />;
  }

  createForm(action, otherProps, children) {
    const { csrfToken } = this.props;

    return (
      <Form csrfToken={csrfToken} action={action} method="POST" {...otherProps}>
        {children}
      </Form>
    );
  }

  submitClosestForm(event) {
    $(event.target).closest('form').submit();
  }

  renderBulkMoveButton(isDir, path) {
    const {
      ownerUsername,
      projectName,
      relativePath,
    } = this.props;

    return (
      <BulkMoveButton
        key="bulkmovebutton"
        ownerUsername={ownerUsername}
        projectName={projectName}
        handleClose={this.hideBulkMoveModal}
        relativePath={relativePath}
        selectedEntities={[{isDir, path}]}
        onOpen={this.uncheckCheckboxes}
      />
    );
  }

  showRunFileModal(commandToRunString) {
    document.getElementById("commandToRunModalTitle").innerText = ` Run ${commandToRunString}`;
    document.getElementById("commandToRunModal").value = commandToRunString;
    document.getElementById("trigger-run-modal-from-react").click();
  }

  renderFileDetailsDropdown(data, menuItemWrapper, menuWrapper) {
    const {
      canEdit,
      thisCommitId,
      headCommitId,
      commitsNonEmpty,
    } = this.props;
    const {
      isFileLaunchableAsNotebook,
      isFileRunnableFromView,
      launchNotebook,
      run,
      edit,
      download,
      share,
      delte,
      filePath,
      quotedFilePath,
    } = data;
    const commitIsHead = thisCommitId === headCommitId;
    const items = [];

    if (commitsNonEmpty && isFileLaunchableAsNotebook) {
      items.push(
        menuItemWrapper(
          'launchnotebook',
          this.createForm(
            launchNotebook.url,
            { target: '_blank' },
            <span>
              {this.createHiddenInput('filePath', filePath)}
              {this.createHiddenInput('commitId', thisCommitId)}
              <a href="#" onClick={this.submitClosestForm}>
                {launchNotebook.label}
              </a>
            </span>,
          ),
        ),
      );
    }

    if (commitsNonEmpty && isFileRunnableFromView) {
      if (commitIsHead) {
        items.push(
          menuItemWrapper(
            'run',
            this.createForm(
              run.url,
              {},
              <span>
                {this.createHiddenInput('commandToRun', quotedFilePath, { id: 'commandToRun' })}
                {run.label}
              </span>,
            ),
            {
              onClick: this.showRunFileModal.bind(this, quotedFilePath),
              href: '#run-modal',
              'data-toggle': 'modal',
              'data-target': '#run-modal',
              'data-name': quotedFilePath,
            },
          ),
        );
      } else {
        items.push(
          menuItemWrapper('run', run.label, {
            id: 'startThisRunBtn',
            href: '#runConfirmationModal',
            'data-name': quotedFilePath,
          }),
        );
      }
    }

    if (items.length) {
      items.push(this.renderDivider("first"));
    }

    items.push(this.renderBulkMoveButton(false, filePath));

    items.push(
        menuItemWrapper(
            'renamefile',
            "Rename", {
                onClick: this.showFileRenameModal.bind(this, filePath, "file"),
            },
        ),
    );

    if (canEdit) {
      items.push(
        menuItemWrapper('edit', edit.label, {
          href: edit.url,
        }),
      );
    }

    items.push(
      menuItemWrapper('download', download.label, {
        href: download.url,
      }),
    );

    items.push(
      menuItemWrapper('share', share.label, {
        href: share.url,
      }),
    );

    if (canEdit) {
      if (items.length) {
          items.push(this.renderDivider("second"));
      }

      items.push(
        menuItemWrapper('delete', delte.label, {
          className: 'delete-link',
          onClick: () => this.handleRemoveSelectedFile(filePath),
        }),
      );
    }

    return menuWrapper(items);
  }

  renderMenuItem(key, children, otherProps = {}) {
    return (
      <MenuItem key={key} eventKey={key} {...otherProps}>
        {children}
      </MenuItem>
    );
  }

  renderMenu(label, children) {
    return (
      <StyledDropdownButton>
        <ActionsDropdownButton
          pullRight={true}
        >
          {children}
        </ActionsDropdownButton>
      </StyledDropdownButton>
    );
  }

  renderDivider(key = "") {
    return <MenuItem key={`divider${key}`} divider />;
  }

  renderDirDetailsDropdown(data, menuItemWrapper, menuWrapper) {
    const { allowFolderDownloads, canEdit } = this.props;
    const { dirPath, download, delte } = data;

    const items = [];
    if (allowFolderDownloads) {
      items.push(
        menuItemWrapper('download', download.label, {
          href: download.url,
        }),
      );
    }

    if (items.length) {
      items.push(this.renderDivider("first"));
    }

    items.push(this.renderBulkMoveButton(true, dirPath));

    items.push(
        menuItemWrapper(
            'renamefile',
            "Rename", {
                onClick: this.showFileRenameModal.bind(this, dirPath, "directory"),
            },
        ),
    );

    if (canEdit) {
      if (items.length) {
        items.push(this.renderDivider("second"));
      }

      items.push(
        menuItemWrapper('delete', delte.label, {
          className: 'delete-link',
          href: '#',
          onClick: () => this.handleRemoveSelectedFile(dirPath),
        }),
      );
    }

    return menuWrapper(items);
  }

  /**
   * This acts as a bridge between React and the traditional bootstrap API
   * used in Play
   * This triggers a work flow handled by the "removeFilesConfirmationModal" in
   * the filesBrowse view
   */
  handleRemoveSelectedFile(path) {
    document.querySelector(".file-reference-verbiage").innerHTML = path;
    const modal = document.querySelector('#removeFilesConfirmationModal');
    modal.setAttribute('data-details', path);
    window.removeSelectedFiles();
  }

  detailsHeaderCellCreator(row) {
    if (row.value) {
      if (row.value.isDir) {
        return this.renderDirDetailsDropdown(
          row.value,
          this.renderMenuItem,
          this.renderMenu.bind(this, 'Gear'),
        );
      }

      return this.renderFileDetailsDropdown(
        row.value,
        this.renderMenuItem,
        this.renderMenu.bind(this, 'Gear'),
      );
    }
  }

  addHeaderCells() {
    const {
        headers,
        bulkSelectedEntities,
    } = this.props;
    return headers.map(header => {
      if (header.accessor === DETAILS_COLUMN) {
        header.resizable = false;
        header.Cell = this.detailsHeaderCellCreator;
      } else if (header.accessor === 'checkbox') {
        //render checkbox in column
        //update header to contain checkbox

        header.Header = (
            <ClickableCheckbox
                type="checkbox"
                id="toggle-all-checkboxes"
                onChange={this.checkAllBoxes}
                checked={bulkSelectedEntities.header}
            />
        );
        header.resizable = false;
        header.Cell = this.renderRowCheckbox;
      } else if (header.accessor === 'modified') {
        header.Cell = this.renderModifiedRow;
        header.sortMethod = this.sorter(x => x.time);
      } else if (header.accessor === 'name') {
        header.Cell = this.renderFileName;
        header.Filter = this.renderFilterComponent;
        header.filterMethod = this.filterMethod;
        header.sortMethod = this.sorter(x => x.sortableName);
      } else if (header.accessor === 'size') {
        header.Cell = this.renderSize;
        header.sortMethod = this.sorter(x => x.inBytes);
      }
      return header;
    });
  }

  checkAllBoxes(event) {
    const isChecked = event.target.checked;
    const {
        selectAllBulkEntities,
        unselectAllBulkEntities,
    } = this.props;

    if (isChecked) {
        selectAllBulkEntities();
    } else {
        unselectAllBulkEntities();
    }
  }

  sorter(accessor) {
    return (a, b) => {
      const A = accessor(a);
      const B = accessor(b);
      const aIsTop = A === TOP_UP_DIR;
      const aIsBottom = A === BOTTOM_UP_DIR;
      const bIsTop = B === TOP_UP_DIR;
      const bIsBottom = B === BOTTOM_UP_DIR;
      const aIsUpLink = aIsTop || aIsBottom;
      const bIsUpLink = bIsTop || bIsBottom;

      if (!aIsUpLink && !bIsUpLink) {
        return A > B ? 1 : -1;
      }

      if (aIsTop || bIsBottom) {
        return 1;
      }

      if (bIsTop || aIsBottom) {
        return -1;
      }
    };
  }

  renderSize({ value }) {
    return value.label;
  }

  renderQuestionLink(href, tooltipContent) {
    const tooltip = (
        <Tooltip id="tooltip">
            {tooltipContent}
        </Tooltip>
    );

    return (
        <OverlayTrigger placement="top" overlay={tooltip}>
            <QuestionLink target="_blank" href={href}>
                <Glyphicon glyph="question-sign" />
            </QuestionLink>
        </OverlayTrigger>
    );
  }

  filterMethod(filter, row) {
    return row[filter.id].label.indexOf(filter.value || '') > -1;
  }

  renderFileName({ value }) {
    const { helpUrl, url, label, fileName, isDir } = value;

    const iconElement = isDir ? <StyledDirectoryIcon /> : <StyledFileIcon />;

    const fileElement = (
      <a key="fileelt" className="data-filename" href={url}>
        {iconElement}
        {label}
      </a>
    );

    switch (fileName) {
      case 'dominostats.json':
        const statsHelp = "Learn how to enable Run Diagnostic Statistics.";
        return [
          fileElement,
          <span
            key="inline-help"
            className="inline-help"
            aria-label={statsHelp}
          >
            {this.renderQuestionLink(helpUrl, statsHelp)}
          </span>,
        ];
      case '.dominoresults':
        const resultsHelp = "Learn how to control which files are shown in the results dashboard.";
        return [
          fileElement,
          <span
            key="results-helpelt"
            className="inline-help"
            aria-label={resultsHelp}
          >
            {this.renderQuestionLink(helpUrl, resultsHelp)}
          </span>,
        ];
      case '.dominoignore':
        const ignoreHelp = "Learn how to control which files are synced in projects.";
        return [
          fileElement,
          <span
            key="ignore-helpelt"
            className="inline-help"
            aria-label={ignoreHelp}
          >
            {this.renderQuestionLink(helpUrl, ignoreHelp)}
          </span>,
        ];

      default:
        return fileElement;
    }
  }

  renderModifiedRow({ value }) {
    if (!value.label) {
      return '-';
    }
    return moment(value.label).format('MMMM Do YYYY, h:mm:ss a');
  }

  getEntitySelector(dataPath) {
    const {
        bulkSelectedEntities,
        selectBulkEntity,
        unselectBulkEntity,
    } = this.props;

    if (bulkSelectedEntities[dataPath]) {
        return unselectBulkEntity.bind(this, dataPath);
    }
    return selectBulkEntity.bind(this, dataPath);
  }

  renderRowCheckbox(row) {
    const {
      canEdit,
      allowFolderDownloads,
      bulkSelectedEntities,
    } = this.props;
    const {
      isDir,
      dataPath,
      dataUrl,
      ...rest
    } = row.value;

    if (dataPath !== ELIPSES) {
      if (isDir && (allowFolderDownloads || canEdit)) {
        return (
          <ClickableCheckbox
            checked={bulkSelectedEntities[dataPath]}
            onChange={this.getEntitySelector(dataPath)}
            data-type="directory"
            datatype="directory"
            type="checkbox"
            className="selected-file-checkbox"
            data-path={dataPath}
            data-url={dataUrl}
            {...rest}
          />
        );
      } else if (!isDir) {
        return (
          <ClickableCheckbox
            checked={bulkSelectedEntities[dataPath]}
            onChange={this.getEntitySelector(dataPath)}
            data-type="file"
            type="checkbox"
            data-path={dataPath}
            data-url={dataUrl}
            className="selected-file-checkbox"
            {...rest}
          />
        );
      }
    }
  }

  renderFilterComponent({ filter, onChange }) {
    return [
      <StyledFilterIcon key="filter" glyph="filter"/>,
      <input
        key="input"
        type="text"
        value={filter ? filter.value : ''}
        onChange={event => onChange(event.target.value)}
        placeholder="Filter by Filename"
        className="custom-filter-input"
      />,
    ];
  }

  handleFileRenameCancel() {
    this.hideFileRenameModal();
  }

  formatRows() {
    const {
      rows,
      previousDirectoryUrl,
    } = this.props;


    if (previousDirectoryUrl) {
      return [
        {
          checkbox: {
            dataPath: ELIPSES,
            dataUrl: ELIPSES,
          },
          name: {
            isDir: true,
            sortableName: TOP_UP_DIR,
            label: ELIPSES,
            fileName: ELIPSES,
            url: previousDirectoryUrl,
            helpUrl: ELIPSES,
          },
          size: {
            label: "-",
            inBytes: TOP_UP_DIR,
          },
          modified: {
            label: "",
            time: TOP_UP_DIR,
          },
        }
      ].concat(rows,
        [
          {
            checkbox: {
              dataPath: ELIPSES,
              dataUrl: ELIPSES,
            },
            name: {
              isDir: true,
              sortableName: BOTTOM_UP_DIR,
              label: ELIPSES,
              fileName: ELIPSES,
              url: previousDirectoryUrl,
              helpUrl: ELIPSES,
            },
            size: {
              label: "-",
              inBytes: BOTTOM_UP_DIR,
            },
            modified: {
              label: "",
              time: BOTTOM_UP_DIR,
            },
          }
        ]
      );
    }
    return rows;
  }

  getOldRevisionMessage() {
    const {
        headCommitCreatedAt,
        headRevisionDirectoryLink,
    } = this.props;

    return (
        <WarningContainer>
            <OldRevisionInteractiveMessage
                headCommitCreatedAt={headCommitCreatedAt}
                headRevisionDirectoryLink={headRevisionDirectoryLink}
            />
        </WarningContainer>
    );
  }

  render() {
    const {
      projectSize,
      rows,
      ownerUsername,
      projectName,
      filePath,
      showFileRenameModal,
      entityType,
      previousDirectoryUrl,
      thisCommitId,
      headCommitId,
      relativePath,
    } = this.props;

    return (
      <div>
        {showFileRenameModal &&
          <RenameFileDirModal
            locationUrl={`/u/${ownerUsername}/${projectName}/browse/${relativePath}`}
            ownerUsername={ownerUsername}
            projectName={projectName}
            entityType={entityType}
            oldPath={filePath}
            closeHandler={this.handleFileRenameCancel}
          />}
        { thisCommitId !== headCommitId && this.getOldRevisionMessage() }
        <Table
          className="-highlight"
          showPagination={false}
          defaultPageSize={
            previousDirectoryUrl ?
            rows.length + 1 :
            rows.length
          }
          filterable={true}
          minRows={0}
          rows={this.formatRows()}
          headers={this.addHeaderCells()}
        />
        <FileSummary>
            Total size: <strong>{projectSize}</strong>
        </FileSummary>
      </div>
    );
  }
}

const basicDetails = shape({
  label: string,
  url: string,
});

const dirDetails = shape({
  isDir: bool,
  dirPath: string,
  download: basicDetails,
  delte: shape({
    label: string,
  }),
});

const fileDetails = shape({
  isDir: bool,
  isFileLaunchableAsNotebook: bool,
  isFileRunnableFromView: bool,
  filePath: string,
  filePathName: string,
  quotedFilePath: string,
  launchNotebook: shape({
    label: string,
    url: string,
    stringifiedGitId: string,
  }),
  run: shape({
    label: string,
  }),
  edit: basicDetails,
  download: basicDetails,
  share: basicDetails,
  delte: shape({
    label: string,
  }),
});

FilesBrowserTable.propTypes = {
  headRevisionDirectoryLink: string.isRequired,
  headCommitCreatedAt: number.isRequired,
  previousDirectoryUrl: string,
  relativePath: string.isRequired,
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  csrfToken: string.isRequired,
  commitsNonEmpty: bool.isRequired,
  thisCommitId: string.isRequired,
  headCommitId: string.isRequired,
  rows: arrayOf(
    shape({
      checkbox: shape({
        dataPath: string,
        dataUrl: string,
      }),
      name: shape({
        sortableName: string,
        label: string,
        fileName: string,
        url: string,
        helpUrl: string,
      }),
      size: shape({
        label: string,
        inBytes: number,
      }),
      modified: shape({
        label: string,
        time: number,
      }),
      details: oneOfType([dirDetails, fileDetails]),
    }),
  ),
  headers: arrayOf(
    shape({
      Header: string,
      accessor: string,
    }),
  ),
  allowFolderDownloads: bool,
  canEdit: bool,
  projectSize: string.isRequired,
};

FilesBrowserTable.defaultProps = {
  previousDirectoryUrl: "",
  rows: [],
  headers: [],
};

const mapStateToProps = state => {
  const {
    filePath,
    showFileRenameModal,
    entityType,
    bulkSelectedEntities,
  } = state.filesBrowser;

  return {
    bulkSelectedEntities,
    filePath,
    showFileRenameModal,
    entityType,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectBulkEntity,
  unselectBulkEntity,
  unselectAllBulkEntities,
  selectAllBulkEntities,
  setBulkEntities,
  openBulkMoveModal,
  hideBulkMoveModal,
  updateRenameEntityType,
  updateRenameEntityPath,
  openFileRenameModal,
  hideFileRenameModal,
  getBatchedAction: actions => actions,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilesBrowserTable);
