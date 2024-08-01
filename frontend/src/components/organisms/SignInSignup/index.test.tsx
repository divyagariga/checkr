/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from '@mui/material';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignInSignup from '.';
import theme from '../../../Theme/theme';
import {
  CONFIRM_PASSWORD_HELPER_TEXT,
  EMAIL_HELPER_TEXT,
  PASSWORD_HELPER_TEXT,
  SIGNIN,
  SIGNIN_CONTENT_TYPE,
  SIGNIN_TEXT_CONTENT,
  SIGNUP,
  SIGNUP_CONTENT_TYPE,
  SIGNUP_TEXT_CONTENT,
  TEST_EMAIL,
  TEST_PASSWORD,
} from '../../../utils/constants';
import * as checkerServices from '../../../services/user-service';
import { UserType } from '../../../utils/types';
import { AuthProvider } from '../../../contexts/AuthContext';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
    user: { name: 'Test', email: 'Test2@gmail.com' },
  }),
}));
const mockUser: UserType = {
  id: 1,
  name: 'Test',
  email: 'test@gmail.com',
  password: 'Test@123',
};
jest.spyOn(checkerServices, 'authLogin').mockResolvedValue(mockUser);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

describe('Tests SignInSignUp', () => {
  const mockUser: UserType = {
    id: 1,
    name: 'Test',
    email: 'test@gmail.com',
    password: 'Test@123',
  };
  jest.spyOn(checkerServices, 'loginUser').mockResolvedValue(mockUser);
  jest.spyOn(checkerServices, 'postUser').mockResolvedValue(mockUser);
  jest.spyOn(checkerServices, 'getUserByEmail').mockResolvedValue(mockUser);

  it('should render Signin', async () => {
    const handleSignInSignupClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInSignup
              contentType={SIGNIN_CONTENT_TYPE}
              handleSignInSignupClick={handleSignInSignupClick}
              handleForgotPassword={jest.fn()}
            />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('signin-signup')).toBeInTheDocument;
    expect(screen.getAllByText(SIGNIN)).toBeInTheDocument;
    expect(screen.getByText(SIGNIN_TEXT_CONTENT)).toBeInTheDocument;

    const textFields = screen.getAllByTestId('password-input');
    expect(textFields.length).toBe(2);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);

    expect(buttons[1]).toBeDisabled;
    expect(textFields[1]).toHaveAttribute('type', 'password');

    const eyeIcon = screen.getAllByRole('img')[0];
    fireEvent.click(eyeIcon);

    expect(textFields[1]).toHaveAttribute('type', 'text');

    fireEvent.change(textFields[0], { target: { value: TEST_EMAIL } });
    fireEvent.blur(textFields[0]);
    fireEvent.change(textFields[1], { target: { value: TEST_PASSWORD } });
    fireEvent.blur(textFields[1]);

    fireEvent.click(buttons[0]);

    expect(buttons[1]).toBeDisabled;
    await act(async () => {
      fireEvent.click(buttons[1]);
    });

    await waitFor(async () => {
      expect(checkerServices.loginUser).toHaveBeenCalled();
    });

    await act(async () => {
      fireEvent.click(buttons[2]);
    });

    fireEvent.click(buttons[4]);
    expect(handleSignInSignupClick).toHaveBeenCalled;
  });

  it('should render Signup', async () => {
    const handleSignInSignupClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInSignup
              contentType={SIGNUP_CONTENT_TYPE}
              handleSignInSignupClick={handleSignInSignupClick}
              handleForgotPassword={jest.fn()}
            />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('signin-signup')).toBeInTheDocument;
    expect(screen.getAllByText(SIGNUP)).toBeInTheDocument;
    expect(screen.getByText(SIGNUP_TEXT_CONTENT)).toBeInTheDocument;

    const buttons = screen.getAllByRole('button');
    const eyeIcon = screen.getAllByRole('img');

    fireEvent.click(eyeIcon[0]);
    fireEvent.click(eyeIcon[1]);

    const textFields = screen.getAllByTestId('password-input');
    fireEvent.change(textFields[0], { target: { value: 'test' } });
    fireEvent.blur(textFields[0]);
    expect(screen.getByText(EMAIL_HELPER_TEXT)).toBeInTheDocument();
    fireEvent.change(textFields[0], { target: { value: TEST_EMAIL } });
    fireEvent.blur(textFields[0]);

    fireEvent.change(textFields[1], { target: { value: 'test' } });
    fireEvent.blur(textFields[1]);
    expect(screen.getAllByText(PASSWORD_HELPER_TEXT)).toHaveLength(1);
    fireEvent.change(textFields[1], { target: { value: 'Test@12345' } });
    fireEvent.blur(textFields[1]);

    fireEvent.change(textFields[2], { target: { value: 'test' } });
    fireEvent.blur(textFields[2]);
    expect(screen.getAllByText(CONFIRM_PASSWORD_HELPER_TEXT)).toHaveLength(1);
    fireEvent.change(textFields[2], { target: { value: TEST_PASSWORD } });
    fireEvent.blur(textFields[2]);
    expect(screen.getAllByText(CONFIRM_PASSWORD_HELPER_TEXT)).toHaveLength(1);
    fireEvent.change(textFields[2], { target: { value: 'Test@12345' } });
    fireEvent.blur(textFields[2]);
    expect(buttons[0]).toBeEnabled();
    await act(async () => {
      fireEvent.click(buttons[0]);
    });
    await waitFor(async () => {
      expect(checkerServices.postUser).toHaveBeenCalled();
    });
  });

  it('should throw user not found for signin', async () => {
    jest
      .spyOn(checkerServices, 'loginUser')
      .mockRejectedValue(new Error('Error'));
    const handleSignInSignupClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInSignup
              contentType={SIGNIN_CONTENT_TYPE}
              handleSignInSignupClick={handleSignInSignupClick}
              handleForgotPassword={jest.fn()}
            />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const textFields = screen.getAllByTestId('password-input');
    const buttons = screen.getAllByRole('button');

    fireEvent.change(textFields[0], { target: { value: TEST_EMAIL } });
    fireEvent.blur(textFields[0]);
    fireEvent.change(textFields[1], { target: { value: TEST_PASSWORD } });
    fireEvent.blur(textFields[1]);

    expect(buttons[1]).toBeEnabled;
    await act(async () => {
      fireEvent.click(buttons[1]);
    });
    await waitFor(async () => {
      expect(checkerServices.loginUser).toHaveBeenCalled();
    });
  });

  it('should throw user not found for signup', () => {
    jest
      .spyOn(checkerServices, 'postUser')
      .mockRejectedValue(new Error('Error'));
    const handleSignInSignupClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInSignup
              contentType={SIGNUP_CONTENT_TYPE}
              handleSignInSignupClick={handleSignInSignupClick}
              handleForgotPassword={jest.fn()}
            />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    const buttons = screen.getAllByRole('button');

    const textFields = screen.getAllByTestId('password-input');

    fireEvent.change(textFields[0], { target: { value: TEST_EMAIL } });
    fireEvent.blur(textFields[0]);

    fireEvent.change(textFields[1], { target: { value: 'Test@12345' } });
    fireEvent.blur(textFields[1]);

    fireEvent.change(textFields[2], { target: { value: 'Test@12345' } });
    fireEvent.blur(textFields[2]);

    expect(buttons[0]).toBeEnabled();
    fireEvent.click(buttons[0]);
    expect(checkerServices.postUser).toHaveBeenCalled();
  });
});
