/**
 * @format
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropdownButton } from 'react-bootstrap';

export function ActionsDropdownButton({
  glyph,
  bsStyle,
  children,
  label,
  ...otherProps
}) {
  // Domino historically has three ways of rendering gears: via Font Awesome,
  // via Glyphicon, and via an SVG. Font Awesome is used in more places, so for
  // consistency we use that.
  const gearElement = <i className="icon-gear" />;
  const title = (label ?
    <span className="inline-help" aria-label={label}>{gearElement}</span> :
    gearElement
  );
  return (
    <StyledDropdownButton>
      <DropdownButton
        bsStyle={bsStyle}
        noCaret
        {...otherProps}
        title={title}
      >
        {children}
      </DropdownButton>
    </StyledDropdownButton>
  );
}

ActionsDropdownButton.propTypes = {
  glyph: PropTypes.string,
  bsStyle: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.oneOf([undefined]) // This prop type is invalid
};

ActionsDropdownButton.defaultProps = {
  glyph: 'cog',
  bsStyle: 'link',
};

const StyledDropdownButton = styled.div`
  .btn {
    &.dropdown-toggle {
      padding: 0px !important;
      text-decoration: none;
    }
  }
`;

export default ActionsDropdownButton;
