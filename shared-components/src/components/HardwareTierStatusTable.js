import React from 'react';
import styled from 'styled-components';
import {func, shape, arrayOf, string, number} from 'prop-types';
import MinimalSortableFilterableTable from './MinimalSortableFilterableTable';
import ColoredRadioButton from './ColoredRadioButton';
import HardwareTierStatusesUIMixin from './HardwareTierStatusesUIMixin';

const level0 = "CanExecuteWithCurrentInstances";
const level1 = "RequiresLaunchingInstance";
const level2 = "Full";
const levelunknown = "Unknown";

const levelSortMap = {
  [level0]: 0,
  [level1]: 1,
  [level2]: 2,
  [levelunknown]: -1,
};

const truncationStyle = `
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const HardwareTierName = styled.div`
  font-size: 14px;
  ${truncationStyle}
`;

const Table = styled(MinimalSortableFilterableTable)`
  .hardware-tier-name {
    margin-right: 5px;
  }

  .rt-td {
    display: flex;
    align-items: center;
    justify-content: left;

    &:nth-of-type(2) {
      span {
        ${truncationStyle}
      }
    }
  }
`;

function sorter(accessor) {
  return (a, b) => {
    if (accessor(a) > accessor(b)) {
      return 1;
    }
    return -1;
  };
}

class HardwareTierStatusTable extends HardwareTierStatusesUIMixin {
  renderPrice = ({ value }) => {
    return this.formatPrice(value);
  }

  renderCongestionLevel = ({ value }) => {
    return this.formatCongestionLevel(value.level, value.description);
  }

  renderName = ({ value }) => {
    const {
      selectedTier,
    } = this.state;
    const {
        handleUpdateGloballySelectedTier,
    } = this.props;

    return [
        <ColoredRadioButton
          onChange={handleUpdateGloballySelectedTier}
          checked={selectedTier === value.id}
          className="hardware-tier-name"
          inverted={true}
          size={18}
          type="radio"
          name="hardwareTierName"
          value={value.id}
          key="radio"
        />,
        <HardwareTierName key="name" title={value.name}>
          {value.name}
        </HardwareTierName>,
    ];
  }

  renderType = ({ value }) => {
    const {
      cores,
      memory,
    } = value;
    const label = this.formatType(cores, memory);

    return (
      <span title={label}>
        {label}
      </span>
    );
  }

  getHeaders() {
    return [
      {
        Header: "Name",
        accessor: "name",
        Cell: this.renderName,
        sortMethod: sorter(x => x.name.toLowerCase()),
        resizable: false,
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: this.renderType,
        sortMethod: sorter(x => x.cores * x.memory),
        resizable: false,
      },
      {
        Header: "Congestion Level",
        accessor: "congestionDetails",
        Cell: this.renderCongestionLevel,
        sortMethod: sorter(x => levelSortMap[x.level]),
        resizable: false,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: this.renderPrice,
        sortMethod: sorter(x => x),
        width: 120,
        resizable: false,
      }
    ];
  }

  formatRows() {
    const {
      hardwareTierDetails,
    } = this.props;

    return hardwareTierDetails.map(({
        name,
        id,
        cores,
        memory,
        congestionDetails,
        centsPerMinute,
      }) => {

        return {
          name: {
            id,
            name,
          },
          type: {
            cores,
            memory,
          },
          congestionDetails,
          price: centsPerMinute,
        };
      });
  }

  render() {
    return (
      <Table
        className="-highlight"
        defaultPageSize={this.props.hardwareTierDetails.length}
        rows={this.formatRows()}
        headers={this.getHeaders()}
      />
    );
  }
}

export const HardwareTierStatusPropTypes = {
  handleUpdateGloballySelectedTier: func.isRequired,
  locationUrl: string,
  ownerUsername: string.isRequired,
  projectName: string.isRequired,
  selectedTier: string.isRequired,
  hardwareTierDetails: arrayOf(
    shape({
      name: string,
      id: string,
      cores: number,
      memory: number,
      congestionDetails: shape({
        level: string,
        description: string,
      }),
      centsPerMinute: number,
    })
  )
};

HardwareTierStatusTable.propTypes = HardwareTierStatusPropTypes;

export default HardwareTierStatusTable;
