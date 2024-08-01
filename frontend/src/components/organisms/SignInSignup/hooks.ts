/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authLogin, loginUser, postUser } from '../../../services/user-service';
import {
  CONFIRM_PASSWORD_HELPER_TEXT,
  EMAIL_HELPER_TEXT,
  EMAIL_REGEX,
  PASSWORD_HELPER_TEXT,
  PASSWORD_REGEX,
  SIGNIN_CONTENT_TYPE,
  SIGNUP_CONTENT_TYPE,
  USER_NOT_FOUND,
} from '../../../utils/constants';
import { validateInput } from '../../../utils/helperFunctions';
import {
  SignInContentType,
  SignInSignUpDataType,
  SignInSignUpErrorsType,
  SignInSignUpShowPasswordType,
  UserType,
} from '../../../utils/types';
import { useAuthContext } from '../../../contexts/AuthContext';

const useSignInSignUp = (contentType: SignInContentType) => {
  const [signInSignUpData, setSignInSignUpData] =
    useState<SignInSignUpDataType>({
      emailInput: '',
      password: '',
      confirmPassword: '',
    });

  const [errorMessages, setErrorMessages] = useState<SignInSignUpErrorsType>({
    emailErrorMessage: '',
    passwordErrorMessage: '',
    confirmPasswordErrorMessage: '',
    otherErrorMessage: '',
  });

  const [showPasswordValues, setShowPasswordValues] =
    useState<SignInSignUpShowPasswordType>({
      showPassword: false,
      showConfirmPassword: false,
    });

  const [disableContinueButton, setDisableContinueButton] =
    useState<boolean>(true);

  const { user, loginWithRedirect } = useAuth0();
  const { login, signup } = useAuthContext();

  useEffect(() => {
    setErrorMessages({
      emailErrorMessage: '',
      passwordErrorMessage: '',
      confirmPasswordErrorMessage: '',
      otherErrorMessage: '',
    });

    setSignInSignUpData({
      confirmPassword: '',
      password: '',
      emailInput: '',
    });

    setShowPasswordValues({
      showPassword: false,
      showConfirmPassword: false,
    });

    setDisableContinueButton(true);
  }, [contentType]);

  useEffect(() => {
    validateFields();
  }, [errorMessages]);

  useEffect(() => {
    handleUserAuthLogin();
  }, [user]);

  const handleUserAuthLogin = async () => {
    if (user?.email) {
      await handleSignupClick(user.email, '');
      const loginData: UserType = await authLogin(user.email);
      login(loginData);
    }
  };

  const validateFields = () => {
    const hasErrors =
      errorMessages.emailErrorMessage !== '' ||
      errorMessages.passwordErrorMessage !== '' ||
      errorMessages.confirmPasswordErrorMessage !== '';
    if (
      signInSignUpData.emailInput !== '' &&
      signInSignUpData.password !== ''
    ) {
      contentType === SIGNUP_CONTENT_TYPE &&
        signInSignUpData.confirmPassword !== '' &&
        setDisableContinueButton(hasErrors);
      contentType === SIGNIN_CONTENT_TYPE &&
        setDisableContinueButton(hasErrors);
    } else {
      setDisableContinueButton(true);
    }
  };

  const validateEmail = () => {
    const isValidEmail = validateInput(
      signInSignUpData.emailInput,
      EMAIL_REGEX,
    );
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      emailErrorMessage: !isValidEmail ? EMAIL_HELPER_TEXT : '',
    }));
    return isValidEmail;
  };

  const validatePassword = () => {
    const isValidPassword = validateInput(
      signInSignUpData.password,
      PASSWORD_REGEX,
    );
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      passwordErrorMessage: !isValidPassword ? PASSWORD_HELPER_TEXT : '',
    }));

    return isValidPassword;
  };

  const validateConfirmPassword = () => {
    const isValidConfirmPassword = validateInput(
      signInSignUpData.confirmPassword,
      PASSWORD_REGEX,
    );
    let errorMessage = '';
    if (
      signInSignUpData.confirmPassword !== '' &&
      signInSignUpData.password !== signInSignUpData.confirmPassword
    ) {
      errorMessage = CONFIRM_PASSWORD_HELPER_TEXT;
    } else {
      errorMessage = '';
    }

    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      confirmPasswordErrorMessage: errorMessage,
    }));

    return isValidConfirmPassword;
  };

  const handleTextfieldsChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setSignInSignUpData((prevSigninSignupData) => ({
      ...prevSigninSignupData,
      [name]: value,
    }));
  };

  const handleEyeIconClicks = useCallback(
    (passwordField: keyof SignInSignUpShowPasswordType) => {
      setShowPasswordValues((prevShowPasswordValues) => ({
        ...prevShowPasswordValues,
        [passwordField]: !prevShowPasswordValues[passwordField],
      }));
    },
    [],
  );

  const handleAuthButtonClick = useCallback(async () => {
    const redirectUri = process.env.REDIRECT_URI;
    console.log("EEEE",process.env.REDIRECT_URI)
    loginWithRedirect({
      appState: {
        returnTo: redirectUri,
      },
      authorizationParams: {
        connection: 'google-oauth2',
        redirect_uri: redirectUri,
      },
    });
    handleUserAuthLogin();
  }, []);

  const handleLoginClick = async () => {
    try {
      const validUser = await loginUser(
        signInSignUpData.emailInput,
        signInSignUpData.password,
      );
      if (validUser !== undefined) {
        login(validUser);
      } else {
        console.log(USER_NOT_FOUND);
      }
    } catch (error) {
      const errorMessage = String(error);
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        otherErrorMessage: errorMessage,
      }));
    }
  };

  const handleSignupClick = async (email: string, password: string) => {
    try {
      const signedUpUserData = (await postUser(email, password)) as UserType;
      signup(signedUpUserData);
    } catch (error) {
      const errorMessage = String(error);
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        otherErrorMessage: errorMessage,
      }));
    }
  };

  return {
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
  };
};

export default useSignInSignUp;
