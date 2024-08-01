import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExportCandidate from '.';
import { BUTTON_CLICKED } from '../../../utils/constants';

const meta: Meta<typeof ExportCandidate> = {
  title: 'Organisms/ExportCandidate',
  component: ExportCandidate,
};

export default meta;
type Story = StoryObj<typeof ExportCandidate>;

const handleClicks = action(BUTTON_CLICKED);

export const ExportCandidateModal: Story = {
  args: {
    handleCloseModal: handleClicks,
    handleExportButtonClick: handleClicks,
    isPopupOpen: true,
  },
};
