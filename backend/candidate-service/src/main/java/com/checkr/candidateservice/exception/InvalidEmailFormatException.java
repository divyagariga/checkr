package com.checkr.candidateservice.exception;

public class InvalidEmailFormatException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public InvalidEmailFormatException(String exceptionMessage){
        super(exceptionMessage);
    }
}