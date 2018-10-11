import React from 'react';
import { mount } from 'enzyme';
import { delay } from '../../utils/setTransitionState';
import consolePlugin from '../../utils/consolePlugin';
import Console, { globalStyles } from './index';
import { REVEAL_SPEED } from './styles';

describe('Console', () => {
  let wrapper;
  let instance;
  
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should use default values', () => {
    instance = mount(<Console />).instance();

    expect(instance.props).toEqual({
      plugins: [],
      toggled: false,
    });
    expect(instance.state).toEqual({
      activePlugin: undefined,
      isOpen: false,
      pluginNdx: undefined,
      stylesLoaded: false,
    });
  });

  describe('componentDidMount', () => {
    jest.useFakeTimers();

    it('should add global styles before component styles', () => {
      // default state
      document.head.innerHTML = '';
      mount(<Console />);
      expect(document.head.querySelector('#materialIcons').href).toEqual(globalStyles[0].href);

      // account for glamor styles
      document.head.innerHTML = '<style data-glamor="true"></style>';
      wrapper = mount(<Console />);
      instance = wrapper.instance();

      expect(instance.state.stylesLoaded).toBe(false);
      expect(wrapper.find('Toggle#consoleToggle .toggle.is--visible').length).toBe(0);
      jest.runTimersToTime(delay);
      wrapper.update();

      expect(document.head.childNodes.length).toEqual(globalStyles.length + 1);
      expect(document.head.childNodes[0].href).toEqual(globalStyles[0].href);
      expect(document.head.childNodes[1].getAttribute('data-glamor')).toBe('true');
      expect(instance.state.stylesLoaded).toBe(true);
      expect(wrapper.find('Toggle#consoleToggle .toggle.is--visible').length).toBe(1);
    });
  });

  describe('handleConsoleToggle', () => {
    it('should show the console', () => {
      const ev = {
        currentTarget: {
          checked: true,
        },
      };
      jest.spyOn(Console.prototype, 'loadFirstPlugin');
      Console.prototype.loadFirstPlugin.mockImplementation(jest.fn());
      instance = mount(<Console />).instance();

      expect(instance.state.isOpen).toBe(false);

      instance.handleConsoleToggle(ev);

      expect(instance.state.isOpen).toBe(true);
      expect(instance.loadFirstPlugin).toHaveBeenCalled();
      
      Console.prototype.loadFirstPlugin.mockRestore();
    });
  });

  describe('handlePluginToggle', () => {
    let ev;
    let plugins;
    let loadHandler;
    
    beforeEach(() => {
      ev = {
        currentTarget: {
          dataset: {
            ndx: '1',
          },
          id: 'testConsolePlugin',
        },
      };
      plugins = [
        consolePlugin(),
        consolePlugin({
          id: ev.currentTarget.id,
        }),
      ];
      loadHandler = jest.fn();
    });
    
    it('should display the current plugin', () => {
      wrapper = mount(<Console plugins={plugins} />).instance();

      expect(wrapper.state.activePlugin).toBe(undefined);
      expect(wrapper.state.pluginNdx).toBe(undefined);
      
      wrapper.handlePluginToggle(ev);

      expect(wrapper.state.activePlugin).toBe(ev.currentTarget.id);
      expect(wrapper.state.pluginNdx).toBe(ev.currentTarget.dataset.ndx);
    });
    
    it('should call the "plugin load" handler if it exists', () => {
      wrapper = mount(
        <Console
          plugins={plugins}
          onPluginLoad={loadHandler}
        />
      ).instance();

      wrapper.handlePluginToggle(ev);

      expect(loadHandler).toHaveBeenCalled();
    });
  });
  
  describe('loadFirstPlugin', () => {
    let pluginNdx;
    let plugins;
    
    beforeEach(() => {
      plugins = [
        {
          id: 'firstPlugin',
        }, 
        {
          id: 'secondPlugin',
        }
      ];
      wrapper = mount(<Console plugins={plugins} />);
      instance = wrapper.instance();
      instance.handlePluginToggle = jest.fn();
    });
    
    it('should NOT do anything if the console is closed', () => {
      wrapper.setState({
        isOpen: false,
      });
      
      instance.loadFirstPlugin();
      jest.runTimersToTime(REVEAL_SPEED);

      expect(instance.handlePluginToggle).not.toHaveBeenCalled();
    });
    
    it('should open the last viewed plugin in the current console session', () => {
      pluginNdx = 1;
      wrapper.setState({
        isOpen: true,
        pluginNdx,
      });
      instance.loadFirstPlugin();
      jest.runTimersToTime(REVEAL_SPEED);
    
      expect(instance.handlePluginToggle).toHaveBeenCalledWith({
        currentTarget: {
          id: plugins[pluginNdx].id,
          dataset: { ndx: pluginNdx },
        },
      });
    });
    
    it('should open the plugin based on saved data', () => {
      pluginNdx = 1;
      wrapper.setProps({
        defaultPluginNdx: pluginNdx,
      });
      wrapper.setState({
        isOpen: true,
      });
      instance.loadFirstPlugin();
      jest.runTimersToTime(REVEAL_SPEED);
    
      expect(instance.handlePluginToggle).toHaveBeenCalledWith({
        currentTarget: {
          id: plugins[pluginNdx].id,
          dataset: { ndx: pluginNdx },
        },
      });
    });
    
    it('should open the default plugin', () => {
      wrapper.setState({
        isOpen: true,
      });
      instance.loadFirstPlugin();
      jest.runTimersToTime(REVEAL_SPEED);
    
      expect(instance.handlePluginToggle).toHaveBeenCalledWith({
        currentTarget: {
          id: plugins[0].id,
          dataset: { ndx: 0 },
        },
      });
    });
  });
});
