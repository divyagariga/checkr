package com.checkr.userservice.controller;

import com.checkr.userservice.dto.UserLoginRequest;
import com.checkr.userservice.dto.UserRegistrationRequestDTO;
import com.checkr.userservice.dto.UserResponse;
import com.checkr.userservice.exception.InvalidCredentialsException;
import com.checkr.userservice.exception.UserNotFoundException;
import com.checkr.userservice.exception.UserWithEmailAlreadyExistsException;
import com.checkr.userservice.security.JsonWebTokenService;
import com.checkr.userservice.service.UserService;
import com.checkr.userservice.service.ValidateOtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import static com.checkr.userservice.constants.UserServiceConstants.RESET_CODE_SUCCESS;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3001")
public class UserController {
    private final UserService userService;

    private final ValidateOtpService validateOtpService;
    private JsonWebTokenService jsonWebTokenService;

    @Autowired
    public UserController(UserService userService, ValidateOtpService validateOtpService){
        this.userService = userService;
        this.validateOtpService = validateOtpService;
    }

    /**
     * To signup for a user with useremail and password
     *
     * @param userRegistrationRequestDTO
     * @return
     * @throws UserWithEmailAlreadyExistsException
     */
    @PostMapping
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRegistrationRequestDTO userRegistrationRequestDTO) throws UserWithEmailAlreadyExistsException {
        System.out.println("reached controler   "+userRegistrationRequestDTO.getEmail()+" "+userRegistrationRequestDTO.getPassword());
        return new ResponseEntity<>(userService.addUser(userRegistrationRequestDTO) , HttpStatus.OK);
    }

    /**
     * Login a user with email and password
     *
     * @param userLoginRequest
     * @return
     * @throws InvalidCredentialsException
     * @throws UserNotFoundException
     */
    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(@RequestBody UserLoginRequest userLoginRequest) throws InvalidCredentialsException, UserNotFoundException {
        return new ResponseEntity<>(userService.loginUser(userLoginRequest), HttpStatus.OK);
    }

    /**
     * Login a user with auth0 providing user email and empty password
     *
     * @param userLoginRequest
     * @return
     * @throws InvalidCredentialsException
     * @throws UserNotFoundException
     */
    @PostMapping("/auth")
    public ResponseEntity<UserResponse> loginUserWithAuth(@RequestBody UserLoginRequest userLoginRequest) {
        return new ResponseEntity<>(userService.loginUserWithAuth(userLoginRequest), HttpStatus.OK);
    }

    /**
     * send otp for a user
     *
     * @param request
     * @param userEmail
     * @return
     * @throws UserNotFoundException
     * @throws MessagingException
     */
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtpToUser(HttpServletRequest request,
                                                @RequestParam("email") String userEmail) throws UserNotFoundException, MessagingException {
        userService.sendOtpToUserEmail(request, userEmail);
        return new ResponseEntity<>(RESET_CODE_SUCCESS, HttpStatus.OK);
    }

    /**
     * Return otp for a user email
     *
     * @param email
     * @return
     */
    @GetMapping("/validate-otp")
    public ResponseEntity<String> validateOtp(
            @RequestParam("email") String email) {
        return new ResponseEntity<>(validateOtpService.validateForgotPasswordOtp(email), HttpStatus.OK);
    }
    @GetMapping("/valid")
    public ResponseEntity<Boolean> validate(
            @RequestParam("token") String token) {
        return new ResponseEntity<>(userService.validatetoken(token), HttpStatus.OK);
    }


}
