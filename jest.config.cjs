module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/lib/assetUrl$': '<rootDir>/src/__mocks__/assetUrl.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|svg|css|scss)$': '<rootDir>/src/__mocks__/fileMock.cjs',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  clearMocks: true,
};
