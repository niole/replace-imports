import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import WaitSpinner from '../src/components/WaitSpinner';

const stories = storiesOf('WaitSpinner', module);

stories.add('basic', () => (
  <div style={{ border: "1px solid", height: 700 }}>
    <WaitSpinner />
  </div>
));

stories.add('with long message', () => (
  <div style={{ border: "1px solid", height: 700 }}>
    <WaitSpinner>
      Mothers of America
                                  let your kids go to the movies!
      get them out of the house so they won't know what you're up to
      it's true that fresh air is good for the body
                                                                  but what about the soul
      that grows in darkness, embossed by silvery images
      and when you grow old as grow old you must
                                                                    they won't hate you
      they won't criticize you they won't know
                                                                  they'll be in some glamorous country
      they first saw on a Saturday afternoon or playing hookey
    </WaitSpinner>
  </div>
));

stories.add('with short message', () => (
  <div style={{ border: "1px solid", height: 700 }}>
    <WaitSpinner>
      You’re not a good artist, Adolf.
    </WaitSpinner>
  </div>
));
