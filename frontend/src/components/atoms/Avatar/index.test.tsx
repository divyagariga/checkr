import { render, screen } from '@testing-library/react';

import Avatar from '.';
import ProfileIcon from '../../../../public/assets/images/avatar.svg';
import { AVATAR_ALT_TEXT } from '../../../utils/constants';

describe('Tests Avatar component', () => {
  it('render Avatar', () => {
    render(<Avatar src={ProfileIcon} />);

    const images = screen.getAllByRole('img');
    expect(images[0].getAttribute('alt')).toBe(AVATAR_ALT_TEXT);
  });
});
