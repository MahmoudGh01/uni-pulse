import '@testing-library/jest-native/extend-expect';

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockReact = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: MockText } = require('react-native');

  return {
    Link: ({ children, ...props }: { children: React.ReactNode }) =>
      mockReact.createElement(MockText, props, children),
  };
});
