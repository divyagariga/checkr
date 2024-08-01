import { render, screen } from '@testing-library/react';
import Icon from '.';
import HomeIcon from '../../../../public/assets/icons/home.svg';

describe('Test Icon component', () => {
  it('renders Icon component', () => {
    render(
      <Icon width={'24px'} height={'24px'} src={HomeIcon} alt={'homeicon'} />,
    );

    const iconElement = screen.getByRole('img');
    expect(iconElement.getAttribute('alt')).toBe('homeicon');
  });
});
