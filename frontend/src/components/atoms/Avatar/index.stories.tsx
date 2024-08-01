import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '.';
import ProfileIcon from '../../../../public/assets/images/avatar.svg';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const AvatarIcon: Story = {
  args: {
    src: ProfileIcon,
  },
};
