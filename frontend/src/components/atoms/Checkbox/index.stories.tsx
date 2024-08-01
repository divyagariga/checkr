import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';
import { action } from '@storybook/addon-actions';
import { CHECKBOX_CLICKED } from '../../../utils/constants';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
};

const handleClickAction = action(CHECKBOX_CLICKED);

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    onChange: handleClickAction,
  },
};
