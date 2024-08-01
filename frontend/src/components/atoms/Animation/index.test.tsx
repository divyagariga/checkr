import { render, screen } from '@testing-library/react';

import Animation from '.';
import TickMark from '../../../../public/assets/gif/success-tick-mark.gif';

describe('Tests Animation component', () => {
  it('render Animation', () => {
    render(<Animation src={TickMark} alt="success-tick-mark" />);
    const images = screen.getAllByRole('img');
    expect(images[0].getAttribute('alt')).toBe('success-tick-mark');
  });
});
