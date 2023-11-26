import type { Config } from 'jest';
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

const config: Config = {
  clearMocks: true,

  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './fileTransformer.ts',
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],

  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};

export default config;
module.exports = createJestConfig(customJestConfig);
