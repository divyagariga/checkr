package com.checkr.userservice.service;

import com.checkr.userservice.dto.UserLoginRequest;
import com.checkr.userservice.dto.UserRegistrationRequestDTO;
import com.checkr.userservice.dto.UserResponse;
import com.checkr.userservice.exception.InvalidCredentialsException;
import com.checkr.userservice.exception.UserNotFoundException;
import com.checkr.userservice.exception.UserWithEmailAlreadyExistsException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

public interface UserService {
    UserResponse addUser(UserRegistrationRequestDTO userRegistrationRequestDTO) throws UserWithEmailAlreadyExistsException;

    UserResponse loginUser(UserLoginRequest userLoginRequest) throws UserNotFoundException, InvalidCredentialsException;

    UserResponse loginUserWithAuth(UserLoginRequest userLoginRequest) throws UserNotFoundException, InvalidCredentialsException;

    UserResponse findUserByEmail(String email) throws UserNotFoundException;
    Boolean validatetoken(String token);

    void sendOtpToUserEmail(HttpServletRequest request, String email) throws UserNotFoundException, MessagingException;
}
