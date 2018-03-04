import React from 'react';
import { storiesOf } from '@kadira/storybook';
import HardwareTierStatusSelect from '../src/components/HardwareTierStatusSelect';

const stories = storiesOf('HardwareTierStatusSelect', module);

const level0Description = "Not congested.";
const level2Description = "Check your hardware tier.";
const level1Description = "Not that congested.";
const unknown = "We have no data on this hardware tier.";

const level0 = "CanExecuteWithCurrentInstances";
const level1 = "RequiresLaunchingInstance";
const level2 = "Full";
const levelunknown = "Unknown";

const props = {
  hardwareTierDetails: [
    {
      name: "Free",
      id: "Free",
      cores: .5,
      memory: .5,
      congestionDetails: {
        level: level0,
        description: level0Description,
      },
      centsPerMinute: 0,
    },
    {
      name: "Small",
      id: "Small",
      cores: .5,
      memory: .5,
      congestionDetails: {
        level: level2,
        description: level2Description,
      },
      centsPerMinute: .85,
    },
    {
      name: "Medium",
      id: "Medium",
      cores: .5,
      memory: .5,
      congestionDetails: {
        level: level1,
        description: level1Description,
      },
      centsPerMinute: .93,
    },
    {
      name: "Large",
      id: "Large",
      cores: 8,
      memory: 32,
      congestionDetails: {
        level: level0,
        description: level0Description,
      },
      centsPerMinute: 1.5,
    },
    {
      name: "XL",
      id: "XL",
      cores: 16,
      memory: 30,
      congestionDetails: {
        level: level2,
        description: level2Description,
      },
      centsPerMinute: 2.8,
    },
    {
      name: "Mem+",
      id: "Mem+",
      cores: 16,
      memory: 128,
      congestionDetails: {
        level: levelunknown,
        description: unknown,
      },
      centsPerMinute: 4.8,
    },
  ],
  selectedTier: "Free",
};

stories.add('happy path', () => (
  <HardwareTierStatusSelect
    {...props}
  />
));
