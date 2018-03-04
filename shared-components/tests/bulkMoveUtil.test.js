import {
  formatInitialDataAsFileTree,
  cleanPath,
  filterChildDirectories,
} from '../src/components/util/bulkMoveUtil';

it('should remove slashes on start and finish of path, no slashes', () => {
  const path = 'a';
  const output = cleanPath(path);
  expect(output).toEqual(path);
});

it('should remove slashes on start and finish of path, starting slash, single depth', () => {
  const path = '/a';
  const expected = 'a';
  const output = cleanPath(path);
  expect(output).toEqual(expected);
});

it('should remove slashes on start and finish of path, trailing slash, single depth', () => {
  const path = 'a/';
  const expected = 'a';
  const output = cleanPath(path);
  expect(output).toEqual(expected);
});

it('should remove slashes on start and finish of path, trailing  and starting slash, single depth', () => {
  const path = '/a/';
  const expected = 'a';
  const output = cleanPath(path);
  expect(output).toEqual(expected);
});

it('should filter out selected multilevel entities', () => {
  const directories = ["results/results", "results/templates"];
  const selectedEntities = [
    { isDir: false, path: "results/results" },
  ];

  const result = filterChildDirectories(directories, selectedEntities);
  const expected = ["results/templates"];

  expect(result).toEqual(expected);
});

it('should filter out selected single level entities', () => {
  const directories = ["results", "templates"];
  const selectedEntities = [
    { isDir: false, path: "results" },
  ];

  const result = filterChildDirectories(directories, selectedEntities);
  const expected = ["templates"];

  expect(result).toEqual(expected);
});

it('should format data correctly for tree, many siblings', () => {
  const cWD = "A";
  const toFormat = [
    "/",
    [
      ["A", [
        ["A/C", []],
        ["E/F", []],
      ]], [
      "B", [
        ["B/D", []],
      ]]
    ]
  ];

  const formatted = formatInitialDataAsFileTree(toFormat, cWD);
  const expected = [{
    dirName: "",
    isOpen: true,
    childDirs: [{
      dirName: "A",
      isOpen: false,
      childDirs: [{
        dirName: "A/C",
        isOpen: false,
        childDirs: [],
      }, {
        dirName: "E/F",
        isOpen: false,
        childDirs: [],
      }]
    }, {
      dirName: "B",
      isOpen: false,
      childDirs: [{
        dirName: "B/D",
        isOpen: false,
        childDirs: [],
      }],
    }]
  }];

  expect(formatted).toEqual(expected);
});
