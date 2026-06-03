import { render } from '@testing-library/react-native';

import { Typography } from '#design/elements';

import { Screen } from '../screen';

describe('Screen', () => {
  it('renders without crashing (smoke)', () => {
    const { getByText } = render(
      <Screen>
        <Typography>Screen content</Typography>
      </Screen>,
    );

    expect(getByText('Screen content')).toBeTruthy();
  });
});
