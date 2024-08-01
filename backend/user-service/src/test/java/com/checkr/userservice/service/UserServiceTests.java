package com.checkr.userservice.service;

import com.checkr.userservice.repository.ForgotPasswordOtpRepository;
import com.checkr.userservice.repository.UserRepository;
import com.checkr.userservice.dto.UserLoginRequest;
import com.checkr.userservice.dto.UserRegistrationRequestDTO;
import com.checkr.userservice.dto.UserResponse;
import com.checkr.userservice.entity.ForgotPasswordOtp;
import com.checkr.userservice.entity.User;
import com.checkr.userservice.exception.*;
import com.checkr.userservice.security.JsonWebTokenService;
import com.checkr.userservice.mappers.UserMapper;
import com.checkr.userservice.security.AuthenticationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.util.Optional;

import static com.checkr.userservice.constants.UserServiceConstants.USER_WITH_EMAIL_NOT_FOUND;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.openMocks;

@ExtendWith(MockitoExtension.class)
class UserServiceTests {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private HttpServletRequest httpServletRequest;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private JsonWebTokenService jsonWebTokenService;

    @Mock
    private HttpServletRequest httpRequest;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private Authentication authentication;

    @Mock
    private EmailService emailService;

    @Mock
    private ForgotPasswordOtpRepository forgotPasswordOtpRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    public void setUp() {
        openMocks(this);
    }

    @Test
    void testAddUser() throws UserWithEmailAlreadyExistsException {
        given(jsonWebTokenService.generateToken(any())).willReturn("token");

        UserRegistrationRequestDTO userRegistrationRequestDTO = new UserRegistrationRequestDTO();
        userRegistrationRequestDTO.setName("User");
        userRegistrationRequestDTO.setEmail("test@gmail.com");
        userRegistrationRequestDTO.setPassword("Test@123");

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");
        user.setPassword("Test@123");

        UserResponse mockUserResponse = new UserResponse();
        mockUserResponse.setToken("token");

        when(userRepository.findByEmail(userRegistrationRequestDTO.getEmail())).thenReturn(Optional.ofNullable(null));
        when(authenticationService.encodePassword(userRegistrationRequestDTO.getPassword())).thenReturn("ABC1245");
        when(userMapper.convertUserDtoToUser(userRegistrationRequestDTO)).thenReturn(user);
        when(userMapper.createUserLoginResponse(user, "token")).thenReturn(mockUserResponse);

        UserResponse userResponse = userService.addUser(userRegistrationRequestDTO);
        Assertions.assertEquals("token", userResponse.getToken());
    }

    @Test
    void testAddUserThrowsEmailAlreadyExistsException() throws UserWithEmailAlreadyExistsException {
        UserRegistrationRequestDTO userRegistrationRequestDTO = new UserRegistrationRequestDTO();
        userRegistrationRequestDTO.setName("User");
        userRegistrationRequestDTO.setEmail("test@gmail.com");
        userRegistrationRequestDTO.setPassword("Test@123");

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        UserResponse mockUserResponse = new UserResponse();
        mockUserResponse.setToken("token");

        when(userRepository.findByEmail(userRegistrationRequestDTO.getEmail())).thenReturn(Optional.ofNullable(user));

        UserWithEmailAlreadyExistsException userWithEmailAlreadyExistsException = Assertions.assertThrows(UserWithEmailAlreadyExistsException.class, () -> {
            userService.addUser(userRegistrationRequestDTO);
        });

        String expectedMessage = "User with Email: test@gmail.com already exists.";
        Assertions.assertEquals(expectedMessage, userWithEmailAlreadyExistsException.getMessage());
    }

    @Test
    void testAddUserThrowsCandidateCreationFailedException() {
        ReflectionTestUtils.setField(userService, "candidateEndpointUrl", "http://localhost:9002/api/v1/candidates/save-candidates");
        UserRegistrationRequestDTO userRegistrationRequestDTO = new UserRegistrationRequestDTO();
        userRegistrationRequestDTO.setName("User");
        userRegistrationRequestDTO.setEmail("test@gmail.com");
        userRegistrationRequestDTO.setPassword("Test@123");

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");
        user.setPassword("Test@123");

        UserResponse mockUserResponse = new UserResponse();
        mockUserResponse.setToken("token");

        when(userRepository.findByEmail(userRegistrationRequestDTO.getEmail())).thenReturn(Optional.ofNullable(null));
        when(authenticationService.encodePassword(userRegistrationRequestDTO.getPassword())).thenReturn("ABC1245");
        when(userMapper.convertUserDtoToUser(userRegistrationRequestDTO)).thenReturn(user);

        when(userRepository.findByEmail(userRegistrationRequestDTO.getEmail())).thenReturn(Optional.ofNullable(null));

        when(restTemplate.exchange(eq("http://localhost:9002/api/v1/candidates/save-candidates"), any(HttpMethod.class), any(HttpEntity.class), eq(String.class))).thenThrow(new CandidatesCreationException("Candidate creation failed."));

        CandidatesCreationException candidatesCreationException = Assertions.assertThrows(CandidatesCreationException.class, () -> {
            userService.addUser(userRegistrationRequestDTO);
        });

        Assertions.assertEquals("Candidate creation failed.", candidatesCreationException.getMessage());
    }

    @Test
    void testLoginUser() throws UserNotFoundException, InvalidCredentialsException {
        given(jsonWebTokenService.generateToken(any())).willReturn("token");

        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setEmail("test@gmail.com");
        userLoginRequest.setPassword("Test@123");

        UserResponse mockUserResponse = new UserResponse();
        mockUserResponse.setEmail("test@gmail.com");
        mockUserResponse.setToken("token");

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        when(authenticationService.authenticateUser(userLoginRequest.getEmail(), userLoginRequest.getPassword())).thenReturn(user);
        when(userMapper.createUserLoginResponse(user, "token")).thenReturn(mockUserResponse);

        UserResponse userResponse = userService.loginUser(userLoginRequest);

        Assertions.assertEquals(mockUserResponse.getToken(), userResponse.getToken());
    }

    @Test
    void testFindUserByEmail() throws UserNotFoundException {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));

        UserResponse mockUserResponse = new UserResponse();
        mockUserResponse.setToken("token");

        when(userMapper.createUserLoginResponse(user, null)).thenReturn(mockUserResponse);

        UserResponse userResponse = userService.findUserByEmail("test@gmail.com");
        Assertions.assertEquals(mockUserResponse.getToken(), userResponse.getToken());
    }

    @Test
    void testFindUserByEmailThrowsUserNameNotFoundException() throws UserNotFoundException {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(null));

        UserNotFoundException userNotFoundException = Assertions.assertThrows(UserNotFoundException.class, () -> {
            userService.findUserByEmail("test@gmail.com");
        });

        String expectedMessage = "User with email: test@gmail.com not found";
        Assertions.assertEquals(expectedMessage, userNotFoundException.getMessage());
    }

    @Test
    void testSendOtpToUserEmail() throws UserNotFoundException {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));
        userService.sendOtpToUserEmail(httpRequest, "test@gmail.com");

        verify(emailService).sendEmail(anyString(), eq(user), eq(httpRequest));
    }

    @Test
    void testSendOtpToUserEmailExistingUser() throws UserNotFoundException {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        ForgotPasswordOtp forgotPasswordOtp = new ForgotPasswordOtp();
        forgotPasswordOtp.setUser(user);

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(forgotPasswordOtpRepository.findByUserEmail("test@gmail.com")).thenReturn(Optional.ofNullable(forgotPasswordOtp));
        userService.sendOtpToUserEmail(httpRequest, "test@gmail.com");

        verify(emailService).sendEmail(anyString(), eq(user), eq(httpRequest));
    }

    @Test
    void testSendOtpToUserEmailInvalidEmail() throws UserNotFoundException {
        InvalidEmailFormatException invalidEmailFormatException = Assertions.assertThrows(InvalidEmailFormatException.class, () -> {
            userService.sendOtpToUserEmail(httpRequest, "test");
        });
        String expectedMessage = "Invalid Email: " + "test";
        Assertions.assertEquals(expectedMessage, invalidEmailFormatException.getMessage());
    }

    @Test
    void testSendOtpToUserEmailThrowsUsernameNotFoundException() throws UserNotFoundException {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(null));

        UserNotFoundException userNotFoundException = Assertions.assertThrows(UserNotFoundException.class, () -> {
            userService.sendOtpToUserEmail(httpRequest, "test@gmail.com");
        });

        String expectedMessage = "User with email: test@gmail.com not found";
        Assertions.assertEquals(expectedMessage, userNotFoundException.getMessage());
    }
}

