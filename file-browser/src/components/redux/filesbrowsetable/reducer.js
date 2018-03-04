import {
  UNSELECT_ALL_BULK_ENTITIES,
  SELECT_BULK_ENTITY,
  UNSELECT_BULK_ENTITY,
  SET_ALL_BULK_ENTITIES,
  HIDE_FILE_RENAME_MODAL,
  UPDATE_RENAME_ENTITY_TYPE,
  UPDATE_RENAME_ENTITY_PATH,
  SHOW_FILE_RENAME_MODAL,
  SHOW_BULK_MOVE_MODAL,
  HIDE_BULK_MOVE_MODAL,
  SELECT_ALL_BULK_ENTITIES,
} from './actions';

const initialState = {
  bulkSelectedEntities: { header: false },
  filePath: '',
  showFileRenameModal: false,
  showBulkMoveModal: false,
  entityType: 'file',
};

/**
 * contains all information for toggling groups of drop downs
 * only one dropdown can be open per group specified in state
 */
export default function filesBrowserReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_BULK_ENTITY:
      return {
        ...state,
        bulkSelectedEntities: {
          ...state.bulkSelectedEntities,
          [action.data]: true,
        },
      };

    case UNSELECT_BULK_ENTITY:
      return {
        ...state,
        bulkSelectedEntities: {
          ...state.bulkSelectedEntities,
          [action.data]: false,
        },
      };

    case UNSELECT_ALL_BULK_ENTITIES:
      return {
        ...state,
        bulkSelectedEntities: Object.keys(state.bulkSelectedEntities).reduce((es, next) => {
          es[next] = false;
          return es;
        }, { header: false }),
      };

    case SELECT_ALL_BULK_ENTITIES:
      return {
        ...state,
        bulkSelectedEntities: Object.keys(state.bulkSelectedEntities).reduce((es, next) => {
          es[next] = true;
          return es;
        }, { header: true }),
      };

    case SET_ALL_BULK_ENTITIES:
      return { ...state, bulkSelectedEntities: action.data };

    case UPDATE_RENAME_ENTITY_TYPE:
      return { ...state, entityType: action.data };

    case UPDATE_RENAME_ENTITY_PATH:
      return { ...state, filePath: action.data };

    case SHOW_FILE_RENAME_MODAL:
      return { ...state, showFileRenameModal: true };

    case HIDE_FILE_RENAME_MODAL:
      return { ...state, showFileRenameModal: false };

    case SHOW_BULK_MOVE_MODAL:
      return { ...state, showBulkMoveModal: true };

    case HIDE_BULK_MOVE_MODAL:
      return { ...state, showBulkMoveModal: false };

    default:
      return state;
  }
}
