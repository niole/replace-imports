import React, { PureComponent } from 'react';
import { oneOfType, node, func, bool, string } from 'prop-types';
import styled from 'styled-components';
import {
    Button,
    Dropdown,
} from 'react-bootstrap';
import RoundedArrow from './icons/RoundedArrow';

const BaseToggleContentStyle = `
    cursor: default;
    box-shadow: none;
    color: #4c89d6;
    background: white;
    border-color: #ddd;
`;

const StyledButton = styled(Button)`
    display:flex;
    width: calc(100% - 36px);
    padding: 0px;
    height: 35px;
    border-radius: 3px;
    border-right-color: ${props => props.noToggleBorder ? "white" : "auto"};

    &:hover {
        ${BaseToggleContentStyle}
        border-right-color: ${props => props.noToggleBorder ? "white" : "auto"};
    }

    &:focus {
        ${BaseToggleContentStyle}
        border-right-color: ${props => props.noToggleBorder ? "white" : "auto"};
    }

    &:active {
        ${BaseToggleContentStyle}
        border-right-color: ${props => props.noToggleBorder ? "white" : "auto"};
    }

    span {
      margin-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
`;

const Toggle = styled(Dropdown.Toggle)`
    padding: 0px;
    cursor: pointer !important;
    height: 35px;
    width: 35px;
    border-left-color: ${props => props.noToggleBorder ? "white" : "auto"};

    &:hover {
        ${BaseToggleContentStyle}
        background: #F4FAFE;
        border: 1px solid #4c89d6;
    }

    &:focus {
        ${BaseToggleContentStyle}
    }

    &:active {
        ${BaseToggleContentStyle}
    }
`;

const StyledDropdown = styled(Dropdown)`
    width: 100%;

    &.open {
        button {
            border: 1px solid #4c89d6;
        }

        .btn-default.dropdown-toggle {
            ${BaseToggleContentStyle}
            background: #F4FAFE;
            border: 1px solid #4c89d6;
            border-left: 1px solid #ddd;
        }
    }

    ul button {
      width: 100%;
      border: 0px !important;

      &:focus {
        outline: none;
      }
    }

    ul option,
    ul button {
      cursor: pointer;
      color: #69717E;
      display: block;
      padding: 3px 20px;
      clear: both;
      font-weight: normal;
      line-height: 1.428571429;
      white-space: nowrap;

      background: white;

      &:hover {
        background-color: #4C89D6;
        color: white;

      }

    }
`;


class MinimalDropdown extends PureComponent {
  static propTypes = {
    noToggleBorder: bool,
    open: bool,
    showToggle: bool,
    onToggle: func,
    onClick: func,
    label: oneOfType([string, node]),
    id: string,
  };

  static defaultProps = {
    noToggleBorder: false,
    showToggle: true,
    bsSize: 'small',
  };

  render() {
    const {
      noToggleBorder,
      label,
      id,
      children,
      open,
      onToggle,
      onClick,
      showToggle,
      ...otherProps
    } = this.props;

    return (
        <StyledDropdown
            onToggle={onToggle}
            open={open}
            id={id}
            rootCloseEvent="click"
        >
            <StyledButton
                noToggleBorder={noToggleBorder}
                id={id}
                title={typeof label === "string" ? label : undefined}
                {...otherProps}
            >
              <span>
                {label}
              </span>
            </StyledButton>
            {showToggle &&
              <Toggle
                  noToggleBorder={noToggleBorder}
                  bsRole="toggle"
                  onClick={onClick}
                  noCaret
              >
                  <RoundedArrow
                      height={10}
                      width={10}
                      direction="down"
                  />
              </Toggle>}
            {children &&
              <Dropdown.Menu>
                {children}
              </Dropdown.Menu>}
        </StyledDropdown>
    );
  }
}

export default MinimalDropdown;
