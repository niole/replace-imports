export const sortModes = ['ascending', 'descending'];

export const defaultSortMode = sortModes[0];

export const toggleSortMode = sortMode => {
  if (sortMode === sortModes[0]) {
    return sortModes[1];
  }
  return sortModes[0];
};

export default sortModes;
