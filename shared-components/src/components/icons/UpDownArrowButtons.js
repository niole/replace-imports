import React from 'react';
import styled from 'styled-components';
import SolidArrow from './SolidArrow';

const ToggleButtonContainer = styled.div`
  display: inline-block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: ${props => props.position};
  top: ${props => props.top}px;
  color: ${props => props.baseColor};

  svg {
    position: absolute;
    color: ${props => props.baseColor};

    &.up {
      top: 0px;
      color: ${props => props.upButtonColor};
    }

    &.down {
      top: ${props => props.height/2}px;
      color: ${props => props.downButtonColor};
    }
  }
`;

export default function UpDownArrowButtons({
  height = 24,
  width = 24,
  containerProps = {
    width: 15,
    height: 20,
    top: -6,
    position: 'relative',
    baseColor: '#DDDDDD',
    upButtonColor: '#DDDDDD',
    downButtonColor: '#DDDDDD',
  }
}) {
    return (
      <ToggleButtonContainer {...containerProps}>
        <SolidArrow
          height={height}
          width={width}
          direction="up"
          className="up"
        />
        <SolidArrow
          height={height}
          width={width}
          direction="down"
          className="down"
        />
      </ToggleButtonContainer>
    );
}
