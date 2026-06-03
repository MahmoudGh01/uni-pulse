import { render } from '@testing-library/react-native';

import { Card } from '../card';
import { Typography } from '../typography';

describe('Card', () => {
  it('renders without crashing (smoke)', () => {
    const { getByText } = render(
      <Card>
        <Typography>Card content</Typography>
      </Card>,
    );

    expect(getByText('Card content')).toBeTruthy();
  });
});
