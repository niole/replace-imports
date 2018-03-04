import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';

function lessThanAMinuteAgo(value, unit, suffix, date, defaultFormatter) {
  return (unit === "second" ? "Less than a minute ago" : defaultFormatter(value, unit, suffix, date));
}

function DominoTimeAgo({ date }) {
  return (
    <TimeAgo
      date={date}
      formatter={lessThanAMinuteAgo}
    />
  );
}

DominoTimeAgo.propTypes = {
  date: PropTypes.number.required,
};

export default DominoTimeAgo;
