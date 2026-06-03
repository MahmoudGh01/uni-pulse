import { render } from '@testing-library/react-native';

import { Typography } from '#design/elements';

import { Stack } from '../stack';

describe('Stack', () => {
  it('renders without crashing (smoke)', () => {
    const { getByText } = render(
      <Stack>
        <Typography>Stack content</Typography>
      </Stack>,
    );

    expect(getByText('Stack content')).toBeTruthy();
  });
});
