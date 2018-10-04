import { css } from 'glamor';
import { connect } from 'react-redux';
import { actions } from './store';

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
  const scrollablePanel = css({
    overflowY: 'auto',
  });
  
  return [
    consolePlugin({
      Component: AppStore,
      icon: 'layers',
      id: 'storeConsolePlugin',
      name: 'Store',
      panelClass: `${scrollablePanel}`,
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
};

export default plugins;
