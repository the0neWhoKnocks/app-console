import React from 'react';
import 'react-redux';
import { actions } from './store';
import consolePlugins, {
  SCROLLABLE_PANEL,
} from './consolePlugins';

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
      metaData: {},
      providers: {},
    };
    appConsole = {
      AppStore: () => <div />,
      FeatureFlags: () => <div />,
      MetaData: () => <div />,
      Providers: () => <div />,
      consolePlugin: jest.fn(pluginConfig => pluginConfig),
    };
    mockStore = {
      getState: jest.fn(() => mockState),
      dispatch: jest.fn(),
    };

    plugins = consolePlugins({ appConsole, store: mockStore });
  });

  describe('AppStore Plugin', () => {
    beforeEach(() => {
      plugin = plugins[0];
    });

    it('should set up the AppStore plugin', () => {
      expect(plugin).toEqual({
        Component: expect.any(Function),
        icon: 'layers',
        id: 'storeConsolePlugin',
        name: 'Store',
        panelClass: `${SCROLLABLE_PANEL}`,
        props: { data: mockState },
      });
    });
  });

  describe('Providers Plugin', () => {
    beforeEach(() => {
      plugin = plugins[1];
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

  describe('FeatureFlags Plugin', () => {
    beforeEach(() => {
      plugin = plugins[2];
    });

    it('should set up the FeatureFlags plugin', () => {
      expect(plugin).toEqual(expect.objectContaining({
        icon: 'book',
        id: 'flagsConsolePlugin',
        name: 'Flags',
        panelClass: `${SCROLLABLE_PANEL}`,
      }));
      expect(plugin.Component.type).toEqual(expect.any(Function));
      expect(plugin.Component.props).toEqual({
        flags: mockState.flags,
        setFlags: expect.any(Function),
      });
    });

    it('should update flags with new value', () => {
      const updatedFlags = {
        isDisabled: true,
      };
      plugin.Component.props.setFlags(updatedFlags);
      
      expect(actions.setFlags).toHaveBeenCalledWith(updatedFlags);
    });
  });
  
  describe('MetaData Plugin', () => {
    beforeEach(() => {
      plugin = plugins[3];
    });

    it('should set up the MetaData plugin', () => {
      expect(plugin).toEqual({
        Component: expect.any(Function),
        icon: 'info',
        id: 'metadataConsolePlugin',
        name: 'Meta Data',
        props: { data: mockState.metaData },
      });
    });
  });
});
