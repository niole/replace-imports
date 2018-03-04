import memoizeWeak from 'memoize-weak';
import { Search } from 'js-search';

export const getIndex = memoizeWeak(revisions => {
  const index = new Search('sha');
  index.addIndex('sha');
  index.addIndex('message');
  index.addIndex(['author', 'username']);
  index.addDocuments(revisions);
  return index;
});

export function filterRevisions(revisions, filterText) {
  const index = getIndex(revisions);
  const filteredRevisions = index.search(filterText);
  return filteredRevisions;
}

export default filterRevisions;
