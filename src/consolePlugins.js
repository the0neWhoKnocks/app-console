import { css } from 'glamor';
import { connect } from 'react-redux';
import store, { actions } from './store';
import {
  consolePlugin,
  AppStore,
  FeatureFlags,
  MetaData,
  Providers,
} from './app-console';

const plugins = [
  consolePlugin({
    Component: AppStore,
    icon: 'layers',
    id: 'storeConsolePlugin',
    name: 'Store',
    panelClass: css({
      overflow: 'auto',
    }).toString(),
    props: {
      data: store.getState(),
    },
  }),

  consolePlugin({
    Component: Providers,
    icon: 'device_hub',
    id: 'providersConsolePlugin',
    name: 'Providers',
    props: {
      providers: store.getState().providers,
    },
  }),

  consolePlugin({
    Component: connect(
      // mapStateToProps
      (state) => ({
        flags: state.flags,
      }),
      // mapDispatchToProps
      {
        setFlags: actions.setFlags,
      }
    )(FeatureFlags),
    icon: 'book',
    id: 'flagsConsolePlugin',
    name: 'Flags',
  }),

  consolePlugin({
    Component: MetaData,
    icon: 'info',
    id: 'metadataConsolePlugin',
    name: 'Meta Data',
    props: {
      data: store.getState().metaData,
    },
  }),
];

export default plugins;
