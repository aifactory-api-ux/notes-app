export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.jsx', '**/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};