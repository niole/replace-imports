import {
  formatNodePathAsBulkTreePath,
} from '../src/components/util/bulkMoveUtil';

it('should format root paths correctly', () => {
  const path = "";
  const formatted = formatNodePathAsBulkTreePath(path);
  const e = [""];
  expect(formatted).toEqual(e);
})

it('should format non root paths correctly', () => {
  const path = "a/b";
  const formatted = formatNodePathAsBulkTreePath(path);
  const e = ["", "a", "b"];
  expect(formatted).toEqual(e);
})
