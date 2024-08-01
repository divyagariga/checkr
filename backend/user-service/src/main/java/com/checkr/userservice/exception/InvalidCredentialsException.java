package com.checkr.userservice.exception;
public class InvalidCredentialsException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public InvalidCredentialsException(String exceptionMessage){
        super(exceptionMessage);
    }
}
