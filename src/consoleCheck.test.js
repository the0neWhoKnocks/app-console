import React from 'react';
import 'react-dom';
import { shallow } from 'enzyme';
import jsCookie from 'js-cookie';
import 'react-loadable';
import './app-console';
import './consolePlugins';
import consoleCheck, {
  COOKIE,
  handlePluginLoad,
} from './consoleCheck';

const mock_LOADABLE_RET = 'LoadableComponent';
let loadableConfig;
let mockPortalArgs;

jest.mock('js-cookie');
jest.mock('react-dom', () => ({
  createPortal: jest.fn((component, el) => {
    mockPortalArgs = {
      component,
      el,
    };
    return component;
  }),
}));
jest.mock('react-loadable', () => ({
  Map: (conf) => {
    loadableConfig = conf;
    return mock_LOADABLE_RET;
  },
}));
jest.mock('./app-console', () => {});
jest.mock('./consolePlugins', () => {});

describe('consoleCheck', () => {
  let component;
  let cookieOptions;
  let state;
  
  document.body.innerHTML = '<div id="appConsoleRoot"></div>';

  beforeEach(() => {
    component = {
      context: {
        store: jest.fn(),
      },
      setState: (newState) => {
        state = newState;
      },
    };
    cookieOptions = {
      domain: '.nike.com',
      path: '/',
    };
  });

  it('should set up API', () => {
    consoleCheck({ component, cookieOptions });

    expect(window.enableConsole).toEqual(expect.any(Function));
    expect(window.disableConsole).toEqual(expect.any(Function));
  });

  it('should enable the console on load if the cookie was previously set', () => {
    jest.spyOn(window, 'enableConsole');

    expect(jsCookie.set).not.toHaveBeenCalled();

    jsCookie.get.mockReturnValue(true);
    consoleCheck({ component, cookieOptions });

    expect(window.enableConsole).toHaveBeenCalled();
  });

  describe('enableConsole', () => {
    const PLUGINS_RESULT = [];
    const CONSOLE_CONTENTS = 'ConsoleComponent';
    let Console;
    let consolePlugins;
    let loaded;
    let wrapper;

    beforeEach(() => {
      consoleCheck({ component, cookieOptions });
      window.enableConsole();

      Console = (props) => <div {...props}>{CONSOLE_CONTENTS}</div>;
      consolePlugins = {
        default: jest.fn(() => PLUGINS_RESULT),
      };
      loaded = {
        appConsole: { Console },
        consolePlugins,
      };
      mockPortalArgs = undefined;
      wrapper = shallow(loadableConfig.render(loaded));
    });
    
    it('should render the Console via a Portal', () => {
      expect(mockPortalArgs.component.type.name).toEqual('Console');
      expect(mockPortalArgs.el.id).toEqual('appConsoleRoot');
    });

    it('should initialize a Loadable component', () => {
      expect(state).toEqual({
        Console: mock_LOADABLE_RET,
        consoleEnabled: true,
      });
      expect(loadableConfig.loader.appConsole()).toEqual(expect.any(Promise));
      expect(loadableConfig.loader.consolePlugins()).toEqual(expect.any(Promise));
      expect(loadableConfig.loading()).toEqual(null);
      expect(wrapper.children().text()).toEqual(CONSOLE_CONTENTS);
    });

    it('should maintain the enabled state via a cookie', () => {
      expect(jsCookie.set).toHaveBeenCalledWith(COOKIE, '', cookieOptions);
    });
    
    it('should NOT set the cookie again if it has previously been set', () => {
      jsCookie.set.mockReset();
      jsCookie.getJSON.mockReturnValue({});
      window.enableConsole();
      
      expect(jsCookie.set).not.toHaveBeenCalled();
    });
    
    it('should load the previously loaded plugin when first enabled', () => {
      const pluginNdx = 2;
      jsCookie.getJSON.mockReturnValue({ pluginNdx });
      
      window.enableConsole();
      wrapper = shallow(loadableConfig.render(loaded));
      wrapper.update();
      
      expect(wrapper.props().defaultPluginNdx).toEqual(pluginNdx);
    });
  });

  describe('disableConsole', () => {
    it('should remove any stored console state', () => {
      window.disableConsole();
      
      expect(jsCookie.remove).toHaveBeenCalledWith(COOKIE, {
        domain: cookieOptions.domain,
        path: cookieOptions.path,
      });
      expect(state).toEqual(expect.objectContaining({
        consoleEnabled: false,
      }));
      expect(shallow(<state.Console />).text()).toEqual('');
    });
  });

  describe('handlePluginLoad', () => {
    it('should store data about the currently loaded plugin', () => {
      const ndx = '2';
      handlePluginLoad(cookieOptions, ndx);
      
      expect(jsCookie.set).toHaveBeenCalledWith(COOKIE, {
        pluginNdx: +ndx,
      }, cookieOptions);
    });
  });
});
