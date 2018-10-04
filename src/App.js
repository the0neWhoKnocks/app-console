import React, { Component, Fragment } from 'react';
import { shape } from 'prop-types';
import { css } from 'glamor';
import jsCookie from 'js-cookie';

const styles = {
  consoleBtn: css({
    width: '10em',
    fontSize: '1em',
    padding: '0.5em',
    border: 'solid 1px',
    borderRadius: '0.3em',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background 0.25s',
    outline: 'none',
    
    '.is--disable': {
      background: '#ffdcdc',
    },
    
    '.is--enable': {
      background: '#dcfff6',
    },
  }),
  nav: css({
    textAlign: 'right',
  }),
};
const COOKIE = 'APP_CONSOLE';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      Console: () => null,
      consoleEnabled: jsCookie.get(COOKIE),
    };
    
    this.handleEDConsole = this.handleEDConsole.bind(this);
  }
  
  componentDidMount() {
    const cookieOptions = {
      maxAge: 60 * 60 * 24 * 365 * 2,
      path: '/',
    };
    
    window.enableConsole = () => {
      const Loadable = require('react-loadable');
      const { store } = this.context;

      this.setState({
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

            return <Console plugins={plugins} />;
          },
        }),
        consoleEnabled: true,
      });

      jsCookie.set(COOKIE, true, cookieOptions);
    };

    window.disableConsole = () => {
      jsCookie.remove(COOKIE, {
        domain: cookieOptions.domain,
        path: cookieOptions.path,
      });
      this.setState({
        Console: () => null,
        consoleEnabled: false,
      });
    };

    if (jsCookie.get(COOKIE)) {
      window.enableConsole();
    }
  }
  
  handleEDConsole() {
    if (jsCookie.get(COOKIE)) {
      window.disableConsole();
    }
    else {
      window.enableConsole();
    }
  }
  
  render() {
    const {
      Console,
      consoleEnabled,
    } = this.state;
    
    return (
      <Fragment>
        <nav className={`${styles.nav}`}>
          <button 
            className={`${styles.consoleBtn} ${(consoleEnabled) ? 'is--disable' : 'is--enable'}`}
            onClick={this.handleEDConsole}
          >
            {(consoleEnabled) ? 'Disable' : 'Enable'} Console
          </button>
        </nav>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. </p>
          <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
          <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. </p>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. </p>
          <p>Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. </p>
          <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
          <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. </p>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. </p>
          <p>Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. </p>
        </div>
        <Console />
      </Fragment>
    );
  }
}

App.contextTypes = {
  store: shape({}),
};

export default App;
