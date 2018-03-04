import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import FilesBrowserTable from '../src/components/FilesBrowserTable';
import testStore from './testStore';

const runnableAsNBPattern = /\.ipynb$/;

function isRunnableAsNotebook(name) {
    return runnableAsNBPattern.test(name);
}

function getProps(fileNames, dirNames, extraProps = {}) {
    const fileRows = fileNames.map(name => {
        return {
            checkbox: {
                dataPath: name,
                dataUrl: name,
            },
            name: {
                label: name,
                fileName: name,
                url: name,
                helpUrl: name,
            },
            size: {
                label: "10 K",
                inBytes: 10,
            },
            modified: {
                label: new Date().toString(),
                time: Date.now(),
            },
            details: {
                isDir: false,
                isFileLaunchableAsNotebook: isRunnableAsNotebook(name),
                isFileRunnableFromView: isRunnableAsNotebook(name),
                filePath: name,
                filePathName: name,
                quotedFilePath: `"${name}"`,
                launchNotebook: {
                    label: "Launch Notebook",
                    url: "launch_nb_url",
                    stringifiedGitId: "abcdef123456",
                },
                run: {
                    label: "Run",
                },
                edit: {
                    label: "Edit",
                    url: "edit_url",
                },
                compareRevisions: {
                    label: "Compare Revisions",
                    url: "compare_rev_url",
                },
                download: {
                    label: "Download",
                    url: "download_url",
                },
                viewLatestFiles: {
                    label: "View Latest",
                    url: "view_latest_url",
                },
                share: {
                    label: "Share",
                    url: "share_url",
                },
                delte: {
                    label: "Delete",
                }
            }
        };
    });

    const dirRows = dirNames.map(name => {
        return {
            checkbox: {
                dataPath: name,
                dataUrl: name,
            },
            name: {
                label: name,
                fileName: name,
                url: name,
                helpUrl: name,
            },
            size: {
                label: "10 K",
                inBytes: 10,
            },
            modified: {
                label: new Date().toString(),
                time: Date.now(),
            },
            details: {
                isDir: true,
                dirPath: name,
                download: {
                    label: "Download",
                    url: "download_url",
                },
                delte: {
                    label: "Delete",
                },
            },
        };
    });

    return {
        relativePath: "",
        ownerUsername: "username",
        projectName: "ThisIsAProjectName",
        breadCrumbs: [{
            label: "ThisIsAProjectName",
            url: "ThisIsAProjectName_url",
        }],
        csrfToken: "abcdef123456",
        commitsNonEmpty: true,
        thisCommitId: "a",
        headCommitId: "a",
        rows: dirRows.concat(fileRows),
        headers: [{
            Header: "",
            accessor: "checkbox",
            width: 25,
          }, {
            Header: "Name",
            accessor: "name",
          }, {
            Header: "Size",
            accessor: "size",
            width: 60,
          }, {
            Header: "Modified",
            accessor: "modified",
            width: 180,
          }, {
            Header: "",
            accessor: "details",
            width: 25,
          },
        ],
        allowFolderDownloads: true,
        canEdit: true,
        ...extraProps
    };
}

function mountTable(props = {}) {
    return mount(
        <Provider store={testStore()}>
          <FilesBrowserTable {...props} />
        </Provider>
    );
}

describe('<FilesBrowserTable />', () => {
  const files = ['file1', 'file2', 'file3'];
  const dirs = ['dir1', 'dir2', 'dir3'];

  it('should contain correct number and types of checkboxes in rows', () => {
    const props = getProps(files, dirs);
    const wrapper = mountTable(props);
    const toggleAllCheckbox = wrapper.find('input[type="checkbox"]#toggle-all-checkboxes');
    const rowCheckboxes = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    expect(toggleAllCheckbox).toHaveLength(1);
    expect(rowCheckboxes).toHaveLength(files.length + dirs.length)
  });

  it('should check all boxes in table when check all checkbox clicked', () => {
    const props = getProps(files, dirs);
    const wrapper = mountTable(props);
    const toggleAllCheckbox = wrapper.find('input[type="checkbox"]#toggle-all-checkboxes');

    expect(toggleAllCheckbox.props().checked).toBeFalsy();

    toggleAllCheckbox.props().onChange({ target: { checked: true } });

    const checkedToggleAllCheckbox = wrapper.find('input[type="checkbox"]#toggle-all-checkboxes');
    const checkedRowCheckboxes = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    const foundUnchecked = checkedRowCheckboxes.filter(node => !node.props().checked).nodes;

    expect(foundUnchecked).toEqual([]);
    expect(checkedToggleAllCheckbox.props().checked).toBeTruthy();
  });

  it('should uncheck all boxes in table when check all checkbox clicked when in checked state', () => {
    const props = getProps(files, dirs);
    const wrapper = mountTable(props);
    const toggleAllCheckbox = wrapper.find('input[type="checkbox"]#toggle-all-checkboxes');

    expect(toggleAllCheckbox.props().checked).toBeFalsy();

    toggleAllCheckbox.props().onChange({ target: { checked: true } });

    toggleAllCheckbox.props().onChange({ target: { checked: false } });

    const checkedToggleAllCheckbox = wrapper.find('input[type="checkbox"]#toggle-all-checkboxes');
    const checkedRowCheckboxes = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    const foundChecked = checkedRowCheckboxes.filter(node => node.props().checked).nodes;

    expect(foundChecked).toEqual([]);
    expect(checkedToggleAllCheckbox.props().checked).toBeFalsy();
  });

  it('should show all checkboxes as unchecked by default', () => {
    const props = getProps(files, dirs);
    const wrapper = mountTable(props);

    const checkedToggleAllCheckbox = wrapper.find('input[type="checkbox"]#toggle-all-checkboxes');
    const checkedRowCheckboxes = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    const foundChecked = checkedRowCheckboxes.filter(node => node.props().checked).nodes;

    expect(foundChecked).toEqual([]);
    expect(checkedToggleAllCheckbox.props().checked).toBeFalsy();
  });

  it('should be able to check single checkbox', () => {
    const props = getProps(files, dirs);
    const wrapper = mountTable(props);

    const rowCheckboxes = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    rowCheckboxes.first().props().onChange();

    const withSingleChecked = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    const singleChecked = withSingleChecked.first();

    expect(singleChecked.props().checked).toBeTruthy();
  });

  it('should be able to uncheck single checkbox', () => {
    const props = getProps(files, dirs);
    const wrapper = mountTable(props);

    const rowCheckboxes = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    rowCheckboxes.first().props().onChange();

    rowCheckboxes.first().props().onChange();

    const withSingleUnchecked = wrapper.find('input[type="checkbox"].selected-file-checkbox');

    const singleChecked = withSingleUnchecked.first();

    expect(singleChecked.props().checked).toBeFalsy();
  });

});
