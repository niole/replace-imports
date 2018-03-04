import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilesBrowserTable from '../src/components/redux/filesbrowsetable/WithProvider';

const stories = storiesOf('FilesBrowserTable', module);

const props = {
  projectSize: "320.M",
  commitsNonEmpty: true,
  breadCrumbs: [
    {
      label: 'a',
      url: 'a',
    },
    {
      label: 'b',
    },
  ],
  csrfToken: 'c^s(r*f&t!o@k%e-n',
  thisCommitId: 'def',
  headCommitId: 'def',
  headers: [
    {
      Header: '',
      accessor: 'checkbox',
      width: 25,
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Size',
      accessor: 'size',
      minWidth: 75,
    },
    {
      Header: 'Modified',
      accessor: 'modified',
      width: 150,
    },
    {
      Header: '',
      accessor: 'details',
      width: 75,
    },
  ],
  rows: [
    {
      checkbox: {
        dataPath: 'domino/dir/file',
        dataUrl: 'urltodata',
        isDir: false,
      },
      name: {
        sortableName: 'dominostats.json',
        isDir: false,
        label: 'dominostats.json',
        fileName: 'dominostats.json',
        url: 'urlforfilename',
        helpUrl: '',
      },
      size: {
        label: '6kb',
        inBytes: 6000,
      },
      modified: {
        label: '1/2/34',
        time: 123,
      },
      details: {
        isDir: false,
        isFileLaunchableAsNotebook: true,
        isFileRunnableFromView: true,
        filePath: 'domino/dir/file',
        filePathName: 'sdfkj',
        quotedFilePath: "'domino/dir/file'",
        launchNotebook: {
          label: 'Launch Notebook',
          url: 'launchnotebookurl',
          stringifiedGitId: 'abc',
        },
        run: {
          label: 'Run',
        },
        edit: {
          label: 'Edit',
          url: 'edit/url',
        },
        download: {
          label: 'Download',
          url: 'download/url',
        },
        share: {
          label: 'Share',
          url: 'share/url',
        },
        delte: {
          label: 'Delete',
        },
      },
    },
    {
      checkbox: {
        dataPath: 'comino/dir/file',
        dataUrl: 'urltodata',
        isDir: false,
      },
      name: {
        isDir: false,
        sortableName: 'file',
        label: '/notmodified/dir/file',
        fileName: '/notmodified/dir/file',
        url: 'urlforfilename',
        helpUrl: '',
      },
      size: {
        label: '7kb',
        inBytes: 7000,
      },
      modified: {
        label: '',
        time: 0,
      },
      details: {
        isDir: false,
        isFileLaunchableAsNotebook: true,
        isFileRunnableFromView: true,
        filePath: 'domino/dir/file',
        filePathName: 'sdfkj',
        quotedFilePath: "'domino/dir/file'",
        launchNotebook: {
          label: 'Launch Notebook',
          url: 'launchnotebookurl',
          stringifiedGitId: 'abc',
        },
        run: {
          label: 'Run',
        },
        edit: {
          label: 'Edit',
          url: 'edit/url',
        },
        download: {
          label: 'Download',
          url: 'download/url',
        },
        share: {
          label: 'Share',
          url: 'share/url',
        },
        delte: {
          label: 'Delete',
        },
      },
    },
    {
      checkbox: {
        dataPath: 'vomino/dir/file',
        dataUrl: 'urltodata',
        isDir: true,
      },
      name: {
        sortableName: 'dir',
        isDir: true,
        label: 'dir',
        fileName: 'dir',
        url: 'urlforfilename',
        helpUrl: '',
      },
      size: {
        label: '1kb',
        inBytes: 1000,
      },
      modified: {
        label: '1/2/34',
        time: 1234,
      },
      details: {
        isDir: true,
        dirPath: 'domino/dir/',
        download: {
          label: 'Dowload',
          url: 'download/url',
        },
        delte: {
          label: 'Delete',
        },
      },
    },
    {
      checkbox: {
        dataPath: 'zomino/dir/file',
        dataUrl: 'urltodata',
        isDir: true,
      },
      name: {
        sortableName: 'dir',
        isDir: true,
        label: 'dir',
        fileName: 'dir',
        url: 'urlforfilename',
        helpUrl: '',
      },
      size: {
        label: '0kb',
        inBytes: 0,
      },
      modified: {
        label: '',
        time: 0,
      },
      details: {
        isDir: true,
        dirPath: 'domino/dir/',
        download: {
          label: 'Dowload',
          url: 'download/url',
        },
        delte: {
          label: 'Delete',
        },
      },
    },
  ],
  ownerUsername: 'me',
  projectName: 'myProject',
  relativePath: '/',
  initiallyAvailableDirectories: ['vomino/dir/file', 'zomino/dir/file'],
};

function getEditableProps(props) {
  return Object.assign({}, props, { canEdit: true });
}

function getAllowFolderDownloadsProps(props) {
  return Object.assign({}, props, { allowFolderDownloads: true });
}

function nonEmptyCommitProps(props) {
  return Object.assign({}, props, { commitsNonEmpty: false });
}

stories.add('basic', () =>
  <FilesBrowserTable
    {...nonEmptyCommitProps(
      getAllowFolderDownloadsProps(getEditableProps(props)),
    )}
  />,
);

stories.add("cant edit, can't download dirs", () =>
  <FilesBrowserTable {...nonEmptyCommitProps(props)} />,
);

stories.add('empty comits', () =>
  <FilesBrowserTable
    {...getAllowFolderDownloadsProps(getEditableProps(props))}
  />,
);
