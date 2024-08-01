import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavBarItem from '.';
import HomeIcon from '../../../../public/assets/icons/home.svg';
import CandidatesIcon from '../../../../public/assets/icons/candidates.svg';
import HammerIcon from '../../../../public/assets/icons/hammer.svg';
import { BUTTON_CLICKED } from '../../../utils/constants';

const navbarDecorator = (Story: React.ComponentType) => (
  <div style={{ width: '206px' }}>
    <Story />
  </div>
);

const meta: Meta<typeof NavBarItem> = {
  title: 'Molecules/NavBarItem',
  component: NavBarItem,
  decorators: [navbarDecorator],
};

export default meta;
type Story = StoryObj<typeof NavBarItem>;

const handleClickAction = action(BUTTON_CLICKED);

export const Home: Story = {
  args: {
    iconSrc: HomeIcon,
    label: 'Home',
    isNavBarItemSelected: false,
    handleClick: handleClickAction,
  },
};

export const Candidates: Story = {
  args: {
    iconSrc: CandidatesIcon,
    label: 'Candidates',
    isNavBarItemSelected: false,
    handleClick: handleClickAction,
  },
};

export const AdverseActions: Story = {
  args: {
    iconSrc: HammerIcon,
    label: 'Adverse Actions',
    isNavBarItemSelected: false,
    handleClick: handleClickAction,
  },
};
