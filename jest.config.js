module.exports = {
  verbose: true,
  cache: true,
  automock: false,
  moduleFileExtensions:[
    'js'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}