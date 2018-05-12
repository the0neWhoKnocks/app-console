import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import App from './App';
import Console from './components/Console';
import appStorePlugin from './plugins/AppStore';
import providersPlugin from './plugins/Providers';
import flagsPlugin from './plugins/FeatureFlags';
import metadataPlugin from './plugins/MetaData';

// this patches a bug in codesandbox where they duplicate head tags into the body
// https://github.com/CompuIves/codesandbox-client/issues/556
const duplicateRemoval = setInterval(() => {
  const duplicateTag = document.querySelector('body #materialIcons')
  
  if(duplicateTag){
    clearInterval(duplicateRemoval);
    duplicateTag.outerHTML = '';
  }
}, 100);

render(
  <Provider store={store}>
    <Fragment>
      <App />
      <Console
        plugins={[
          appStorePlugin, 
          providersPlugin, 
          flagsPlugin, 
          metadataPlugin
        ]}
      />
    </Fragment>
  </Provider>,
  document.getElementById('root')
);
