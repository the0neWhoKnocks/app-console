import React from 'react';
import { bool, func, node, shape, string } from 'prop-types';
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
  const dynamicProps = {
    onChange: onToggle,
  };
  const toggledClass = (toggled) ? ' is--current' : '';
  if (!onToggle) dynamicProps.defaultChecked = toggled;
  else dynamicProps.checked = toggled;

  return (
    <div className={`toggle ${rootClass}`} style={style}>
      <input
        className={`${styles.input}`}
        type="checkbox"
        id={id}
        {...dynamicProps}
        {...data}
      />
      <label
        className={`toggle__btn ${styles.label} ${toggledClass}`}
        htmlFor={id}
        style={childStyle}
        title={title}
      >
        <div className={`toggle__content-wrapper ${styles.contentWrapper}`}>
          {children}
        </div>
      </label>
    </div>
  );
};

Toggle.defaultProps = {
  rootClass: '',
  toggled: false,
};
Toggle.propTypes = {
  children: node,
  // CSS styles that are applied to the label wrapping the children
  childStyle: shape({}),
  // An Object containing `data-` attributes
  data: shape({}),
  // A unique ID for the toggle
  id: string.isRequired,
  // A handler for when it's toggled on or off
  onToggle: func,
  // A CSS class for the toggle
  rootClass: string,
  // CSS styles that are applied to the toggle
  style: shape({}),
  // A title for the label, so text is displayed on hover
  title: string,
  // Whether or not the toggle is active
  toggled: bool,
};

export default Toggle;
