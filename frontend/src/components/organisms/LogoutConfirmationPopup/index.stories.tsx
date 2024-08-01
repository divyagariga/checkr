import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LogoutConfirmationPopup from '.';
import { CLOSE_MODAL_CLICKED } from '../../../utils/constants';

const meta: Meta<typeof LogoutConfirmationPopup> = {
  title: 'Organisms/LogoutConfirmationPopup',
  component: LogoutConfirmationPopup,
};
const closeModalHandler = action(CLOSE_MODAL_CLICKED);

export default meta;
type Story = StoryObj<typeof LogoutConfirmationPopup>;

export const LogoutPopup: Story = {
  args: {
    isOpen: true,
    handleCloseModal: closeModalHandler,
  },
};
