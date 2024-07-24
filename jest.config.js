/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testTimeout: 30000,
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "json", "node"]

};
