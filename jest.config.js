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
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  roots: [
    'src/app-console',
  ],
  verbose: true,
};
