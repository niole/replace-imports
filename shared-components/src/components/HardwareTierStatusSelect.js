import React from 'react';
import {string, bool} from 'prop-types';
import styled from 'styled-components';
import { HardwareTierStatusPropTypes } from './HardwareTierStatusTable';
import HardwareTierStatusesUIMixin from './HardwareTierStatusesUIMixin';
import MinimalSelect from './MinimalSelect';

const MenuItem = styled.button`
  text-align: left;
  color: #45474a !important;
  font-weight: bold !important;

  &:hover {
    color: white !important;
  }

  > div {
    margin: 0px;
  }
`;

const Label = styled.div`
  margin: 0px 15px;
  font-size: 14px;
  color: #45474a !important;
  font-weight: bold !important;
  align-items: center;

  &:hover {
    color: ${props => props.withHover ? "white !important" : "auto"};
  }

  display: flex;
  width: 100%;
  justify-content: space-between;

  > span  {
    margin-left: 50px;

    > div {
      display: inline-block;
    }

    &:first-of-type {
      margin-left: 0px;
    }

  }
`;

class HardwareTierStatusSelect extends HardwareTierStatusesUIMixin {
  findHardwareTierStatusById(id) {
    const details = this.props.hardwareTierDetails;
    let i = 0;
    for (; i < details.length; i++) {
      if (details[i].id === id) {
        return details[i];
      }
    }
  }

  formatHardwareTierStatus({
      name,
      cores,
      memory,
      congestionDetails,
      centsPerMinute,
    }, withHover = true) {
    const {
      description,
      level,
    } = congestionDetails;

    return (
      <Label withHover={withHover}>
        <span>
          {name}
        </span>
        <span>
          {`${this.formatType(cores, memory)}|${this.formatPrice(centsPerMinute)}`}
        </span>
        <span>
          {this.formatCongestionLevel(level, description)}
        </span>
      </Label>
    );
  }

  defaulTierLabel() {
    const {
      projectType,
    } = this.props;
    return `(${projectType} Default)`;
  }

  formatSelectedStatus = (id) => {
    const details = this.findHardwareTierStatusById(id);

    if (details) {
      return this.formatHardwareTierStatus(details, false);
    } else if (id === "") {
      return (
        <Label withHover={false}>
          {this.defaulTierLabel()}
        </Label>
      );
    }

    console.error('no hardware tier with that id exists');
  }

  getMenuItems() {
    const {
      hardwareTierDetails,
    } = this.props;

    return [
      ({ onSelect }) =>
        <MenuItem
          key="default"
          name="hardwareTierId"
          id="hardwareTierId"
          value=""
          onClick={onSelect}
      >
          {this.defaulTierLabel()}
        </MenuItem>
    ].concat(
      hardwareTierDetails.map(details => ({ onSelect }) => (
          <MenuItem
            key={details.id}
            name="hardwareTierId"
            id="hardwareTierId"
            value={details.id}
            onClick={onSelect}
          >
            {this.formatHardwareTierStatus(details)}
          </MenuItem>
      )));
  }

  onChange = (event) => {
    const {
      shouldUpdateGloballySelectedHardwareTier,
      onChange,
      handleUpdateGloballySelectedTier,
    } = this.props;

    if (shouldUpdateGloballySelectedHardwareTier) {
        handleUpdateGloballySelectedTier(event);
    } else if (onChange) {
        onChange(event);
    }
  }


  render() {
    const {
      selectedTier,
    } = this.props;
    return (
      <MinimalSelect
        defaultValue={selectedTier}
        labelFormatter={this.formatSelectedStatus}
        noToggleBorder={true}
        name="hardwareTierId"
        id="hardwareTierId"
        onChange={this.onChange}
      >
        {this.getMenuItems()}
      </MinimalSelect>
    );
  }
}

HardwareTierStatusSelect.propTypes = {
    shouldUpdateGloballySelectedHardwareTier: bool.isRequired,
    projectType: string.isRequired,
    ...HardwareTierStatusPropTypes
};

export default HardwareTierStatusSelect;
