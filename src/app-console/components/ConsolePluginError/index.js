import React from 'react';
import { node } from 'prop-types';
import styles from './styles';

const ConsolePluginError = ({ children }) => <div className={styles.error}>{children}</div>;

ConsolePluginError.propTypes = {
  children: node,
};

export default ConsolePluginError;
