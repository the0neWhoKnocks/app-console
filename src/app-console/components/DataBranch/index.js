import React, { Component, Fragment } from 'react';
import { object, string } from 'prop-types';
import { transitionEnd } from '../../utils/prefixTransition';
import setTransitionState from '../../utils/setTransitionState';
import styles from './styles';

class DataBranch extends Component {
  constructor(props) {
    super();

    this.state = {
      heightClass: '',
      styles: undefined,
      toggled: props.toggled || false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * To ensure a branch has the correct height during it's opening or closing
   * transition, we have to calculate the expanded height. That's done via by
   * adding a class that sets height to `auto`, we then grab the height of the
   * branch (including any opened or closed children), and then reset the height
   * back to what it was.
   *
   * @return {Number}
   */
  getExpandedHeight(){
    let height;

    this.childrenEl.classList.add(`${styles.autoHeight}`);
    height = this.childrenEl.offsetHeight;
    this.childrenEl.classList.remove(`${styles.autoHeight}`);

    return height;
  }

  /**
   * Handles the toggling of a branch.
   *
   * @param {Event} ev - Click
   */
  handleToggle(ev) {
    const checked = this.inputEl.checked;
    const newState = {
      heightClass: (checked) ? 'is--opening' : 'is--closing',
      styles: {
        height: `${this.getExpandedHeight()}px`,
      },
      toggled: checked,
    };

    /**
     * Waiting on CSS transitions to end after an open or close allows us to
     * set the height of a branch to `auto` so that heights aren't locked in.
     * If the heights were locked, we'd end up with bad height calculations if
     * nested branches were opened or closed.
     */
    this.transitionCB = this.handleTransitionEnd.bind(this);
    this.childrenEl.addEventListener(transitionEnd, this.transitionCB, false);

    setTransitionState(this, newState, () => {
      if (!checked) {
        /**
         * When a user is closing a branch, we have to temporarily set the
         * height to a pixel value of zero so that the CSS transition kicks in.
         */
        setTransitionState(this, {
          styles: {
            height: '0px',
          }
        });
      }
    });
  }

  /**
   * After a branch has opened, the height needs to be set to auto to allow for
   * internal branches to open or close and not be locked in by the parent's
   * hard-coded height.
   */
  handleTransitionEnd() {
    this.childrenEl.removeEventListener(transitionEnd, this.transitionCB);
    this.setState({
      heightClass: (this.state.toggled) ? 'is--open' : '',
      styles: {
        height: (this.state.toggled) ? 'auto' : '',
      },
    });
  }

  render() {
    const {
      branchData,
      inputID,
      labelClass,
      labelText,
    } = this.props;

    return (
      <Fragment>
        <input
          className={`${styles.input}`}
          type="checkbox"
          id={inputID}
          checked={this.state.toggled}
          onChange={this.handleToggle}
          ref={(input) => {this.inputEl = input}}
        />
        <label
          className={`${styles.label} ${labelClass}`}
          htmlFor={inputID}
        >{labelText}</label>
        <div
          className={`${styles.children} ${this.state.heightClass}`}
          style={this.state.styles}
          ref={(children) => {this.childrenEl = children}}
        >{branchData}</div>
      </Fragment>
    );
  }
}

DataBranch.propTypes = {
  branchData: object,
  inputID: string,
  labelClass: string,
  labelText: string,
};

export default DataBranch;
