import { render } from '@testing-library/react-native';

import { Typography } from '#design/elements';

import { Section } from '../section';

describe('Section', () => {
  it('renders without crashing (smoke)', () => {
    const { getByText } = render(
      <Section>
        <Typography>Section content</Typography>
      </Section>,
    );

    expect(getByText('Section content')).toBeTruthy();
  });
});
