import {
  AppInfo,
  AppOptions,
  AppStore,
  Console,
  Providers,
  consolePlugin,
} from './index';

describe('app-console', () => {
  it('should export everything needed for the console to function', () => {
    expect(AppInfo).toBeDefined();
    expect(AppOptions).toBeDefined();
    expect(AppStore).toBeDefined();
    expect(Console).toBeDefined();
    expect(Providers).toBeDefined();
    expect(consolePlugin).toBeDefined();
  });
});
