import React from 'react';
import ConsolePluginError from '../../ConsolePluginError';
import DataTree from '../../DataTree';

const ConsoleAppStore = ({ data }) => (!data)
  ? (
      <ConsolePluginError>
        No store <code>data</code> was provided.
      </ConsolePluginError>
    )
  : <DataTree data={data} />;

export default ConsoleAppStore;
