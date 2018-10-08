import React from 'react';
import { array, object, oneOfType } from 'prop-types';
import ConsolePluginError from '../../ConsolePluginError';
import DataNode from '../../DataNode';

const AppStore = ({ data }) => {
  return (!data)
    ? (
      <ConsolePluginError>
        No store <code>data</code> was provided.
      </ConsolePluginError>
    )
    : <DataNode data={data} />;
};

AppStore.propTypes = {
  data: oneOfType([
    array,
    object,
  ]),
};

export default AppStore;
