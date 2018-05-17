import React, { Component } from 'react';
import { func, number, object, oneOfType, shape, string } from 'prop-types';
import styles from './styles';

class Slide extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      ndx: undefined,
      prevNdx: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.component && +nextProps.ndx !== +prevState.ndx) {
      const newState = {
        // Using spread converts `empty` entries to `undefined`. `map` will skip
        // `empty` items (so less logic to maintain), but `undefined` is
        // iterated over
        items: [].concat(prevState.items),
        ndx: +nextProps.ndx,
      };

      newState.items[nextProps.ndx] = nextProps.component;
      if (prevState.ndx !== undefined) newState.prevNdx = +prevState.ndx;

      return newState;
    }

    return null;
  }

  render() {

    return (
      <div className={`${styles.container} ${this.props.className}`}>
        {this.state.items.map((item, ndx) => {
          let panelClass = '';

          // first item will always slide from bottom
          if (this.state.prevNdx === undefined && ndx === this.state.ndx) {
            panelClass = styles.slideFromBottom;
          }
          // figure out the directions items need to slide if there are more than one
          else {
            if (ndx === this.state.ndx) {
              if (ndx > this.state.prevNdx) panelClass = styles.slideFromRight;
              else panelClass = styles.slideFromLeft;
            }

            if (ndx === this.state.prevNdx) {
              if (ndx > this.state.ndx) panelClass = styles.slideFromCenterToRight;
              else panelClass = styles.slideFromCenterToLeft;
            }
          }

          return (
            <div className={`${styles.panel} ${this.props.panelClass} ${panelClass}`} key={item.key}>
              <item.Component {...item.props} />
            </div>
          );
        })}
      </div>
    );
  }
}

Slide.propTypes = {
  className: string,
  component: shape({
    Component: func,
    key: string,
    props: object,
  }),
  ndx: oneOfType([
    number,
    string,
  ]),
  panelClass: string,
};

export default Slide;
