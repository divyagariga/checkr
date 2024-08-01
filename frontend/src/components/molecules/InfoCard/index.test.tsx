import { render, screen } from '@testing-library/react';
import InfoCard from '.';
import UserIcon from '../../../../public/assets/icons/user.svg';
import {
  USER_INFO_CARD_LABEL,
  USER_INFO_CARD_VALUE,
} from '../../../utils/constants';

describe('Test InfoCard component', () => {
  it('renders the InfoCard component with valid props', () => {
    render(
      <InfoCard
        infoIcon={UserIcon}
        label={USER_INFO_CARD_LABEL}
        value={USER_INFO_CARD_VALUE}
      />,
    );
    const infoCard = screen.getByTestId('info-card');
    expect(infoCard).toBeInTheDocument();
  });

  it('renders the InfoCard with a custom width', () => {
    render(
      <InfoCard
        infoIcon={UserIcon}
        label={USER_INFO_CARD_LABEL}
        value={''}
        width="30%"
      />,
    );
    const infoCard = screen.getByTestId('info-card');
    expect(infoCard).toHaveStyle('width: 30%');
  });
});
