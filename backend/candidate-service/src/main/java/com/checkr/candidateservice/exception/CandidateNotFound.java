package com.checkr.candidateservice.exception;

public class CandidateNotFound extends RuntimeException {
    public CandidateNotFound(String message) {
        super(message);
    }
}
