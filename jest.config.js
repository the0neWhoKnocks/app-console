module.exports = {
  automock: false,
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
  ],
  coverageReporters: [
    'html',
    'lcov', // for codecov
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  roots: [
    // only test module code, not integration
    'src/app-console',
  ],
  setupTestFrameworkScriptFile: './.jest/bootstrap.js',
  setupFiles: [
    './.jest/polyfills.js',
  ],
  // so you don't get a SecurityError while testing `history`
  testURL: 'http://localhost',
  verbose: true,
};
