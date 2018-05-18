import {
  consolePlugin,
  Console,
  AppStore,
  FeatureFlags,
  MetaData,
  Providers,
} from './index';

describe('app-console', () => {
  it('should export everything needed for the console to function', () => {
    expect(consolePlugin).toBeDefined();
    expect(Console).toBeDefined();
    expect(AppStore).toBeDefined();
    expect(FeatureFlags).toBeDefined();
    expect(MetaData).toBeDefined();
    expect(Providers).toBeDefined();
  });
});
