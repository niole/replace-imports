import {
  checkIfChildrenExist,
} from '../src/components/util/bulkMoveUtil';
import {
  createBulkNode,
} from './testUtil';

const depth3Tree = [
  createBulkNode("", true, [
    createBulkNode("a", true, [
      createBulkNode("b", false, []),
      createBulkNode("c", false, [
        createBulkNode("d", false, []),
      ]),
    ]),
  ]),
];

it('should check to see if there are children at node, middle, depth 3, exists', () => {
  const path = ["", "a", "c"];
  const exists = checkIfChildrenExist(path, depth3Tree);
  expect(exists).toEqual(true);
});

it('should check to see if there are children at node, middle, depth 3, doesn\'nt exist', () => {
  const path = ["", "a", "b"];
  const exists = checkIfChildrenExist(path, depth3Tree);
  expect(exists).toEqual(false);
});

it('should check to see if there are children at node, leaf, depth 3, doesn\'nt exist', () => {
  const path = ["", "a", "c", "d"];
  const exists = checkIfChildrenExist(path, depth3Tree);
  expect(exists).toEqual(false);
});

it('should check to see if there are children at node, leaf, depth 3, doesn\'nt exist', () => {
  const path = [""];
  const exists = checkIfChildrenExist(path, depth3Tree);
  expect(exists).toEqual(true);
});

it('should return undefined for invalid paths, single depth path', () => {
  const path = ["x"];
  const exists = checkIfChildrenExist(path, depth3Tree);
  expect(exists).toEqual(undefined);
});

it('should return undefined for invalid paths, multi depth path', () => {
  const path = ["", "a", "b", "c"];
  const exists = checkIfChildrenExist(path, depth3Tree);
  expect(exists).toEqual(undefined);
});
