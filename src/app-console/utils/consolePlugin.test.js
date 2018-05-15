import consolePlugin, { defaultComponent } from './consolePlugin';

describe('consolePlugin', () => {

  it('should return a config for a default plugin', () => {
    expect(consolePlugin()).toEqual({
      Component: defaultComponent,
      icon: 'help',
      id: expect.stringMatching(/[0-9.]+ConsolePlugin$/),
      name: 'Undefined',
      panelClass: '',
      props: {},
    });
  });
});
