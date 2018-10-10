module.exports = {
  automock: false,
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/App.js',
    '!**/index.js',
    '!**/store.js',
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
    'src',
  ],
  setupTestFrameworkScriptFile: './.jest/bootstrap.js',
  setupFiles: [
    './.jest/polyfills.js',
  ],
  // so you don't get a SecurityError while testing `history`
  testURL: 'http://localhost',
  verbose: true,
};
