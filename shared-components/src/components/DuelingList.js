import React, { PureComponent } from 'react';
import { arrayOf, func, string } from 'prop-types';
import shortid from 'shortid';
import RoundedArrow from './icons/RoundedArrow';
import {
  ButtonGroup,
  ListGroup,
  List,
  Button,
  Header,
  ListElement,
  FocusedListElement,
} from './styled/DuelingList';

const LIST_ONE_KEY = 'list1';
const LIST_TWO_KEY = 'list2';
const RIGHT = 'right';
const LEFT = 'left';

class DuelingList extends PureComponent {
  constructor(props) {
    super(props);
    const { list1, list2 } = props;

    this.state = {
      list1: this.getInitialListItems(list1),
      list2: this.getInitialListItems(list2),
    };

    this.selectElement = this.selectElement.bind(this);
    this.moveElementsRight = this.moveElements.bind(this, RIGHT);
    this.moveElementsLeft = this.moveElements.bind(this, LEFT);
  }

  getInitialListItems(items) {
    return items.map(item => {
      const { id, label } =
        typeof item === 'object' ? item : { id: item, label: item };
      return {
        id: id || shortid.generate(),
        label,
        selected: false,
      };
    });
  }

  selectElement(item, listType) {
    const updatedItem = { ...item, ...{ selected: !item.selected } };
    const updatedItems = this.state[listType].map(oldItem => {
      if (oldItem.id === item.id) {
        return updatedItem;
      }
      return oldItem;
    });
    const newState = { ...this.state, [listType]: updatedItems };
    this.setState(newState);
  }

  renderList(listType, list) {
    return list.map(item => this.getListElement(item, listType));
  }

  getListElement(item, listType) {
    if (item.selected) {
      return (
        <FocusedListElement
          onClick={() => this.selectElement(item, listType)}
          key={item.id}
        >
          {item.label}
        </FocusedListElement>
      );
    }
    return (
      <ListElement
        onClick={() => this.selectElement(item, listType)}
        key={item.id}
      >
        {item.label}
      </ListElement>
    );
  }

  updateElements(listType) {
    const { onChange } = this.props;
    const otherListType =
      listType === LIST_ONE_KEY ? LIST_TWO_KEY : LIST_ONE_KEY;

    const splitItems = this.state[listType].reduce(
      (splitItems, item) => {
        if (item.selected) {
          splitItems[0].push({ ...item, selected: false });
        } else {
          splitItems[1].push(item);
        }
        return splitItems;
      },
      [[], []],
    );

    const newState = {
      [listType]: splitItems[1],
      [otherListType]: splitItems[0].concat(this.state[otherListType]),
    };

    this.setState(newState, () => {
      if (splitItems[0].length || splitItems[1].length) {
        onChange(newState);
      }
    });
  }

  moveElements(direction) {
    switch (direction) {
      case RIGHT:
        // move selected left elements to the right
        this.updateElements(LIST_ONE_KEY);
        break;
      case LEFT:
        // move selected right elements to the left
        this.updateElements(LIST_TWO_KEY);
        break;
      default:
        // do nothing
        break;
    }
  }

  render() {
    const { header1, header2 } = this.props;
    const { list1, list2 } = this.state;

    return (
      <div>
        <ListGroup>
          <Header>
            {header1}
          </Header>
          <List>
            {this.renderList(LIST_ONE_KEY, list1)}
          </List>
        </ListGroup>
        <ButtonGroup>
          <Button onClick={this.moveElementsRight}>
            <RoundedArrow direction="right" />
          </Button>
          <Button onClick={this.moveElementsLeft}>
            <RoundedArrow direction="left" />
          </Button>
        </ButtonGroup>
        <ListGroup>
          <Header>
            {header2}
          </Header>
          <List>
            {this.renderList(LIST_TWO_KEY, list2)}
          </List>
        </ListGroup>
      </div>
    );
  }
}

DuelingList.propTypes = {
  list1: arrayOf(string),
  list2: arrayOf(string),
  header1: string,
  header2: string,
  onChange: func,
};

DuelingList.defaultProps = {
  list1: [],
  list2: [],
  header1: '',
  header2: '',
  onChange: () => {},
};

export default DuelingList;
