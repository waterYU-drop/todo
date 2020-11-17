module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/__tests__'],
  testRegex: '__tests__/(.+)\\.test\\.(jsx?|tsx?)$',
  // transform: {
  //   '\\.[jt]sx?$': 'ts-jest',
  // },
  setupFiles: ['<rootDir>/__tests__/setup.js'],
  transformIgnorePatterns: ['!/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
