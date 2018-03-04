import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import EventListener, { withOptions } from 'react-event-listener';

import TableTextCell from './TableTextCell';
import TableControlCell from './TableControlCell';

export const inputId = 'table-mutable-text-cell-input';

export function TableMutableTextCell({
  editing,
  children,
  text,
  onEditButtonClick,
  onInputKeyDown,
  onInputChange,
  onWindowClickWhileEditing,
  ...otherProps
}) {
  if (editing) {
    return (
      <TableControlCell>
        <StyledInput
          id={inputId}
          type="text"
          value={text}
          onKeyDown={onInputKeyDown}
          onChange={onInputChange}
          innerRef={domElement => {
          // If the element is unfocused...
            if (domElement && domElement !== document.activeElement) {
              // ...focus and select
              domElement.focus();
              domElement.setSelectionRange(0, domElement.value.length);
            }
          }}
        />
        <EventListener
          target="window"
          onClick={withOptions(onWindowClickWhileEditing, { capture: true })}
        />
      </TableControlCell>
    );
  }
  return (
    <TableTextCell>
      <Container>
        <span>
          {children}
        </span>
        <Glyphicon glyph="pencil" onClick={onEditButtonClick} title="Edit" />
      </Container>
    </TableTextCell>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .glyphicon {
    visibility: hidden;
    margin-left: 10px;
    cursor: pointer;
    color: lightgray;

    :hover {
      color: #4c89d6;
    }
  }

  tr:hover & > .glyphicon {
    visibility: visible;
  }
`;

export const StyledInput = styled.input`width: 100%;`;

export class TableMutableTextCellWithState extends Component {
  constructor(props) {
    super(props);
    const { text } = props;
    this.state = { text, editing: false };
  }
  onEditButtonClick = event => {
    this.setState({ editing: true });
  };
  onInputChange = event => {
    this.setState({ text: event.target.value });
  };
  onInputKeyDown = event => {
    switch (event.key) {
      case 'Tab':
      case 'Enter':
        event.preventDefault();
        this.commitChange();
        break;
      case 'Escape':
        event.preventDefault();
        this.discardChange();
        break;
      default:
        break;
    }
  };
  onWindowClickWhileEditing = event => {
    if (event.target.id !== inputId) {
      event.preventDefault();
      event.stopPropagation();
      this.commitChange();
    }
  };
  commitChange() {
    const { text: unmodifiedText, onTextChange } = this.props;
    const { text } = this.state;
    this.setState({ editing: false });
    if (text !== unmodifiedText && onTextChange) {
      onTextChange(text);
    }
  }
  discardChange() {
    const { text: unmodifiedText } = this.props;
    this.setState({ editing: false, text: unmodifiedText });
  }
  render() {
    const { text: unmodifiedText, ...otherProps } = this.props;
    const { text, editing } = this.state;
    return (
      <TableMutableTextCell
        {...{
          text,
          editing,
          onEditButtonClick: this.onEditButtonClick,
          onInputKeyDown: this.onInputKeyDown,
          onInputChange: this.onInputChange,
          onWindowClickWhileEditing: this.onWindowClickWhileEditing,
          ...otherProps,
        }}
      />
    );
  }
}

export default TableMutableTextCellWithState;
