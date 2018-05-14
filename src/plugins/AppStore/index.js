import React from 'react';
import { css } from 'glamor';
import store from '../../store';
import DataTree from '../../components/DataTree';

const AppStorePlugin = ({ data }) => <DataTree data={data} />;
const panelClass = css({
  overflow: 'auto',
});

const appStorePlugin = {
  Component: AppStorePlugin,
  icon: 'layers',
  id: 'storeToggle',
  name: 'Store',
  panelClass,
  props: {
    data: store.getState(),
  },
};

export default appStorePlugin;
