import React from 'react';
import { bool, func, object, string } from 'prop-types';
import styles from './styles';

const Toggle = ({
  children,
  childStyle,
  data,
  id,
  onToggle,
  rootClass,
  style,
  title,
  toggled,
}) => {

  return (
    <div className={`toggle ${rootClass}`} style={style}>
      <input
        className={`${styles.input}`}
        type="checkbox"
        id={id}
        checked={toggled}
        onChange={onToggle}
        {...data}
      />
      <label
        className={`${styles.label}`}
        htmlFor={id}
        style={childStyle}
        title={title}
      >{children}</label>
    </div>
  );
};

Toggle.propTypes = {
  // CSS styles that are applied to the label wrapping the children
  childStyle: object,
  // An Object containing `data-` attributes
  data: object,
  // A unique ID for the toggle
  id: string.isRequired,
  // A handler for when it's toggled on or off
  onToggle: func,
  // A CSS class for the toggle
  rootClass: string,
  // CSS styles that are applied to the toggle
  style: object,
  // A title for the label, so text is displayed on hover
  title: string,
  // Whether or not the toggle is active
  toggled: bool,
};

export default Toggle;
