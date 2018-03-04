import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { PasswordStrengthMeterWithAnalysis } from '../src/components/PasswordStrengthMeter';
import { mockPassword } from './mockData';

const stories = storiesOf('PasswordStrengthMeter', module);

stories.add(`no password`, () => <PasswordStrengthMeterWithAnalysis />);

for (let score = 0; score <= 4; score++) {
  const password = mockPassword({ score });
  stories.add(`"${password}" (score: ${score})`, () =>
    <PasswordStrengthMeterWithAnalysis password={password} />,
  );
}
