import React from 'react';
import store from '../../store';
import DataTree from '../../components/DataTree';

const AppStorePlugin = ({ data }) => <DataTree data={data} />;

const appStorePlugin = {
  Component: AppStorePlugin,
  icon: 'layers',
  id: 'storeToggle',
  name: 'Store',
  props: {
    data: store.getState(),
  }
};

export default appStorePlugin;