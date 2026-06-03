module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^#features$': '<rootDir>/src/features/index.ts',
    '^#features/(.*)$': '<rootDir>/src/features/$1',
    '^#design$': '<rootDir>/src/shared/design/index.ts',
    '^#design/(.*)$': '<rootDir>/src/shared/design/$1',
    '^#shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};
