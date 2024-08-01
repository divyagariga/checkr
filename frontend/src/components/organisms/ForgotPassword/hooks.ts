/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import {
  authLogin,
  createResetPasswordOtp,
  getOtpByUserEmail,
} from '../../../services/user-service';
import {
  EMAIL_HELPER_TEXT,
  EMAIL_REGEX,
  NUMBER_OF_OTP_TEXTFIELDS,
  OTP_HELPER_TEXT,
  TIMEOUT_RESET_PASSWORD,
} from '../../../utils/constants';
import { validateInput } from '../../../utils/helperFunctions';
import {
  ResetPasswordDataType,
  ResetPasswordErrorsType,
  UserType,
} from '../../../utils/types';

const useForgotPassword = (handleResetPasswordButtonClick: () => void) => {
  const [resetData, setResetData] = useState<ResetPasswordDataType>({
    emailInput: '',
    otpInputs: Array(NUMBER_OF_OTP_TEXTFIELDS).fill(''),
  });

  const [errorMessages, setErrorMessages] = useState<ResetPasswordErrorsType>({
    emailErrorMessage: '',
    otpErrorMessage: '',
  });

  const [sendEmailScreen, setSendEmailScreen] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

  const otpTextFieldReferences = [useRef(), useRef(), useRef(), useRef()];

  const { login } = useAuthContext();

  const handleTextfieldsChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    if (name === 'emailInput') {
      setResetData((prevResetData) => ({
        ...prevResetData,
        [name]: value,
      }));
    } else {
      const index: number = parseInt(name.split(' ')[1]);
      const newResetData = resetData;
      newResetData.otpInputs[index] = value;
      setResetData((prevResetData) => ({
        ...prevResetData,
        otpInputs: newResetData.otpInputs,
      }));

      if (value !== '' && index < resetData.otpInputs.length - 1) {
        const nextTextFieldRef = otpTextFieldReferences[
          index + 1
        ] as unknown as React.RefObject<HTMLInputElement>;

        nextTextFieldRef?.current?.focus();
      }
    }
  };

  const validateEmail = () => {
    const isValid = validateInput(resetData.emailInput, EMAIL_REGEX);
    setIsValidEmail(isValid);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      emailErrorMessage: !isValid ? EMAIL_HELPER_TEXT : '',
    }));
  };

  const validateOtpFields = () => {
    const isValidOtp =
      resetData.otpInputs.length === NUMBER_OF_OTP_TEXTFIELDS &&
      resetData.otpInputs.every((input) => input !== '');
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      otpErrorMessage: !isValidOtp ? OTP_HELPER_TEXT : '',
    }));

    return isValidOtp;
  };

  // const updateOtpForUser = useMemo(() => {
  //   return async () => {
  //     await createResetPasswordOtp(resetData.emailInput).catch((error) =>
  //       console.log(error),
  //     );
  //   };
  // }, [resetData.emailInput]);

  const updateOtpForUser = useCallback(async () => {
    try {
      const response = await createResetPasswordOtp(resetData.emailInput);
      // Handle the response if needed
    } catch (error) {
      console.log(error);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        emailErrorMessage: "Email not found",
      }));
    }
  }, [resetData.emailInput]);
  const handleResetPasswordClick = useCallback(() => {
    updateOtpForUser();
    handleResetPasswordButtonClick();
    setTimeout(() => {
      setSendEmailScreen(false);
    }, TIMEOUT_RESET_PASSWORD);
  }, [resetData.emailInput]);

  const getOtpForUser = async () => {
    const otpData: string = await getOtpByUserEmail(resetData.emailInput).catch(
      (error) => console.log(error),
    );
    const validOtp = validateOtp(otpData);
    if (validOtp) {
      const loginData: UserType = await authLogin(resetData.emailInput);
      login(loginData);
    } else {
      setResetData((prevResetData) => ({
        ...prevResetData,
        otpInputs: Array(NUMBER_OF_OTP_TEXTFIELDS).fill(''),
      }));
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        otpErrorMessage: OTP_HELPER_TEXT,
      }));
    }
  };

  const validateOtp = (storedOtp?: string) => {
    const availableOtp = resetData.otpInputs.join('');
    return storedOtp == availableOtp;
  };

  const handleContinueButtonClick = () => {
    const isValidOtp = validateOtpFields();
    if (isValidOtp) getOtpForUser();
  };

  return {
    resetData,
    errorMessages,
    sendEmailScreen,
    isValidEmail,
    otpTextFieldReferences,
    validateEmail,
    handleTextfieldsChange,
    handleResetPasswordClick,
    handleContinueButtonClick,
  };
};

export default useForgotPassword;
