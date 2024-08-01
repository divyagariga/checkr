import type { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { action } from '@storybook/addon-actions';

import ForgotPassword from '.';
import { RESET_CLICKED } from '../../../utils/constants';
import { AuthProvider } from '../../../contexts/AuthContext';
import { Box } from '@mui/material';

const meta: Meta<typeof ForgotPassword> = {
  title: 'Organisms/ForgotPassword',
  component: ForgotPassword,
};

export default meta;

const handleResetPasswordButtonClick = action(RESET_CLICKED);

export const PasswordReset = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Box style={{ width: '480px', height: '672px' }}>
          <ForgotPassword
            handleResetPasswordButtonClick={handleResetPasswordButtonClick}
          />
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
};
