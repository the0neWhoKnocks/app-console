import React, { Component } from 'react';
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
        items: [...prevState.items],
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
          if (!item) return null;

          let panelClass = '';

          // first item will always slide from bottom
          if (this.state.prevNdx === undefined && ndx === this.state.ndx) {
            panelClass = styles.slideFromBottom;
          }
          // figure out the directions items need to slide if there are more than one
          else if (this.state.prevNdx !== undefined) {
            if (ndx === this.state.ndx) {
              if (ndx > this.state.prevNdx) panelClass = styles.slideFromRight;
              else panelClass = styles.slideFromLeft;
            }
            else if (ndx === this.state.prevNdx) {
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

export default Slide;
