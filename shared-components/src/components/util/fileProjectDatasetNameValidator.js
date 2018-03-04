const correctNamespacePattern = /^([a-z]|[A-Z]|[0-9]){1}[\w-]*$/;
const correctFilePattern = /^([.]|[a-z]|[A-Z]|[0-9]|_){1}[\w-.]*$/;

export function fileProjectDatasetNameValidator(newName, entityType) {
  if (entityType === "file") {
    return correctFilePattern.test(newName);
  }
  return correctNamespacePattern.test(newName);
}

export function getInvalidNamespaceMessage(nameSpaceType, name) {
  const entityType = nameSpaceType.toLowerCase();
  if (entityType === "file") {
    if (name) {
      return `${nameSpaceType} name "${name}" is not valid. ${nameSpaceType} names can only use letters, numbers, underscores, periods, and hyphens; and they must start with a letter, number, underscore, or a period.`;
    }

    return `The ${nameSpaceType} name you inputted is not valid. ${nameSpaceType} names can only use letters, numbers, underscores, periods, and hyphens; and they must start with a letter, number, underscore, or a period.`;
  }

  if (name) {
    return `${nameSpaceType} name "${name}" is not valid. ${nameSpaceType} names can only use letters, numbers, underscores, and hyphens; and they must start with a letter or a number.`;
  }

  return `The ${nameSpaceType} name you inputted is not valid. ${nameSpaceType} names can only use letters, numbers, underscores, and hyphens; and they must start with a letter or a number.`;
}
