import { fireEvent, render } from '@testing-library/react-native';

import { TextField } from '../text-field';

describe('TextField', () => {
  it('renders without crashing (smoke)', () => {
    const { getByPlaceholderText } = render(
      <TextField value="" onChangeText={() => undefined} placeholder="Search events" />,
    );

    expect(getByPlaceholderText('Search events')).toBeTruthy();
  });

  it('supports controlled updates across user input (integration)', () => {
    let value = '';
    const handleChange = jest.fn((next: string) => {
      value = next;
    });

    const { getByPlaceholderText, rerender } = render(
      <TextField value={value} onChangeText={handleChange} placeholder="Your name" />,
    );

    const input = getByPlaceholderText('Your name');
    fireEvent.changeText(input, 'Mahmoud');

    rerender(<TextField value={value} onChangeText={handleChange} placeholder="Your name" />);

    expect(handleChange).toHaveBeenCalledWith('Mahmoud');
    expect(getByPlaceholderText('Your name')).toHaveProp('value', 'Mahmoud');
  });
});
