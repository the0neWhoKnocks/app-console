import { css } from 'glamor';
import { connect } from 'react-redux';
import { actions } from './store';

export const scrollablePanelStyles = () => css({
  overflowY: 'auto',
});

const plugins = ({
  appConsole,
  store,
}) => {
  const {
    AppStore,
    FeatureFlags,
    MetaData,
    Providers,
    consolePlugin,
  } = appConsole;
  
  const SCROLLABLE_PANEL = scrollablePanelStyles();
  
  return [
    consolePlugin({
      Component: AppStore,
      icon: 'storage',
      id: 'storeConsolePlugin',
      name: 'Store',
      panelClass: `${SCROLLABLE_PANEL}`,
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
        dispatch => ({
          setFlags: flags => dispatch(actions.setFlags(flags)),
        }),
      )(FeatureFlags),
      icon: 'toggle_off',
      id: 'flagsConsolePlugin',
      name: 'Flags',
      panelClass: `${SCROLLABLE_PANEL}`,
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
};

export default plugins;
