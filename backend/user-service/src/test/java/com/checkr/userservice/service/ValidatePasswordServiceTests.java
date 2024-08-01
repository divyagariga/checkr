package com.checkr.userservice.service;

import com.checkr.userservice.repository.ForgotPasswordOtpRepository;
import com.checkr.userservice.entity.ForgotPasswordOtp;
import com.checkr.userservice.exception.OtpExpiredException;
import com.checkr.userservice.exception.UserNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.checkr.userservice.constants.UserServiceConstants.OTP_EXPIRED_MESSAGE;
import static com.checkr.userservice.constants.UserServiceConstants.USER_WITH_EMAIL_NOT_FOUND;
import static org.mockito.MockitoAnnotations.openMocks;

@ExtendWith(MockitoExtension.class)
class ValidatePasswordServiceTests {
    @Mock
    private ForgotPasswordOtpRepository forgotPasswordOtpRepository;

    @InjectMocks
    private ValidateOtpService validateOtpService;

    @BeforeEach
    public void setUp() {
        openMocks(this);
    }

    @Test
    void testValidateForgotPasswordOtp() {
        ForgotPasswordOtp forgotPasswordOtp = new ForgotPasswordOtp();
        forgotPasswordOtp.setExpiryDate(LocalDateTime.now().plusSeconds(86400));
        forgotPasswordOtp.setOtp("4619");

        Mockito.when(forgotPasswordOtpRepository.findByUserEmail("test@gmail.com")).thenReturn(Optional.ofNullable(forgotPasswordOtp));
        String response = validateOtpService.validateForgotPasswordOtp("test@gmail.com");
        Assertions.assertEquals(forgotPasswordOtp.getOtp(), response);
    }

    @Test
    void testValidatePasswordResetToken_Expired_throwsOtpExpiredException() {
        ForgotPasswordOtp forgotPasswordOtp = new ForgotPasswordOtp();
        forgotPasswordOtp.setExpiryDate(LocalDateTime.now().minusSeconds(86400));

        Mockito.when(forgotPasswordOtpRepository.findByUserEmail("test@gmail.com")).thenReturn(Optional.ofNullable(forgotPasswordOtp));
        OtpExpiredException otpExpiredException = Assertions.assertThrows(OtpExpiredException.class, () -> {
            validateOtpService.validateForgotPasswordOtp("test@gmail.com");
        });

        Assertions.assertEquals(String.format(OTP_EXPIRED_MESSAGE, "test@gmail.com", forgotPasswordOtp.getExpiryDate()), otpExpiredException.getMessage());
    }

    @Test
    void testValidatePasswordResetToken_throwsUserNotFoundException() {
        Mockito.when(forgotPasswordOtpRepository.findByUserEmail("test@gmail.com")).thenReturn(Optional.ofNullable(null));
        UserNotFoundException userNotFoundException = Assertions.assertThrows(UserNotFoundException.class, () -> {
            validateOtpService.validateForgotPasswordOtp("test@gmail.com");
        });

        Assertions.assertEquals(String.format(USER_WITH_EMAIL_NOT_FOUND, "test@gmail.com"), userNotFoundException.getMessage());
    }
}
