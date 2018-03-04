import {
  getFileDirName,
  getNewFilePath,
  validateFileDirName,
  getEntityNameErrorMessage,
  getNameMatchWarning,
} from '../src/components/util/validateFileNameFormUtil';


it('should get new file path for single level paths', () => {
  const oldFile = "a";
  const newFile = "r";
  const output = getNewFilePath(newFile, oldFile);

  expect(output).toEqual(newFile);
});

it('should get new file path for multi level paths', () => {
  const oldFile = "a/b/c";
  const newFile = "r";
  const shouldEqual = "a/b/r";
  const output = getNewFilePath(newFile, oldFile);

  expect(output).toEqual(shouldEqual);
});

it('should get new dir path for multi level paths', () => {
  const oldFile = "a/b/c/";
  const newFile = "r";
  const shouldEqual = "a/b/r/";
  const output = getNewFilePath(newFile, oldFile);

  expect(output).toEqual(shouldEqual);
});

it('should get new dir path for single level paths', () => {
  const oldFile = "c/";
  const newFile = "r";
  const shouldEqual = "r/";
  const output = getNewFilePath(newFile, oldFile);

  expect(output).toEqual(shouldEqual);
});

it('should get name of dir in path, single depth', () => {
  const dir = "a/";
  const shouldEqual = "a";
  const output = getFileDirName(dir);

  expect(output).toEqual(shouldEqual);
});

it('should get name of dir in path, multi depth', () => {
  const dir = "a/b/";
  const shouldEqual = "b";
  const output = getFileDirName(dir);

  expect(output).toEqual(shouldEqual);
});

it('should get name of file in path, single depth', () => {
  const file = "a";
  const shouldEqual = "a";
  const output = getFileDirName(file);

  expect(output).toEqual(shouldEqual);
});

it('should get name of file in path, single depth', () => {
  const file = "a/b";
  const shouldEqual = "b";
  const output = getFileDirName(file);

  expect(output).toEqual(shouldEqual);
});

it('should return missing name message when no name, file', () => {
  const newName = "";
  const oldName = "a";
  const error = validateFileDirName(newName, oldName, "file");
  const o = getEntityNameErrorMessage("file")

  expect(error).toEqual(o);
});

it('should return missing name message when no name, directory', () => {
  const newName = "";
  const oldName = "a";
  const error = validateFileDirName(newName, oldName, "directory");
  const o = getEntityNameErrorMessage("directory")
  expect(error).toEqual(o);
});

it('should return name matching message when same name, directory', () => {
  const newName = "a";
  const oldName = "a";
  const error = validateFileDirName(newName, oldName, "directory");
  const o = getNameMatchWarning("directory")

  expect(error).toEqual(o);
});

it('should return name matching message when same name, file', () => {
  const newName = "a";
  const oldName = "a";
  const error = validateFileDirName(newName, oldName, "file");
  const o = getNameMatchWarning("file")

  expect(error).toEqual(o);
});
