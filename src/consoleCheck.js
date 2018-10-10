/* eslint-disable global-require */
import React from 'react';
import jsCookie from 'js-cookie';

export const COOKIE = 'APP_CONSOLE';

export const handlePluginLoad = (ndx) => {
  jsCookie.set(COOKIE, {
    pluginNdx: +ndx,
  });
};

export default ({
  component,
  cookieOptions,
}) => {
  if (!window.enableConsole) {
    window.enableConsole = () => {
      const Loadable = require('react-loadable');
      const { store } = component.context;
      let cookieVal = jsCookie.getJSON(COOKIE);
      
      component.setState({
        Console: Loadable.Map({
          loader: {
            appConsole: () => import(
              /* webpackChunkName: "appConsole" */
              './app-console'
            ),
            consolePlugins: () => import(
              /* webpackChunkName: "consolePlugins" */
              './consolePlugins'
            ),
          },
          loading: () => null,
          render: (loaded) => {
            const { Console } = loaded.appConsole;
            const { default: consolePlugins } = loaded.consolePlugins;
            const plugins = consolePlugins({
              appConsole: loaded.appConsole,
              store,
            });
            const consoleProps = {
              plugins,
              onPluginLoad: handlePluginLoad,
            };
            
            if(cookieVal) consoleProps.defaultPluginNdx = cookieVal.pluginNdx;
            
            return <Console {...consoleProps} />;
          },
        }),
        consoleEnabled: true,
      });

      if(cookieVal === undefined) jsCookie.set(COOKIE, '', cookieOptions);
    };

    window.disableConsole = () => {
      jsCookie.remove(COOKIE, {
        domain: cookieOptions.domain,
        path: cookieOptions.path,
      });
      component.setState({
        Console: () => null,
        consoleEnabled: false,
      });
    };
  }

  if (jsCookie.get(COOKIE) !== undefined) {
    window.enableConsole();
  }
};
