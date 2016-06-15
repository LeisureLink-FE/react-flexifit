import { Component, Children, cloneElement } from 'react';
import choke from 'lodash/throttle';

const isPositiveFinite = (num) => (num > 0) && Number.isFinite(num);

export default class FlexiFrame extends Component {

  constructor({aspectRatio, width, height, throttle=100, children}) {
    super();
    let flexer;
    try {
      flexer = Children.only(children);
    } catch(e) {
      if (process && process.env !== 'production') {
        throw `
It looks as though you tried to include more than one child to Flexifit.
Flexifit can only manage one non-responsive element at a time.
Try wrapping additional non-responsive elements in their own Flexifit component.
`
      }
    }
    const { style, ...flexerProps } = flexer.props;
    const flexifit = this;
    this.throttledResize = choke(this.handleResize, throttle).bind(this);
    this.state = {
      ratio: aspectRatio || (isPositiveFinite(width / height) ? width / height : 1),
      flexer: cloneElement(flexer, {
        ...flexerProps,
        key: 1,
        onLoad: flexifit.throttledResize,
        style: {
          ...(style || {}),
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }
      },
      [flexer.children])
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.throttledResize);
    this.throttledResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledResize);
  }

  handleResize() {
    const width = parseInt(window.getComputedStyle(this.flexWrapper).width) || 0;
    this.setState({ width });
  }

  render() {
    const { width, ratio } = this.state;
    const height = (width || 1) / ratio;
    return (
      <div
          style={{
            width: '100%',
            height: `${ height }px`,
            position: 'relative'
          }}
          ref={(f) => this.flexWrapper = f}
      >
        {[this.state.flexer]}
      </div>
    );
  }
}
