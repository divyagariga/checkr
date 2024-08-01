package com.checkr.userservice.exception;

public class InappropriateCandidatesException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public InappropriateCandidatesException(String exceptionMessage){
        super(exceptionMessage);
    }
}
