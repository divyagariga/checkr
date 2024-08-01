package com.checkr.userservice.controller;

import com.checkr.userservice.dto.UserLoginRequest;
import com.checkr.userservice.dto.UserRegistrationRequestDTO;
import com.checkr.userservice.dto.UserResponse;
import com.checkr.userservice.exception.InvalidCredentialsException;
import com.checkr.userservice.exception.UserNotFoundException;
import com.checkr.userservice.exception.UserWithEmailAlreadyExistsException;
import com.checkr.userservice.service.ValidateOtpService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import com.checkr.userservice.service.UserService;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserControllerTests {
    @Mock
    private UserService userService;

    @Mock
    private ValidateOtpService validateOtpService;

    @Mock
    private HttpServletRequest httpRequest;

    @InjectMocks
    private UserController userController;

    @Test
    void testSignUpUser() throws UserWithEmailAlreadyExistsException {
        UserRegistrationRequestDTO userRegistrationRequestDTO = new UserRegistrationRequestDTO();
        userRegistrationRequestDTO.setName("User");
        userRegistrationRequestDTO.setEmail("test@gmail.com");
        userRegistrationRequestDTO.setPassword("Test@123");

        UserResponse userResponse = new UserResponse();
        userResponse.setEmail("test@gmail.com");

        when(userService.addUser(userRegistrationRequestDTO)).thenReturn(userResponse);
        ResponseEntity<UserResponse> response = userController.registerUser(userRegistrationRequestDTO);

        Assertions.assertEquals(response.getBody().getEmail(), userRegistrationRequestDTO.getEmail());
    }

    @Test
    void testLoginUser() throws UserNotFoundException, InvalidCredentialsException {
        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setEmail("test@gmail.com");
        userLoginRequest.setPassword("Test@123");

        UserResponse userResponse = new UserResponse();
        userResponse.setEmail("test@gmail.com");

        when(userService.loginUser(userLoginRequest)).thenReturn(userResponse);
        ResponseEntity<UserResponse> response = userController.loginUser(userLoginRequest);

        Assertions.assertEquals(response.getBody().getEmail(), userLoginRequest.getEmail());
    }

    @Test
    void testResetPassword() throws UserNotFoundException, MessagingException {
        ResponseEntity<String> response = userController.sendOtpToUser(httpRequest, "test@gmail.com");
        Assertions.assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());
    }

    @Test
    void testValidateOtp() throws UserNotFoundException {
        when(validateOtpService.validateForgotPasswordOtp("test@gmail.com")).thenReturn("1234");
        ResponseEntity<String> response = userController.validateOtp("test@gmail.com");
        Assertions.assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());
        Assertions.assertEquals("1234", response.getBody());
    }

    @Test
    void testLoginWithAuth() throws UserNotFoundException {
        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setEmail("test@gmail.com");

        UserResponse userResponse = new UserResponse();
        userResponse.setEmail("test@gmail.com");

        when(userService.loginUserWithAuth(userLoginRequest)).thenReturn(userResponse);
        ResponseEntity<UserResponse> response = userController.loginUserWithAuth(userLoginRequest);

        Assertions.assertEquals(response.getBody().getEmail(), userLoginRequest.getEmail());
    }
}
