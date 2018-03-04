import React from 'react';
import { func, object } from 'prop-types';

const defaultDelay = 2000;

export default function asyncPoll(delay = defaultDelay) {
  return WrappedComponent =>
    class extends React.Component {
      static propTypes = {
        defaultProps: object.isRequired,
        getProps: func.isRequired,
        updatePoller: func,
      };

      static defaultProps = {
        updatePoller: () => {},
      }

      constructor(props) {
        super(props);
        this.state = {
          props: props.defaultProps,
        };
      }

      nextTickIndex = 0;

      componentDidMount() {
        this.startInterval();
      }

      componentWillUnmount() {
        this.stopInterval();
      }

      startInterval = () => {
        this.tick();
        this.timerID = setInterval(() => this.tick(), delay);
      }

      stopInterval() {
        clearInterval(this.timerID);
      }

      updatePoller = (details) => {
        const {
          updatePoller,
        } = this.props;

        this.stopInterval();
        updatePoller(details, this.startInterval);
      }

      async tick() {
        const tickIndex = this.nextTickIndex++;
        const props = await this.props.getProps(this.props);
        const isCurrent = tickIndex === this.nextTickIndex - 1;
        if (isCurrent) {
          this.setState({ props: { ...this.state.props, ...props } });
        }
      }

      render() {
        const { defaultProps, getProps, ...otherProps } = this.props;
        return (
          <WrappedComponent
            {...otherProps}
            {...this.state.props}
            updatePoller={this.updatePoller}
          />
        );
      }
    };
}
