import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../Theme/theme';
import {
  CONTINUE,
  EMAIL,
  FORGOT_PASSWORD,
  GO_BACK,
  OTP_HEAD,
  OTP_MAX_LENGTH,
  OTP_SUBTEXT,
  OTP_TEXT,
  OTP_TEXTFIELD_KEY,
  RESEND_OTP,
  RESET_EMAIL_PLACEHOLDER,
  RESET_PASSWORD,
  RESET_TEXT,
} from '../../../utils/constants';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import BackArrowIcon from '../../../../public/assets/icons/backarrowicon.svg';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import useForgotPassword from './hooks';
import { ResetPasswordContentType } from '../../../utils/types';

interface IForgotPasswordProps {
  handleResetPasswordButtonClick: () => void;
}

const StyledPasswordMainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '672px',
  borderRadius: '6px',
  backgroundColor: theme.palette.white.main,
  padding: '16px 36px',
  justifyContent: 'flex-start',
  gap: '18px',
});

const StyledBackButtonBox = styled(Box)({
  width: '120px',
  height: '20px',
});

const StyledContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const StyledTextContentBox = styled(StyledContentBox)({
  gap: '8px',
});

const StyledOtpTextfieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});

const StyledOTPSubTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '2px',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledContinueButton = styled(Button)({
  height: '44px',
});

const StyledBackButton = styled(Button)({
  paddingLeft: 0,
  boxShadow: 'none',
});

const ForgotPassword = ({
  handleResetPasswordButtonClick,
}: IForgotPasswordProps) => {
  const {
    resetData,
    errorMessages,
    sendEmailScreen,
    isValidEmail,
    otpTextFieldReferences,
    validateEmail,
    handleTextfieldsChange,
    handleResetPasswordClick,
    handleContinueButtonClick,
  } = useForgotPassword(handleResetPasswordButtonClick);

  const getOtpTextfields = useMemo(() => {
    const textFieldsArray: JSX.Element[] = [];
    resetData.otpInputs.forEach((otpInput, index) => {
      textFieldsArray.push(
        <TextField
          name={'otpInputs ' + index}
          key={OTP_TEXTFIELD_KEY[index]}
          variant={'outlined'}
          value={otpInput}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTextfieldsChange(e)
          }
          error={!!errorMessages.otpErrorMessage}
          inputRef={otpTextFieldReferences[index]}
          inputProps={{ maxLength: OTP_MAX_LENGTH }}
        />,
      );
    });

    return textFieldsArray;
  }, [
    errorMessages.otpErrorMessage,
    handleTextfieldsChange,
    resetData.otpInputs,
  ]);

  const ResetPasswordContent: ResetPasswordContentType = {
    head: sendEmailScreen ? FORGOT_PASSWORD : OTP_HEAD,
    subtext: sendEmailScreen ? RESET_TEXT : OTP_TEXT,
    textFieldContent: sendEmailScreen ? (
      <StyledTextContentBox>
        <Typography
          variant={'caption3'}
          color={theme.palette.textEmphasis.main}
        >
          {EMAIL}
        </Typography>
        <TextField
          variant={'outlined'}
          name="emailInput"
          placeholder={RESET_EMAIL_PLACEHOLDER}
          value={resetData.emailInput}
          handleChange={handleTextfieldsChange}
          error={!!errorMessages.emailErrorMessage}
          helperText={errorMessages.emailErrorMessage}
          handleValidation={validateEmail}
        />
      </StyledTextContentBox>
    ) : (
      <StyledTextContentBox>
        <StyledOtpTextfieldBox>{getOtpTextfields}</StyledOtpTextfieldBox>
        {errorMessages.otpErrorMessage && (
          <Typography variant="body2" color={theme.palette.red.main}>
            {errorMessages.otpErrorMessage}
          </Typography>
        )}
      </StyledTextContentBox>
    ),
    buttonText: sendEmailScreen ? RESET_PASSWORD : CONTINUE,
    buttonDisabledCondition: sendEmailScreen ? !isValidEmail : false,
    buttonClickFunction: () => {
      sendEmailScreen
        ? handleResetPasswordClick()
        : handleContinueButtonClick();
    },
  };

  return (
    <StyledPasswordMainContainer data-testid="forgot-password">
      {/* <StyledBackButtonBox>
        <StyledBackButton
          variant="text"
          label={GO_BACK}
          startIcon={<Icon src={BackArrowIcon} alt={'backarrow'} />}
          labelColor={theme.palette.primary500.main}
          labelVariant={'caption3'}
          color={'white'}
        />
      </StyledBackButtonBox> */}
      <StyledContentBox>
        <StyledTextContentBox>
          <Typography variant={'h1'} color={theme.palette.textEmphasis.dark}>
            {ResetPasswordContent.head}
          </Typography>
          <Typography variant={'body2'} color={theme.palette.textEmphasis.main}>
            {ResetPasswordContent.subtext}
          </Typography>
        </StyledTextContentBox>
        {ResetPasswordContent.textFieldContent}
        <StyledContinueButton
          variant={'contained'}
          color={'primary500'}
          label={ResetPasswordContent.buttonText}
          labelColor={theme.palette.white.main}
          labelVariant={'body1'}
          disabled={ResetPasswordContent.buttonDisabledCondition}
          handleClick={ResetPasswordContent.buttonClickFunction}
        />
        {/* {!sendEmailScreen && (
          <StyledOTPSubTextBox>
            <Typography variant="body2" color={theme.palette.textEmphasis.main}>
              {OTP_SUBTEXT}
            </Typography>
            <Typography variant="body1" color={theme.palette.primary500.main}>
              {RESEND_OTP}
            </Typography>
          </StyledOTPSubTextBox>
        )} */}
      </StyledContentBox>
    </StyledPasswordMainContainer>
  );
};

export default React.memo(ForgotPassword);
