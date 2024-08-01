package com.checkr.userservice.exception;

public class InvalidAuthenticationException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public InvalidAuthenticationException(String exceptionMessage){
        super(exceptionMessage);
    }
}
