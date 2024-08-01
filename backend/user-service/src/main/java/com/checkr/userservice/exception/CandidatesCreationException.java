package com.checkr.userservice.exception;

public class CandidatesCreationException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public CandidatesCreationException(String exceptionMessage){
        super(exceptionMessage);
    }
}
