import React from 'react';
import { mount } from 'enzyme';
import { delay } from '../../utils/setTransitionState';
import consolePlugin from '../../utils/consolePlugin';
import Console, { globalStyles } from './index';

describe('Console', () => {
  let wrapper;
  let instance;

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
      instance = mount(<Console />).instance();

      expect(instance.state.isOpen).toBe(false);

      instance.handleConsoleToggle(ev);

      expect(instance.state.isOpen).toBe(true);
    });
  });

  describe('handlePluginToggle', () => {
    it('should display the current plugin', () => {
      const ev = {
        currentTarget: {
          dataset: {
            ndx: '1',
          },
          id: 'testConsolePlugin',
        },
      };
      const plugins = [
        consolePlugin(),
        consolePlugin({
          id: ev.currentTarget.id,
        }),
      ];
      wrapper = mount(<Console plugins={plugins} />).instance();

      expect(wrapper.state.activePlugin).toBe(undefined);
      expect(wrapper.state.pluginNdx).toBe(undefined);

      wrapper.handlePluginToggle(ev);

      expect(wrapper.state.activePlugin).toBe(ev.currentTarget.id);
      expect(wrapper.state.pluginNdx).toBe(ev.currentTarget.dataset.ndx);
    });
  });
});
