import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import {
  OneClickButtonWithState,
  OneClickButton,
} from '../src/components/OneClickButton';

const handlers = {
  onClick: action('onClick'),
};

const stories = storiesOf('OneClickButton', module);

stories.add('stateful', () =>
  <OneClickButtonWithState {...handlers}>Click Me</OneClickButtonWithState>,
);

stories.add('stateful with function as children', () =>
  <OneClickButtonWithState {...handlers}>
    {clicked => (clicked ? 'I Was Clicked!' : 'Click Me')}
  </OneClickButtonWithState>,
);

stories.add('not clicked', () =>
  <OneClickButton {...handlers}>
    {clicked => (clicked ? 'I Was Clicked!' : 'Click Me')}
  </OneClickButton>,
);

stories.add('clicked', () =>
  <OneClickButton clicked {...handlers}>
    {clicked => (clicked ? 'I Was Clicked!' : 'Click Me')}
  </OneClickButton>,
);

stories.add('disabled', () =>
  <OneClickButton disabled {...handlers}>
    {clicked => (clicked ? 'I Was Clicked!' : 'Click Me')}
  </OneClickButton>,
);

stories.add('disabled and clicked', () =>
  <OneClickButton disabled clicked {...handlers}>
    {clicked => (clicked ? 'I Was Clicked!' : 'Click Me')}
  </OneClickButton>,
);

stories.add('disabled', () =>
  <OneClickButton disabled {...handlers}>
    {clicked => (clicked ? 'I Was Clicked!' : 'Click Me')}
  </OneClickButton>,
);
