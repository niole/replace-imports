import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { StatusIcon, Status } from '../src/components/StatusIcon';

const stories = storiesOf('StatusIcon', module);

var statuses = Object.getOwnPropertyNames(Status);

var getNewStatus = (function() {
  var i = 0;
  return function() {
    var statusName = statuses[i % statuses.length];
    i += 1;
    return statusName;
  };
})();

statuses.map(statusName => {
  stories.add(statusName, () => <StatusIcon statusName={statusName} />);
});
