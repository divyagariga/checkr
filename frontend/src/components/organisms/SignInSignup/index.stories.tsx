import type { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import SignInSignup from '.';
import { AuthProvider } from '../../../contexts/AuthContext';
import {
  SIGNIN_CONTENT_TYPE,
  SIGNUP_CONTENT_TYPE,
} from '../../../utils/constants';

const meta: Meta<typeof SignInSignup> = {
  title: 'Organisms/SigninSignup',
  component: SignInSignup,
};

export default meta;

export const Signin = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SignInSignup
          contentType={SIGNIN_CONTENT_TYPE}
          handleSignInSignupClick={() => {}}
          handleForgotPassword={() => {}}
        />
      </AuthProvider>
    </BrowserRouter>
  );
};

export const Signup = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SignInSignup
          contentType={SIGNUP_CONTENT_TYPE}
          handleSignInSignupClick={() => {}}
          handleForgotPassword={() => {}}
        />
      </AuthProvider>
    </BrowserRouter>
  );
};
