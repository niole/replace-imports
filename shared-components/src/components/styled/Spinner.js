import React from 'react';
import styled from 'styled-components';

export function SpinnerIcon({ className }) {
  return <i className={`${className} icon icon-spinner icon-spin`} />;
}

export default styled(SpinnerIcon)`
  display: inline-block;
  position: relative;
  right: 7px;
  margin-bottom: 2px;
`;
