import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../Theme/theme';
import SignInSignUpPage from '.';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { SIGNIN, SIGNUP } from '../../utils/constants';
import { OTPType } from '../../utils/types';
import * as checkerServices from '../../services/user-service';

const mockTimer = jest.useFakeTimers();

describe('Signup page', () => {
  it('should render sign in page and handle signup button click', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInSignUpPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const SignUpElement = getByTestId('signin-signup');
    expect(SignUpElement).toBeInTheDocument();

    const signInbuttons = screen.getAllByRole('button');
    fireEvent.click(signInbuttons[4]);
    expect(screen.getAllByText(SIGNUP)).toHaveLength(2);

    const signUpbuttons = screen.getAllByRole('button');
    fireEvent.click(signUpbuttons[1]);
    expect(screen.getAllByText(SIGNIN)).toHaveLength(2);
  });

  it('should handle forgot password button click', () => {
    const mockOtpData: OTPType = {
      id: 1,
      userId: 1,
      otp: '1111',
    };

    jest
      .spyOn(checkerServices, 'createResetPasswordOtp')
      .mockResolvedValue('1111');
    jest
      .spyOn(checkerServices, 'getOtpByUserEmail')
      .mockResolvedValue(mockOtpData);
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInSignUpPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const SignUpElement = getByTestId('signin-signup');
    expect(SignUpElement).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    const textField = screen.getByTestId('password-input');
    fireEvent.change(textField, { target: { value: 'test@gmail.com' } });
    fireEvent.blur(textField);

    const resetButtons = screen.getAllByRole('button');
    fireEvent.click(resetButtons[1]);

    expect(screen.getByTestId('pop-over')).toBeInTheDocument;

    act(() => {
      mockTimer.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId('pop-over')).not.toBeInTheDocument;
  });
});
