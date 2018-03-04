export const SHOW_BULK_MOVE_MODAL = 'showBulkMoveModal';
export const HIDE_BULK_MOVE_MODAL = 'hideBulkMoveModal';
export const UPDATE_RENAME_ENTITY_TYPE = 'updateRenameEntityType';
export const UPDATE_RENAME_ENTITY_PATH = 'updateRenameEntityPath';
export const SHOW_FILE_RENAME_MODAL = 'showFileRenameModal';
export const HIDE_FILE_RENAME_MODAL = 'hideFileRenameModal';
export const SELECT_BULK_ENTITY = 'selectBulkEntity';
export const UNSELECT_BULK_ENTITY = 'unselectBulkEntity';
export const SELECT_ALL_BULK_ENTITIES = 'selectAllBulkEntities'
export const SET_ALL_BULK_ENTITIES = 'setAllBulkEntities'
export const UNSELECT_ALL_BULK_ENTITIES = 'unselectAllBulkEntities';

export function selectBulkEntity(dataPath) {
  return {
    type: SELECT_BULK_ENTITY,
    data: dataPath,
  };
}

export function unselectBulkEntity(dataPath) {
  return {
    type: UNSELECT_BULK_ENTITY,
    data: dataPath,
  };
}

export function selectAllBulkEntities() {
  return {
    type: SELECT_ALL_BULK_ENTITIES,
  };
}

export function unselectAllBulkEntities() {
  return {
    type: UNSELECT_ALL_BULK_ENTITIES,
  };
}

export function setBulkEntities(allBulkEntities) {
  return {
    type: SET_ALL_BULK_ENTITIES,
    data: allBulkEntities,
  };
}

export function updateRenameEntityType(entityType) {
  return {
    type: UPDATE_RENAME_ENTITY_TYPE,
    data: entityType,
  };
}

export function updateRenameEntityPath(entityPath) {
  return {
    type: UPDATE_RENAME_ENTITY_PATH,
    data: entityPath,
  };
}

export function openFileRenameModal() {
  return {
    type: SHOW_FILE_RENAME_MODAL,
  };
}

export function hideFileRenameModal() {
  return {
    type: HIDE_FILE_RENAME_MODAL,
  };
}

export function openBulkMoveModal() {
  return {
    type: SHOW_BULK_MOVE_MODAL,
  };
}

export function hideBulkMoveModal() {
  return {
    type: HIDE_BULK_MOVE_MODAL,
  };
}
