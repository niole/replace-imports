import {
  closeNode,
} from '../src/components/util/bulkMoveUtil';
import {
  createBulkNode,
} from './testUtil';


it('should close all children of node to close, close node c', () => {
  const depth3Tree = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", true, []),
        createBulkNode("a/c", true, [
          createBulkNode("a/c/d", true, []),
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

  const path = ["", "a", "c"];
  const output = closeNode(path, depth3Tree);

  expect(output).toEqual(e);
})

it('should close all children of node to close, close root', () => {
  const depth3Tree = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", true, []),
        createBulkNode("a/c", true, [
          createBulkNode("a/c/d", true, []),
        ]),
      ]),
    ]),
  ];

  const e = [
    createBulkNode("", false, [
      createBulkNode("a", false, [
        createBulkNode("a/b", false, []),
        createBulkNode("a/c", false, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];

  const path = [""];
  const output = closeNode(path, depth3Tree);

  expect(output).toEqual(e);
})

it('should close all children of node to close, close root, single depth tree', () => {
  const tree = [
    createBulkNode("", true, []),
  ];

  const e = [
    createBulkNode("", false, []),
  ];

  const path = [""];
  const output = closeNode(path, tree);

  expect(output).toEqual(e);
})

it('should close leaf node', () => {
  const tree = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", true, []),
        createBulkNode("a/c", true, [
          createBulkNode("a/c/d", true, []),
        ]),
      ]),
    ]),
  ];

  const e = [
    createBulkNode("", true, [
      createBulkNode("a", true, [
        createBulkNode("a/b", true, []),
        createBulkNode("a/c", true, [
          createBulkNode("a/c/d", false, []),
        ]),
      ]),
    ]),
  ];

  const path = ["", "a", "c", "d"];
  const output = closeNode(path, tree);

  expect(output).toEqual(e);
})
