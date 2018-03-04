import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ColoredRadioButton from '../src/components/ColoredRadioButton';

const stories = storiesOf('ColoredRadioButton', module);

stories.add('25, inverted, blue and white', () => (
  <div style={{ border: "1px solid", height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <ColoredRadioButton
      size={25}
      inverted={true}
    />
  </div>
));

stories.add('50, blue and white', () => (
  <div style={{ border: "1px solid", height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <ColoredRadioButton
      size={50}
    />
  </div>
));

stories.add('25, blue and white', () => (
  <div style={{ border: "1px solid", height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <ColoredRadioButton
      size={25}
    />
  </div>
));

stories.add('15, blue and white', () => (
  <div style={{ border: "1px solid", height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <ColoredRadioButton
      size={15}
    />
  </div>
));
