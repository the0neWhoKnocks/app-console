import React from 'react';
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

export default Toggle;