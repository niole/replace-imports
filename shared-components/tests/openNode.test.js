import {
  formatDirectories,
  openNode,
} from '../src/components/util/bulkMoveUtil';
import {
  createBulkNode,
} from './testUtil';

it('should open closed nodes, root', () => {
  const tree = [
    createBulkNode("", false, [
      createBulkNode("a", false, [
        createBulkNode("a/b", false, []),
        createBulkNode("a/c", false, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];

  const e = [
    createBulkNode("", true, [
      createBulkNode("a", false, [
        createBulkNode("a/b", false, []),
        createBulkNode("a/c", false, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];
  const newPath = [""];
  const output = openNode(newPath, tree);

  expect(output).toEqual(e);
});

it('should open closed nodes, mid tree with children', () => {
  const tree = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", false, []),
        createBulkNode("a/c", false, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];

  const e = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", false, []),
        createBulkNode("a/c", true, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];
  const newPath = ["", "a", "c"];
  const output = openNode(newPath, tree);

  expect(output).toEqual(e);
});

it('should open closed nodes, mid tree without children', () => {
  const tree = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", false, []),
        createBulkNode("a/c", false, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];

  const e = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", true, []),
        createBulkNode("a/c", false, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];
  const newPath = ["", "a", "b"];
  const output = openNode(newPath, tree);

  expect(output).toEqual(e);
});
