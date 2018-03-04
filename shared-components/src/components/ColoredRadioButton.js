import React from 'react';
import {any, oneOf, bool, number, func, string} from 'prop-types';
import styled from 'styled-components';

const RadioButton = styled.div`
  display: inline-block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;

  circle {
    transition: fill 1s cubic-bezier(0, 1.32, .34, .99);
  }

  label {
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    margin: 0px;

    .outer {
      stroke: #DDDDDD;
      fill: ${props => props.lightColor};
    }

    .inner {
      fill: ${props => props.lightColor};
    }
  }

  input:checked + label {
    .inner {
      fill: ${props =>
        props.inverted ? props.lightColor : props.darkColor
      };
    }

    .outer {
      stroke: ${props =>
        props.inverted ? props.darkColor : "#DDDDDD"
      };

      fill: ${props =>
        props.inverted ? props.darkColor : props.lightColor
      };
    }
  }

  input {
    display: none;
  }
`;

function ColoredRadioButton({
      lightColor,
      darkColor,
      onChange,
      size,
      inverted,
      name,
      type,
      value,
      className,
      checked,
      ...rest
}) {
  const totalDiameter = size+4;
  const outerCircleHeight = size/2;
  const innerCircleHeight = size/4;

  return (
    <RadioButton
      className={className}
      inverted={inverted}
      lightColor={lightColor}
      darkColor={darkColor}
      size={totalDiameter}
      {...rest}
    >
      <input
        checked={checked}
        onChange={onChange}
        id={value}
        type={type}
        name={name}
        value={value}
      />
      <label htmlFor={value}>
        <svg height={totalDiameter} width={totalDiameter}>
            <circle
                strokeWidth="2"
                className="circle outer"
                cx="0"
                cy="0"
                r={outerCircleHeight}
                transform={`translate(${outerCircleHeight+2}, ${outerCircleHeight+2})`}
            />
            <circle
                className="circle inner"
                cx="0"
                cy="0"
                r={innerCircleHeight}
                transform={`translate(${outerCircleHeight+2}, ${outerCircleHeight+2})`}
            >
            </circle>
        </svg>
      </label>
    </RadioButton>
  );
}

ColoredRadioButton.propTypes = {
  className: string,
  lightColor: string,
  darkColor: string,
  inverted: bool,
  size: number,
  onChange: func,
  type: oneOf(["checkbox", "radio"]),
  name: string,
  value: any.isRequired,
  checked: bool,
};

ColoredRadioButton.defaultProps = {
  type: "checkbox",
  lightColor: 'white',
  darkColor: '#2D71C7',
  inverted: false,
  size: 25,
};

export default ColoredRadioButton;
