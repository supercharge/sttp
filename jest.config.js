'use strict'

module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  coverageReporters: ['text', 'html'],
  testMatch: ['**/test/**/*.[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/test-server.js']
}
