import React from 'react';
import { func, string } from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import { compose } from 'recompose';

import uncontrollable from '../higherOrderComponents/composableUncontrollable';

export function TypeaheadWithAuxiliaryValue({
  options,
  name,
  selected,
  onChange,
  mapSelectedToValue,
  ...otherProps
}) {
  const value = selected ? mapSelectedToValue(selected) : undefined;
  return (
    <div>
      <Typeahead
        {...{
          options,
          selected,
          onChange,
          ...otherProps,
        }}
      />
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

export function defaultMapOptionToValue(option) {
  if (typeof option === 'object') {
    if (option.value !== undefined) {
      return option.value;
    } else if (option.label !== undefined) {
      return option.label;
    }
  }
  return option;
}

export function defaultMapSelectedToValue(selected) {
  return selected.map(defaultMapOptionToValue).join(',');
}

TypeaheadWithAuxiliaryValue.propTypes = {
  mapSelectedToValue: func,
  name: string,
};

TypeaheadWithAuxiliaryValue.defaultProps = {
  mapSelectedToValue: defaultMapSelectedToValue,
};

export const TypeaheadWithAuxiliaryValueWithState = compose(
  uncontrollable({ selected: 'onChange' }),
)(TypeaheadWithAuxiliaryValue);

export default TypeaheadWithAuxiliaryValueWithState;
