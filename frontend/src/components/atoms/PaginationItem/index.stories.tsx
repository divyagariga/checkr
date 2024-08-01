import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PaginationItem from '.';
import { BUTTON_CLICKED } from '../../../utils/constants';

const meta: Meta<typeof PaginationItem> = {
  title: 'Atoms/PaginationItem',
  component: PaginationItem,
};

const handleClickAction = action(BUTTON_CLICKED);

export default meta;
type Story = StoryObj<typeof PaginationItem>;

export const Default: Story = {
  args: {
    label: 1,
    isPaginationItemActive: false,
    handleClick: handleClickAction,
  },
};
