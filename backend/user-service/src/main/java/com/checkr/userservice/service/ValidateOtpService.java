package com.checkr.userservice.service;

import com.checkr.userservice.repository.ForgotPasswordOtpRepository;
import com.checkr.userservice.entity.ForgotPasswordOtp;
import com.checkr.userservice.exception.OtpExpiredException;
import com.checkr.userservice.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.checkr.userservice.constants.UserServiceConstants.*;

@Service
public class ValidateOtpService {
    private ForgotPasswordOtpRepository forgotPasswordOtpRepository;

    public ValidateOtpService(ForgotPasswordOtpRepository forgotPasswordOtpRepository) {
        this.forgotPasswordOtpRepository = forgotPasswordOtpRepository;
    }

    public String validateForgotPasswordOtp(String email) {
        Optional<ForgotPasswordOtp> forgotPasswordOtpOptional
                = forgotPasswordOtpRepository.findByUserEmail(email);

        if (forgotPasswordOtpOptional.isEmpty()) {
            throw new UserNotFoundException(String.format(USER_WITH_EMAIL_NOT_FOUND, email));
        }
        ForgotPasswordOtp forgotPasswordOtp = forgotPasswordOtpOptional.get();
        if (isOtpExpired(forgotPasswordOtp)) {
            throw new OtpExpiredException(String.format(OTP_EXPIRED_MESSAGE, email, forgotPasswordOtp.getExpiryDate()));
        }
        return forgotPasswordOtp.getOtp();
    }

    private static boolean isOtpExpired(ForgotPasswordOtp forgotPasswordOtp) {
        return forgotPasswordOtp.getExpiryDate().isBefore(LocalDateTime.now());
    }
}
