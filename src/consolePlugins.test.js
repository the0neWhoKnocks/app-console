import React from 'react';
import 'react-redux';
import { actions } from './store';
import consolePlugins, {
  scrollablePanelStyles,
} from './consolePlugins';

const SCROLLABLE_PANEL = scrollablePanelStyles();
let mockState;
let mockStore;

jest.mock('react-redux', () => ({
  connect: jest.fn((mapState, mapDispatch) => {
    return Component => (
      <Component
        {...mapState(mockState)}
        {...mapDispatch(mockStore.dispatch)}
      />
    );
  }),
}));
jest.mock('./store', () => ({
  actions: {
    setFlags: jest.fn(),
    setOverrides: jest.fn(),
  },
}));

describe('consolePlugins', () => {
  let appConsole;
  let plugins;
  let plugin;

  beforeEach(() => {
    mockState = {
      flags: {
        isDisabled: false,
      },
      overrides: {
        opt1: true,
      },
      metaData: {},
      providers: {},
    };
    appConsole = {
      AppInfo: () => <div />,
      AppOptions: () => <div />,
      AppStore: () => <div />,
      Providers: () => <div />,
      consolePlugin: jest.fn(pluginConfig => pluginConfig),
    };
    mockStore = {
      getState: jest.fn(() => mockState),
      dispatch: jest.fn(),
    };

    plugins = consolePlugins({ appConsole, store: mockStore });
  });
  
  describe('AppInfo Plugin', () => {
    beforeEach(() => {
      plugin = plugins[0];
    });

    it('should set up the AppInfo plugin', () => {
      expect(plugin).toEqual({
        Component: expect.any(Function),
        icon: 'info',
        id: 'infoConsolePlugin',
        name: 'Info',
        props: { data: mockState.metaData },
      });
    });
  });

  describe('AppStore Plugin', () => {
    beforeEach(() => {
      plugin = plugins[1];
    });

    it('should set up the AppStore plugin', () => {
      expect(plugin).toEqual({
        Component: expect.any(Function),
        icon: 'storage',
        id: 'storeConsolePlugin',
        name: 'Store',
        panelClass: `${SCROLLABLE_PANEL}`,
        props: { data: mockState },
      });
    });
  });
  
  describe('AppOptions Plugin', () => {
    beforeEach(() => {
      plugin = plugins[2];
    });

    it('should set up the AppOptions plugin', () => {
      expect(plugin).toEqual(expect.objectContaining({
        icon: 'toggle_off',
        id: 'optionsConsolePlugin',
        name: 'Options',
        panelClass: `${SCROLLABLE_PANEL}`,
      }));
      expect(plugin.Component.type).toEqual(expect.any(Function));
      expect(plugin.Component.props).toEqual({
        changeOptions: expect.any(Function),
        sections: [
          {
            addParam: true,
            handler: 'setFlags',
            options: mockState.flags,
            queryPrefix: 'flags.',
            title: 'Feature Flags',
          },
          {
            handler: 'setOverrides',
            options: mockState.overrides,
            title: 'Overrides',
          },
        ],
      });
    });

    it('should update options with new value', () => {
      let newOpts = { isDisabled: true };
      let handler = 'setFlags';
      plugin.Component.props.changeOptions(newOpts, handler);
      expect(actions[handler]).toHaveBeenCalledWith(newOpts);
      
      newOpts = { opt1: false };
      handler = 'setOverrides';
      plugin.Component.props.changeOptions(newOpts, handler);
      expect(actions[handler]).toHaveBeenCalledWith(newOpts);
    });
  });

  describe('Providers Plugin', () => {
    beforeEach(() => {
      plugin = plugins[3];
    });

    it('should set up the Providers plugin', () => {
      expect(plugin).toEqual({
        Component: expect.any(Function),
        icon: 'device_hub',
        id: 'providersConsolePlugin',
        name: 'Providers',
        props: { providers: mockState.providers },
      });
    });
  });
});
