import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import App from './App';

render(
  <Provider store={store}>
    <Fragment>
      <App />
      <div id="appConsoleRoot"></div>
    </Fragment>
  </Provider>,
  document.getElementById('root')
);
