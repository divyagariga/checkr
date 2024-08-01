import type { Meta, StoryObj } from '@storybook/react';
import Chip from '.';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    chipLabel: 'CLEAR',
  },
};
