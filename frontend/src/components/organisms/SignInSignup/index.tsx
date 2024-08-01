import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../Theme/theme';
import {
  AGREE_TO,
  ALREADY_MEMBER,
  CONFIRM_PASSWORD,
  DONT_HAVE_AN_ACCOUNT,
  EMAIL,
  EMAIL_PLACEHOLDER,
  FORGOT_PASSWORD,
  GITHUB_SIGNIN_TEXT,
  GOOGLE_SIGNIN_TEXT,
  OR,
  PASSWORD,
  PASSWORD_PLACEHOLDER,
  PRIVACY_POLICY,
  REMEMBER_ME,
  SIGNIN,
  SIGNIN_CONTENT_TYPE,
  SIGNIN_TEXT_CONTENT,
  SIGNUP,
  SIGNUP_CONTENT_TYPE,
  SIGNUP_TEXT_CONTENT,
} from '../../../utils/constants';

import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import EyeOffIcon from '../../../../public/assets/icons/eyeicon.svg';
import EyeOnIcon from '../../../../public/assets/icons/eyeOn.svg';
import Icon from '../../atoms/Icon';
import Checkbox from '../../atoms/Checkbox';
import Button from '../../atoms/Button';
import GoogleIcon from '../../../../public/assets/icons/google.svg';
import GithubIcon from '../../../../public/assets/icons/github.svg';
import useSignInSignUp from './hooks';
import {
  SignInContentType,
  SignInSignUpContentType,
} from '../../../utils/types';
import React from 'react';

interface ISignInSignUpProps {
  contentType: SignInContentType;
  handleSignInSignupClick: () => void;
  handleForgotPassword: () => void;
}

const StyledColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledRowBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const StyledMainContainer = styled(StyledColumnBox)({
  borderRadius: '6px',
  backgroundColor: theme.palette.white.main,
  boxShadow: `0px 4px 28px 0px -${theme.palette.boxShadowColor.main}`,
  padding: '54px',
});

const StyledContentContainer = styled(StyledColumnBox)({
  gap: '24px',
  justifyContent: 'flex-start',
});

const StyledTopHeadBox = styled(StyledColumnBox)({
  gap: '12px',
});

const StyledTextfieldBox = styled(StyledColumnBox)({
  gap: '8px',
});

const StyledCheckbox = styled(Checkbox)({
  marginLeft: '10px',
});

const StyledSignupSigninControls = styled(StyledRowBox)({
  justifyContent: 'space-between',
  padding: '0px',
});

const StyledTextButton = styled(Button)({
  padding: '0px',
  boxShadow: 'none',
  height: '1px',
});

const StyledCheckboxContent = styled(StyledRowBox)({
  gap: '8px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '15px',
});

const StyledTextSpan = styled('span')({
  borderColor: theme.palette.primary500.main,
});

const StyledContinueButton = styled(Button)({
  height: '44px',
});

const StyledAuthBox = styled(StyledColumnBox)({
  gap: '16px',
});

const StyledAuthButton = styled(Button)({
  height: '48px',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.stroke.main}`,
});

const StyledSubtextBox = styled(StyledRowBox)({
  gap: '2px',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledDemarcatorPartition = styled(StyledRowBox)({
  gap: '8px',
  alignItems: 'center',
});

const StyledDemarcator = styled(Box)({
  width: '100%',
  borderTop: `1px solid ${theme.palette.stroke.main}`,
});

const SignInSignup = ({
  contentType,
  handleSignInSignupClick,
  handleForgotPassword,
}: ISignInSignUpProps) => {
  const {
    signInSignUpData,
    errorMessages,
    showPasswordValues,
    disableContinueButton,
    handleTextfieldsChange,
    handleEyeIconClicks,
    handleAuthButtonClick,
    handleLoginClick,
    handleSignupClick,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  } = useSignInSignUp(contentType);

  const { emailInput, password, confirmPassword } = signInSignUpData;
  const {
    emailErrorMessage,
    confirmPasswordErrorMessage,
    passwordErrorMessage,
    otherErrorMessage,
  } = errorMessages;
  const { showPassword, showConfirmPassword } = showPasswordValues;

  const SignInSignupContent: SignInSignUpContentType = {
    contentTypeText: contentType === SIGNIN_CONTENT_TYPE ? SIGNIN : SIGNUP,
    textContent:
      contentType === SIGNIN_CONTENT_TYPE
        ? SIGNIN_TEXT_CONTENT
        : SIGNUP_TEXT_CONTENT,
    checkboxText: contentType === SIGNUP_CONTENT_TYPE ? AGREE_TO : REMEMBER_ME,
    buttonClickMethod: () => {
      contentType === SIGNIN_CONTENT_TYPE
        ? handleLoginClick()
        : handleSignupClick(emailInput, password);
    },
    subtextContent:
      contentType === SIGNUP_CONTENT_TYPE
        ? ALREADY_MEMBER
        : DONT_HAVE_AN_ACCOUNT,
    navigateTo: contentType === SIGNIN_CONTENT_TYPE ? SIGNUP : SIGNIN,
  };
  return (
    <StyledMainContainer data-testid="signin-signup">
      <StyledContentContainer>
        <StyledTopHeadBox>
          <Typography variant={'h1'} color={theme.palette.textEmphasis.dark}>
            {SignInSignupContent.contentTypeText}
          </Typography>
          <Typography variant={'body2'} color={theme.palette.textEmphasis.main}>
            {SignInSignupContent.textContent}
          </Typography>
          <Typography variant={'caption1'} color={theme.palette.red.main}>
            {otherErrorMessage}
          </Typography>
        </StyledTopHeadBox>
        <StyledTextfieldBox>
          <Typography
            variant={'caption1'}
            color={theme.palette.textEmphasis.main}
          >
            {EMAIL}
          </Typography>
          <TextField
            variant={'outlined'}
            placeholder={EMAIL_PLACEHOLDER}
            value={emailInput}
            name={'emailInput'}
            handleChange={handleTextfieldsChange}
            handleValidation={validateEmail}
            error={!!emailErrorMessage}
            helperText={emailErrorMessage}
          />
        </StyledTextfieldBox>
        <StyledTextfieldBox>
          <Typography
            variant={'caption1'}
            color={theme.palette.textEmphasis.main}
          >
            {PASSWORD}
          </Typography>
          <TextField
            variant={'outlined'}
            placeholder={PASSWORD_PLACEHOLDER}
            handleValidation={validatePassword}
            endIcon={
              <Icon
                src={showPassword ? EyeOnIcon : EyeOffIcon}
                alt="eye-off"
                handleClick={React.useCallback(() => {
                  handleEyeIconClicks('showPassword');
                }, [handleEyeIconClicks])}
              />
            }
            value={password}
            name={'password'}
            handleChange={handleTextfieldsChange}
            type={showPassword ? 'text' : 'password'}
            error={!!passwordErrorMessage}
            helperText={passwordErrorMessage}
          />
        </StyledTextfieldBox>
        {contentType === SIGNUP_CONTENT_TYPE && (
          <StyledTextfieldBox>
            <Typography
              variant={'caption1'}
              color={theme.palette.textEmphasis.main}
            >
              {CONFIRM_PASSWORD}
            </Typography>
            <TextField
              variant={'outlined'}
              placeholder={PASSWORD_PLACEHOLDER}
              endIcon={
                <Icon
                  src={showConfirmPassword ? EyeOnIcon : EyeOffIcon}
                  alt="eye-off"
                  handleClick={() => {
                    handleEyeIconClicks('showConfirmPassword');
                  }}
                />
              }
              value={confirmPassword}
              name="confirmPassword"
              handleChange={handleTextfieldsChange}
              handleValidation={validateConfirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              error={!!confirmPasswordErrorMessage}
              helperText={confirmPasswordErrorMessage}
            />
          </StyledTextfieldBox>
        )}
        <StyledSignupSigninControls>
          <StyledCheckboxContent>
            <StyledCheckbox />
            <Typography
              variant={'body2'}
              color={theme.palette.textEmphasis.main}
            >
              {SignInSignupContent.checkboxText}
              {contentType === SIGNUP_CONTENT_TYPE && (
                <StyledTextSpan> {PRIVACY_POLICY} </StyledTextSpan>
              )}
            </Typography>
          </StyledCheckboxContent>
          {contentType === SIGNIN_CONTENT_TYPE && (
            <StyledTextButton
              variant={'text'}
              color={'white'}
              label={FORGOT_PASSWORD}
              labelColor={theme.palette.primary500.main}
              handleClick={handleForgotPassword}
            />
          )}
        </StyledSignupSigninControls>
        <StyledContinueButton
          variant={'contained'}
          color={'primary500'}
          label={SignInSignupContent.contentTypeText}
          labelColor={theme.palette.white.main}
          disabled={disableContinueButton}
          handleClick={SignInSignupContent.buttonClickMethod}
        />
        {contentType === SIGNIN_CONTENT_TYPE && (
          <>
            <StyledDemarcatorPartition>
              <StyledDemarcator />
              <Typography
                variant={'body2'}
                color={theme.palette.textEmphasis.main}
              >
                {OR}
              </Typography>
              <StyledDemarcator />
            </StyledDemarcatorPartition>
            <StyledAuthBox>
              <StyledAuthButton
                variant={'contained'}
                label={GOOGLE_SIGNIN_TEXT}
                color={'white'}
                labelVariant={'body2'}
                labelColor={theme.palette.textEmphasis.dark}
                startIcon={<img src={GoogleIcon} />}
                handleClick={handleAuthButtonClick}
              />
              <StyledAuthButton
                variant={'contained'}
                label={GITHUB_SIGNIN_TEXT}
                color={'white'}
                labelVariant={'body2'}
                labelColor={theme.palette.textEmphasis.dark}
                startIcon={<img src={GithubIcon} />}
              />
            </StyledAuthBox>
          </>
        )}
        <StyledSubtextBox>
          <Typography variant={'body2'} color={theme.palette.textEmphasis.main}>
            {SignInSignupContent.subtextContent}
          </Typography>
          <StyledTextButton
            variant={'text'}
            color={'white'}
            label={SignInSignupContent.navigateTo}
            labelColor={theme.palette.primary500.main}
            labelVariant={'body1'}
            handleClick={handleSignInSignupClick}
          />
        </StyledSubtextBox>
      </StyledContentContainer>
    </StyledMainContainer>
  );
};

export default React.memo(SignInSignup);
