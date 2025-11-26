module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|lucide-react-native|@gluestack-ui/.*|@gluestack-style/.*|@legendapp/.*|@react-native-aria/.*)',
  ],
  collectCoverageFrom: [
    'services/schools/**/*.{ts,tsx}',
    'services/classes/**/*.{ts,tsx}',
    'store/useSchoolStore.ts',
    'store/useClassStore.ts',
    'components/EmptyState.tsx',
    'components/Toast.tsx',
    'screens/schools/components/SchoolCard.tsx',
    'screens/schools/components/SchoolFormFields.tsx',
    'screens/classes/components/ClassCard.tsx',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/__mocks__/**',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '@gluestack-ui/themed': '<rootDir>/__mocks__/gluestack-ui.js',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
};
