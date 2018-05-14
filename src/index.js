import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import App from './App';
import Console from './components/Console';
import consolePlugins from './consolePlugins';

render(
  <Provider store={store}>
    <Fragment>
      <App />
      <Console plugins={consolePlugins} />
    </Fragment>
  </Provider>,
  document.getElementById('root')
);
