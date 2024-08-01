import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '.';
import { REPORTS_FROM, REPORTS_TO } from '../../../utils/constants';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const DatePickerReportsForm: Story = {
  args: {
    label: REPORTS_FROM,
  },
};
export const DatePickerReportsTo: Story = {
  args: {
    label: REPORTS_TO,
  },
};
