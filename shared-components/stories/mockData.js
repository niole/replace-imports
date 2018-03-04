export function mockPassword({ score = 4 } = {}) {
  switch (score) {
    case 1:
      return 'foobar123';
    case 2:
      return 'dynAmit3!';
    case 3:
      return 'fee-fi-foe';
    case 4:
      return 'the-quick-brown-fox';
    default:
      return 'password';
  }
}

export function mockRunQueueingInformation({ withHelpText = true, withHTMLInHelpText = false } = {}) {
    return {
      explanation: 'The event history for this run is unavailable.',
      expectedWait: 'unknown',
      helpText: withHelpText
        ? 'If you continue to see this message and your run is not starting, you should contact your administrator.'
        : (withHTMLInHelpText
          ? 'If you continue to see this message and your run is not starting, you should <a href="mailto:jarvis@starkindustries.com">contact your administrator</a>.'
          : 'If you continue to see this message and your run is not starting, you should contact your administrator.'),
    };
}
