import consolePlugin, { defaultComponent } from './consolePlugin';

describe('consolePlugin', () => {

  it('should return a config for a default plugin', () => {
    const plugin = consolePlugin();

    expect(plugin).toEqual({
      Component: defaultComponent,
      icon: 'help',
      id: expect.stringMatching(/[0-9.]+ConsolePlugin$/),
      name: 'Undefined',
      panelClass: '',
      props: {},
    });
    expect(plugin.Component()).toEqual(expect.objectContaining({
      props: {
        children: 'This is a default Plugin.'
      }
    }));
  });

  it('should throw error for invalid `Component` prop', () => {
    expect(() => {
      consolePlugin({
        Component: 'not a func',
      });
    }).toThrow("You didn't pass in a Function for `Component`");
  });

  it('should throw error for invalid `icon` prop', () => {
    expect(() => {
      consolePlugin({
        icon: 0,
      });
    }).toThrow("You didn't pass in a String for `icon`");
  });

  it("shouldn't generate a unique `id` if one is passed", () => {
    const id = 'testConsolePlugin';
    expect(consolePlugin({ id })).toEqual(expect.objectContaining({ id }));
  });

  it('should throw error for invalid `name` prop', () => {
    expect(() => {
      consolePlugin({
        name: 0,
      });
    }).toThrow("You didn't pass in a String for `name`");
  });

  it('should throw error for invalid `panelClass` prop', () => {
    expect(() => {
      consolePlugin({
        panelClass: 0,
      });
    }).toThrow("You didn't pass in a String for `panelClass`");
  });

  it('should throw error for invalid `props` prop', () => {
    expect(() => {
      consolePlugin({
        props: 0,
      });
    }).toThrow("You didn't pass in an Object for `props`");
  });
});
