package com.checkr.userservice.exception;

public class UserWithEmailAlreadyExistsException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public UserWithEmailAlreadyExistsException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
