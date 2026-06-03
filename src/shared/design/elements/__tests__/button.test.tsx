import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '../button';

describe('Button', () => {
  it('renders without crashing (smoke)', () => {
    const { getByText } = render(<Button label="Save" />);

    expect(getByText('Save')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Press me" onPress={onPress} />);

    fireEvent.press(getByText('Press me'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
