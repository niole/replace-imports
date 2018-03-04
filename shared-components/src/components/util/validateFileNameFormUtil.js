import {
  fileProjectDatasetNameValidator,
  getInvalidNamespaceMessage,
} from './fileProjectDatasetNameValidator';
import {cleanPath} from './bulkMoveUtil';

export function validateFileDirName(name, oldName, entityType = "file") {
  if (!name) {
    return getEntityNameErrorMessage(entityType);
  }

  if (name === oldName) {
    return getNameMatchWarning(entityType);
  }

  if (!fileProjectDatasetNameValidator(name, entityType)) {
    const formattedEntityType = entityType.split(" ").map(e => capitalize(e)).join(" ");
    return getInvalidNamespaceMessage(formattedEntityType);
  }
}

export function getNameMatchWarning(entityType) {
    return `New ${entityType} name must not match old ${entityType} name`;
}

export function getEntityNameErrorMessage(entityType) {
  return `You must enter a ${entityType} name`;
}

export function getChangeEntityWarning(entityType = "file") {
  const directObject = entityType === "file" ? " its " : " its own and its files' ";
  return `Renaming the ${entityType} will cut ties to ${directObject} version history - the version history is maintained with the old ${entityType} name and you will not be able to compare revisions.`;
}

export function getEntityExistsMessage(entityType = "file") {
  const type = capitalize(entityType);
  return `${type} already exists`;
}

export function getSubmitButtonLabel(entityType) {
  const type = capitalize(entityType);
  return `Rename ${type}`;
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getNewFilePath(newName, oldPath) {
  const isDir = oldPath.endsWith("/");
  if (isDir) {
    oldPath = oldPath.slice(0, oldPath.length - 1)
  }
  const splitPath = oldPath.split("/");
  splitPath.pop();
  splitPath.push(newName)
  let newPath = splitPath.join("/")

  if (isDir) {
    // is a directory
    newPath += "/";
  }

  return newPath;
}

export function getFileDirName(path) {
  const splitPath = cleanPath(path).split("/");
  return splitPath.pop();
}
