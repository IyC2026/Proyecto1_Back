module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/modules/**/*.ts',
    '!src/modules/**/*.module.ts',
    '!src/modules/**/*.entity.ts',
    '!src/modules/**/*.dto.ts',
    '!src/modules/**/*.mapper.ts',
    '!src/modules/**/*.decorator.ts',
    '!src/modules/**/*.interface.ts',
    '!src/modules/**/*.enum.ts',
    '!src/modules/**/*.guard.ts',
    '!src/modules/**/*.filter.ts',
    '!src/modules/**/*.pipe.ts',
    '!src/modules/**/seed*/**',
    '!src/modules/**/migrations/**',
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
