import { render } from '@testing-library/react-native';

import { Typography } from '../typography';

describe('Typography', () => {
  it('renders text without crashing (smoke)', () => {
    const { getByText } = render(<Typography>Hello</Typography>);

    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders link-like text when href is provided (unit)', () => {
    const { getByText } = render(
      <Typography href="./explore" variant="bodyStrong">
        Explore
      </Typography>,
    );

    expect(getByText('Explore')).toBeTruthy();
  });
});
