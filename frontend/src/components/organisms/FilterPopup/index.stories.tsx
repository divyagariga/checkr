import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FilterPopup from '.';
import {
  CHECKBOX_CLICKED,
  MOCK_CANDIDATE_ADJUDICATION_CHECKBOXES,
  MOCK_CANDIDATE_STATUS_CHECKBOXES,
} from '../../../utils/constants';
import { Box } from '@mui/material';

const FilterPopupDecorator = (Story: React.ComponentType) => (
  <Box style={{ paddingLeft: '80%' }}>
    <Story />
  </Box>
);

const meta: Meta<typeof FilterPopup> = {
  title: 'Organisms/FilterPopup',
  component: FilterPopup,
  decorators: [FilterPopupDecorator],
};

export default meta;
type Story = StoryObj<typeof FilterPopup>;

const handleClickAction = action(CHECKBOX_CLICKED);

export const CandidateFilter: Story = {
  args: {
    variant: 'candidate',
    candidateStatusCheckedOptions: MOCK_CANDIDATE_STATUS_CHECKBOXES,
    candidateAdjudicationCheckedOptions: MOCK_CANDIDATE_ADJUDICATION_CHECKBOXES,
    handleCandidateStatusCheckbox: handleClickAction,
    handleCandidateAdjudicationCheckbox: handleClickAction,
  },
};

export const PreAdverseActionFilter: Story = {
  args: {
    variant: 'preadverseActions',
  },
};
