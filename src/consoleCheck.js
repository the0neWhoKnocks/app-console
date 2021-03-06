/* eslint-disable global-require */
import React from 'react';
import jsCookie from 'js-cookie';

export const COOKIE = 'APP_CONSOLE';

export const handlePluginLoad = (cookieOptions, ndx) => {
  jsCookie.set(COOKIE, {
    pluginNdx: +ndx,
  }, cookieOptions);
};

export default ({
  component,
  cookieOptions,
}) => {
  if (!window.enableConsole) {
    window.enableConsole = () => {
      const Loadable = require('react-loadable');
      const ReactDOM = require('react-dom');
      const { store } = component.context;
      const cookieVal = jsCookie.getJSON(COOKIE);
      
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
              onPluginLoad: handlePluginLoad.bind(null, cookieOptions),
            };
            
            if(cookieVal) consoleProps.defaultPluginNdx = cookieVal.pluginNdx;
            
            return ReactDOM.createPortal(
              <Console {...consoleProps} />,
              document.getElementById('appConsoleRoot')
            );
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
