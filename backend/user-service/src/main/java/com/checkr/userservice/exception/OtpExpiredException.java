package com.checkr.userservice.exception;

public class OtpExpiredException  extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public OtpExpiredException(String exceptionMessage){
        super(exceptionMessage);
    }
}

