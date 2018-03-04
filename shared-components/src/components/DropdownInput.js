/**
 * @format
 */

import React from 'react';
import { string, bool, func, node, arrayOf, number, oneOf, oneOfType, any } from 'prop-types';
import styled from 'styled-components';
import { Dropdown, MenuItem } from 'react-bootstrap';
import memoizeBind from 'memoize-bind';

const propTypes = {
  defaultValue: oneOf([string, number]),
  name: string,
  options: arrayOf(any).isRequired,
  disabled: bool,
  nullable: bool,
  selectedOption: any,
  onSelectedOptionChange: func,
  keyForOption: func,
  valueForOption: func,
  placeholder: oneOfType([string, node]),
  renderButtonChildren: func,
  renderMenuItemChildren: func,
};

export const StyledDropdown = styled(Dropdown)`
  > button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > :nth-child(1) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 10px;
    }
  }
`;

function getFinalValue(defaultValue, valueForOption, selectedOption) {
  if (valueForOption && selectedOption) {
    return valueForOption(selectedOption);
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }
}

export function DropdownInput({
  name,
  options,
  disabled,
  nullable,
  selectedOption,
  onSelectedOptionChange,
  keyForOption,
  valueForOption,
  placeholder,
  renderButtonChildren,
  renderMenuItemChildren,
  defaultValue,
  ...otherProps
}) {
  const buttonChildren = selectedOption ? (
    renderButtonChildren ? (
      renderButtonChildren(selectedOption)
    ) : null
  ) : (
    <span className="text-muted">{placeholder}</span>
  );
  const value = getFinalValue(defaultValue, valueForOption, selectedOption);
  const finalDisabled = !options || disabled;
  return (
    <StyledDropdown block disabled={finalDisabled} {...otherProps}>
      {value !== undefined &&
        value !== null && <input type="hidden" name={name} value={value} />}
      <Dropdown.Toggle className="form-control">
        {buttonChildren}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {nullable && (
          <MenuItem
            onSelect={
              onSelectedOptionChange &&
              memoizeBind(onSelectedOptionChange, null, null)
            }
          >
            <span className="text-muted">{placeholder}</span>
          </MenuItem>
        )}
        {options &&
          options.map((option, index) => {
            const key = keyForOption ? keyForOption(option) : index;
            return (
              <MenuItem
                key={key}
                onSelect={
                  onSelectedOptionChange &&
                  memoizeBind(onSelectedOptionChange, null, option)
                }
              >
                {renderMenuItemChildren
                  ? renderMenuItemChildren(option, index)
                  : option}
              </MenuItem>
            );
          })}
      </Dropdown.Menu>
    </StyledDropdown>
  );
}

DropdownInput.propTypes = propTypes;

export default DropdownInput;
