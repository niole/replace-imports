export function createBulkNode(dirName, isOpen, children) {
  return {
    dirName,
    isOpen,
    childDirs: children,
  };
}

export function getCanonicalisedPath(name) {
  return {
    path: {
      canonicalizedPathString: name,
    },
  };
}

