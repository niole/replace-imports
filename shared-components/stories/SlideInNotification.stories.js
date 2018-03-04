import React, {Component} from 'react';
import { storiesOf } from '@kadira/storybook';
import SlideInNotification from '../src/components/SlideInNotification';

const stories = storiesOf('SlideInNotification', module);

const secondaryHandlerMessage = {
  primary: {
    content: "primary message",
  },
  secondary: {
    content: "secondary message",
    handler: () => console.log('clicked secondary'),
  }
};

const Slides = class extends Component {
  constructor() {
    super();
    this.trigger = this.trigger.bind(this);
  }

  trigger() {
    const opener = new CustomEvent("slideintoggle", {
      detail: {
        show: true,
        message: {
            primary: {
                content: "this is a warning",
            },
            secondary: {
                content: "this is a secondary warning",
            },
        },
        messageType: "warning",
        isDismissable: true,
        shouldDisappear: true,
        isClickable: true,
        onDismiss: this.handleDismissNotification,
        ...this.props
      }
    });

    window.dispatchEvent(opener);
  }

  handleDismissNotification() {
    const closer = new CustomEvent("slideintoggle", {
      detail: {
        show: false,
      }
    });

    window.dispatchEvent(closer);
  }

  render() {

    return (
      <div>
        <div onClick={this.trigger}>
          click to see animation
        </div>
        <SlideInNotification
          messageType="warning"
          isClickable={true}
          message={secondaryHandlerMessage}
          {...this.props}
        />
      </div>
    );
  }
}

stories.add('warning, show slide in', () => (
  <div>
    <div id="slidein-notification-mount"/>
    <Slides />
  </div>
));

stories.add('warning, show slide in, not dismissable', () => (
  <div>
    <div id="slidein-notification-mount"/>
    <Slides isDismissable={false} />
  </div>
));

stories.add('warning, show slide in, wont disappear', () => (
  <div>
    <div id="slidein-notification-mount"/>
    <Slides shouldDisappear={false} />
  </div>
));

stories.add('warning, show slide in, wont disappear, lots of content', () => (
  <div>
    <div id="slidein-notification-mount"/>
    <Slides shouldDisappear={false} message={{
      primary: {
        content: `
Montale began writing poetry while a teenager, at the beginning of what was to be an upheaval in Italian lyric tradition. Describing the artistic milieu in which Montale began his life's work, D. S. Carne-Ross noted in the New York Review of Books: "The Italian who set out to write poetry in the second decade of the century had perhaps no harder task than his colleagues in France or America, but it was a different task. The problem was how to lower one's voice without being trivial or shapeless, how to raise it without repeating the gestures of an incommodious rhetoric. Italian was an intractable medium. Inveterately mandarin, weighed down by the almost Chinese burden of a six-hundred-year-old literary tradition, it was not a modern language." Not only did Italian writers of the period have to contend with the legacy of their rich cultural heritage, but they also had to deal with a more recent phenomenon in their literature: the influence of the prolific Italian poet, novelist, and dramatist, Gabriele D'Annunzio, whose highly embellished style seemed to have become the only legitimate mode of writing available to them. "Montale's radical renovation of Italian poetry," according to Galassi, "was motivated by a desire to 'come closer' to his own experience than the prevailing poetic language allowed him."
        `
      },
      secondary: {
        content: `
          Montale explained his effort to cope with the poetic language of the day and the final outcome of this struggle in his widely-quoted essay, "Intentions (Imaginary Interview)," included in The Second Life of Art. "I wanted my words to come closer than those of the other poets I'd read," Montale noted. "Closer to what? I seemed to be living under a bell jar, and yet I felt I was close to something essential. A subtle veil, a thread, barely separated me from the definitive quid. Absolute expression would have meant breaking that veil, that thread: an explosion, the end of the illusion of the world as representation. But this remained an unreachable goal. And my wish to come close remained musical, instinctive, unprogrammatic. I wanted to wring the neck of the eloquence of our old aulic language, even at the risk of a counter-eloquence."
        `
      }
    }}/>
  </div>
));
