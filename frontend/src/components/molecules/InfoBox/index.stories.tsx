import type { Meta, StoryObj } from '@storybook/react';

import InfoBox from '.';
import {
  MOCK_CANDIDATE_INFO_DATA,
  MOCK_REPORT_INFO_DATA,
} from '../../../utils/constants';

const meta: Meta<typeof InfoBox> = {
  title: 'Molecules/InfoBox',
  component: InfoBox,
};

export default meta;
type Story = StoryObj<typeof InfoBox>;

export const UserInformation: Story = {
  args: {
    infoBoxData: MOCK_CANDIDATE_INFO_DATA,
  },
};
export const ReportInformation: Story = {
  args: {
    infoBoxData: MOCK_REPORT_INFO_DATA,
  },
};
