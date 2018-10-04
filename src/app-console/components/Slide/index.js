import React, { Component } from 'react';
import { string } from 'prop-types';
import styles from './styles';

class Slide extends Component {
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

  constructor() {
    super();

    this.state = {
      /**
       * The items in the Slide
       *
       * @type {Array.<{Component: Function, key: String, props: Object}>}
       */
      items: [],
      /**
       * The current Slide index
       *
       * @type {Number|String}
       */
      ndx: undefined,
      prevNdx: undefined,
    };
  }

  render() {
    return (
      <div className={`${styles.container} ${this.props.className}`}>
        {this.state.items.map((item, ndx) => {
          let panelClass = '';

          // first item will always slide from bottom
          if (this.state.prevNdx === undefined && ndx === this.state.ndx) {
            panelClass = styles.slideFromBottom;
          } // eslint-disable-line brace-style
          // figure out the directions that items need to slide if there are more than one
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
  panelClass: string,
};

export default Slide;
