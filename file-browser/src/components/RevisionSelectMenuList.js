import React from 'react';
import { pure } from 'recompose';
import memoizeWeak from 'memoize-weak';

import InfiniteWithThreshold from './utils/InfiniteWithThreshold';
import SelectMenu from './styled/SelectMenu';
import filterRevisions from '../utils/filterRevisions';
import RevisionSelectMenuListItem from './RevisionSelectMenuListItem';

// The react-infinite package is being used to do UITableView-style efficient
// scrolling because the number of revisions could be in the 100s or 1000s.
// This component works well, but it applies the container height as `height`
// and not `maxHeight`. This means that the list is always this height, even
// when there are only one or two revisions, which is not desired. The
// `<InfiniteWithThreshold>` component uses `<Infinite>` only when the number
// of children exceeds `minChildrenForInfinite`
const minChildrenForInfinite = 10;

// This function, given a revision and an onSelect handler, returns an
// onSelect handler bound to that revision. This is memoized so that the bound
// handlers are reference-stable for each revision/onSelect pair. This avoids
// unnecessary event handler changes
export const bindSelectHandler = memoizeWeak((onSelect, revision) => {
  return () => onSelect(revision);
});

export function RevisionSelectMenuList({
  revisions,
  filterText,
  onSelect,
  navigateOnSelect,
}) {
  const filteredRevisions = filterText
    ? filterRevisions(revisions, filterText)
    : revisions;
  return (
    <SelectMenu.RevisionList>
      <InfiniteWithThreshold
        minChildren={minChildrenForInfinite}
        containerHeight={SelectMenu.RevisionList.maxHeight}
        elementHeight={SelectMenu.RevisionListItem.height}
      >
        {filteredRevisions.map(revision => {
          const onClick = onSelect
            ? bindSelectHandler(onSelect, revision)
            : undefined;
          return (
            <RevisionSelectMenuListItem
              revision={revision}
              onClick={onClick}
              navigateOnClick={navigateOnSelect}
              key={revision.sha}
            />
          );
        })}
      </InfiniteWithThreshold>
    </SelectMenu.RevisionList>
  );
}

// This component will be expensive to re-render if revisions are in the
// hundreds or thousands, so the `pure` higher-order-component is being
// applied to ensure the component is not re-rendered if the props have not
// changed (props are compared using `shallowEqual()`)
export const RevisionSelectMenuListOptimized = pure(RevisionSelectMenuList);

export default RevisionSelectMenuListOptimized;
