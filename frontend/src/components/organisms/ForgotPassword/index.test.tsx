/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from '@mui/material';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '.';

import * as checkerServices from '../../../services/user-service';
import theme from '../../../Theme/theme';
import { EMAIL_HELPER_TEXT, OTP_HELPER_TEXT } from '../../../utils/constants';
import { UserType } from '../../../utils/types';

const mockTimer = jest.useFakeTimers();
const mockUser: UserType = {
  id: 1,
  name: 'Test',
  email: 'test@gmail.com',
  password: 'Test@123',
};
jest.spyOn(checkerServices, 'authLogin').mockResolvedValue(mockUser);
jest.spyOn(checkerServices, 'createResetPasswordOtp').mockResolvedValue('1111');
jest.spyOn(checkerServices, 'getOtpByUserEmail').mockResolvedValue('1111');

import { AuthProvider } from '../../../contexts/AuthContext';

// Mock AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../../contexts/AuthContext'),
  AuthProvider: ({ children }) => <>{children}</>,
  useAuthContext: () => ({
    user: { name: 'Test', email: 'Test2@gmail.com', id: 1 },
    isAuthenticated: true,
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    setIsAuthenticated: jest.fn(),
  }),
}));

// Rest of your test...

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Tests forgot password', () => {
  it('renders forgot password', async () => {
    const mockUser: UserType = {
      id: 1,
      name: 'Test',
      email: 'test@gmail.com',
      password: 'Test@123',
    };

    jest
      .spyOn(checkerServices, 'createResetPasswordOtp')
      .mockResolvedValue('1111');
    jest.spyOn(checkerServices, 'getOtpByUserEmail').mockResolvedValue('1111');
    jest.spyOn(checkerServices, 'getUserByEmail').mockResolvedValue(mockUser);

    const handleResetPasswordButtonClick = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <ForgotPassword
              handleResetPasswordButtonClick={handleResetPasswordButtonClick}
            />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>,
    );
    const forgot = screen.getByTestId('forgot-password');

    expect(forgot).toBeInTheDocument;

    const textfield = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(buttons[1]).toBeDisabled;

    fireEvent.change(textfield, { target: { value: 'test' } });
    fireEvent.blur(textfield);

    expect(screen.getByText(EMAIL_HELPER_TEXT)).toBeInTheDocument;

    fireEvent.change(textfield, { target: { value: 'test@gmail.com' } });
    fireEvent.blur(textfield);

    expect(screen.queryByText(EMAIL_HELPER_TEXT)).not.toBeInTheDocument;
    expect(buttons[1]).toBeEnabled;

    fireEvent.click(buttons[1]);

    expect(handleResetPasswordButtonClick).toHaveBeenCalled;

    act(() => {
      mockTimer.advanceTimersByTime(4000);
    });

    const otpTextfields = screen.getAllByRole('textbox');
    expect(otpTextfields.length).toBe(4);

    const otpButtons = screen.getAllByRole('button');

    fireEvent.change(otpTextfields[0], { target: { value: '1' } });

    fireEvent.click(otpButtons[1]);

    expect(screen.getByText(OTP_HELPER_TEXT)).toBeInTheDocument;

    otpTextfields.forEach((otpField) => {
      fireEvent.change(otpField, { target: { value: '1' } });
    });

    expect(otpButtons[1]).toBeEnabled;
    await act(async () => {
      fireEvent.click(otpButtons[1]);
    });

    expect(checkerServices.getUserByEmail).toHaveBeenCalled;
  });

  it('handles errors from create otp services', async () => {
    jest
      .spyOn(checkerServices, 'createResetPasswordOtp')
      .mockRejectedValue(new Error('Error'));

    const handleResetPasswordButtonClick = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <ForgotPassword
              handleResetPasswordButtonClick={handleResetPasswordButtonClick}
            />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>,
    );
    const textfield = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(buttons[1]).toBeDisabled;
    fireEvent.change(textfield, { target: { value: 'test@gmail.com' } });
    fireEvent.blur(textfield);
    expect(buttons[1]).toBeEnabled;

    fireEvent.click(buttons[1]);

    expect(checkerServices.createResetPasswordOtp).toHaveBeenCalled;
  });

  it('handles errors from get otp services', async () => {
    jest
      .spyOn(checkerServices, 'createResetPasswordOtp')
      .mockResolvedValue('1111');
    jest
      .spyOn(checkerServices, 'getOtpByUserEmail')
      .mockRejectedValue(new Error('Error'));

    const handleResetPasswordButtonClick = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <ForgotPassword
              handleResetPasswordButtonClick={handleResetPasswordButtonClick}
            />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>,
    );
    const textfield = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(buttons[1]).toBeDisabled;
    fireEvent.change(textfield, { target: { value: 'test@gmail.com' } });
    fireEvent.blur(textfield);
    expect(buttons[1]).toBeEnabled;

    fireEvent.click(buttons[1]);

    expect(checkerServices.createResetPasswordOtp).toHaveBeenCalled;
    expect(handleResetPasswordButtonClick).toHaveBeenCalled;

    act(() => {
      mockTimer.advanceTimersByTime(4000);
    });

    const otpTextfields = screen.getAllByRole('textbox');
    expect(otpTextfields.length).toBe(4);

    const otpButtons = screen.getAllByRole('button');

    otpTextfields.forEach((otpField) => {
      fireEvent.change(otpField, { target: { value: '1' } });
    });

    expect(otpButtons[1]).toBeEnabled;
    await act(async () => {
      fireEvent.click(otpButtons[1]);
    });

    expect(checkerServices.getUserByEmail).not.toHaveBeenCalled;
  });
});
