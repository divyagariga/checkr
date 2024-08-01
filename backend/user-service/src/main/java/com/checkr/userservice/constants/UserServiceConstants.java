package com.checkr.userservice.constants;

import java.time.format.DateTimeFormatter;

public class UserServiceConstants {
    public static final String USER_URL = "/api/v1/users/*";
    public static final String CANDIDATES_URL = "http://localhost:9002/api/v1/candidates";
    public static final String RESET_CODE_SUCCESS = "Sent Reset Code.";
    public static final String INVALID_CREDENTIALS_ERROR = "Invalid Credentials";
    public static final String USER_WITH_EMAIL_NOT_FOUND = "User with email: %s not found";
    public static final String ANONYMOUS_USER = "anonymousUser";
    public static final String SIGNATURE_EXCEPTION_MESSAGE = "Issue in parsing access token";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String MESSAGE_CONTENT_URL = "otp=";
    public static final String FORGOT_PASSWORD_SUBJECT = "Checkr Verification Code";
    public static final String RESET_EMAIL_BODY = "Please find the verification code to login to the checkr app.";
    public static final String FUND_NOT_FOUND = "Fund not found for user: %s";
    public static final String USER_WITH_EMAIL_ALREADY_EXISTS = "User with Email: %s already exists.";
    public static final String INVALID_EMAIL_EXCEPTION = "Invalid Email: %s";
    public static final String INVALID_TOKEN = "invalidToken";
    public static final String EXPIRED = "expired";
    public static final String VERIFIED = "Verified";
    public static final String AUTHENTICATION_EXCEPTION = "Invalid or missing user authentication in the security context.";
    public static final Integer OTP_LENGTH = 4;
    public static final String OTP_NUMBERS = "0123456789";
    public static final String SENT_MAIL = "Sent mail";
    public static final String OTP_EXPIRED_MESSAGE = "Otp with given email: %s has expired on %s";
    public static final String ERROR_VALIDATING_USER = "Error validating user: %s";
    public static final String JSON_EXCEPTION = "Exception while creating Json Request Body";
    public static final String CONSIDER = "CONSIDER";
    public static final String CLEAR = "CLEAR";
    public static final String ALL_OPTIONS = "*";
    public static final String SAMPLE_DATE = "1990-09-10";
    public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public static final String EXCEPTION_MESSAGE = "Exception occurred";
    public static final Integer OTP_EXPIRATION_PERIOD = 1000;
    public static final String ZIP_CODE = "94158";
    public static final String PHONE_NUMBER = "(555)555-5555";
    public static final String SSN = "xxx-xx-6789";
    public static final String DRIVER_LICENSE = "xxx-xx-6789";
    public static final String ADJUDICATION = "";
    public static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";

    private UserServiceConstants() {
    }
}
