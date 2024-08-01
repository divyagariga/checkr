package com.checkr.adverseactionservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int errorCode;
    private String errorMessage;
    private long timeStamp;
}