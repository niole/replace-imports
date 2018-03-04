import React from 'react';
import styled from 'styled-components';
import {
  baseColor,
  shady4,
} from './styled/colors';
import SpinningDominoLogo from './icons/SpinningDominoLogo';

const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${shady4};
  }

  .spinner-children {
    display: block;
    color: ${baseColor};
  }

`;

export default function WaitSpinner({
    children,
    height = 38,
    width = 38,
  }) {

  return (
    <Container>
      <div>
        <SpinningDominoLogo
          height={height}
          width={width}
        />
        { children &&
            <div className="spinner-children">
              { children }
            </div> }
      </div>
    </Container>
  );
}
