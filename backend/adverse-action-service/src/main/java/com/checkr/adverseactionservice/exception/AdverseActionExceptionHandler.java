package com.checkr.adverseactionservice.exception;

import com.checkr.adverseactionservice.dto.ErrorResponse;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.checkr.adverseactionservice.constants.AdverseActionConstants.ENUM_ERROR_MESSAGE;
import static com.checkr.adverseactionservice.constants.AdverseActionConstants.ENUM_ERROR_MESSAGE_REGEX;

@ControllerAdvice
public class AdverseActionExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(AdverseActionExceptionHandler.class);
    private static final Pattern ENUM_MSG = Pattern.compile(ENUM_ERROR_MESSAGE_REGEX);

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleJsonErrors(HttpMessageNotReadableException exception) {
        if (exception.getCause() instanceof InvalidFormatException) {
            String errorMessage = exception.getCause().getMessage();
            Matcher match = ENUM_MSG.matcher(errorMessage);
            if (match.find()) {
                String enumValues = match.group(1);
                errorMessage = ENUM_ERROR_MESSAGE + enumValues;
                logger.error("Error handling JSON request", exception);
                return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), System.currentTimeMillis()), HttpStatus.BAD_REQUEST);
    }
}
