package com.checkr.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int code;
    private String message;
    private Instant timeStamp;
}
