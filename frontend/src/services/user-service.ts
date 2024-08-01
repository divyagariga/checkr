import { UserType } from '../utils/types';
import CustomAxios from '../api';
import axios from 'axios';
import { BASE_URL } from '../config/url';

export const createResetPasswordOtp = async (email: string) => {
  try {
    const response = await axios.post(
      BASE_URL + `api/v1/users/send-otp`,
      null,
      {
        params: { email },
      },
    );
    const otp = response.data;
    return otp;
  }  catch (response:any) {
    console.log(response.response.data.message);
    return Promise.reject(response.response.data.message);
  }
};

export const getUserByEmail = async (email: string) => {
  const users: UserType[] = await getAllUsers();

  const user: UserType = users.filter((user) => user.email === email)[0];
  return user;
};

export const getAllUsers = async () => {
  try {
    const response = await CustomAxios.get(`users`, {
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    });
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(BASE_URL + `api/v1/users/`, {
      name: '',
      email,
      password,
    });
    const userLoginData = response.data;
    window.localStorage.setItem('accessToken', userLoginData.token);
    CustomAxios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userLoginData.token}`;
    return userLoginData;
  }  catch (response:any) {
    console.log(response.response.data.message);
    return Promise.reject(response.response.data.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(BASE_URL + `api/v1/users/login`, {
      email,
      password,
    });
    const userLoginData = response.data;
    window.localStorage.setItem('accessToken', userLoginData.token);
    CustomAxios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userLoginData.token}`;
    return userLoginData;
  } catch (response:any) {
    console.log(response.response.data.message);
    return Promise.reject(response.response.data.message);
  }
};

export const authLogin = async (email: string) => {
  try {
    const response = await axios.post(BASE_URL + `api/v1/users/auth`, {
      email,
    });
    const userLoginData = response.data;
    window.localStorage.setItem('accessToken', userLoginData.token);
    CustomAxios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userLoginData.token}`;
    return userLoginData;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOtpByUserEmail = async (email: string) => {
  try {
    const response = await axios.get(BASE_URL + `api/v1/users/validate-otp`, {
      params: {
        email,
      },
    });
    const otp = response.data;
    return otp;
  } catch (response:any) {
    console.log(response.response.data.message);
    return Promise.reject(response.response.data.message);
  }
};
