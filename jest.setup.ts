// Jest matchers are now built into @testing-library/react-native v12.4+

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
