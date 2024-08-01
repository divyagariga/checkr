import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';
import { PAGE_HEADINGS } from '../../../utils/constants';

const meta: Meta<typeof Header> = {
  title: 'Molecules/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Candidate: Story = {
  args: {
    type: 'Main',
    heading: PAGE_HEADINGS.CANDIDATE,
    showBackButton: false,
  },
};

export const DetailedCandidate: Story = {
  args: {
    type: 'Detailed',
    heading: 'John Smith',
    showBackButton: true,
  },
};

export const PreAdverseAction: Story = {
  args: {
    type: 'Plain',
    heading: PAGE_HEADINGS.PRE_ADVERSE_ACTION,
    showBackButton: true,
  },
};

export const AdverseActions: Story = {
  args: {
    type: 'Plain',
    heading: PAGE_HEADINGS.ADVERSE_ACTION,
    showBackButton: true,
  },
};
