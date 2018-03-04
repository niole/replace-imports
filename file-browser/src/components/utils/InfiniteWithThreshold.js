import React from 'react';
import Infinite from 'react-infinite';
import { number } from 'prop-types';

function InfinteWithThreshold({ children, minChildren, ...otherProps }) {
  if (React.Children.count(children) >= minChildren) {
    return (
      <Infinite {...otherProps}>
        {children}
      </Infinite>
    );
  }
  return (
    <div>
      {children}
    </div>
  );
}

InfinteWithThreshold.propTypes = {
  minChildren: number,
};

InfinteWithThreshold.defaultProps = {
  minChildren: 0,
};

export default InfinteWithThreshold;
