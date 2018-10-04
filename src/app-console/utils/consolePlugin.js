import React from 'react';

const defaultComponent = () => (
  <div>
    This is a default Plugin.
  </div>
);

const consolePlugin = ({
  Component = defaultComponent,
  icon = 'help',
  id = undefined,
  name = 'Undefined',
  panelClass = '',
  props = {},
} = {}) => {
  let transformedId = id;

  // Verify the user passed in the proper opt types
  if (typeof Component !== 'function') {
    throw new Error("You didn't pass in a Function for `Component`");
  }

  if (typeof icon !== 'string') {
    throw new Error("You didn't pass in a String for `icon`");
  }

  if (typeof id !== 'string') {
    const random = Math.random(Date.now());
    transformedId = `${random}ConsolePlugin`;
  }

  if (typeof name !== 'string') {
    throw new Error("You didn't pass in a String for `name`");
  }

  if (typeof panelClass !== 'string') {
    throw new Error("You didn't pass in a String for `panelClass`");
  }

  if (typeof props !== 'object') {
    throw new Error("You didn't pass in an Object for `props`");
  }

  // Could be used to normalize or transform props later
  return {
    Component,
    icon,
    id: transformedId,
    name,
    panelClass,
    props,
  };
};

export default consolePlugin;
export {
  defaultComponent,
};
