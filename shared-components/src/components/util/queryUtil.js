import axios from 'axios';
import $ from 'jquery';
import querystring from 'query-string';
import {FILE} from '../RenameFileDirModal';
import {getFileDirName} from './validateFileNameFormUtil';
import {
  filterChildDirectories,
} from './bulkMoveUtil';

function getTargetPath(originPath, targetPath) {
    const entityName = getFileDirName(originPath);

    if (!targetPath) {
        return entityName;
    }

    return `${targetPath}/${entityName}`;
}

export function postMoveEntities(projectName, ownerUsername, toMoveData) {
  const { files, targetPath, directories } = toMoveData;
  let url = `/u/${ownerUsername}/${projectName}/files/moveFilesAndFolders`;
  let data = {};

  if (files.length) {
    data["filesToMove"] = files.map(originPath => {
      return {
        originPath,
        targetPath: getTargetPath(originPath, targetPath),
      };
    });
  }

  if (directories.length) {
    data["foldersToMove"] = directories.map(originPath => ({
      originPath,
      targetPath: getTargetPath(originPath, targetPath),
    }));
  }

  return axios({
    url,
    method: "POST",
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getChildDirectories(ownerUsername, projectName, directoryPath) {
  const url = `/u/${ownerUsername}/${projectName}/files/getDirectories`;
  const data = {
    directoryPath,
  };

  return axios({
    url,
    method: "POST",
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getInitialBulkMoveTreeData(ownerUsername, projectName, selectedEntities, currPath = "/") {
  return getChildDirectories(ownerUsername, projectName, currPath)
      .then(res => {
        if (res) {
            const formattedPaths = res.data.message.map(scalaPath => scalaPath.path.canonicalizedPathString);
            return filterChildDirectories(formattedPaths, selectedEntities);
        }
        return [];
      })
      .then(childDirs => {
        if (childDirs && childDirs.length) {
          // keep going
          return Promise.all(childDirs.map(nextPath =>
            getInitialBulkMoveTreeData(ownerUsername, projectName, selectedEntities, nextPath)))
          .then(subTrees => {
            return [currPath, subTrees];
          });
        }

        return [currPath, []];
      });
}

export function postRenameFileOrDir(ownerUsername, projectName, oldPath, newPath, entityType) {
  const renameEndptType = entityType === FILE ? 'renameFile' : 'renameFolder';
  const url = `/u/${ownerUsername}/${projectName}/files/${renameEndptType}`;
  const data = {
    originPath: oldPath,
    targetPath: newPath,
  };

  return axios({
      url,
      method: "POST",
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}

export function editGitRepo(ownerUsername, projectName, csrfToken, values) {
  const {
    defaultref,
    url,
    repoName,
    refdetails,
  } = values;

  return axios(`/u/${ownerUsername}/${projectName}/repositories/editGitRepositoryRef`, {
    method: "POST",
    data: querystring.stringify({
      'ref-type': defaultref,
      csrfToken,
      ref: refdetails,
      uri: url,
      name: repoName,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export function addGitRepo(ownerUsername, projectName, csrfToken, values) {
  const {
    defaultref,
    url,
    repoName,
    refdetails,
  } = values;

  return axios(`/u/${ownerUsername}/${projectName}/repositories/addGitRepository`, {
    method: "POST",
    data: querystring.stringify({
      'ref-type': defaultref,
      ref: refdetails,
      uri: url,
      name: repoName,
      csrfToken,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export function changeHardwareTier(ownerUsername, projectName, hardwareTierId, success, error) {
  const url = `/u/${ownerUsername}/${projectName}/hardwareTier`;
  const data =  {
    hardwareTierId,
  };

  $.ajax({
      type: "POST",
      url,
      data,
      success,
      error,
  });
}
