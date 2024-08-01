package com.checkr.userservice.exception;

import com.checkr.userservice.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.Instant;

import static com.checkr.userservice.constants.UserServiceConstants.EXCEPTION_MESSAGE;

/**
 * Global exception handler for the user microservice controllers.
 * This class provides centralized handling of specific exceptions
 * and maps them to appropriate HTTP status codes and error responses.
 */
@ControllerAdvice
public class ExceptionsHandler {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionsHandler.class);

    @ExceptionHandler(UserWithEmailAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponse> handleUserEmailAlreadyExistsException(Exception exception) {
        logExceptionMessage(exception);
        return getErrorResponse(HttpStatus.CONFLICT, exception.getMessage());
    }

    @ExceptionHandler({UserNotFoundException.class, InvalidCredentialsException.class, OtpExpiredException.class})
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(Exception exception) {
        logExceptionMessage(exception);
        return getErrorResponse(HttpStatus.UNAUTHORIZED, exception.getMessage());
    }

    @ExceptionHandler({InvalidEmailFormatException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleInvalidEmailFormatException(Exception exception) {
        logExceptionMessage(exception);
        return getErrorResponse(HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    private ResponseEntity<ErrorResponse> getErrorResponse(HttpStatus httpStatus, String exceptionMessage) {
        return new ResponseEntity<>(new ErrorResponse(httpStatus.value(), exceptionMessage, Instant.now()), httpStatus);
    }

    private void logExceptionMessage(Exception exceptionMessage) {
        logger.error(EXCEPTION_MESSAGE,exceptionMessage);
    }
}
