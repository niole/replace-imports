import React from 'react';
import styled from 'styled-components';
import { FormControl } from 'react-bootstrap';

export function SearchFormControl(props) {
  return (
    <SearchFormControlContainer>
      <FormControl type="search" {...props} />
    </SearchFormControlContainer>
  );
}

// Ported from nucleus/public/stylesheets/webapp.css
export const SearchFormControlContainer = styled.div`
  position: relative;

  ::after {
    top: 48%;
    left: 10px;
    font-family: 'Glyphicons Halflings';
    content: '\\e003';
    display: block;
    position: absolute;
    transform: translateY(-50%);
    font-size: 12px;
    line-height: 1;
    color: #ccc;
    text-shadow: none;
  }

  > input {
    padding: 5px 15px 5px 26px;
    box-shadow: none;
    border: 1px solid #ccc;
    border-radius: 50px;
    min-width: 100%;
    line-height: 1;
    font-size: 13px;
    transition: min-width 0.25s ease-in-out;

    :focus {
      outline: 0 none;
      box-shadow: none;
      border-color: #2d71c7;
    }
  }
`;

export default SearchFormControl;
