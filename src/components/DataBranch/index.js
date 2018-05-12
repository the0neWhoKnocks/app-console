import React, { Component, Fragment } from 'react';
import setTransitionState from '../../utils/setTransitionState';
import styles from './styles';

class DataBranch extends Component {
  constructor(props) {
    super();

    this.state = {
      heightClass: '',
      toggled: props.toggled || false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(ev) {
    const input = ev.currentTarget;
    const children = input.parentNode.childNodes[2];
    const newState = {
      heightClass: (input.checked) ? 'is--opening' : 'is--closing',
      toggled: input.checked,
    };

    children.classList.add(`${styles.autoHeight}`);
    newState.heightRule = {
      height: `${children.offsetHeight}px`,
    };
    children.classList.remove(`${styles.autoHeight}`);

    // To allow for child branches to expand, the height has to be removed at the end of the
    // transition. On close, the height will be recalculated for the close transition.
    const cb = () => {
      children.removeEventListener('transitionend', cb);
      this.setState({
        heightClass: (newState.toggled) ? 'is--open' : '',
        heightRule: {
          height: (newState.toggled) ? 'auto' : '',
        },
      });
    };
    children.addEventListener('transitionend', cb, false);

    // for some reason this is needed, otherwise the opening transition doesn't get applied
    setTransitionState(this, newState, () => {
      // On close, the current height has to be added for a base to animate from,
      // after that, we can trigger the actual close
      if (!newState.toggled) {
        setTransitionState(this, {
          heightRule: {
            height: '0px',
          }
        });
      }
    });
  }

  render() {
    return (
      <Fragment>
        <input
          className={`${styles.input}`}
          type="checkbox"
          id={this.props.inputID}
          checked={this.state.toggled}
          onChange={this.handleToggle}
        />
        <label
          className={`${styles.label} ${this.props.labelClass}`}
          htmlFor={this.props.inputID}
        >{this.props.labelText}</label>
        <div className={`${styles.children} ${this.state.heightClass}`} style={this.state.heightRule}>{this.props.branchData}</div>
      </Fragment>
    );
  }
}

export default DataBranch;