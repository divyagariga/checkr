import type { Meta, StoryObj } from '@storybook/react';
import AuthTemplate from '.';
import SignInSignup from '../../organisms/SignInSignup';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';

const meta: Meta<typeof AuthTemplate> = {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
};

export default meta;
type Story = StoryObj<typeof AuthTemplate>;

export const SignupExample: Story = {
  args: {
    authComponent: (
      <BrowserRouter>
        <AuthProvider>
          <SignInSignup
            contentType={'Signup'}
            handleSignInSignupClick={() => {}}
            handleForgotPassword={() => {}}
          />
        </AuthProvider>
      </BrowserRouter>
    ),
  },
};
