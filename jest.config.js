const config = {
  moduleNameMapper: {
    '^@engine/(.*)$': '<rootDir>/src/engine/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
