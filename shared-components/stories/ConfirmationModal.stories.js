import React from 'react';
import { action, storiesOf, linkTo } from '@kadira/storybook';

import { ConfirmationModal } from '../src/components/ConfirmationModal';

const stories = storiesOf('ConfirmationModal', module);

const handlers = {
  onConfirmButtonClick: function(props) {
    action('onConfirmButtonClick');
    linkTo('ConfirmationModal', 'Invisible');
  },
  onCancelButtonClick: function() {
    action('onCancelButtonClick');
    linkTo('ConfirmationModal', 'Invisible');
  },
};

stories.add('Visible', () =>
  <ConfirmationModal
    title="Archive this model?"
    body="Once archived, this model won't show up in any searches, lists or on the Project/Publish tab. Existing clients won't be able to invoke the model."
    acceptText="Archive this Model"
    visible={true}
    {...handlers}
  />,
);

stories.add('Invisible', () =>
  <ConfirmationModal
    title="Archive this model?"
    body="Once archived, this model won't show up in any searches, lists or on the Project/Publish tab. Existing clients won't be able to invoke the model."
    acceptText="Archive this Model"
    visible={false}
    {...handlers}
  />,
);
