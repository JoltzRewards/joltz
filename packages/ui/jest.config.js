module.exports = {
  testMatch: ['**/__tests__/*.tests.*', '**/__tests__/*.test.*'],
  coveragePathIgnorePatterns: ['<rootDir>/src/stitches.config.ts', '<rootDir>/__testing__(/.*)*/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/{!(__testing__),}/{!(stories|index),}.{ts,tsx}'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  moduleDirectories: ['node_modules', __dirname],
}
