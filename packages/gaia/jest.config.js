const path = require('path')
module.exports = {
  rootDir: __dirname,
  testMatch: ['**/__tests__/*.tests.*', '**/__tests__/*.test.*', '!**/__stubs__/*.*'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      diagnostics: {
        ignoreCodes: ['TS151001', 'TS2322'],
      },
    },
  },
  moduleFileExtensions: ['js', 'ts', 'd.ts'],
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  testTimeout: 10000,
}
