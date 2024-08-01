import { useState } from 'react';

import styled from '@emotion/styled';
import { Box } from '@mui/material';

import Modal from '../../components/molecules/Modal';
import ForgotPassword from '../../components/organisms/ForgotPassword';
import SignInSignup from '../../components/organisms/SignInSignup';
import AuthTemplate from '../../components/templates/AuthTemplate';
import { SignInContentType } from '../../utils/types';
import Animation from '../../components/atoms/Animation';
import Typography from '../../components/atoms/Typography';

import TickMark from '../../../public/assets/gif/success-tick-mark.gif';
import {
  OTP_SUCCESS_MESSAGE,
  SIGNIN_CONTENT_TYPE,
  SIGNUP_CONTENT_TYPE,
  TIMEOUT_RESET_PASSWORD,
} from '../../utils/constants';
import theme from '../../Theme/theme';

const StyledSuccessBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const SignInSignUpPage = () => {
  const [contentType, setContentType] =
    useState<SignInContentType>(SIGNIN_CONTENT_TYPE);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] =
    useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleSignInSignupClick = () => {
    setContentType(
      contentType === SIGNIN_CONTENT_TYPE
        ? SIGNUP_CONTENT_TYPE
        : SIGNIN_CONTENT_TYPE,
    );
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordClicked(true);
  };

  const handleResetPasswordButtonClick = () => {
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, TIMEOUT_RESET_PASSWORD);
  };

  const getSuccessMessage = () => {
    return (
      <StyledSuccessBox>
        <Animation src={TickMark} alt={'success'} />
        <Typography variant={'h2'} color={theme.palette.textEmphasis.dark}>
          {OTP_SUCCESS_MESSAGE}
        </Typography>
      </StyledSuccessBox>
    );
  };

  const renderAuthContent = () => {
    return !isForgotPasswordClicked ? (
      <SignInSignup
        contentType={contentType}
        handleSignInSignupClick={handleSignInSignupClick}
        handleForgotPassword={handleForgotPasswordClick}
      />
    ) : (
      <>
        <ForgotPassword
          handleResetPasswordButtonClick={handleResetPasswordButtonClick}
        />
        <Modal
          isPopupOpen={isPopupOpen}
          innerPopupContent={getSuccessMessage()}
          popupWidth={'50%'}
          popupHeight={'55%'}
        />
      </>
    );
  };

  return <AuthTemplate authComponent={renderAuthContent()} />;
};

export default SignInSignUpPage;
