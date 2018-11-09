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
    AppInfo,
    AppOptions,
    AppStore,
    Providers,
    consolePlugin,
  } = appConsole;
  
  const SCROLLABLE_PANEL = scrollablePanelStyles();
  
  return [
    consolePlugin({
      Component: AppInfo,
      icon: 'info',
      id: 'infoConsolePlugin',
      name: 'Info',
      props: {
        data: store.getState().metaData,
      },
    }),
    
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
      Component: connect(
        // mapStateToProps
        (state) => {
          return {
            sections: [
              {
                addParam: true,
                handler: 'setFlags',
                options: state.flags,
                queryPrefix: 'flags.',
                title: 'Feature Flags',
              },
              {
                handler: 'setOverrides',
                options: state.overrides,
                title: 'Overrides',
              },
            ],
          };
        },
        // mapDispatchToProps
        dispatch => ({
          changeOptions: (options, handler) => {
            switch (handler) { // eslint-disable-line default-case
              case 'setFlags':
              case 'setOverrides':
                dispatch(actions[handler](options));
                break;
            }
          },
        })
      )(AppOptions),
      icon: 'toggle_off',
      id: 'optionsConsolePlugin',
      name: 'Options',
      panelClass: `${SCROLLABLE_PANEL}`,
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
  ];
};

export default plugins;
