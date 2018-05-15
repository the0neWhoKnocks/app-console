import React from 'react';
import styles from './styles';

const ConsolePluginError = ({children}) => <div className={styles.error}>{children}</div>;

export default ConsolePluginError;
