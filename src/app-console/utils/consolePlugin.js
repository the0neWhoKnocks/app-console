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
  // Verify the user passed in the proper opt types
  if(typeof Component !== 'function')
    throw new Error("You didn't pass in a Function for `Component`");

  if(typeof icon !== 'string')
    throw new Error("You didn't pass in a String for `icon`");

  if(typeof id !== 'string') {
    const random = Math.random(Date.now());
    id = `${random}ConsolePlugin`;
  }

  if(typeof name !== 'string')
    throw new Error("You didn't pass in a String for `name`");

  if(typeof panelClass !== 'string')
    throw new Error("You didn't pass in a String for `name`");

  if(typeof props !== 'object')
    throw new Error("You didn't pass in an Object for `props`");

  // Could be used to normalize or transform props later
  return {
    Component,
    icon,
    id,
    name,
    panelClass,
    props,
  };
};

export default consolePlugin;
