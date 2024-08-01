import type { Meta, StoryObj } from '@storybook/react';

import Animation from '.';
import TickMark from '../../../../public/assets/gif/success-tick-mark.gif';

const meta: Meta<typeof Animation> = {
  title: 'Atoms/Animation',
  component: Animation,
};

export default meta;
type Story = StoryObj<typeof Animation>;

export const SuccessTickMark: Story = {
  args: {
    src: TickMark,
  },
};
