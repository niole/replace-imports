import { Component, Children } from 'react';
import { number } from 'prop-types';

export const defaultInterval = 1000;

/**
 * A utility component that will rerender on a regular interval (by default,
 * every second). It accepts its children as a function, e.g.
 * `<RenderOnInterval>{() => String(new Date())}</RenderOnInterval>`
 */
export class RenderOnInterval extends Component {
  componentDidMount() {
    this.intervalId = setInterval(this.onInterval, this.props.interval);
  }
  componentDidUpdate(previousProps) {
    const intervalDidChange = previousProps.interval !== this.props.interval;
    if (intervalDidChange) {
      clearInterval(this.intervalId);
      this.forceUpdate();
      this.intervalId = setInterval(this.onInterval, this.props.interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  onInterval = () => this.forceUpdate();
  render() {
    const { children } = this.props;
    const finalChildren =
      typeof children === 'function'
        ? children()
        : children;
    return Children.only(finalChildren);
  }
}

RenderOnInterval.propTypes = {
  interval: number,
};

RenderOnInterval.defaultProps = {
  interval: defaultInterval,
};

export default RenderOnInterval;
