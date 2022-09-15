/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
export default {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/__e2e__/'],
  watchPathIgnorePatterns: ['/dist/'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^(.+)\\.jsx?$': '$1',
  },
};
