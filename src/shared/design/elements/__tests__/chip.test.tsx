import { render } from '@testing-library/react-native';

import { Chip } from '../chip';

describe('Chip', () => {
  it('renders without crashing (smoke)', () => {
    const { getByText } = render(<Chip label="Campus" />);

    expect(getByText('Campus')).toBeTruthy();
  });
});
