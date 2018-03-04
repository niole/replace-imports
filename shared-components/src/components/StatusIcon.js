/**
 * Reusable icons to represent the status of some task. These should be agnostic
 * to the different types of tasks they are used for.
 */
import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import PropTypes from 'prop-types';
import Spinner from 'react-spin';


const spinnerOptions = {
  lines: 9, // The number of lines to draw
  length: 4, // The length of each line
  width: 2, // The line thickness
  radius: 4, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#4C89D6', // #rgb or #rrggbb or array of colors
  speed: 1.2, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

class SpinnerIcon extends React.Component {
  render() {
    return (
      <i className="icon spinner-small">
        <Spinner config={spinnerOptions}/>
      </i>
    );
  }
}

export const Status = {
  Error: "Error",
  Failed: "Failed",
  Killed: "Killed",
  Running: "Running",
  Scheduled: "Scheduled",
  Stopped: "Stopped",
  Succeeded: "Succeeded",
};

const statusMap = (function() {
  var map = {};
  map[Status.Error] = 'flag';
  map[Status.Killed] = 'remove';
  map[Status.Scheduled] = 'plus';
  map[Status.Stopped] = 'stop';
  map[Status.Succeeded] = 'ok';
  return map;
}());


const alertIconClasses = "icon ss-gizmo ss-alert".split(" ");

export function StatusIcon({
  statusName,
  ...otherProps,
}) {
  if (statusName === Status.Running) {
    return <SpinnerIcon {...otherProps} />;
  } else if (statusName === Status.Failed) {
    const {className, ...elementProps} = otherProps;
    const classes = alertIconClasses.concat(className.split(" ")).join(" ");
    return <i className={classes} {...elementProps} />;
  } else {
    let glyph = statusMap[statusName] || 'icon-question';
    return <Glyphicon glyph={glyph} {...otherProps} />;
  }
}

StatusIcon.propTypes = {
  statusName: PropTypes.oneOf(Object.getOwnPropertyNames(Status)),
}

export default StatusIcon;
