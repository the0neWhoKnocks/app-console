import React from 'react';
import { array, object, oneOfType } from 'prop-types';
import ConsolePluginError from '../../ConsolePluginError';
import DataTree from '../../DataTree';

const AppStore = ({ data }) => {
  return (!data)
    ? (
      <ConsolePluginError>
        No store <code>data</code> was provided.
      </ConsolePluginError>
    )
    : <DataTree data={data} />;
};

AppStore.propTypes = {
  data: oneOfType([
    array,
    object,
  ]),
};

export default AppStore;
