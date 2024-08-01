package com.checkr.candidateservice.exception;

public class InvalidPaginationParam extends RuntimeException{
    public InvalidPaginationParam(String message) {
        super(message);
    }
}
