import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '.';
import {
  CANDIDATE_ACCORDION_HEADING,
  MOCK_CANDIDATE_INFO_DATA,
  MOCK_REPORT_INFO_DATA,
  REPORT_ACCORDION_HEADING,
} from '../../../utils/constants';
import InfoBox from '../InfoBox';

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const CandidateInformationAccordion: Story = {
  args: {
    heading: CANDIDATE_ACCORDION_HEADING,
    children: <InfoBox infoBoxData={MOCK_CANDIDATE_INFO_DATA} />,
  },
};

export const ReportInformationAccordion: Story = {
  args: {
    heading: REPORT_ACCORDION_HEADING,
    children: <InfoBox infoBoxData={MOCK_REPORT_INFO_DATA} />,
  },
};
