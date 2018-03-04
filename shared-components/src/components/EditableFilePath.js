import React from 'react';
import FilePathBreadCrumbs, {BreadCrumbsProp} from './FilePathBreadCrumbs';
import FileNameEditor, {
  FileNameEditorDefaultProps,
  FileNamEditorProps,
} from './FileNameEditor';

function renderFileNameEditor(props) {
  return (
    <FileNameEditor {...props}/>
  );
}

function EditableFilePath(props) {
  return (
    <FilePathBreadCrumbs {...props}>
      {renderFileNameEditor}
    </FilePathBreadCrumbs>
  );
}

EditableFilePath.propTypes = {
  ...BreadCrumbsProp,
  ...FileNamEditorProps
};

EditableFilePath.defaultProps = {
  ...FileNameEditorDefaultProps
};

export default EditableFilePath;
