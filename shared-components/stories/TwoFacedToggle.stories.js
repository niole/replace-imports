import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import TwoFacedToggle from '../src/components/TwoFacedToggle';

const stories = storiesOf('TwoFacedToggle', module);

const Togglable = class extends Component {
  constructor() {
    super();
    this.state = { checked: false };
  }

  render() {
    const { checked } = this.state;
    return (
      <div>
        is checked? {checked + ''}
        <TwoFacedToggle
          openLabel={'Yes'}
          closedLabel={'No'}
          isOpen={checked}
          onChange={() => this.setState({ checked: !checked })}
        />
      </div>
    );
  }
};

stories.add('togglable', () => <Togglable />);
