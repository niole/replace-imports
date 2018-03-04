import React from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import { string, number } from 'prop-types';
import { compose, mapProps } from 'recompose';
import analyzePassword from 'zxcvbn';

import PasswordStrengthMeterContainer from './styled/PasswordStrengthMeterContainer';

export const maxScore = 4;
export const defaultMessage = 'Please enter a strong password';

export function PasswordStrengthMeter({
  score,
  scoreDescription = scoreDescriptionForScore(score),
  scoreFeedback,
  help,
  progressBarBSStyle = progressBarBSStyleForScore(score),
  ...otherProps
}) {
  const valueOutOf100 = score === null ? 0 : 10 + 90 * (score / maxScore);
  const showStrength = !help && score !== null;
  const helpOrDefaultMessage = help || defaultMessage;
  return (
    <PasswordStrengthMeterContainer {...otherProps}>
      <ProgressBar
        now={valueOutOf100}
        bsStyle={progressBarBSStyle}
        style={{ height: 4 }}
      />
      {showStrength
        ? <span>
            Strength: {scoreDescription}
            {scoreFeedback ? ` – ${scoreFeedback}` : undefined}
          </span>
        : helpOrDefaultMessage}
    </PasswordStrengthMeterContainer>
  );
}

export function progressBarBSStyleForScore(score) {
  switch (score) {
    case null:
      return 'danger';
    case 0:
      return 'danger';
    case 1:
      return 'danger';
    case 2:
      return 'warning';
    case 3:
      return 'success';
    default:
      return 'success';
  }
}

export function scoreDescriptionForScore(score) {
  switch (score) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'OK';
    case 3:
      return 'Strong';
    default:
      return 'Very Strong';
  }
}

PasswordStrengthMeter.propTypes = {
  score: number,
  scoreDescription: string,
  scoreFeedback: string,
  help: string,
  progressBarBSStyle: string,
};

export const PasswordStrengthMeterWithAnalysis = compose(
  mapProps(props => {
    const { password, ...otherProps } = props;
    const passwordAnalysis = password ? analyzePassword(password) : null;
    const score = passwordAnalysis ? passwordAnalysis.score : null;
    const scoreFeedback = passwordAnalysis
      ? scoreFeedbackForPasswordAnalysis(passwordAnalysis)
      : null;
    return {
      ...otherProps,
      score,
      scoreFeedback,
    };
  }),
)(PasswordStrengthMeter);

PasswordStrengthMeterWithAnalysis.propTypes = {
  password: string,
};

export function scoreFeedbackForPasswordAnalysis(passwordAnalysis) {
  if (passwordAnalysis.feedback.warning) {
    return passwordAnalysis.feedback.warning;
  } else if (passwordAnalysis.feedback.suggestions.length) {
    return passwordAnalysis.feedback.suggestions.join(' ');
  }
  return null;
}

export default PasswordStrengthMeterWithAnalysis;
